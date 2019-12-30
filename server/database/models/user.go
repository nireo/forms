package models

import (
	"github.com/jinzhu/gorm"
	"github.com/nireo/forms/server/lib/common"
)

// User data model
type User struct {
	gorm.Model
	Username string
	Password string
}

func (user *User) Read(m common.JSON) {
	user.ID = uint(m["id"].(float64))
	user.Username = m["username"].(string)
}

// Serialize user data
func (user *User) Serialize() common.JSON {
	return common.JSON{
		"id":       user.ID,
		"username": user.Username,
	}
}
