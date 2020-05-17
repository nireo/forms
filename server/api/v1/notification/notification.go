package notification

import (
	"github.com/gin-gonic/gin"
	"github.com/nireo/forms/server/lib/middlewares"
)

// ApplyRoutes to gin engine
func ApplyRoutes(r *gin.RouterGroup) {
	notification := r.Group("/notification")

	// notifications are created in other endpoints so no need for post route
	{
		notification.GET("/", middlewares.Authorized, getNotifications)
		notification.GET("/:id", middlewares.Authorized, singleNotification)
		notification.PATCH("/:id", middlewares.Authorized, updateReadStatus)
		notification.DELETE("/:id", middlewares.Authorized, deleteNotification)
	}
}
