package routes

import (
	"be-iot/controllers"
	"strings"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	api := r.Group("/api/entities")
	{
		api.GET("/", controllers.GetEntities)
		api.POST("/", controllers.CreateEntity)
		api.PUT("/:id", controllers.UpdateEntity)
		api.DELETE("/:id", controllers.DeleteEntity)
	}

	r.Static("/assets", "./public/assets")

	r.StaticFile("/vite.svg", "./public/vite.svg")
	r.NoRoute(func(c *gin.Context) {
		if strings.HasPrefix(c.Request.URL.Path, "/api") {
			c.JSON(404, gin.H{"error": "Endpoint API tidak ditemukan"})
			return
		}

		c.File("./public/index.html")
	})

	return r
}
