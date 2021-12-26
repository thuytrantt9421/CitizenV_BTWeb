package DB_themTinhHuyenXaXom

import (
	"fmt"
	"log"
	"viet/test/database"
	"viet/test/models"
)

func ThemTinhToDB(request *models.ThemTinhHuyenXaXomRequest) error {
	db := database.Connect()
	defer db.Close()

	rows, err := db.Query("SELECT * FROM tinh where id_tinh = ?", request.ID)
	if err != nil {
		log.Println("Error: ", err)
		return err
	}
	if !rows.Next() {
		log.Println("Can Add")
		_, err := db.Query("INSERT INTO tinh VALUES (?, ?, ?, ?, ?)",
			request.ID, request.Ten, "CHUAHOANTHANH", "0000-00-00", "0000-00-00")

		if err != nil {
			return err
		}
		return fmt.Errorf("success")
	} else {
		return fmt.Errorf("Tỉnh đã tồn tại")
	}
}
