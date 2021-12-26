package DB_capquyen_khaibao

import (
	"fmt"
	"viet/test/database"
	"viet/test/models"
)

func CapQuyenTKInDB(request *models.CapQuyenKhaiBaoTKRequest) error {
	db := database.Connect()
	defer db.Close()

	if request.Quyen == "NO" {
		_, err := db.Query("UPDATE nguoidung SET quyen = ? WHERE SUBSTRING(tai_khoan, 1, ?) = ?",
			request.Quyen, len(request.ID), request.ID)

		if err != nil {
			return err
		}
	} else {
		_, err := db.Query("UPDATE nguoidung SET quyen = ? WHERE tai_khoan = ?",
			request.Quyen, request.ID)

		if err != nil {
			return err
		}
	}
	return fmt.Errorf("success")

}
