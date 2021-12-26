package DB_dsTinhHuyenXaXom

import (
	"log"
	"viet/test/database"
	"viet/test/models"
)

func Get_Xa(request *models.TinhHuyenXaXomRequest) ([]models.Xa, error) {
	db := database.Connect()
	defer db.Close()

	var xaS []models.Xa
	rows, err := db.Query("SELECT * FROM xa where id_huyen = ?", request.ID)
	if err != nil {
		log.Println("Error: ", err)
		return xaS, err
	}
	for rows.Next() {
		var xa models.Xa
		err = rows.Scan(
			&xa.ID_Xa,
			&xa.ID_Huyen,
			&xa.TenXa,
			&xa.TrangThai,
			&xa.ThoiDiemBatDau,
			&xa.ThoiDiemKetThuc,
		)
		if err != nil {
			log.Println("ERROR: ", err)
			return xaS, err
		}
		xaS = append(xaS, xa)
	}

	return xaS, err
}
