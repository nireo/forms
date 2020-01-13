package question

import (
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/nireo/forms/server/database/models"
)

// Question alias for model
type Question = models.Question

// User alias for model
type User = models.User

// Form alias for model
type Form = models.Form

func createQuestion(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	user := c.MustGet("user").(User)

	type RequestBody struct {
		Required   bool     `json:"required" binding:"required"`
		Question   string   `json:"question" binding:"required"`
		AnswerType uint8    `json:"answerType" binding:"required"`
		Answers    []string `json:"answers" binding:"required"`
		Step       uint     `json:"step" binding:"required"`
		Min        uint     `json:"min" binding:"required"`
		Max        uint     `json:"max" binding:"required"`
		UUID       string   `json:"temp_uuid" binding:"required"`
		ToForm     uint     `json:"toForm" binding:"required"`
	}

	var requestBody RequestBody
	if err := c.BindJSON(&requestBody); err != nil {
		c.AbortWithStatus(400)
		return
	}

	var form Form
	if err := db.Set("gorm:auto_preload", true).Where("id = ?", requestBody.ToForm).First(&form).Error; err != nil {
		c.AbortWithStatus(404)
		return
	}

	if !(form.UserID == user.ID) {
		c.AbortWithStatus(403)
		return
	}

	question := Question{
		Required:   requestBody.Required,
		Question:   requestBody.Question,
		AnswerType: requestBody.AnswerType,
		Answers:    requestBody.Answers,
		Step:       requestBody.Step,
		Min:        requestBody.Min,
		Max:        requestBody.Max,
		FormID:     form.ID,
		UUID:       requestBody.UUID,
	}

	db.NewRecord(question)
	db.Create(&question)
	c.JSON(200, question.Serialize())
}
