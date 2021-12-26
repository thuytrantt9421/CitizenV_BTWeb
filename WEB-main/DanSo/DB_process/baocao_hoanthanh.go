package DB_process

import (
	"fmt"
	"log"
	"viet/test/database"
	"viet/test/models"
)

func BaoCaoHoanThanhInDB(request *models.BaoCaoHoanThanhRequest) error {
	db := database.Connect()
	defer db.Close()

	rows, err := db.Query("SELECT * FROM xom where id_xom = ?", request.ID)
	if err != nil {
		log.Println("Error: ", err)
		return err
	}

	if rows.Next() {
		_, err := db.Query("UPDATE xom SET trang_thai = ? WHERE id_xom = ?", "HOANTHANH", request.ID)
		if err != nil {
			return err
		}

		var ID_XA = make([]byte, 6)
		copy(ID_XA, request.ID)

		slChuaHoanThanh, err2 := db.Query("SELECT * FROM xom WHERE id_xa = ? AND trang_thai = ?", ID_XA, "CHUAHOANTHANH")
		if err2 != nil {
			return err2
		}
		if !slChuaHoanThanh.Next() {
			_, err3 := db.Query("UPDATE xa SET trang_thai = ? WHERE id_xa = ?", "HOANTHANH", ID_XA)
			if err3 != nil {
				return err3
			}
			var ID_HUYEN = make([]byte, 4)
			copy(ID_HUYEN, request.ID)
			slChuaHoanThanh2, err22 := db.Query("SELECT * FROM xa WHERE id_huyen = ? AND trang_thai = ?", ID_HUYEN, "CHUAHOANTHANH")
			if err22 != nil {
				return err22
			}
			if !slChuaHoanThanh2.Next() {
				_, err33 := db.Query("UPDATE huyen SET trang_thai = ? WHERE id_huyen = ?", "HOANTHANH", ID_HUYEN)
				if err33 != nil {
					return err33
				}
				var ID_TINH = make([]byte, 2)
				copy(ID_TINH, request.ID)
				slChuaHoanThanh22, err222 := db.Query("SELECT * FROM huyen WHERE id_tinh = ? AND trang_thai = ?", ID_TINH, "CHUAHOANTHANH")
				if err222 != nil {
					return err222
				}
				if !slChuaHoanThanh22.Next() {
					_, err333 := db.Query("UPDATE tinh SET trang_thai = ? WHERE id_tinh = ?", "HOANTHANH", ID_TINH)
					if err333 != nil {
						return err333
					}
				}
			}
		}

		return fmt.Errorf("success")
	} else {
		return fmt.Errorf("Xóm không tồn tại")
	}
}
