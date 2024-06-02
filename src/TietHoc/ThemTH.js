import React, { useState } from "react";
import MenuList from "../components/MenuList";
import Logo from "../components/Logo";
import { Button, Layout, theme, Alert, message } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

function ThemTH() {
  const [collapsed, setCollapsed] = useState(true);
  const [TenTH, setTenTH] = useState("");
  const [GioBD, setGioBD] = useState("");
  const [GioKT, setGioKT] = useState("");
  const history = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  async function them() {
    const formData = new FormData();
    formData.append("TenTH", TenTH);
    formData.append("GioBD", GioBD);
    formData.append("GioKT", GioKT);
    let result = await fetch("http://localhost:8000/api/themTH", {
      method: "POST",
      body: formData,
    });
    message.success("Thành công");
    history("/listTH");
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
            <h1>Thêm tiết học</h1>
            <div className="col-sm-6 offset-sm-3">
              <form>
                <div className="form-floating">
                  <input
                    className="form-control"
                    type="text"
                    name="TenTH"
                    id="TenTH"
                    onChange={(e) => setTenTH(e.target.value)}
                  ></input>
                  <label for="TenTH">Tên tiết học</label>
                </div>
                <br />
                <div className="form-floating">
                  <input
                    className="form-control"
                    type="time"
                    name="GioBD"
                    id="GioBD"
                    onChange={(e) => setGioBD(e.target.value)}
                  ></input>
                  <label for="GioBD">Giờ bắt đầu</label>
                </div>
                <br />
                <div className="form-floating">
                  <input
                    className="form-control"
                    type="time"
                    name="GioKT"
                    id="GioKT"
                    onChange={(e) => setGioKT(e.target.value)}
                  ></input>
                  <label for="GioKT">Giờ kết thúc</label>
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

export default ThemTH;
