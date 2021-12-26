package DB_process

import (
	"fmt"
	"log"
	"viet/test/database"
	"viet/test/models"
)

func GetAllNguoiDungInDB() ([]models.NguoiDung, error) {
	db := database.Connect()
	defer db.Close()

	query := fmt.Sprintf("SELECT * FROM nguoidung")
	log.Println("query", query)
	var nguoidungS []models.NguoiDung
	rows, err := db.Query("SELECT * FROM nguoidung")
	if err != nil {
		log.Println("Error: ", err)
		return nguoidungS, err
	}
	for rows.Next() {
		var nguoidung models.NguoiDung
		err = rows.Scan(
			&nguoidung.TaiKhoan,
			&nguoidung.MatKhau,
			&nguoidung.HoTen,
			&nguoidung.SDT,
			&nguoidung.Email,
			&nguoidung.DiaChi,
			&nguoidung.Quyen,
		)
		if err != nil {
			log.Println("ERROR: ", err)
			return nguoidungS, err
		}
		nguoidungS = append(nguoidungS, nguoidung)
	}
	// kiem tra matkhau
	return nguoidungS, err
}
