package models

type Xa struct {
	ID_Xa           string `json:"id_xa"`
	ID_Huyen        string `json:"id_huyen"`
	TenXa           string `json:"ten_xa"`
	TrangThai       string `json:"trang_thai"`
	ThoiDiemBatDau  string `json:"thoi_diem_bat_dau"`
	ThoiDiemKetThuc string `json:"thoi_diem_ket_thuc"`
}
