package api_khaibao

import (
	"encoding/json"
	"net/http"
	"viet/test/DB_process/DB_capquyen_khaibao"
	"viet/test/models"
)

func KhaiBaoNguoiDung(w http.ResponseWriter, r *http.Request) {
	var reqData models.CapQuyenKhaiBaoTKRequest
	if err := json.NewDecoder(r.Body).Decode(&reqData); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{"message": err.Error()})
		return
	}

	err := DB_capquyen_khaibao.CapQuyenTKInDB(&reqData)
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
}
