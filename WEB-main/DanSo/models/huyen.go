package models

type Huyen struct {
	ID_Huyen        string `json:"id_huyen"`
	ID_Tinh         string `json:"id_tinh"`
	TenHuyen        string `json:"ten_huyen"`
	TrangThai       string `json:"trang_thai"`
	ThoiDiemBatDau  string `json:"thoi_diem_bat_dau"`
	ThoiDiemKetThuc string `json:"thoi_diem_ket_thuc"`
}
