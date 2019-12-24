package main

import (
	"os"

	"github.com/gin-gonic/gin"
	v1 "github.com/nireo/forms/server/api/v1"
	"github.com/nireo/forms/server/database"

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
	app.Use(database.Inject(db))
	v1.ApplyRoutes(app)
	app.Run(":" + port)
}
