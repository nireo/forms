package models

import (
	"github.com/jinzhu/gorm"
	"github.com/nireo/forms/server/lib/common"
	uuid "github.com/satori/go.uuid"
)

// User data model
type User struct {
	ID       string `sql:"type:uuid;primary_key;default:uuid_generate_v4()"`
	Username string
	Password string
}

// BeforeCreate change the ID from 1, 2, 3 to an unique id
func (user *User) BeforeCreate(scope *gorm.Scope) error {
	uuid, err := uuid.NewV4()
	if err != nil {
		return err
	}

	return scope.SetColumn("ID", uuid)
}

// Serialize user data
func (user *User) Serialize() common.JSON {
	return common.JSON{
		"id":       user.ID,
		"username": user.Username,
	}
}
