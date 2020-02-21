package form

import (
	"github.com/gin-gonic/gin"
	"github.com/nireo/forms/server/lib/middlewares"
)

// ApplyRoutes to gin engine
func ApplyRoutes(r *gin.RouterGroup) {
	form := r.Group("/form")
	{
		form.POST("/create", middlewares.Authorized, create)
		form.GET("/:id", formFromID)
		form.DELETE("/:id", middlewares.Authorized, removeForm)
		form.GET("/", middlewares.Authorized, getUserForms)
		form.PATCH("/:id", middlewares.Authorized, updateForm)
	}
}
