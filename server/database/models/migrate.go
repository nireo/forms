package models

import (
	"fmt"

	"github.com/jinzhu/gorm"
)

func Migrate(db *gorm.DB) {
	db.AutoMigrate(&Answer{})
	fmt.Println("Auto migration has been completed")
}
