package answer

import (
	"github.com/gin-gonic/gin"
	"github.com/nireo/forms/server/lib/middlewares"
)

// ApplyRoutes to gin engine
func ApplyRoutes(r *gin.RouterGroup) {
	auth := r.Group("/answer")
	{
		auth.GET("/form/:id", getAnswer)
		auth.POST("/answer/:id", createAnswer)
		auth.DELETE("/:id", middlewares.Authorized, deleteAnswer)
		auth.GET("/content/:id", getSingleAnswer)
	}
}
