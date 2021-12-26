package api_khaibao

import (
	"encoding/json"
	"net/http"
	"viet/test/DB_process/DB_themTinhHuyenXaXom"
	"viet/test/models"
)

func KhaiBaoTinh(w http.ResponseWriter, r *http.Request) {
	var reqData models.ThemTinhHuyenXaXomRequest
	if err := json.NewDecoder(r.Body).Decode(&reqData); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{"message": err.Error()})
		return
	}

	if len(reqData.ID) == 2 {
		err := DB_themTinhHuyenXaXom.ThemTinhToDB(&reqData)
		if err != nil {
			if err.Error() != "success" {
				w.WriteHeader(http.StatusBadRequest)
				json.NewEncoder(w).Encode(map[string]interface{}{"message": err.Error()})
				return
			} else {
				w.WriteHeader(http.StatusOK)
				json.NewEncoder(w).Encode(map[string]interface{}{"message": err.Error()})
				return
			}
		}
	} else if len(reqData.ID) == 4 {
		err := DB_themTinhHuyenXaXom.ThemHuyenToDB(&reqData)
		if err != nil {
			if err.Error() != "success" {
				w.WriteHeader(http.StatusBadRequest)
				json.NewEncoder(w).Encode(map[string]interface{}{"message": err.Error()})
				return
			} else {
				w.WriteHeader(http.StatusOK)
				json.NewEncoder(w).Encode(map[string]interface{}{"message": err.Error()})
				return
			}
		}
	} else if len(reqData.ID) == 6 {
		err := DB_themTinhHuyenXaXom.ThemXaToDB(&reqData)
		if err != nil {
			if err.Error() != "success" {
				w.WriteHeader(http.StatusBadRequest)
				json.NewEncoder(w).Encode(map[string]interface{}{"message": err.Error()})
				return
			} else {
				w.WriteHeader(http.StatusOK)
				json.NewEncoder(w).Encode(map[string]interface{}{"message": err.Error()})
				return
			}
		}
	} else if len(reqData.ID) == 8 {
		err := DB_themTinhHuyenXaXom.ThemXomToDB(&reqData)
		if err != nil {
			if err.Error() != "success" {
				w.WriteHeader(http.StatusBadRequest)
				json.NewEncoder(w).Encode(map[string]interface{}{"message": err.Error()})
				return
			} else {
				w.WriteHeader(http.StatusOK)
				json.NewEncoder(w).Encode(map[string]interface{}{"message": err.Error()})
				return
			}
		}
	} else {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{"message": "Sai cú pháp"})
		return
	}
}
