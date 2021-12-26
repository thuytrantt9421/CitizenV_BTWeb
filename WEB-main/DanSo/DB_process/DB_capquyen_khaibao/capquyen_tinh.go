package DB_capquyen_khaibao

import (
	"fmt"
	"log"
	"viet/test/database"
	"viet/test/models"
)

func CapQuyenTinhInDB(request *models.CapQuyenKhaiBaoRequest) error {
	db := database.Connect()
	defer db.Close()

	rows, err := db.Query("SELECT * FROM tinh where id_tinh = ?", request.ID)
	if err != nil {
		log.Println("Error: ", err)
		return err
	}
	if !rows.Next() {
		_, err := db.Query("UPDATE tinh SET thoi_diem_bat_dau = ?, thoi_diem_ket_thuc = ? WHERE id_tinh = ?",
			request.ThoiDiemBatDau, request.ThoiDiemKetThuc, request.ID)

		if err != nil {
			return err
		}
		return fmt.Errorf("success")
	} else {
		return fmt.Errorf("Tỉnh không tồn tại")
	}
}
