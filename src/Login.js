import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import MenuList from "./components/MenuList";
import Logo from "./components/Logo";
import { Button, Layout, theme } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const { Header, Sider, Content } = Layout;

function Login() {
  const [collapsed, setCollapsed] = useState(true);
  const [Email, setEmail] = useState("");
  const [MatKhau, setMatKhau] = useState("");
  const history = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      history("/");
    }
  }, []);
  async function login() {
    console.warn(Email, MatKhau);
    let item = { Email, MatKhau };
    let result = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(item),
    });
    result = await result.json();
    localStorage.setItem("user-info", JSON.stringify(result));
    history("/");
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
            <h1>Đăng nhập tài khoản</h1>
            <div className="col-sm-6 offset-sm-3">
              <input
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
              />
              <br />
              <input
                type="password"
                placeholder="Mật khẩu"
                onChange={(e) => setMatKhau(e.target.value)}
                className="form-control"
              />
              <br />
              <button onClick={login} className="btn btn-primary">
                Đăng nhập
              </button>
            </div>
          </Content>
        </Layout>
      </Layout>
      <Header></Header>
    </div>
  );
}

export default Login;
