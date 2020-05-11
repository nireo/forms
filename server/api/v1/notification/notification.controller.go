package notification

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/nireo/forms/server/database/models"
	"github.com/nireo/forms/server/lib/common"
)

// Notification model alias
type Notification = models.Notification

// User model alias
type User = models.User

// JSON type alias
type JSON = common.JSON

func deleteNotification(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	user := c.MustGet("user").(User)
	id := c.Param("id")

	if id == "" {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	var notification Notification
	if err := db.Where("uuid = ?", id).First(&notification).Error; err != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	if notification.UserID != user.ID {
		c.AbortWithStatus(http.StatusForbidden)
		return
	}

	db.Delete(&notification)
	c.Status(http.StatusNoContent)
}

func getNotifications(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	user := c.MustGet("user").(User)

	var notifications []Notification
	if err := db.Model(&user).Related(&notifications).Limit(20).Error; err != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	serializedNotifications := make([]JSON, len(notifications), len(notifications))
	for index := range notifications {
		serializedNotifications[index] = notifications[index].Serialize()
	}

	c.JSON(http.StatusOK, serializedNotifications)
}
