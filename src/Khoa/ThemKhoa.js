import React, { useState } from "react";
import MenuList from "../components/MenuList";
import Logo from "../components/Logo";
import { Button, Layout, theme, Alert, message } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

function ThemKhoa() {
  const [collapsed, setCollapsed] = useState(true);
  const [TenKhoa, setTenKhoa] = useState("");
  const [SoLuongSV, setSoLuongSV] = useState("");
  const history = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  async function them() {
    const formData = new FormData();
    formData.append("TenKhoa", TenKhoa);
    formData.append("SoLuongSV", SoLuongSV);
    let result = await fetch("http://localhost:8000/api/themKhoa", {
      method: "POST",
      body: formData,
    });
    message.success("Thành công");
    history("/listKhoa");
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
            <h1>Thêm khoa</h1>
            <div className="col-sm-6 offset-sm-3">
              <form>
                <div className="form-floating">
                  <input
                    className="form-control"
                    type="text"
                    name="TenKhoa"
                    id="tenng"
                    onChange={(e) => setTenKhoa(e.target.value)}
                  ></input>
                  <label for="TenKhoa">Tên khoa</label>
                </div>

                <br />
                <div className="form-floating">
                  <input
                    className="form-control"
                    type="number"
                    name="SoLuongSV"
                    min="0"
                    max="60"
                    onChange={(e) => setSoLuongSV(e.target.value)}
                  ></input>
                  <label for="SoLuongSV">Số lượng SV</label>
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

export default ThemKhoa;
