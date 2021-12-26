package DB_thongke

import (
	"github.com/bearbin/go-age"
	"log"
	"strconv"
	s "strings"
	"time"
	"viet/test/database"
	"viet/test/models"
)

func getDOB(year, month, day int) time.Time {
	dob := time.Date(year, time.Month(month), day, 0, 0, 0, 0, time.UTC)
	return dob
}

func ThongKeAll(request *models.ThongKeRequest) ([]models.KetQuaThongKeRequest, error) {
	db := database.Connect()
	defer db.Close()

	query := "SELECT * FROM nguoidan"

	var result []models.KetQuaThongKeRequest
	var temp models.KetQuaThongKeRequest

	temp.Nam = "0"
	temp.Nu = "0"
	temp.ThatHoc = "0"
	temp.TieuHoc = "0"
	temp.THCS = "0"
	temp.THPT = "0"
	temp.CoTonGiao = "0"
	temp.KhongTonGiao = "0"
	result = append(result, temp)

	var Nam = 0
	var Nu = 0
	var ThatHoc = 0
	var TieuHoc = 0
	var THCS = 0
	var THPT = 0
	var CoTonGiao = 0
	var KhongTonGiao = 0
	var Duoi18 = 0
	var Tu18Den60 = 0
	var Tren60 = 0

	rows, err := db.Query(query)
	if err != nil {
		log.Println("Error: ", err)
		return result, err
	}
	for rows.Next() {
		var nguoidan models.NguoiDan
		err = rows.Scan(
			&nguoidan.CCCD,
			&nguoidan.HoTen,
			&nguoidan.GioiTinh,
			&nguoidan.NgaySinh,
			&nguoidan.QueQuan,
			&nguoidan.DiaChiThuongTru,
			&nguoidan.DiaChiTamTru,
			&nguoidan.TonGiao,
			&nguoidan.TrinhDo,
			&nguoidan.NgheNghiep,
			&nguoidan.ID_Xom,
		)
		if err != nil {
			log.Println("ERROR: ", err)
			return result, err
		}
		if s.HasPrefix(nguoidan.ID_Xom, request.ID) {
			if nguoidan.GioiTinh == "Nam" {
				Nam++
			} else {
				Nu++
			}

			if nguoidan.TrinhDo == "Thất học" {
				ThatHoc++
			} else if nguoidan.TrinhDo == "Tiểu học" {
				TieuHoc++
			} else if nguoidan.TrinhDo == "THCS" {
				THCS++
			} else if nguoidan.TrinhDo == "THPT" {
				THPT++
			}

			if nguoidan.TonGiao == "Không" {
				KhongTonGiao++
			} else {
				CoTonGiao++
			}
			var ngaysinh []string
			ngaysinh = s.Split(nguoidan.NgaySinh, "-")
			year, _ := strconv.Atoi(ngaysinh[0])
			month, _ := strconv.Atoi(ngaysinh[1])
			day, _ := strconv.Atoi(ngaysinh[2])

			dob := age.Age(getDOB(year, month, day))
			if dob < 18 {
				Duoi18++
			} else if dob <= 60 {
				Tu18Den60++
			} else {
				Tren60++
			}
		}
	}

	result[0].Nam = strconv.Itoa(Nam)
	result[0].Nu = strconv.Itoa(Nu)
	result[0].ThatHoc = strconv.Itoa(ThatHoc)
	result[0].TieuHoc = strconv.Itoa(TieuHoc)
	result[0].THCS = strconv.Itoa(THCS)
	result[0].THPT = strconv.Itoa(THPT)
	result[0].CoTonGiao = strconv.Itoa(CoTonGiao)
	result[0].KhongTonGiao = strconv.Itoa(KhongTonGiao)
	result[0].Duoi18 = strconv.Itoa(Duoi18)
	result[0].Tu18Den60 = strconv.Itoa(Tu18Den60)
	result[0].Tren60 = strconv.Itoa(Tren60)

	return result, err
}
