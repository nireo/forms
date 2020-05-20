package models

import (
	"github.com/jinzhu/gorm"
	"github.com/nireo/forms/server/lib/common"
)

// Question data
type Question struct {
	gorm.Model
	Required      bool
	Question      string
	AnswerType    uint8
	Answers       string
	Step          uint
	Min           uint
	Max           uint
	FormID        uint
	UUID          string
	CustomMessage string
}

// Serialize question data
func (question *Question) Serialize() common.JSON {
	return common.JSON{
		"required":   question.Required,
		"question":   question.Question,
		"answerType": question.AnswerType,
		"answers":    question.Answers,
		"step":       question.Step,
		"min":        question.Min,
		"max":        question.Max,
		"temp_uuid":  question.UUID,
	}
}
