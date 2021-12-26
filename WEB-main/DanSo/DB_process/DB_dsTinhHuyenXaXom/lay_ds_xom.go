package DB_dsTinhHuyenXaXom

import (
	"log"
	"viet/test/database"
	"viet/test/models"
)

func Get_Xom(request *models.TinhHuyenXaXomRequest) ([]models.Xom, error) {
	db := database.Connect()
	defer db.Close()

	var xomS []models.Xom
	rows, err := db.Query("SELECT * FROM xom where id_xa = ?", request.ID)
	if err != nil {
		log.Println("Error: ", err)
		return xomS, err
	}
	for rows.Next() {
		var xom models.Xom
		err = rows.Scan(
			&xom.ID_Xom,
			&xom.ID_Xa,
			&xom.TenXom,
			&xom.TrangThai,
			&xom.ThoiDiemBatDau,
			&xom.ThoiDiemKetThuc,
		)
		if err != nil {
			log.Println("ERROR: ", err)
			return xomS, err
		}
		xomS = append(xomS, xom)
	}

	return xomS, err
}
