package api_nguoidung

import (
	"encoding/json"
	"net/http"
	"viet/test/DB_process"
	"viet/test/models"
)

func LayThongTinNguoiDung(w http.ResponseWriter, r *http.Request) {
	var reqData models.LayThongTinNguoiDungRequest
	if err := json.NewDecoder(r.Body).Decode(&reqData); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{"message": err.Error()})
		return
	}

	nguoiDung, err := DB_process.GetNguoiDungByUsername(&reqData)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{"message": err.Error()})
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "success",
		"ho_ten":  nguoiDung.HoTen,
		"sdt":     nguoiDung.SDT,
		"email":   nguoiDung.Email,
		"dia_chi": nguoiDung.DiaChi,
		"quyen":   nguoiDung.Quyen,
	})
}
