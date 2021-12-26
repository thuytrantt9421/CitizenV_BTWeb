-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th12 26, 2021 lúc 11:12 AM
-- Phiên bản máy phục vụ: 10.4.21-MariaDB
-- Phiên bản PHP: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `web`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `huyen`
--

CREATE TABLE `huyen` (
  `ID_HUYEN` varchar(4) NOT NULL,
  `ID_TINH` varchar(2) NOT NULL,
  `TEN_HUYEN` varchar(255) NOT NULL,
  `TRANG_THAI` varchar(20) NOT NULL,
  `THOI_DIEM_BAT_DAU` date NOT NULL,
  `THOI_DIEM_KET_THUC` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `huyen`
--

INSERT INTO `huyen` (`ID_HUYEN`, `ID_TINH`, `TEN_HUYEN`, `TRANG_THAI`, `THOI_DIEM_BAT_DAU`, `THOI_DIEM_KET_THUC`) VALUES
('0101', '01', 'Giao Thủy', 'CHUAHOANTHANH', '2021-11-01', '2022-02-01'),
('0102', '01', 'Gia Lâm', 'CHUAHOANTHANH', '2021-11-01', '2022-02-01');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nguoidan`
--

CREATE TABLE `nguoidan` (
  `CCCD` varchar(12) NOT NULL,
  `HOTEN` varchar(255) NOT NULL,
  `GIOITINH` varchar(20) NOT NULL,
  `NGAYSINH` date NOT NULL,
  `QUEQUAN` varchar(255) NOT NULL,
  `DIACHI_THUONGTRU` varchar(255) NOT NULL,
  `DIACHI_TAMTRU` varchar(255) NOT NULL,
  `TONGIAO` varchar(50) NOT NULL,
  `TRINHDO` varchar(50) NOT NULL,
  `NGHENGHIEP` varchar(50) NOT NULL,
  `ID_XOM` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `nguoidan`
--

INSERT INTO `nguoidan` (`CCCD`, `HOTEN`, `GIOITINH`, `NGAYSINH`, `QUEQUAN`, `DIACHI_THUONGTRU`, `DIACHI_TAMTRU`, `TONGIAO`, `TRINHDO`, `NGHENGHIEP`, `ID_XOM`) VALUES
('026301002798', 'Trần Thị Thu Thủy', 'Nữ', '2001-04-09', 'Vĩnh Phúc', 'Tam Dương, Vĩnh Phúc', 'KTX Mỹ Đình', 'Không', 'Đại học', 'Sinh viên', '01010101'),
('036200001112', 'Lã Khánh Linh', 'Nữ', '1111-11-11', 'Ý Yên', 'Hai Bà Trưng, Hà Nội', 'Hai Bà Trưng, Hà Nội', 'Không', 'Thất học', 'Thất nghiệp', '01010101'),
('036200002020', 'Lã Khánh Linh', 'Nữ', '1111-11-11', 'Ý Yên', 'Hai Bà Trưng, Hà Nội', 'Hai Bà Trưng, Hà Nội', 'Không', 'Thất học', 'Thất nghiệp', '01010101'),
('036200002233', 'Lã Khánh Linh', 'Nữ', '1111-11-11', 'Ý Yên', 'Hai Bà Trưng, Hà Nội', 'Hai Bà Trưng, Hà Nội', 'Không', 'Thất học', 'Thất nghiệp', '01010101'),
('036200009999', 'Hoàng Quốc Việt', 'Nam', '1111-11-11', 'Ý Yên', 'Hai Bà Trưng, Hà Nội', 'Hai Bà Trưng, Hà Nội', 'Không', 'Thất học', 'Thất nghiệp', '01020101');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nguoidung`
--

CREATE TABLE `nguoidung` (
  `TAI_KHOAN` varchar(20) NOT NULL,
  `MAT_KHAU` varchar(255) NOT NULL,
  `HO_TEN` varchar(255) NOT NULL,
  `SDT` varchar(20) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `DIA_CHI` varchar(255) NOT NULL,
  `quyen` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `nguoidung`
--

INSERT INTO `nguoidung` (`TAI_KHOAN`, `MAT_KHAU`, `HO_TEN`, `SDT`, `Email`, `DIA_CHI`, `quyen`) VALUES
('01', 'password', 'Hoàng Quốc Việt', '0914347324', 'hoangviet000114@gmail.com', 'Hà Nội', 'NO'),
('0101', 'password', 'Nguyễn Văn A', '0914347000', 'hongduyenphan99@gmail.com', 'Hà Nam', 'NO'),
('010101', 'password', 'Nguyễn Văn B', '0914347111', '1987TienVanDat@gmail.com', 'Ninh Bình', 'NO'),
('01010101', 'password', 'Chu Sắc Chú', '9876543210', 'hihihi@gmail.com', 'Xuân Hòa', 'NO'),
('03', 'password', 'Trần Thị Thu Thủy', '0364557521', 'thuy09042001@gmail.com', 'Tam Dương, Vĩnh Phúc', 'NO'),
('admin', 'password', 'Chu Nguyên Chương', '0123456789', 'hahahahaha@gmail.com', 'Hà Nội', 'YES');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tinh`
--

CREATE TABLE `tinh` (
  `ID_TINH` varchar(2) NOT NULL,
  `TEN_TINH` varchar(255) NOT NULL,
  `TRANG_THAI` varchar(20) NOT NULL,
  `THOI_DIEM_BAT_DAU` date NOT NULL,
  `THOI_DIEM_KET_THUC` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `tinh`
--

INSERT INTO `tinh` (`ID_TINH`, `TEN_TINH`, `TRANG_THAI`, `THOI_DIEM_BAT_DAU`, `THOI_DIEM_KET_THUC`) VALUES
('01', 'Hà Nội', 'CHUAHOANTHANH', '2021-11-01', '2022-02-01'),
('03', 'Vĩnh Phúc', 'CHUAHOANTHANH', '0000-00-00', '0000-00-00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `xa`
--

CREATE TABLE `xa` (
  `ID_XA` varchar(6) NOT NULL,
  `ID_HUYEN` varchar(4) NOT NULL,
  `TEN_XA` varchar(255) NOT NULL,
  `TRANG_THAI` varchar(20) NOT NULL,
  `THOI_DIEM_BAT_DAU` date NOT NULL,
  `THOI_DIEM_KET_THUC` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `xa`
--

INSERT INTO `xa` (`ID_XA`, `ID_HUYEN`, `TEN_XA`, `TRANG_THAI`, `THOI_DIEM_BAT_DAU`, `THOI_DIEM_KET_THUC`) VALUES
('010101', '0101', 'Giao Tiến', 'HOANTHANH', '2021-11-01', '2022-02-01'),
('010102', '0101', 'Hoành Sơn', 'CHUAHOANTHANH', '2021-11-01', '2022-02-01'),
('010201', '0102', 'Hùng Cường', 'CHUAHOANTHANH', '2021-11-01', '2022-02-01'),
('010202', '0102', 'Quyết Thắng', 'CHUAHOANTHANH', '2021-11-01', '2022-02-01');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `xom`
--

CREATE TABLE `xom` (
  `ID_XOM` varchar(8) NOT NULL,
  `ID_XA` varchar(6) NOT NULL,
  `TEN_XOM` varchar(255) NOT NULL,
  `TRANG_THAI` varchar(20) NOT NULL,
  `THOI_DIEM_BAT_DAU` date NOT NULL,
  `THOI_DIEM_KET_THUC` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `xom`
--

INSERT INTO `xom` (`ID_XOM`, `ID_XA`, `TEN_XOM`, `TRANG_THAI`, `THOI_DIEM_BAT_DAU`, `THOI_DIEM_KET_THUC`) VALUES
('01010101', '010101', 'Xóm 1', 'HOANTHANH', '2021-11-01', '2022-02-01'),
('01010201', '010102', 'Xóm 2', 'CHUAHOANTHANH', '2021-11-01', '2022-02-01'),
('01020101', '010201', 'Xóm 3', 'CHUAHOANTHANH', '2021-11-01', '2022-02-01'),
('01020201', '010202', 'Xóm 4', 'CHUAHOANTHANH', '2021-11-01', '2022-02-01');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `huyen`
--
ALTER TABLE `huyen`
  ADD PRIMARY KEY (`ID_HUYEN`),
  ADD KEY `ID_TINH` (`ID_TINH`);

--
-- Chỉ mục cho bảng `nguoidan`
--
ALTER TABLE `nguoidan`
  ADD PRIMARY KEY (`CCCD`),
  ADD KEY `ID_XOM` (`ID_XOM`);

--
-- Chỉ mục cho bảng `nguoidung`
--
ALTER TABLE `nguoidung`
  ADD PRIMARY KEY (`TAI_KHOAN`);

--
-- Chỉ mục cho bảng `tinh`
--
ALTER TABLE `tinh`
  ADD PRIMARY KEY (`ID_TINH`);

--
-- Chỉ mục cho bảng `xa`
--
ALTER TABLE `xa`
  ADD PRIMARY KEY (`ID_XA`),
  ADD KEY `ID_HUYEN` (`ID_HUYEN`);

--
-- Chỉ mục cho bảng `xom`
--
ALTER TABLE `xom`
  ADD PRIMARY KEY (`ID_XOM`),
  ADD KEY `ID_XA` (`ID_XA`);

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `huyen`
--
ALTER TABLE `huyen`
  ADD CONSTRAINT `huyen_ibfk_1` FOREIGN KEY (`ID_TINH`) REFERENCES `tinh` (`ID_TINH`);

--
-- Các ràng buộc cho bảng `nguoidan`
--
ALTER TABLE `nguoidan`
  ADD CONSTRAINT `nguoidan_ibfk_1` FOREIGN KEY (`ID_XOM`) REFERENCES `xom` (`ID_XOM`);

--
-- Các ràng buộc cho bảng `xa`
--
ALTER TABLE `xa`
  ADD CONSTRAINT `xa_ibfk_1` FOREIGN KEY (`ID_HUYEN`) REFERENCES `huyen` (`ID_HUYEN`);

--
-- Các ràng buộc cho bảng `xom`
--
ALTER TABLE `xom`
  ADD CONSTRAINT `xom_ibfk_1` FOREIGN KEY (`ID_XA`) REFERENCES `xa` (`ID_XA`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
