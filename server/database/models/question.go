package models

import (
	"github.com/satori/go.uuid"
	"github.com/jinzhu/gorm"
	"github.com/nireo/forms/server/lib/common"
)

// User data model
type User struct {
	gorm.Model
	Username string
	Password string
}

func (user *User) BeforeCreate(scope *gorm.Scope) error {
	uuid, err := uuid.NewV4().String()
	if err != nil {
		return err
	}

	return scope.SetColumn("ID", uuid)
}

// Serialize user data 
func (u *User) Serialize() common.JSON {
	return common.JSON{
		"id": u.ID,
		"username": u.Username
	}
}