package DB_nguoidan

import (
	"fmt"
	"log"
	"viet/test/database"
	"viet/test/models"
)

func SuaNguoiDanInDB(request *models.SuaNguoiDanRequest) error {
	db := database.Connect()
	defer db.Close()

	rows, err := db.Query("SELECT * FROM nguoidan where cccd = ?", request.CCCD)
	if err != nil {
		log.Println("Error: ", err)
		return err
	}
	if !rows.Next() {
		return fmt.Errorf("Người dân không tồn tại")
	} else {
		rowsXom, err := db.Query("SELECT * FROM xom where id_xom = ?", request.ID_Xom)
		if err != nil {
			log.Println("Error: ", err)
			return err
		}
		if !rowsXom.Next() {
			return fmt.Errorf("Xom khong ton tai")
		}

		_, err2 := db.Query("UPDATE nguoidan SET hoten = ?, gioitinh = ?, ngaysinh = ?, quequan = ?, diachi_thuongtru = ?, diachi_tamtru = ?, tongiao = ?, trinhdo = ?, nghenghiep = ?, id_xom = ? WHERE cccd = ?",
			request.HoTen, request.GioiTinh, request.NgaySinh, request.QueQuan,
			request.DiaChiThuongTru, request.DiaChiTamTru, request.TonGiao, request.TrinhDo,
			request.NgheNghiep, request.ID_Xom, request.CCCD)

		if err2 != nil {
			return err2
		}

		return fmt.Errorf("success")
	}
}
