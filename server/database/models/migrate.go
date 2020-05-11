package models

import (
	"fmt"

	"github.com/jinzhu/gorm"
)

// Migrate the models to the database.
func Migrate(db *gorm.DB) {
	db.AutoMigrate(&User{}, &Form{}, &Question{}, &Full{}, &Answer{}, &Notification{})
	fmt.Println("Auto migration has been completed")
}
