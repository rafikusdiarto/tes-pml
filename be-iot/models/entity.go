package models

import "time"

type Entity struct {
	ID        uint      `gorm:"primaryKey;autoIncrement" json:"id"`
	Name      string    `gorm:"type:varchar(100);not null" json:"name"`
	Type      string    `gorm:"type:varchar(50);not null" json:"type"`
	Latitude  float64   `gorm:"not null" json:"latitude"`
	Longitude float64   `gorm:"not null" json:"longitude"`
	Status    string    `gorm:"type:varchar(20);default:'active'" json:"status"`
	Crtby     string    `gorm:"type:varchar(50);default:'system'" json:"crtby"`
	Crtdt     time.Time `gorm:"autoCreateTime" json:"crtdt"`
	Updby     string    `gorm:"type:varchar(50);default:'system'" json:"updby"`
	Upddt     time.Time `gorm:"autoUpdateTime" json:"upddt"`
}

func (Entity) TableName() string {
	return "m_entity"
}
