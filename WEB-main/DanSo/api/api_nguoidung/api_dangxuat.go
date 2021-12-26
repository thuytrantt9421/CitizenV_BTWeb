package api_nguoidung

import (
	"encoding/json"
	"net/http"
	"time"
)

func Logout(w http.ResponseWriter, r *http.Request) {
	cookie := http.Cookie{
		Name:     "token",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HttpOnly: true,
	}
	http.SetCookie(w, &cookie)

	json.NewEncoder(w).Encode(map[string]string{
		"message": "success",
	})
}
