import React, { useState } from "react";
import MenuList from "../components/MenuList";
import Logo from "../components/Logo";
import { Button, Layout, theme, Alert, message } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

function ThemNganh() {
  const [collapsed, setCollapsed] = useState(true);
  const [TenNganh, setTenNganh] = useState("");
  const [SoLuongSV, setSoLuongSV] = useState("");
  const history = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

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

export default ThemNganh;
