package models

type NguoiDung struct {
	TaiKhoan string `json:"tai_khoan"`
	MatKhau  string `json:"mat_khau"`
	HoTen    string `json:"ho_ten"`
	SDT      string `json:"sdt"`
	Email    string `json:"email"`
	DiaChi   string `json:"dia_chi"`
	Quyen    string `json:"quyen"`
}

type LoginRequest struct {
	UserName string `json:"user_name"`
	Password string `json:"password"`
}

type ThemNguoiDungRequest struct {
	TaiKhoan string `json:"tai_khoan"`
	MatKhau  string `json:"mat_khau"`
	HoTen    string `json:"ho_ten"`
	SDT      string `json:"sdt"`
	Email    string `json:"email"`
	DiaChi   string `json:"dia_chi"`
}

type LayThongTinNguoiDungRequest struct {
	TaiKhoan string `json:"tai_khoan"`
}
