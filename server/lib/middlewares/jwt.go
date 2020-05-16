package middlewares

import (
	"errors"
	"fmt"
	"io/ioutil"
	"os"
	"strings"

	"github.com/gin-gonic/gin"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/nireo/forms/server/database/models"
	"github.com/nireo/forms/server/lib/common"
)

var secretKey []byte

func init() {
	pwd, _ := os.Getwd()
	keyPath := pwd + "/jwtsecret.key.pub"

	key, readErr := ioutil.ReadFile(keyPath)
	if readErr != nil {
		panic("failed to load secret key file")
	}
	secretKey = key
}

func validateToken(tokenString string) (common.JSON, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
		return secretKey, nil
	})

	if err != nil {
		return common.JSON{}, err
	}

	if !token.Valid {
		return common.JSON{}, errors.New("Invalid token")
	}

	return token.Claims.(jwt.MapClaims), nil
}

// JWTMiddleware parses jwt token from header or cookie
func JWTMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenString, err := c.Cookie("token")
		if err != nil {
			authorization := c.Request.Header.Get("Authorization")
			fmt.Println(authorization)
			if authorization == "" {
				c.Next()
				return
			}

			var sp []string
			if strings.Index(authorization, "Bearer") != -1 {
				sp = strings.Split(authorization, "Bearer ")
				if len(sp) < 1 {
					c.Next()
					return
				}
			} else {
				sp = strings.Split(authorization, "bearer ")
				if len(sp) < 1 {
					c.Next()
					return
				}

			}

			fmt.Println(sp[1])
			tokenString = sp[1]
		}

		tokenData, err := validateToken(tokenString)
		if err != nil {
			c.Next()
			return
		}

		var user models.User
		user.Read(tokenData["user"].(common.JSON))
		c.Set("user", user)
		c.Set("token_expire", tokenData["exp"])
		c.Next()
	}
}
