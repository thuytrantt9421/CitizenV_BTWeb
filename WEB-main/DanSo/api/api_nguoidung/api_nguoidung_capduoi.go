package api_nguoidung

import (
	"encoding/json"
	"net/http"
	"viet/test/DB_process"
	"viet/test/models"
)

func LayThongTinNguoiDungCapDuoi(w http.ResponseWriter, r *http.Request) {
	var reqData models.LayThongTinNguoiDungRequest
	if err := json.NewDecoder(r.Body).Decode(&reqData); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{"message": err.Error()})
		return
	}

	nguoiDungS, err := DB_process.GetNguoiDungCapDuoiByUsername(&reqData)
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
