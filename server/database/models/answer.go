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
	ID     uuid.UUID `gorm:"type:uuid;primary_key;"`
}

// BeforeCreate change ID to an unique id.
func (answer *Answer) BeforeCreate(scope *gorm.Scope) error {
	uuid, err := uuid.NewV4()
	if err != nil {
		return err
	}

	return scope.SetColumn("ID", uuid)
}

// Serialize data
func (answer *Answer) Serialize() common.JSON {
	return common.JSON{
		"toForm": answer.toForm,
		"id":     answer.ID,
	}
}
