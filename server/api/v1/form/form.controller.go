package form

import (
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

	c.JSON(200, form.Serialize())
}

func removeForm(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	id := c.Param("id")

	var form Form
	if err := db.Where("id = ?", id).First(&form).Error; err != nil {
		c.AbortWithStatus(404)
		return
	}

	db.Delete(&form)
	c.Status(204)
}

// just as a test function
func getAllForms(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	var forms []Form

	if err := db.Preload("User").Limit(10).Order("id desc").Find(&forms).Error; err != nil {
		c.AbortWithStatus(500)
		return
	}

	serialized := make([]common.JSON, len(forms), len(forms))
	for index := range forms {
		serialized[index] = forms[index].Serialize()
	}
	c.JSON(200, serialized)
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

func update(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	id := c.Param("id")

	type RequestBody struct {
		Title       string     `json:"text" binding:"required"`
		Description string     `json:"description" binding:"required"`
		Questions   []Question `json:"questions" binding:"required"`
	}

	var requestBody RequestBody
	if err := c.BindJSON(&requestBody); err != nil {
		c.AbortWithStatus(400)
		return
	}

	var form Form
	if err := db.Where("id = ?", id).First(&form).Error; err != nil {
		c.AbortWithStatus(404)
		return
	}

	form.Title = requestBody.Title
	form.Description = requestBody.Description
	form.Questions = requestBody.Questions

	db.Save(&form)
	c.JSON(200, form.Serialize())
}
