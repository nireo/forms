package models

import (
	"github.com/jinzhu/gorm"
	"github.com/nireo/forms/server/lib/common"
)

// Notification model struct
type Notification struct {
	gorm.Model
	Title   string
	UserID  uint
	User    User
	Content string
	UUID    string
	Read    bool
}

// CreateNotification creates a notification from given parameters
func CreateNotification(title string, user User, content string, db *gorm.DB) {
	uuid := common.GenerateUUID()

	newNotification := Notification{
		Title:   title,
		UserID:  user.ID,
		User:    user,
		UUID:    uuid,
		Content: content,
		Read:    false,
	}

	db.NewRecord(newNotification)
	db.Create(&newNotification)
}

// GetNotificationWithID finds a notification with an id and returns the ok status
func GetNotificationWithID(uuid string, db *gorm.DB) (Notification, bool) {
	var notification Notification
	if err := db.Where("uuid = ?", uuid).First(&notification).Error; err != nil {
		return notification, false
	}

	return notification, true
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
