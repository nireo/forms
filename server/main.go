package main

import (
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/nireo/forms/server/database"
	"github.com/nireo/forms/server/lib/common"
	"github.com/nireo/forms/server/lib/middlewares"
	"os"

	"github.com/joho/godotenv"
)

func main() {
	// load environment variables
	err := godotenv.Load()
	if err != nil {
		panic(err)
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	app := SetupRouter()
	app.Run(":" + port)
}

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
