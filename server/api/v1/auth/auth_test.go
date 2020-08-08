package auth

import (
	"bytes"
	"encoding/json"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"net/http"
	"net/http/httptest"
	"testing"
)

func postRequest(r http.Handler, path string, body []byte) *httptest.ResponseRecorder {
	res, _ := http.NewRequest("POST" ,path, bytes.NewBuffer(body))
	w := httptest.NewRecorder()
	r.ServeHTTP(w, res)
	return w
}

func performRequest(r http.Handler, method, path string) *httptest.ResponseRecorder {
	req, _ := http.NewRequest(method, path, nil)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)
	return w
}

func TestHelloWorld(t *testing.T) {
	// Build our expected body
	body := gin.H{
		"hello": "world",
	}   // Grab our router
	router := SetupRouter()   // Perform a GET request with that handler.
	w := performRequest(router, "GET", "/")   // Assert we encoded correctly,
	// the request gives a 200
	assert.Equal(t, http.StatusOK, w.Code)   // Convert the JSON response to a map
	var response map[string]string
	err := json.Unmarshal([]byte(w.Body.String()), &response)   // Grab the value & whether or not it exists
	value, exists := response["hello"]   // Make some assertions on the correctness of the response.
	assert.Nil(t, err)
	assert.True(t, exists)
	assert.Equal(t, body["hello"], value)
}
