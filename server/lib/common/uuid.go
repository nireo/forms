package common

import (
	uuid "github.com/satori/go.uuid"
)

// GenerateUUID creates a unique id
func GenerateUUID() string {
	uuid, err := uuid.NewV4()

	if err != nil {
		panic(err)
	}

	return uuid.String()
}
