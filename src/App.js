import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import ThemPH from "./PhongHoc/ThemPH";
import SuaPH from "./PhongHoc/SuaPH";
import Protected from "./Protected";
import HienThiPH from "./PhongHoc/HienThiPH";
import { Button, Layout, theme } from "antd";
import { useState } from "react";
import Index from "./TrangChu/Index";
import HienThiMH from "./MonHoc/HienThiMH";
import ThemMH from "./MonHoc/ThemMH";
import SuaMH from "./MonHoc/SuaMH";
import HienThiNganh from "./Nganh/HienThiNganh";
import ThemNganh from "./Nganh/ThemNganh";
import SuaNganh from "./Nganh/SuaNganh";
import HienThiKhoa from "./Khoa/HienThiKhoa";
import ThemKhoa from "./Khoa/ThemKhoa";
import SuaKhoa from "./Khoa/SuaKhoa";
import HienThiCM from "./ChuyenMon/HienThiCM";
import ThemCM from "./ChuyenMon/ThemCM";
import SuaCM from "./ChuyenMon/SuaCM";
import HienThiTD from "./TrinhDo/HienThiTD";
import ThemTD from "./TrinhDo/ThemTD";
import SuaTD from "./TrinhDo/SuaTD";
import HienThiGiaoVien from "./GiaoVien/HienThiGiaoVien";
import SuaGiaoVien from "./GiaoVien/SuaGiaoVien";
import ThemGiaoVien from "./GiaoVien/ThemGiaoVien";
import HienThiLichHoc from "./LichHoc/HienThiLichHoc";
import HienThiSV from "./SinhVien/HienThiSV";
import SuaSV from "./SinhVien/SuaSV";
import ThemSV from "./SinhVien/ThemSV";
import HienThiTH from "./TietHoc/HienThiTH";
import ThemTH from "./TietHoc/ThemTH";
import SuaTH from "./TietHoc/SuaTH";
import ThemChiTietNgayHoc from "./ChiTietNgayHoc/ThemChiTietNgayHoc";
import SuaChiTietNgayHoc from "./ChiTietNgayHoc/SuaChiTietNgayHoc";
import HienThiDSSV_LHP from "./DanhSachSinhVien_LopHocPhan/HienThiDSSV_LHP";
import ThemDSSV_LHP from "./DanhSachSinhVien_LopHocPhan/ThemDSSV_LHP";
import SuaDSSV_LHP from "./DanhSachSinhVien_LopHocPhan/SuaDSSV_LHP";
import HienThiBangDiemDanh from "./BangDiemDanh/HienThiBangDiemDanh";


const { Header, Sider } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(true);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <div className="App">
      <BrowserRouter>
        {/* <header className="App-header">
        </header> */}
        <Routes>
          <Route path="/login" element={<Login></Login>}>
          </Route>
          {/* <Route path="/register" element={<Register></Register>}>
          </Route> */}
          <Route path={"/"} element={<Protected Cmp={Index} />}>
          </Route>
          <Route path={"/listPH"} element={<Protected Cmp={HienThiPH} />}>
          </Route>
          <Route path="/suaPH/:id" element={<Protected Cmp={SuaPH} />}>
          </Route>
          <Route path="/themPH" element={<Protected Cmp={ThemPH} />}>
          </Route>
          <Route path={"/listMH"} element={<Protected Cmp={HienThiMH} />}>
          </Route>
          <Route path="/suaMH/:id" element={<Protected Cmp={SuaMH} />}>
          </Route>
          <Route path="/themMH" element={<Protected Cmp={ThemMH} />}>
          </Route>
          <Route path={"/listNganh"} element={<Protected Cmp={HienThiNganh} />}>
          </Route>
          <Route path="/suaNganh/:id" element={<Protected Cmp={SuaNganh} />}>
          </Route>
          <Route path="/themNganh" element={<Protected Cmp={ThemNganh} />}>
          </Route>
          <Route path={"/listKhoa"} element={<Protected Cmp={HienThiKhoa} />}>
          </Route>
          <Route path="/suaKhoa/:id" element={<Protected Cmp={SuaKhoa} />}>
          </Route>
          <Route path="/themKhoa" element={<Protected Cmp={ThemKhoa} />}>
          </Route>
          <Route path={"/listCM"} element={<Protected Cmp={HienThiCM} />}>
          </Route>
          <Route path="/suaCM/:id" element={<Protected Cmp={SuaCM} />}>
          </Route>
          <Route path="/themCM" element={<Protected Cmp={ThemCM} />}>
          </Route>
          <Route path={"/listTD"} element={<Protected Cmp={HienThiTD} />}>
          </Route>
          <Route path="/suaTD/:id" element={<Protected Cmp={SuaTD} />}>
          </Route>
          <Route path="/themTD" element={<Protected Cmp={ThemTD} />}>
          </Route>
          <Route path={"/listGV"} element={<Protected Cmp={HienThiGiaoVien} />}>
          </Route>
          <Route path={"/suaGV/:id"} element={<Protected Cmp={SuaGiaoVien} />}>
          </Route>
          <Route path={"/themGV"} element={<Protected Cmp={ThemGiaoVien} />}>
          </Route>
          <Route path={"/listTH"} element={<Protected Cmp={HienThiTH} />}>
          </Route>
          <Route path={"/suaTH/:id"} element={<Protected Cmp={SuaTH} />}>
          </Route>
          <Route path={"/themTH"} element={<Protected Cmp={ThemTH} />}>
          </Route>
          <Route path={"/listSV"} element={<Protected Cmp={HienThiSV} />}>
          </Route>
          <Route path={"/suaSV/:id"} element={<Protected Cmp={SuaSV} />}>
          </Route>
          <Route path={"/themSV"} element={<Protected Cmp={ThemSV} />}>
          </Route>
          <Route path={"/listLH"} element={<Protected Cmp={HienThiLichHoc} />}>
          </Route>
          <Route path={"/themCTNH"} element={<Protected Cmp={ThemChiTietNgayHoc} />}>
          </Route>
          <Route path={"/suaCTNH/:id"} element={<Protected Cmp={SuaChiTietNgayHoc} />}>
          </Route>
          <Route path={"/listDSSV_LHP"} element={<Protected Cmp={HienThiDSSV_LHP} />}>
          </Route>
          <Route path={"/themDSSV_LHP"} element={<Protected Cmp={ThemDSSV_LHP} />}>
          </Route>
          <Route path={"/suaDSSV_LHP/:masv/:malop"} element={<Protected Cmp={SuaDSSV_LHP} />}>
          </Route>
          <Route path={"/listBDD/:title/:start"} element={<Protected Cmp={HienThiBangDiemDanh} />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
