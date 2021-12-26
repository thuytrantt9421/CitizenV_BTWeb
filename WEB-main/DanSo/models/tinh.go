package models

type Tinh struct {
	ID_Tinh         string `json:"id_tinh"`
	TenTinh         string `json:"ten_tinh"`
	TrangThai       string `json:"trang_thai"`
	ThoiDiemBatDau  string `json:"thoi_diem_bat_dau"`
	ThoiDiemKetThuc string `json:"thoi_diem_ket_thuc"`
}

type TinhHuyenXaXomRequest struct {
	ID string `json:"id"`
}

type ThemTinhHuyenXaXomRequest struct {
	ID  string `json:"id"`
	Ten string `json:"ten"`
}

type BaoCaoHoanThanhRequest struct {
	ID string `json:"id"`
}

type CapQuyenKhaiBaoRequest struct {
	ID              string `json:"id"`
	ThoiDiemBatDau  string `json:"thoi_diem_bat_dau"`
	ThoiDiemKetThuc string `json:"thoi_diem_ket_thuc"`
}

type CapQuyenKhaiBaoTKRequest struct {
	ID    string `json:"id"`
	Quyen string `json:"quyen"`
}

type ThongKeRequest struct {
	ID string `json:"id"`
}

type KetQuaThongKeRequest struct {
	Nam          string `json:"nam"`
	Nu           string `json:"nu"`
	ThatHoc      string `json:"thathoc"`
	TieuHoc      string `json:"tieuhoc"`
	THCS         string `json:"thcs"`
	THPT         string `json:"thpt"`
	CoTonGiao    string `json:"cotongiao"`
	KhongTonGiao string `json:"khongtongiao"`
	Duoi18       string `json:"duoi18"`
	Tu18Den60    string `json:"tu18den60"`
	Tren60       string `json:"tren60"`
}
