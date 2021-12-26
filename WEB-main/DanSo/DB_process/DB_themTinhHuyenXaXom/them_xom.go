package DB_themTinhHuyenXaXom

import (
	"fmt"
	"log"
	"viet/test/database"
	"viet/test/models"
)

func ThemXomToDB(request *models.ThemTinhHuyenXaXomRequest) error {
	db := database.Connect()
	defer db.Close()

	var ID_XA = make([]byte, 6)
	copy(ID_XA, request.ID)

	rowsXa, err := db.Query("SELECT * FROM xa where id_xa = ?", ID_XA)
	if err != nil {
		log.Println("Error: ", err)
		return err
	}
	if !rowsXa.Next() {
		return fmt.Errorf("Xã không tồn tại")
	}

	rows, err := db.Query("SELECT * FROM xom where id_xom = ?", request.ID)
	if err != nil {
		log.Println("Error: ", err)
		return err
	}
	if !rows.Next() {
		log.Println("Can Add")
		_, err := db.Query("INSERT INTO xom VALUES (?, ?, ?, ?, ?, ?)",
			request.ID, ID_XA, request.Ten, "CHUAHOANTHANH", "0000-00-00", "0000-00-00")

		if err != nil {
			return err
		}
		return fmt.Errorf("success")
	} else {
		return fmt.Errorf("Xóm đã tồn tại")
	}
}
