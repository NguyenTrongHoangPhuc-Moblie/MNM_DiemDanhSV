import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import MenuList from "../components/MenuList";
import Logo from "../components/Logo";
import { Button, Layout, theme } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Calendar from "../components/Calendar";

const { Header, Sider, Content } = Layout;

function HienThiLichHoc() {
  const [collapsed, setCollapsed] = useState(true);
  const [data, setData] = useState([]);
  const [records, setRecords] = useState(data);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const truyXuat = async () => {
    let result = await fetch("http://localhost:8000/api/danhSachKhoa");
    result = await result.json();
    setData(result);
    setRecords(result);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/danhSachKhoa")
      .then((res) => {
        setData(res.data);
        setRecords(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  async function xoaKhoa(id) {
    let result = fetch("http://localhost:8000/api/xoaKhoa/" + id, {
      method: "DELETE",
    });
    result = (await result).json();
    truyXuat();
  }

  const Filter = (event) => {
    const inputValue = event.target.value.toLowerCase(); // Lấy giá trị của trường nhập liệu và chuyển đổi thành chữ thường
    //setRecords(data.filter(f => f.TenPH))
    const newData = data.filter(
      (item) =>
        item.MaPH.toLowerCase().includes(inputValue) ||
        item.TenPH.toLowerCase().includes(inputValue) ||
        item.DiaChiPH.toLowerCase().includes(inputValue)
    );
    setRecords(newData);
  };

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
            <h1>Lịch học</h1>
            <Calendar />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default HienThiLichHoc;
