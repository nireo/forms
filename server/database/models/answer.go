package models

import (
	"github.com/jinzhu/gorm"
	"github.com/nireo/forms/server/lib/common"
)

// Answer Data Model
type Answer struct {
	gorm.Model
	Type             uint8
	SliderValue      uint
	SliderMax        uint
	SliderMin        uint
	QuestionTempUUID string
	Answers          string
	TrueOrFalse      bool
}

// AnswerFull data model
type AnswerFull struct {
	gorm.Model
	Answers []Answer
	FormID  uint
}

// Serialize data
func (answer *Answer) Serialize() common.JSON {
	return common.JSON{
		"id":            answer.ID,
		"type":          answer.Type,
		"min":           answer.SliderMin,
		"max":           answer.SliderMax,
		"value":         answer.SliderValue,
		"question_uuid": answer.QuestionTempUUID,
		"answers":       answer.Answers,
		"trueOrFalse":   answer.TrueOrFalse,
	}
}

// Serialize answers data
func (answerFull *AnswerFull) Serialize() common.JSON {
	return common.JSON{
		"id":      answerFull.ID,
		"formID":  answerFull.FormID,
		"answers": answerFull.Answers,
	}
}
