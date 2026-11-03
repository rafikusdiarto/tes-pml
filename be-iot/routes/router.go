package routes

import (
	"be-iot/controllers"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
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

	return r
}
