package question

import (
	"github.com/gin-gonic/gin"
	"github.com/nireo/forms/server/lib/middlewares"
)

// ApplyRoutes to gin engine
func ApplyRoutes(r *gin.RouterGroup) {
	question := r.Group("/question")
	{
		question.POST("/:id", middlewares.Authorized, createQuestion)
		question.DELETE("/:id", middlewares.Authorized, deleteQuestion)
	}
}
