package main

import (
	"os"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	v1 "github.com/nireo/forms/server/api/v1"
	"github.com/nireo/forms/server/database"
	"github.com/nireo/forms/server/lib/middlewares"

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

	db, _ := database.Initialize()

	app := gin.Default()

	// Serve the react front-end
	app.Use(static.Serve("/", static.LocalFile("../client/build", true)))

	app.Use(database.Inject(db))
	app.Use(middlewares.JWTMiddleware())
	v1.ApplyRoutes(app)
	app.Run(":" + port)
}
