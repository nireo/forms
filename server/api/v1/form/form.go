package form

import (
	"github.com/gin-gonic/gin"
	"github.com/nireo/forms/server/lib/middlewares"
)

// ApplyRoutes to gin engine
func ApplyRoutes(r *gin.RouterGroup) {
	form := r.Group("/form")
	{
		form.POST("/create", create)
		form.GET("/:id", formFromID)
		form.PATCH("/:id", update)
		form.DELETE("/:id", middlewares.Authorized, removeForm)
	}
}
