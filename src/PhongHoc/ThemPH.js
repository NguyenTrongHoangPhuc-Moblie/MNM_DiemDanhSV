import React, { useState } from "react";
import MenuList from "../components/MenuList";
import Logo from "../components/Logo";
import { Button, Layout, theme, Alert, message } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

function ThemPH() {
  const [collapsed, setCollapsed] = useState(true);
  const [data, setData] = useState([]);
  const [TenPH, setTenPH] = useState("");
  const [DiaChiPH, setDiaChiPH] = useState("");
  const history = useNavigate()

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  async function them() {
    const formData = new FormData();
    formData.append("TenPH", TenPH);
    formData.append("DiaChiPH", DiaChiPH);
    let result = await fetch("http://localhost:8000/api/themPhongHoc", {
      method: "POST",
      body: formData,
    });
    message.success("Thanh cong")
    history('/listPH')
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
            <h1>AddDepartment Page</h1>
            <div className="col-sm-6 offset-sm-3">
              <input
                type="text"
                className="form-control"
                onChange={(e) => setTenPH(e.target.value)}
                placeholder="Ten phong"
              />
              <br />
              <input
                type="text"
                className="form-control"
                onChange={(e) => setDiaChiPH(e.target.value)}
                placeholder="Dia chi phong"
              />
              <br />
              <button onClick={them} className="btn btn-primary">
                Them phong hoc
              </button>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default ThemPH;
