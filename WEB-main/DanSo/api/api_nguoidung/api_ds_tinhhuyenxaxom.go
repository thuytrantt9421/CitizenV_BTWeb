package api_nguoidung

import (
	"encoding/json"
	"net/http"
	"viet/test/DB_process/DB_dsTinhHuyenXaXom"
	"viet/test/models"
)

func LayDSTinhHuyenXaXom(w http.ResponseWriter, r *http.Request) {
	var reqData models.TinhHuyenXaXomRequest
	if err := json.NewDecoder(r.Body).Decode(&reqData); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{"message": err.Error()})
		return
	}

	if len(reqData.ID) == 0 {
		tinhS, err := DB_dsTinhHuyenXaXom.Get_Tinh()
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]interface{}{"message": err.Error()})
			return
		}
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(map[string]interface{}{"ds": tinhS, "message": "success"})
	} else if len(reqData.ID) == 2 {
		huyenS, err := DB_dsTinhHuyenXaXom.Get_Huyen(&reqData)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]interface{}{"message": err.Error()})
			return
		}
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(map[string]interface{}{"ds": huyenS, "message": "success"})
	} else if len(reqData.ID) == 4 {
		xaS, err := DB_dsTinhHuyenXaXom.Get_Xa(&reqData)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]interface{}{"message": err.Error()})
			return
		}
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(map[string]interface{}{"ds": xaS, "message": "success"})
	} else if len(reqData.ID) == 6 {
		xomS, err := DB_dsTinhHuyenXaXom.Get_Xom(&reqData)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]interface{}{"message": err.Error()})
			return
		}
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(map[string]interface{}{"ds": xomS, "message": "success"})
	} else {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{"message": "Sai ID"})
		return
	}

}
