package database

import (
	"os"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql" // mysql config
	"github.com/nireo/forms/server/database/models"
)

// Initialize the database
func Initialize() (*gorm.DB, error) {
	dbConfig := os.Getenv("DB_CONFIG")
	db, err := gorm.Open("mysql", dbConfig)

	if err != nil {
		panic(err)
	}

	db.LogMode(true)
	models.Migrate(db)

	return db, err
}
