package models

import (
	"github.com/jinzhu/gorm"
	"github.com/nireo/forms/server/lib/common"
	uuid "github.com/satori/go.uuid"
)

// Question data
type Question struct {
	gorm.Model
	Required   bool
	Question   string
	AnswerType uint
	Answers    []string
	Step       uint
	Min        uint
	Max        uint
}

// BeforeCreate change Id to an unique id.
func (question *Question) BeforeCreate(scope *gorm.Scope) error {
	uuid, err := uuid.NewV4()
	if err != nil {
		return err
	}

	return scope.SetColumn("ID", uuid)
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
	}
}
