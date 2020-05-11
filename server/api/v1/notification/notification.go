package notification

import "github.com/gin-gonic/gin"

// ApplyRoutes to gin engine
func ApplyRoutes(r *gin.RouterGroup) {
	notification := r.Group("/notification")

	// notifications are created in other endpoints so no need for post route
	{
		notification.GET("/")
		notification.DELETE("/:id")
	}
}
