package answer

import (
	"fmt"
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

func getAnswer(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	id := c.Param("id")

	var form Form
	if err := db.Set("gorm:auto_preload", true).Where("unique_id = ?", id).First(&form).Error; err != nil {
		c.AbortWithStatus(404)
		return
	}

	var answers []Full
	if err := db.Model(&form).Related(&answers).Error; err != nil {
		c.AbortWithStatus(500)
		return
	}

	serialized := make([]common.JSON, len(answers), len(answers))
	for index := range answers {
		serialized[index] = answers[index].Serialize()
	}

	c.JSON(200, serialized)
}

func getSingleAnswer(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	id := c.Param("id")

	if id == "" {
		c.AbortWithStatus(400)
		return
	}

	var full Full
	if err := db.Where("uuid = ?", id).First(&full).Error; err != nil {
		c.AbortWithStatus(404)
		return
	}

	var answers []Answer
	if err := db.Model(&full).Related(&answers).Error; err != nil {
		c.AbortWithStatus(404)
		return
	}

	fmt.Println(answers)

	answersSerialized := make([]common.JSON, len(answers), len(answers))
	for index := range answers {
		answersSerialized[index] = answers[index].Serialize()
	}

	c.JSON(200, answersSerialized)
}

func createAnswer(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	id := c.Param("id")

	// validate id
	if id == "" {
		c.AbortWithStatus(400)
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
		c.AbortWithStatus(400)
		return
	}

	var form Form
	if err := db.Set("gorm:auto_preload", true).Where("unique_id = ?", id).First(&form).Error; err != nil {
		c.AbortWithStatus(404)
		return
	}

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
		FormID:  form.ID,
		Answers: answersArray,
		UUID:    uuid,
	}

	db.NewRecord(full)
	db.Create(&full)

	// store the answers
	for index := range answersArray {
		answersArray[index].FullID = full.ID
		db.NewRecord(answersArray[index])
		db.Save(&answersArray[index])
	}

	c.JSON(200, full.Serialize())
}

// since users don't sign up to answer only the form owner can delete answers
func deleteAnswer(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	id := c.Param("id")
	user := c.MustGet("user").(User)

	var full Full
	if err := db.Where("uuid = ", id).First(&full).Error; err != nil {
		c.AbortWithStatus(404)
		return
	}

	var form Form
	if err := db.Where("id = ?", full.FormID).First(&form).Error; err != nil {
		c.AbortWithStatus(404)
	}

	if !(form.UserID == user.ID) {
		c.AbortWithStatus(403)
		return
	}

	db.Delete(&full)
	c.Status(204)
}
