package api_themxoasua_nguoidan

import (
	"encoding/json"
	"net/http"
	"viet/test/DB_process/DB_nguoidan"
	"viet/test/models"
)

func LayDSNguoiDan(w http.ResponseWriter, r *http.Request) {
	var reqData models.XemDSNguoiDanRequest
	if err := json.NewDecoder(r.Body).Decode(&reqData); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{"message": err.Error()})
		return
	}
	if len(reqData.ID) == 0 || len(reqData.ID) == 2 || len(reqData.ID) == 4 || len(reqData.ID) == 6 || len(reqData.ID) == 8 {
		nguoidanS, err := DB_nguoidan.Get_NguoiDan_All(&reqData)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]interface{}{"message": err.Error()})
			return
		}
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(map[string]interface{}{"ds_nguoidan": nguoidanS, "message": "success"})
	} else {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{"message": "Sai ID"})
		return
	}
}
