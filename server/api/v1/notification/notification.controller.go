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

	notification, ok := models.GetNotificationWithID(id, db)
	if !ok {
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

func singleNotification(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	user := c.MustGet("user").(User)
	id := c.Param("id")

	var notification Notification
	if err := db.Where("uuid = ?", id).First(&notification).Error; err != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	if user.ID != notification.UserID {
		c.AbortWithStatus(http.StatusForbidden)
		return
	}

	c.JSON(http.StatusOK, notification.Serialize())
}

func getNotifications(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	user := c.MustGet("user").(User)

	var notifications []Notification
	if err := db.Model(&user).Related(&notifications).Error; err != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	if len(notifications) == 0 {
		c.Status(http.StatusOK)
	} else {

		serializedNotifications := make([]JSON, len(notifications), len(notifications))
		for index := range notifications {
			serializedNotifications[index] = notifications[index].Serialize()
		}

		c.JSON(http.StatusOK, serializedNotifications)
		return
	}
}

func updateReadStatus(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	user := c.MustGet("user").(User)
	id := c.Param("id")

	notification, ok := models.GetNotificationWithID(id, db)
	if !ok {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	if notification.UserID != user.ID {
		c.AbortWithStatus(http.StatusForbidden)
		return
	}

	notification.Read = true

	db.Save(&notification)
	c.JSON(http.StatusOK, notification.Serialize())
}
