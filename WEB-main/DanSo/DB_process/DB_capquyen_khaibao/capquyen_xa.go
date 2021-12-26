package DB_capquyen_khaibao

import (
	"fmt"
	"log"
	"viet/test/database"
	"viet/test/models"
)

func CapQuyenXaInDB(request *models.CapQuyenKhaiBaoRequest) error {
	db := database.Connect()
	defer db.Close()

	rows, err := db.Query("SELECT * FROM xa where id_xa = ?", request.ID)
	if err != nil {
		log.Println("Error: ", err)
		return err
	}
	if !rows.Next() {
		_, err := db.Query("UPDATE xa SET thoi_diem_bat_dau = ?, thoi_diem_ket_thuc = ? WHERE id_xa = ?",
			request.ThoiDiemBatDau, request.ThoiDiemKetThuc, request.ID)

		if err != nil {
			return err
		}
		return fmt.Errorf("success")
	} else {
		return fmt.Errorf("Xã không tồn tại")
	}
}
