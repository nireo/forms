package form

import (
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/nireo/forms/server/database/models"
)

// Form type alias
type Form = models.Form

// create form
func create(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)

	type RequestBody struct {
		Title       string `json:"title" binding:"required"`
		Description string `json:"description" binding:"required"`
	}

	var requestBody RequestBody
	if err := c.BindJSON(&requestBody); err != nil {
		c.AbortWithStatus(400)
		return
	}

	form := Form{
		Title:       requestBody.Title,
		Description: requestBody.Description,
	}

	db.NewRecord(form)
	db.Create(&form)
	c.JSON(200, form.Serialize())
}
