package api_nguoidung

import (
	"encoding/json"
	"net/http"
	"viet/test/DB_process"
	"viet/test/models"
)

func BaoCaoHoanThanh(w http.ResponseWriter, r *http.Request) {
	var reqData models.BaoCaoHoanThanhRequest
	if err := json.NewDecoder(r.Body).Decode(&reqData); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{"message": err.Error()})
		return
	}

	if len(reqData.ID) == 8 {
		err := DB_process.BaoCaoHoanThanhInDB(&reqData)
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
