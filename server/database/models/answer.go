package models

import (
	"github.com/jinzhu/gorm"
	"github.com/nireo/forms/server/lib/common"
)

// Answer Data Model
type Answer struct {
	gorm.Model
	toForm string
}

// Serialize data
func (a Answer) Serialize() common.JSON {
	return common.JSON{
		"toForm": a.toForm,
	}
}
