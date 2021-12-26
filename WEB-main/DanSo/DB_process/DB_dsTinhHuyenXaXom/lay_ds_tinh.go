package DB_dsTinhHuyenXaXom

import (
	"log"
	"viet/test/database"
	"viet/test/models"
)

func Get_Tinh() ([]models.Tinh, error) {
	db := database.Connect()
	defer db.Close()

	query := "SELECT * FROM tinh"

	var tinhS []models.Tinh
	rows, err := db.Query(query)
	if err != nil {
		log.Println("Error: ", err)
		return tinhS, err
	}
	for rows.Next() {
		var tinh models.Tinh
		err = rows.Scan(
			&tinh.ID_Tinh,
			&tinh.TenTinh,
			&tinh.TrangThai,
			&tinh.ThoiDiemBatDau,
			&tinh.ThoiDiemKetThuc,
		)
		if err != nil {
			log.Println("ERROR: ", err)
			return tinhS, err
		}
		tinhS = append(tinhS, tinh)
	}

	return tinhS, err
}
