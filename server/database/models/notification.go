package models

import (
	"github.com/jinzhu/gorm"
	"github.com/nireo/forms/server/lib/common"
)

// Notification model struct
type Notification struct {
	gorm.Model
	Title   string
	UserID  int
	User    User
	Content string
	UUID    string
	Read    bool
}

// Serialize notification model to JSON format
func (notification *Notification) Serialize() common.JSON {
	return common.JSON{
		"title":   notification.Title,
		"content": notification.Content,
		"created": notification.CreatedAt,
		"uuid":    notification.UUID,
	}
}
