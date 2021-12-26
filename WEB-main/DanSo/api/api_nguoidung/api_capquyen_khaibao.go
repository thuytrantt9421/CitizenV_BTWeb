package api_nguoidung

import (
	"encoding/json"
	"net/http"
	"viet/test/DB_process/DB_capquyen_khaibao"
	"viet/test/models"
)

func CapQuyenKhaiBao(w http.ResponseWriter, r *http.Request) {
	var reqData models.CapQuyenKhaiBaoRequest
	if err := json.NewDecoder(r.Body).Decode(&reqData); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{"message": err.Error()})
		return
	}

	if len(reqData.ID) == 2 {
		err := DB_capquyen_khaibao.CapQuyenTinhInDB(&reqData)
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
	} else if len(reqData.ID) == 4 {
		err := DB_capquyen_khaibao.CapQuyenHuyenInDB(&reqData)
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
	} else if len(reqData.ID) == 6 {
		err := DB_capquyen_khaibao.CapQuyenXaInDB(&reqData)
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
	} else if len(reqData.ID) == 8 {
		err := DB_capquyen_khaibao.CapQuyenXomInDB(&reqData)
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
		json.NewEncoder(w).Encode(map[string]interface{}{"message": "Sai ID"})
		return
	}
}
