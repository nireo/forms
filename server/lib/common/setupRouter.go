package common

import (
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/nireo/forms/server/database"
	"github.com/nireo/forms/server/lib/middlewares"
)

func SetupRouter() *gin.Engine {
	err := godotenv.Load()
	if err != nil {
		panic(err)
	}
	app := gin.Default()
	app.Use(static.Serve("/", static.Localfile(".../client/build", true)))
	db, _ := database.Initialize()
	common.SetDatabase(db)
	app.Use(database.Inject(db))
	app.Use(database.Inject(db))
	app.Use(middlewares.JWTMiddleware())

	return app
}
