package common

// Contains searches through a array of string to find a single item
func Contains(array []string, toFind string) bool {
	for _, value := range array {
		if value == toFind {
			return true
		}
	}

	return false
}
