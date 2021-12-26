package api_nguoidung

import (
	"encoding/json"
	"net/http"
	"time"
	"viet/test/DB_process"
	"viet/test/models"
	"viet/test/utils"
)

func Login(w http.ResponseWriter, r *http.Request) {
	var reqData models.LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&reqData); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{"message": err.Error()})
		return
	}

	if len(reqData.UserName) == 0 || len(reqData.Password) == 0 {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{"message": "tai khoan hoac mat khau khong hop le"})
		return
	}

	nguoiDung, err := DB_process.GetNguoiDungByUsernameAndPassword(&reqData)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{"message": err.Error()})
		return
	}

	token, err := utils.GenerateJwt(nguoiDung.TaiKhoan)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]interface{}{"message": err.Error()})
		return
	}
	http.SetCookie(w, &http.Cookie{
		Name:     "token",
		Value:    token,
		Expires:  time.Now().Add(time.Hour * 24),
		HttpOnly: true,
	})

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message":   "success",
		"user_name": nguoiDung.TaiKhoan,
		"hoten": nguoiDung.HoTen,
		"email": nguoiDung.Email,
		"quyen": nguoiDung.Quyen,
	})
}
