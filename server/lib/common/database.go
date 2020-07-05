package common

import "github.com/jinzhu/gorm"

var DB *gorm.DB

// SetDatabase sets the global database variable in this file
func SetDatabase(db *gorm.DB) {
	DB = db
}

// GetDatabase returns the global database variable from this file
func GetDatabase() *gorm.DB {
	return DB
}

