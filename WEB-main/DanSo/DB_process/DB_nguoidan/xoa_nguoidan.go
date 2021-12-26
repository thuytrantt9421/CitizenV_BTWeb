package DB_nguoidan

import (
	"fmt"
	"log"
	"viet/test/database"
	"viet/test/models"
)

func XoaNguoiDanInDB(request *models.XoaNguoiDanRequest) error {
	db := database.Connect()
	defer db.Close()

	rows, err := db.Query("SELECT * FROM nguoidan where cccd = ?", request.CCCD)
	if err != nil {
		log.Println("Error: ", err)
		return err
	}
	if !rows.Next() {
		return fmt.Errorf("Người dân không tồn tại")
	} else {
		_, err := db.Query("DELETE FROM nguoidan where cccd = ?", request.CCCD)
		if err != nil {
			return err
		}
		return fmt.Errorf("success")
	}
}
