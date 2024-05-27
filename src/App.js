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
import HienThiLichHoc from "./LichHoc/HienThiLichHoc";

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
          <Route path={"/listLH"} element={<Protected Cmp={HienThiLichHoc} />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
