import React, { useEffect, useState } from "react";
import MenuList from "../components/MenuList";
import Logo from "../components/Logo";
import { Button, Layout, theme, Alert, message } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

function ThemGiaoVien() {
  const [collapsed, setCollapsed] = useState(true);
  const [HoTenGV, setHoTenGV] = useState("");
  const [GioiTinh, setGioiTinh] = useState("");
  const [DiaChi, setDiaChi] = useState("");
  const [MaCM, setMaCM] = useState("");
  const [MaTD, setMaTD] = useState("");
  const [NamSinh, setNamSinh] = useState("")
  const history = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  

  useEffect(() => {
    let ns = new Date(NamSinh),
    month = "" + (ns.getMonth() + 1),
    day = "" + ns.getDay(),
    year = ns.getFullYear();
    if(day.length < 2) {
        day = '0' + day
    }
    if(month.length < 2) {
        month = '0' + month
    }
    setNamSinh([year, month, day].join('-'))
  }, [])

  async function them() {
    const formData = new FormData();
    formData.append("TenNganh", TenNganh);
    formData.append("SoLuongSV", SoLuongSV);
    let result = await fetch("http://localhost:8000/api/themNganh", {
      method: "POST",
      body: formData,
    });
    message.success("Thành công");
    history("/listNganh");
  }
  return (
    <div>
      <Layout>
        <Sider
          collapsed={collapsed}
          collapsible
          trigger={null}
          className="sidebar"
        >
          <Logo />
          <MenuList />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
              type="text"
              className="trigger"
              onClick={() => setCollapsed(!collapsed)}
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            ></Button>
          </Header>
          <Content>
            <h1>Thêm ngành học</h1>
            <div className="col-sm-6 offset-sm-3">
              <form>
                <div className="form-floating">
                  <input
                    className="form-control"
                    type="text"
                    name="tenng"
                    id="tenng"
                    onChange={(e) => setTenNganh(e.target.value)}
                  ></input>
                  <label for="tenng">Tên ngành</label>
                </div>

                <br />
                <div className="form-floating">
                  <input
                    className="form-control"
                    type="number"
                    name="soluongsv"
                    min="0"
                    max="60"
                    onChange={(e) => setSoLuongSV(e.target.value)}
                  ></input>
                  <label for="soluongsv">Số lượng SV</label>
                </div>
                <br />
                <button onClick={them} className="btn btn-primary">
                  Thêm
                </button>
              </form>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default ThemGiaoVien;
