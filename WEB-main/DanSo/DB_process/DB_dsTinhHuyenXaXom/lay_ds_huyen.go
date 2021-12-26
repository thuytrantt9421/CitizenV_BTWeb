package DB_dsTinhHuyenXaXom

import (
	"log"
	"viet/test/database"
	"viet/test/models"
)

func Get_Huyen(request *models.TinhHuyenXaXomRequest) ([]models.Huyen, error) {
	db := database.Connect()
	defer db.Close()

	var huyenS []models.Huyen
	rows, err := db.Query("SELECT * FROM huyen where id_tinh = ?", request.ID)
	if err != nil {
		log.Println("Error: ", err)
		return huyenS, err
	}
	for rows.Next() {
		var huyen models.Huyen
		err = rows.Scan(
			&huyen.ID_Huyen,
			&huyen.ID_Tinh,
			&huyen.TenHuyen,
			&huyen.TrangThai,
			&huyen.ThoiDiemBatDau,
			&huyen.ThoiDiemKetThuc,
		)
		if err != nil {
			log.Println("ERROR: ", err)
			return huyenS, err
		}
		huyenS = append(huyenS, huyen)
	}

	return huyenS, err
}
