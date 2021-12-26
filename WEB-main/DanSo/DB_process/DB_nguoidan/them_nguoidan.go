package DB_nguoidan

import (
	"fmt"
	"log"
	"viet/test/database"
	"viet/test/models"
)

func ThemNguoidanToDB(request *models.ThemNguoiDanRequest) error {
	db := database.Connect()
	defer db.Close()

	rowsXom, err := db.Query("SELECT * FROM xom where id_xom = ?", request.ID_Xom)
	if err != nil {
		log.Println("Error: ", err)
		return err
	}
	if !rowsXom.Next() {
		return fmt.Errorf("Xom khong ton tai")
	}

	rows, err := db.Query("SELECT * FROM nguoidan where cccd = ?", request.CCCD)
	if err != nil {
		log.Println("Error: ", err)
		return err
	}
	if !rows.Next() {
		log.Println("Can Add")
		_, err := db.Query("INSERT INTO nguoidan VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
			request.CCCD, request.HoTen, request.GioiTinh, request.NgaySinh, request.QueQuan,
			request.DiaChiThuongTru, request.DiaChiTamTru, request.TonGiao, request.TrinhDo,
			request.NgheNghiep, request.ID_Xom)

		if err != nil {
			return err
		}

		return fmt.Errorf("success")
	} else {
		return fmt.Errorf("Người dùng đã tồn tại")
	}
}
