package api_captaikhoan

import (
	"encoding/json"
	"net/http"
	"viet/test/DB_process/DB_capTK"
	"viet/test/models"
)

func CapTaiKhoan(w http.ResponseWriter, r *http.Request) {
	var reqData models.ThemNguoiDungRequest
	if err := json.NewDecoder(r.Body).Decode(&reqData); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{"message": err.Error()})
		return
	}
	if len(reqData.TaiKhoan) == 2 {
		err := DB_capTK.ThemTaiKhoanA2ToDB(&reqData)
		if err != nil {
			if err.Error() != "success" {
				w.WriteHeader(http.StatusBadRequest)
				json.NewEncoder(w).Encode(map[string]interface{}{"message": err.Error()})
				return
			} else {
				w.WriteHeader(http.StatusOK)
				json.NewEncoder(w).Encode(map[string]interface{}{"message": "success"})
			}
		}
	} else if len(reqData.TaiKhoan) == 4 {
		err := DB_capTK.ThemTaiKhoanA3ToDB(&reqData)
		if err != nil {
			if err.Error() != "success" {
				w.WriteHeader(http.StatusBadRequest)
				json.NewEncoder(w).Encode(map[string]interface{}{"message": err.Error()})
				return
			} else {
				w.WriteHeader(http.StatusOK)
				json.NewEncoder(w).Encode(map[string]interface{}{"message": "success"})
			}
		}
	} else if len(reqData.TaiKhoan) == 6 {
		err := DB_capTK.ThemTaiKhoanB1ToDB(&reqData)
		if err != nil {
			if err.Error() != "success" {
				w.WriteHeader(http.StatusBadRequest)
				json.NewEncoder(w).Encode(map[string]interface{}{"message": err.Error()})
				return
			} else {
				w.WriteHeader(http.StatusOK)
				json.NewEncoder(w).Encode(map[string]interface{}{"message": "success"})
			}
		}
	} else if len(reqData.TaiKhoan) == 8 {
		err := DB_capTK.ThemTaiKhoanB2ToDB(&reqData)
		if err != nil {
			if err.Error() != "success" {
				w.WriteHeader(http.StatusBadRequest)
				json.NewEncoder(w).Encode(map[string]interface{}{"message": err.Error()})
				return
			} else {
				w.WriteHeader(http.StatusOK)
				json.NewEncoder(w).Encode(map[string]interface{}{"message": "success"})
			}
		}
	} else {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{"message": "Tài khoản không thể đặt như vậy"})
		return
	}
}
