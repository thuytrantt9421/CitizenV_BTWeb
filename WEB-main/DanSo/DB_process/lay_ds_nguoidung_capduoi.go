package DB_process

import (
	"log"
	s "strings"
	"viet/test/database"
	"viet/test/models"
)

func GetNguoiDungCapDuoiByUsername(request *models.LayThongTinNguoiDungRequest) ([]models.NguoiDung, error) {
	db := database.Connect()
	defer db.Close()

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
		if request.TaiKhoan == "admin" && nguoidung.TaiKhoan != "admin" {
			nguoidungS = append(nguoidungS, nguoidung)
		} else if len(nguoidung.TaiKhoan)-len(request.TaiKhoan) == 2 && s.HasPrefix(nguoidung.TaiKhoan, request.TaiKhoan) {
			nguoidungS = append(nguoidungS, nguoidung)
		}
	}
	return nguoidungS, err
}
