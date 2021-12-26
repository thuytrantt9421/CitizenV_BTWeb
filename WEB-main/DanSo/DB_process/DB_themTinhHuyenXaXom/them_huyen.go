package DB_themTinhHuyenXaXom

import (
	"fmt"
	"log"
	"viet/test/database"
	"viet/test/models"
)

func ThemHuyenToDB(request *models.ThemTinhHuyenXaXomRequest) error {
	db := database.Connect()
	defer db.Close()

	var ID_TINH = make([]byte, 2)
	copy(ID_TINH, request.ID)

	rowsTinh, err := db.Query("SELECT * FROM tinh where id_tinh = ?", ID_TINH)
	if err != nil {
		log.Println("Error: ", err)
		return err
	}
	if !rowsTinh.Next() {
		return fmt.Errorf("Tỉnh không tồn tại")
	}

	rows, err := db.Query("SELECT * FROM huyen where id_huyen = ?", request.ID)
	if err != nil {
		log.Println("Error: ", err)
		return err
	}
	if !rows.Next() {
		log.Println("Can Add")
		_, err := db.Query("INSERT INTO huyen VALUES (?, ?, ?, ?, ?, ?)",
			request.ID, ID_TINH, request.Ten, "CHUAHOANTHANH", "0000-00-00", "0000-00-00")

		if err != nil {
			return err
		}
		return fmt.Errorf("success")
	} else {
		return fmt.Errorf("Huyện đã tồn tại")
	}
}
