package database

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite" // mysql config
	"github.com/nireo/forms/server/database/models"
)

// Initialize the database
func Initialize() (*gorm.DB, error) {
	db, err := gorm.Open("sqlite3", "./forms.db")

	if err != nil {
		panic(err)
	}

	db.LogMode(true)

	models.Migrate(db)
	return db, err
}
