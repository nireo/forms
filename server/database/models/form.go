package models

import (
	"github.com/jinzhu/gorm"
	"github.com/nireo/forms/server/lib/common"
)

// Form data model
type Form struct {
	gorm.Model
  Title           string
	Description     string
	Questions       []Question
	UniqueID        string
	User            User
	UserID          uint
  ReceuiveMessage bool
  CustomMessage   string
}

// FormQuestion is used when returning an array with questions and the form
type FormQuestion struct {
	Form      common.JSON   `json:"form"`
	Questions []common.JSON `json:"questions"`
}

// Serialize form data
func (form *Form) Serialize() common.JSON {
	// Questions do not have to be serialized, they are serialized independently

	return common.JSON{
		"title":       form.Title,
		"description": form.Description,
		"id":          form.ID,
		"created_at":  form.CreatedAt,
		"uuid":        form.UniqueID,
	}
}

// Serialize form question data
func (fq *FormQuestion) Serialize() common.JSON {
	return common.JSON{
		"form":      fq.Form,
		"questions": fq.Questions,
	}
}
