package DB_capTK

import (
	"fmt"
	"log"
	"viet/test/database"
	"viet/test/models"
)

func ThemTaiKhoanA3ToDB(request *models.ThemNguoiDungRequest) error {
	db := database.Connect()
	defer db.Close()

	rowsTinh, err := db.Query("SELECT * FROM huyen where id_huyen = ?", request.TaiKhoan)
	if err != nil {
		log.Println("Error: ", err)
		return err
	}

	if !rowsTinh.Next() {
		return fmt.Errorf("Không thể cấp tài khoản cho Huyện không tồn tại")
	}

	rows, err := db.Query("SELECT * FROM nguoidung where tai_khoan = ?", request.TaiKhoan)
	if err != nil {
		log.Println("Error: ", err)
		return err
	}
	if !rows.Next() {
		log.Println("Can Add")
		_, err := db.Query("INSERT INTO nguoidung VALUES (?, ?, ?, ?, ?, ?, ?)",
			request.TaiKhoan, request.MatKhau, request.HoTen, request.SDT, request.Email, request.DiaChi, "NO")

		if err != nil {
			return err
		}
		return fmt.Errorf("success")
	} else {
		return fmt.Errorf("Tài khoản đã tồn tại")
	}
}
