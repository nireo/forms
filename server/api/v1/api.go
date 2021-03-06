package v1

import (
	"github.com/gin-gonic/gin"
	"github.com/nireo/forms/server/api/v1/answer"
	"github.com/nireo/forms/server/api/v1/auth"
	"github.com/nireo/forms/server/api/v1/form"
	"github.com/nireo/forms/server/api/v1/notification"
	"github.com/nireo/forms/server/api/v1/question"
)

// ApplyRoutes adds router to gin engine
func ApplyRoutes(r *gin.Engine) {
	routes := r.Group("/api")
	{
		auth.ApplyRoutes(routes)
		form.ApplyRoutes(routes)
		answer.ApplyRoutes(routes)
		question.ApplyRoutes(routes)
		notification.ApplyRoutes(routes)
	}
}
