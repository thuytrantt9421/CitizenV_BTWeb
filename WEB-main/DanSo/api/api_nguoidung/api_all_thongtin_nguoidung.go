package api_nguoidung

import (
	"encoding/json"
	"net/http"
	"viet/test/DB_process"
)

func LayAllThongTinNguoiDung(w http.ResponseWriter, r *http.Request) {

	nguoiDungS, err := DB_process.GetAllNguoiDungInDB()
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{"message": err.Error()})
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message":      "success",
		"ds_nguoidung": nguoiDungS,
	})
}
