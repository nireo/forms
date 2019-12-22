package form

import (
	"github.com/gin-gonic/gin"
)

// ApplyRoutes to gin engine
func ApplyRoutes(r *gin.RouterGroup) {
	form := r.Group("/form")
	{
		form.POST("/create", create)
		form.GET("/:id", formFromID)
	}
}
