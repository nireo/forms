package auth

import (
	"github.com/gin-gonic/gin"
	"github.com/nireo/forms/server/lib/middlewares"
)

// ApplyRoutes to gin engine
func ApplyRoutes(r *gin.RouterGroup) {
	auth := r.Group("/auth")
	{
		auth.POST("/register", register)
		auth.POST("login", login)
		auth.PATCH("/update/password", middlewares.Authorized, changePassword)
		auth.DELETE("/:id", middlewares.Authorized, remove)
	}
}
