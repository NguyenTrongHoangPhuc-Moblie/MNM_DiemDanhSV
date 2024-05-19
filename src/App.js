import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ThemPH from "./PhongHoc/ThemPH";
import SuaPH from "./PhongHoc/SuaPH";
import Protected from "./Protected";
import HienThiPH from "./PhongHoc/HienThiPH";
import SearchPH from "./SearchPH";
import { Button, Layout, theme } from "antd";
import { useState } from "react";
import Index from "./TrangChu/Index";
import HienThiMH from "./MonHoc/HienThiMH";
import ThemMH from "./MonHoc/ThemMH";
import SuaMH from "./MonHoc/SuaMH";

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
          <Route path="/update/:id" element={<Protected Cmp={SuaPH} />}>
          </Route>
          <Route path="/add" element={<Protected Cmp={ThemPH} />}>
          </Route>
          <Route path={"/listMH"} element={<Protected Cmp={HienThiMH} />}>
          </Route>
          <Route path="/capNhatMH/:id" element={<Protected Cmp={SuaMH} />}>
          </Route>
          <Route path="/themMH" element={<Protected Cmp={ThemMH} />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
