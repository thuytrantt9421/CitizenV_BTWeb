package DB_themTinhHuyenXaXom

import (
	"fmt"
	"log"
	"viet/test/database"
	"viet/test/models"
)

func ThemXaToDB(request *models.ThemTinhHuyenXaXomRequest) error {
	db := database.Connect()
	defer db.Close()

	var ID_HUYEN = make([]byte, 4)
	copy(ID_HUYEN, request.ID)

	rowsHuyen, err := db.Query("SELECT * FROM huyen where id_huyen = ?", ID_HUYEN)
	if err != nil {
		log.Println("Error: ", err)
		return err
	}
	if !rowsHuyen.Next() {
		return fmt.Errorf("Huyện không tồn tại")
	}

	rows, err := db.Query("SELECT * FROM xa where id_xa = ?", request.ID)
	if err != nil {
		log.Println("Error: ", err)
		return err
	}
	if !rows.Next() {
		log.Println("Can Add")
		_, err := db.Query("INSERT INTO xa VALUES (?, ?, ?, ?, ?, ?)",
			request.ID, ID_HUYEN, request.Ten, "CHUAHOANTHANH", "0000-00-00", "0000-00-00")

		if err != nil {
			return err
		}
		return fmt.Errorf("success")
	} else {
		return fmt.Errorf("Xã đã tồn tại")
	}
}
