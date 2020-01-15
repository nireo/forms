package auth

import (
	"io/ioutil"
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/nireo/forms/server/database/models"
	"github.com/nireo/forms/server/lib/common"
	"golang.org/x/crypto/bcrypt"
)

// User alias for model
type User = models.User

func hash(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 12)
	return string(bytes), err
}

func checkHash(password string, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func generateToken(data common.JSON) (string, error) {
	date := time.Now().Add(time.Hour * 24 * 7)
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user": data,
		"exp":  date.Unix(),
	})

	pwd, _ := os.Getwd()
	keyPath := pwd + "/jwtsecret.key.pub"

	key, readErr := ioutil.ReadFile(keyPath)
	if readErr != nil {
		return "", readErr
	}
	tokenString, err := token.SignedString(key)
	return tokenString, err
}

func register(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)

	type RequestBody struct {
		Username string `json:"username" binding:"required"`
		Password string `json:"password" binding:"required"`
	}

	var body RequestBody
	if err := c.BindJSON(&body); err != nil {
		c.AbortWithStatus(400)
		return
	}

	var exists User
	if err := db.Where("username = ?", body.Username).First(&exists).Error; err == nil {
		c.AbortWithStatus(409)
		return
	}

	hash, hashErr := hash(body.Password)
	if hashErr != nil {
		c.AbortWithStatus(500)
		return
	}

	user := User{
		Username: body.Username,
		Password: hash,
	}

	db.NewRecord(user)
	db.Create(&user)

	serialized := user.Serialize()
	token, err := generateToken(serialized)

	if err != nil {
		c.AbortWithStatus(500)
		return
	}

	c.JSON(200, common.JSON{
		"user":  user.Serialize(),
		"token": token,
	})
}

func login(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)

	type RequestBody struct {
		Username string `json:"username" binding:"required"`
		Password string `json:"password" binding:"required"`
	}

	var body RequestBody
	if err := c.BindJSON(&body); err != nil {
		c.AbortWithStatus(400)
		return
	}

	var user User
	if err := db.Where("username = ?", body.Username).First(&user).Error; err != nil {
		c.AbortWithStatus(404)
		return
	}

	serialized := user.Serialize()
	token, err := generateToken(serialized)

	if err != nil {
		c.AbortWithStatus(500)
		return
	}

	c.SetCookie("token", token, 60*60*26*7, "/", "", false, true)
	c.JSON(200, common.JSON{
		"user":  user.Serialize(),
		"token": token,
	})
}

func remove(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	userRaw, ok := c.Get("user")

	if !ok {
		c.AbortWithStatus(401)
		return
	}

	user := userRaw.(User)

	db.Delete(&user)
	c.Status(204)
}

func changePassword(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	userRaw, _ := c.MustGet("user").(User)

	type RequestBody struct {
		Password string `json:"password" binding:"required"`
	}

	var body RequestBody
	if err := c.BindJSON(&body); err != nil {
		c.AbortWithStatus(400)
		return
	}

	var user User
	if err := db.Preload("User").Where("id = ?", userRaw.ID).First(&user).Error; err != nil {
		c.AbortWithStatus(404)
		return
	}

	hash, hashErr := hash(body.Password)
	if hashErr != nil {
		c.AbortWithStatus(500)
		return
	}

	user.Password = hash
	db.Save(&user)
	c.JSON(200, common.JSON{
		"success": "Password has been updated",
	})
}

func updateUser(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	userRaw, _ := c.MustGet("user").(User)

	type RequestBody struct {
		// maybe more properties in the future
		Username string `json:"username" binding:"required"`
	}

	var body RequestBody
	if err := c.BindJSON(&body); err != nil {
		c.AbortWithStatus(400)
		return
	}

	var user User
	if err := db.Preload("User").Where("id = ?", userRaw.ID).First(&user).Error; err != nil {
		c.AbortWithStatus(404)
		return
	}

	// check if that username already exists
	var userCheck User
	if err := db.Preload("User").Where("username = ?", body.Username).First(&userCheck).Error; err == nil {
		c.AbortWithStatus(400)
		return
	}

	user.Username = body.Username
	db.Save(&user)
	c.JSON(200, user.Serialize())
}
