package models

import (
	"github.com/jinzhu/gorm"
	"github.com/nireo/forms/server/lib/common"
	uuid "github.com/satori/go.uuid"
)

// Answer Data Model
type Answer struct {
	toForm string
	ID     string `sql:"type:uuid;primary_key;default:uuid_generate_v4()"`
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
