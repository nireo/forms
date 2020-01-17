package answer

import (
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/nireo/forms/server/database/models"
)

// Answer alias for model
type Answer = models.Answer

// Form alias for model
type Form = models.Form

func getAnswer(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	id := c.Param("id")

	var answer Answer
	if err := db.Set("gorm:auto_preload", true).Where("toform = ?", id).First(&answer).Error; err != nil {
		c.AbortWithStatus(404)
		return
	}

	c.JSON(200, answer.Serialize())
}

func createAnswer(c *gin.Context) {
	db := c.MustGet("id").(*gorm.DB)
	id := c.Param("id")

	// validate id
	if id == "" {
		c.AbortWithStatus(400)
		return
	}

	type AnswerRequestBody struct {
		Type             string   `json:"type" binding:"required"`
		Answer           []string `json:"answer" binding:"required"`
		TrueOrFalse      string   `json:"trueOrFalse" binding:"required"`
		QuestionTempUUID string   `json:"temp_uuid" binding:"required"`
	}

	type MainRequestBody struct {
		Answers []AnswerRequestBody
	}

	var requestBody MainRequestBody
	if err := c.BindJSON(&requestBody); err != nil {
		c.AbortWithStatus(400)
		return
	}

	var form Form
	if err := db.Set("gorm:auto_preload", true).Where("unique_id = ?", id).First(&form).Error; err != nil {
		c.AbortWithStatus(404)
		return
	}

	answer := Answer{}

	db.NewRecord(answer)
	db.Create(&answer)
	c.JSON(200, answer.Serialize())
}
