package routers

import (
	"fmt"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"log"
	"net/http"
	"viet/test/api/api_captaikhoan"
	"viet/test/api/api_khaibao"
	"viet/test/api/api_nguoidung"
	"viet/test/api/api_themxoasua_nguoidan"
)

func RunServer() {
	r := mux.NewRouter()
	routerChung := r.PathPrefix("/api").Subrouter()
	routerChung.HandleFunc("/login", api_nguoidung.Login).Methods(http.MethodPost)
	routerChung.HandleFunc("/them_dan", api_themxoasua_nguoidan.ThemNguoiDan).Methods(http.MethodPost)
	routerChung.HandleFunc("/getAllDan", api_themxoasua_nguoidan.LayDSNguoiDan).Methods(http.MethodPost)
	routerChung.HandleFunc("/ds", api_nguoidung.LayDSTinhHuyenXaXom).Methods(http.MethodPost)
	routerChung.HandleFunc("/khaibao", api_khaibao.KhaiBaoTinh).Methods(http.MethodPost)
	routerChung.HandleFunc("/captaikhoan", api_captaikhoan.CapTaiKhoan).Methods(http.MethodPost)
	routerChung.HandleFunc("/xoanguoidan", api_themxoasua_nguoidan.XoaNguoiDan).Methods(http.MethodPost)
	routerChung.HandleFunc("/suanguoidan", api_themxoasua_nguoidan.SuaNguoiDan).Methods(http.MethodPost)
	routerChung.HandleFunc("/baocaohoanthanh", api_nguoidung.BaoCaoHoanThanh).Methods(http.MethodPost)
	routerChung.HandleFunc("/capquyenkhaibao", api_nguoidung.CapQuyenKhaiBao).Methods(http.MethodPost)
	routerChung.HandleFunc("/capquyenkhaibaotk", api_khaibao.KhaiBaoNguoiDung).Methods(http.MethodPost)
	routerChung.HandleFunc("/logout", api_nguoidung.Logout).Methods(http.MethodGet)
	routerChung.HandleFunc("/thongke", api_nguoidung.ThongKe).Methods(http.MethodPost)
	routerChung.HandleFunc("/thongtinnguoidung", api_nguoidung.LayThongTinNguoiDung).Methods(http.MethodPost)
	routerChung.HandleFunc("/thongtinnguoidungcapduoi", api_nguoidung.LayThongTinNguoiDungCapDuoi).Methods(http.MethodPost)
	routerChung.HandleFunc("/thongtinallnguoidung", api_nguoidung.LayAllThongTinNguoiDung).Methods(http.MethodGet)

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{http.MethodGet, http.MethodPost, http.MethodDelete, http.MethodPut},
		AllowedHeaders:   []string{"*"},
		AllowCredentials: true,
	})

	handler := c.Handler(r)

	fmt.Println("Server start on domain: http://localhost:10000")
	log.Fatal(http.ListenAndServe(":10000", handler))
}
