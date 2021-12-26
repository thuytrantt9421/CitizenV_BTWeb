package DB_capquyen_khaibao

import (
	"fmt"
	"log"
	"viet/test/database"
	"viet/test/models"
)

func CapQuyenXomInDB(request *models.CapQuyenKhaiBaoRequest) error {
	db := database.Connect()
	defer db.Close()

	rows, err := db.Query("SELECT * FROM xom where id_xom = ?", request.ID)
	if err != nil {
		log.Println("Error: ", err)
		return err
	}
	if !rows.Next() {
		_, err := db.Query("UPDATE xom SET thoi_diem_bat_dau = ?, thoi_diem_ket_thuc = ? WHERE id_xom = ?",
			request.ThoiDiemBatDau, request.ThoiDiemKetThuc, request.ID)

		if err != nil {
			return err
		}
		return fmt.Errorf("success")
	} else {
		return fmt.Errorf("Xóm không tồn tại")
	}
}
