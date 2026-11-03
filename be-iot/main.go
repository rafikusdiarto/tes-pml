package main

import (
	"be-iot/config"
	"be-iot/models"
	"be-iot/routes"
	"log"
	"os"

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Println("Peringatan: File .env tidak ditemukan")
	}
	config.InitDB()
	config.DB.AutoMigrate(&models.Entity{})

	r := routes.SetupRouter()

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server be running on http://localhost:%s", port)
	r.Run(":" + port)
}
