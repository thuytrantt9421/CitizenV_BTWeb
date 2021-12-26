package DB_process

import (
	"fmt"
	"log"
	"viet/test/database"
	"viet/test/models"
)

func GetNguoiDungByUsername(request *models.LayThongTinNguoiDungRequest) (models.NguoiDung, error) {
	db := database.Connect()
	defer db.Close()

	query := fmt.Sprintf("SELECT * FROM nguoidung where tai_khoan = '%v'", request.TaiKhoan)
	log.Println("query", query)
	var nguoidung models.NguoiDung
	rows, err := db.Query("SELECT * FROM nguoidung where tai_khoan = ?", request.TaiKhoan)
	if err != nil {
		log.Println("Error: ", err)
		return nguoidung, err
	}
	if !rows.Next() {
		log.Println("Not found data")
		return nguoidung, fmt.Errorf("Không tìm thấy người dùng")
	} else {
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
			return nguoidung, err
		}
	}
	return nguoidung, err
}
