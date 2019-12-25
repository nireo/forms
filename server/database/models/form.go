package models

import (
	"github.com/jinzhu/gorm"
	"github.com/nireo/forms/server/lib/common"
	uuid "github.com/satori/go.uuid"
)

// Form data model
type Form struct {
	Title       string
	Description string
	ID          uuid.UUID  `gorm:"type:uuid;primary_key;"`
	Questions   []Question `gorm:"foreignkey:FormID"`
}

// BeforeCreate change Id to an unique id.
func (form *Form) BeforeCreate(scope *gorm.Scope) error {
	uuid, err := uuid.NewV4()
	if err != nil {
		return err
	}

	return scope.SetColumn("ID", uuid)
}

// Serialize form data
func (form *Form) Serialize() common.JSON {
	return common.JSON{
		"title":       form.Title,
		"description": form.Description,
		"id":          form.ID,
	}
}
