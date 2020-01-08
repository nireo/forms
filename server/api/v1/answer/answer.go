package answer

import (
	"github.com/gin-gonic/gin"
)

// ApplyRoutes to gin engine
func ApplyRoutes(r *gin.RouterGroup) {
	auth := r.Group("/answer")
	{
		auth.GET("/:id", getAnswer)
		auth.POST("/:id", createAnswer)
	}
}
