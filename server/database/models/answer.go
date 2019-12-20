package models

import (
	"github.com/jinzhu/gorm"
	"github.com/nireo/forms/server/lib/common"
	uuid "github.com/satori/go.uuid"
)

// Answer Data Model
type Answer struct {
	gorm.Model
	toForm string
}

// Change ID to an unique id.
func (answer *Answer) BeforeCreate(scope *gorm.Scope) error {
	uuid, err := uuid.NewV4().String()
	if err != nil {
		return err
	}

	return scope.SetColumn("ID", uuid)
}

// Serialize data
func (a Answer) Serialize() common.JSON {
	return common.JSON{
		"toForm": a.toForm,
	}
}
