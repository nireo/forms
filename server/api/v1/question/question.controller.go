package question

import (
	"fmt"
	"strings"

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
	id := c.Param("id")

	type RequestBody struct {
		Required   string   `json:"required" binding:"required"`
		Question   string   `json:"question" binding:"required"`
		AnswerType uint8    `json:"answerType" binding:"required"`
		Answers    []string `json:"answers" binding:"required"`
		Step       uint     `json:"step" binding:"required"`
		Min        uint     `json:"min" binding:"required"`
		Max        uint     `json:"max" binding:"required"`
		UUID       string   `json:"temp_uuid" binding:"required"`
	}

	var requestBody RequestBody
	if err := c.BindJSON(&requestBody); err != nil {
		fmt.Println(err)
		c.AbortWithStatus(400)
		return
	}

	var form Form
	if err := db.Set("gorm:auto_preload", true).Where("unique_id = ?", id).First(&form).Error; err != nil {
		c.AbortWithStatus(404)
		return
	}

	if !(form.UserID == user.ID) {
		c.AbortWithStatus(403)
		return
	}

	isRequired := false
	if requestBody.Required == "true" {
		isRequired = true
	}
	answersString := strings.Join(requestBody.Answers[:], "|")

	question := Question{
		Required:   isRequired,
		Question:   requestBody.Question,
		AnswerType: requestBody.AnswerType,
		Answers:    answersString,
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

func deleteQuestion(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	id := c.Param("id")
	user := c.MustGet("user").(User)

	var question Question
	if err := db.Where("uuid = ? ", id).First(&question).Error; err != nil {
		c.AbortWithStatus(404)
		return
	}

	// check ownership
	var form Form
	if err := db.Where("id = ?", question.FormID).First(&form).Error; err != nil {
		c.AbortWithStatus(404)
		return
	}

	if !(form.UserID == user.ID) {
		c.AbortWithStatus(403)
		return
	}

	db.Delete(&question)
	c.Status(204)
}

func updateQuestion(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	id := c.Param("id")

	type RequestBody struct {
		Question   string   `json:"question" binding:"required"`
		Required   string   `json:"required" binding:"required"`
		AnswerType uint8    `json:"answerType" binding:"required"`
		Answers    []string `json:"answers" binding:"required"`
		Step       uint     `json:"step" binding:"required"`
		Min        uint     `json:"min" binding:"required"`
		Max        uint     `json:"max" binding:"required"`
		UUID       string   `json:"temp_uuid" binding:"required"`
	}

	var requestBody RequestBody
	if err := c.BindJSON(&requestBody); err != nil {
		c.AbortWithStatus(400)
		fmt.Println(err)
		return
	}

	var question Question
	if err := db.Where("uuid = ?", id).First(&question).Error; err != nil {
		c.AbortWithStatus(404)
		return
	}

	// convert required to from string to boolean since binding
	// the request body struct fails if required == false
	isRequired := false
	if requestBody.Required == "true" {
		isRequired = true
	}

	answersString := strings.Join(requestBody.Answers[:], "|")

	question.Required = isRequired
	question.Question = requestBody.Question
	question.AnswerType = requestBody.AnswerType
	question.Answers = answersString
	question.Step = requestBody.Step
	question.Min = requestBody.Min
	question.Max = requestBody.Max
	question.UUID = requestBody.UUID

	db.Save(&question)
	c.JSON(200, question.Serialize())
}
