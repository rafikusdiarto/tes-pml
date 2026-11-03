package controllers

import (
	"be-iot/config"
	"be-iot/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetEntities(c *gin.Context) {
	var entities []models.Entity
	if err := config.DB.Order("crtdt desc").Find(&entities).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal mengambil data entitas"})
		return
	}
	c.JSON(http.StatusOK, entities)
}

func CreateEntity(c *gin.Context) {
	var entity models.Entity
	if err := c.ShouldBindJSON(&entity); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB.Create(&entity).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menyimpan data"})
		return
	}
	c.JSON(http.StatusCreated, entity)
}

func UpdateEntity(c *gin.Context) {
	id := c.Param("id")
	var entity models.Entity

	if err := config.DB.First(&entity, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Data tidak ditemukan"})
		return
	}

	if err := c.ShouldBindJSON(&entity); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	config.DB.Save(&entity)
	c.JSON(http.StatusOK, entity)
}

func DeleteEntity(c *gin.Context) {
	id := c.Param("id")
	if err := config.DB.Delete(&models.Entity{}, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menghapus data"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Data berhasil dihapus"})
}
