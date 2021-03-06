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
	QuestionAnswers  string
	TrueOrFalse      bool
	FullID           uint
}

// Full data model
type Full struct {
	gorm.Model
	Answers  []Answer
	FormID   uint
	UUID     string
	FormUUID string
}

// Serialize data
func (answer *Answer) Serialize() common.JSON {
	return common.JSON{
		"type":          answer.Type,
		"min":           answer.SliderMin,
		"max":           answer.SliderMax,
		"value":         answer.SliderValue,
		"question_uuid": answer.QuestionTempUUID,
		"answers":       answer.QuestionAnswers,
		"trueOrFalse":   answer.TrueOrFalse,
	}
}

// Serialize answers data
func (full *Full) Serialize() common.JSON {
	return common.JSON{
		"id":         full.ID,
		"formID":     full.FormID,
		"answers":    full.Answers,
		"created_at": full.CreatedAt,
		"uuid":       full.UUID,
		"form_uuid":  full.FormUUID,
	}
}
