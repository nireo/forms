package models

import (
	"github.com/jinzhu/gorm"
	"github.com/nireo/forms/server/lib/common"
)

// Form data model
type Form struct {
	gorm.Model
	Title       string
	Description string
	Questions   []Question `gorm:"foreignkey:FormID"`
}

// Serialize form data
func (form *Form) Serialize() common.JSON {
	return common.JSON{
		"title":       form.Title,
		"description": form.Description,
		"id":          form.ID,
	}
}
