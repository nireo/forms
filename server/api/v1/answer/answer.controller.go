package answer

import (
	"net/http"
	"strings"

	"github.com/nireo/forms/server/lib/common"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/nireo/forms/server/database/models"
)

// Answer alias for model
type Answer = models.Answer

// Form alias for model
type Form = models.Form

// Full alias for model
type Full = models.Full

// User alias for model
type User = models.User

// Question alias for model
type Question = models.Question

func getAnswer(c *gin.Context) {
	db := common.GetDatabase()
	id := c.Param("id")
	user := c.MustGet("user").(User)

	var form Form
	if err := db.Where("unique_id = ?", id).First(&form).Error; err != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	if form.UserID != user.ID {
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	var answers []Full
	if err := db.Model(&form).Related(&answers).Error; err != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	for index := range answers {
		var relatedAnswers []Answer
		if err := db.Model(&answers[index]).Related(&relatedAnswers).Error; err != nil {
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}

		answers[index].Answers = relatedAnswers
	}

	serialized := make([]common.JSON, len(answers), len(answers))
	for index := range answers {
		serialized[index] = answers[index].Serialize()
	}

	c.JSON(http.StatusOK, serialized)
}

func getSingleAnswer(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	id := c.Param("id")

	if id == "" {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	var full Full
	if err := db.Where("uuid = ?", id).First(&full).Error; err != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	var answers []Answer
	if err := db.Model(&full).Related(&answers).Error; err != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	answersSerialized := make([]common.JSON, len(answers), len(answers))
	for index := range answers {
		answersSerialized[index] = answers[index].Serialize()
	}

	c.JSON(http.StatusOK, gin.H{
		"answers": answersSerialized,
		"full":    full.Serialize(),
	})
}

func getAllFull(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	id := c.Param("id")

	if id == "" {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	var full []Full
	if err := db.Where("form_uuid = ?", id).Find(&full).Error; err != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	var allAnswers []Answer
	for index := range full {
		var answers []Answer
		if err := db.Model(&full[index]).Related(&answers).Error; err != nil {
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}

		for answerIndex := range answers {
			allAnswers = append(allAnswers, answers[answerIndex])
		}
	}

	var questionsLoaded []string
	var questions []Question
	for index := range allAnswers {
		if common.Contains(questionsLoaded, allAnswers[index].QuestionTempUUID) {
			continue
		} else {
			var question Question
			if err := db.Where("uuid = ?", allAnswers[index].QuestionTempUUID).First(&question).Error; err != nil {
				c.AbortWithStatus(http.StatusInternalServerError)
				return
			}

			questionsLoaded = append(questionsLoaded, question.UUID)
			questions = append(questions, question)
		}
	}

	serializedAnswers := make([]common.JSON, len(allAnswers), len(allAnswers))
	for index := range allAnswers {
		serializedAnswers[index] = allAnswers[index].Serialize()
	}

	serializedQuestions := make([]common.JSON, len(questions), len(questions))
	for index := range questions {
		serializedQuestions[index] = questions[index].Serialize()
	}

	c.JSON(http.StatusOK, gin.H{
		"questions": serializedQuestions,
		"answers":   serializedAnswers,
	})
}

func createAnswer(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	id := c.Param("id")

	if id == "" {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	type AnswerRequestBody struct {
		Type             uint8    `json:"type" binding:"required"`
		Answers          []string `json:"answer" binding:"required"`
		TrueOrFalse      string   `json:"trueOrFalse" binding:"required"`
		SliderValue      uint     `json:"slider_value" binding:"required"`
		SliderMin        uint     `json:"slider_min" binding:"required"`
		SliderMax        uint     `json:"slider_max" binding:"required"`
		QuestionTempUUID string   `json:"temp_uuid" binding:"required"`
	}

	type RequestBody struct {
		Answers []AnswerRequestBody `json:"answers" binding:"required"`
	}

	var requestBody RequestBody
	if err := c.BindJSON(&requestBody); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	var form Form
	if err := db.Set("gorm:auto_preload", true).Where("unique_id = ?", id).First(&form).Error; err != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	var user User
	if err := db.Where("id = ?", form.UserID).First(&user).Error; err != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	// create notification to user
	models.CreateNotification("New answer", user, "Someone has answered one of your forms", db)

	uuid := common.GenerateUUID()
	// turn answers array into proper Answer type
	answersArray := make([]Answer, len(requestBody.Answers), len(requestBody.Answers))
	for index, value := range requestBody.Answers {
		isTrue := false
		if value.TrueOrFalse == "true" {
			isTrue = true
		}
		answersString := strings.Join(value.Answers[:], "|")

		tempItem := Answer{
			Type:             value.Type,
			SliderValue:      value.SliderValue,
			SliderMin:        value.SliderMin,
			SliderMax:        value.SliderMax,
			QuestionTempUUID: value.QuestionTempUUID,
			QuestionAnswers:  answersString,
			TrueOrFalse:      isTrue,
			FullID:           0,
		}

		answersArray[index] = tempItem
	}

	// create answer after validation
	full := Full{
		FormID:   form.ID,
		Answers:  answersArray,
		UUID:     uuid,
		FormUUID: form.UniqueID,
	}

	db.NewRecord(full)
	db.Create(&full)

	// store the answers
	for index := range answersArray {
		answersArray[index].FullID = full.ID
		db.NewRecord(answersArray[index])
		db.Save(&answersArray[index])
	}

	c.JSON(http.StatusOK, full.Serialize())
}

// since users don't sign up to answer only the form owner can delete answers
func deleteAnswer(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	id := c.Param("id")
	user := c.MustGet("user").(User)

	var full Full
	if err := db.Where("uuid = ?", id).First(&full).Error; err != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	var form Form
	if err := db.Where("id = ?", full.FormID).First(&form).Error; err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	}

	if !(form.UserID == user.ID) {
		c.AbortWithStatus(http.StatusForbidden)
		return
	}

	db.Delete(&full)
	c.Status(http.StatusNoContent)
}

func deleteAllAnswers(c *gin.Context) {
	id := c.Param("id")
	db := c.MustGet("db").(*gorm.DB)
	user := c.MustGet("user").(User)

	if id == "" {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	// check user ownership of form
	var form Form
	if err := db.Where("unique_id = ?", id).First(&form).Error; err != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	if form.UserID != user.ID {
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	var full []Full
	if err := db.Where("form_uuid = ?", id).Find(&full).Error; err != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	for index := range full {
		db.Delete(&full[index])
	}

	c.Status(http.StatusNoContent)
}
