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

	if len(os.Args) > 1 {
		switch os.Args[1] {
		case "migrate":
			log.Println("Menjalankan AutoMigrate...")
			config.DB.AutoMigrate(&models.Entity{})
			log.Println("Migrasi selesai.")
			return

		case "migrate-fresh":
			log.Println("Menghapus tabel lama dan menjalankan migrasi ulang...")
			config.DB.Migrator().DropTable(&models.Entity{})
			config.DB.AutoMigrate(&models.Entity{})
			log.Println("Migrasi fresh selesai.")
			return
		}
	}

	r := routes.SetupRouter()

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server be running on http://localhost:%s", port)
	r.Run(":" + port)
}
