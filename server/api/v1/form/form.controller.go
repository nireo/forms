package form

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/nireo/forms/server/database/models"
	"github.com/nireo/forms/server/lib/common"
)

// Form type alias
type Form = models.Form

// Question type alias
type Question = models.Question

// User type alias
type User = models.User

// create form
func create(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	user := c.MustGet("user").(User)

	type RequestBody struct {
		Title string `json:"title" binding:"required"`
	}

	var requestBody RequestBody
	if err := c.BindJSON(&requestBody); err != nil {
		c.AbortWithStatus(400)
		return
	}

	uniqueID := common.GenerateUUID()

	form := Form{
		Title:       requestBody.Title,
		Description: "",
		Questions:   []Question{},
		UniqueID:    uniqueID,
		User:        user,
		UserID:      user.ID,
	}

	db.NewRecord(form)
	db.Create(&form)
	c.JSON(200, form.Serialize())
}

func formFromID(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	id := c.Param("id")

	var form Form
	if err := db.Set("gorm:auto_preload", true).Where("unique_id = ?", id).First(&form).Error; err != nil {
		c.AbortWithStatus(404)
		return
	}

	var questions []Question
	if err := db.Model(&form).Related(&questions).Error; err != nil {
		c.AbortWithStatus(500)
		return
	}

	formSerialized := form.Serialize()
	questionsSerialized := make([]common.JSON, len(questions), len(questions))
	for index := range questions {
		questionsSerialized[index] = questions[index].Serialize()
	}

	c.JSON(200, gin.H{
		"form":      formSerialized,
		"questions": questionsSerialized,
	})
}

func removeForm(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	id := c.Param("id")
	user := c.MustGet("user").(User)

	var form Form
	if err := db.Where("id = ?", id).First(&form).Error; err != nil {
		c.AbortWithStatus(404)
		return
	}

	if !(user.ID == form.UserID) {
		c.AbortWithStatus(404)
		return
	}

	db.Delete(&form)
	c.Status(204)
}

func getUserForms(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	user := c.MustGet("user").(User)
	var forms []Form

	if err := db.Model(&user).Related(&forms).Error; err != nil {
		c.AbortWithStatus(500)
		return
	}

	serialized := make([]common.JSON, len(forms), len(forms))
	for index := range forms {
		serialized[index] = forms[index].Serialize()
	}
	c.JSON(200, serialized)
}

func updateForm(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	user := c.MustGet("user").(User)
	id := c.Param("id")

	type RequestBody struct {
		Title       string `json:"title" binding:"required"`
		Description string `json:"description" binding:"required"`
	}

	var body RequestBody
	if err := c.BindJSON(&body); err != nil {
		c.AbortWithStatus(400)
		fmt.Println(err)
		return
	}

	var form Form
	if err := db.Where("unique_id = ?", id).First(&form).Error; err != nil {
		c.AbortWithStatus(404)
		return
	}

	if form.UserID != user.ID {
		c.AbortWithStatus(401)
		return
	}

	form.Title = body.Title
	form.Description = body.Description

	db.Save(&form)
	c.JSON(200, form.Serialize())
}
