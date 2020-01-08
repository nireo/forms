package models

import (
	"github.com/jinzhu/gorm"
	"github.com/nireo/forms/server/lib/common"
)

// Answer Data Model
type Answer struct {
	gorm.Model
	toForm string
	Answer string
}

// Serialize data
func (answer *Answer) Serialize() common.JSON {
	return common.JSON{
		"toForm": answer.toForm,
		"id":     answer.ID,
	}
}
