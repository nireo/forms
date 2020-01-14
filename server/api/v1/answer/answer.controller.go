package answer

import (
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/nireo/forms/server/database/models"
)

// Answer alias for model
type Answer = models.Answer

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

	if id == "" {
		c.AbortWithStatus(400)
		return
	}

	type RequestBody struct {
		Answer string `json:"title" binding:"required"`
	}

	var requestBody RequestBody
	if err := c.BindJSON(&requestBody); err != nil {
		c.AbortWithStatus(400)
		return
	}

	answer := Answer{}

	db.NewRecord(answer)
	db.Create(&answer)
	c.JSON(200, answer.Serialize())
}
