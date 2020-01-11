package models

import (
	"github.com/jinzhu/gorm"
	"github.com/nireo/forms/server/lib/common"
)

// Answer Data Model
type Answer struct {
	gorm.Model
	toForm     string
	Answer     []string
	answerType uint8
}

// Serialize data
func (answer *Answer) Serialize() common.JSON {
	return common.JSON{
		"toForm": answer.toForm,
		"id":     answer.ID,
	}
}
