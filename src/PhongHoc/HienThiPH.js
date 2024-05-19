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

const { Header, Sider, Content } = Layout;

function HienThiPH() {
  const [collapsed, setCollapsed] = useState(true);
  const [data, setData] = useState([]);
  const [records, setRecords] = useState(data);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const truyXuat = async () => {
    let result = await fetch("http://localhost:8000/api/danhSachPH");
    result = await result.json();
    setData(result);
    setRecords(result);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/danhSachPH")
      .then((res) => {
        setData(res.data);
        setRecords(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  async function xoaPhong(id) {
    let result = fetch("http://localhost:8000/api/xoaPH/" + id, {
      method: "DELETE",
    });
    result = (await result).json();
    truyXuat();
  }

  const Filter = (event) => {
    // const inputValue = event.target.value.toLowerCase();
    // console.log(records.filter(row => row.TenPH.toLowerCase().includes(inputValue)));
    const inputValue = event.target.value.toLowerCase(); // Lấy giá trị của trường nhập liệu và chuyển đổi thành chữ thường
    //setRecords(data.filter(f => f.TenPH))
    const newData = data.filter(
      (item) =>
        item.MaPH.toLowerCase().includes(inputValue) ||
        item.TenPH.toLowerCase().includes(inputValue) ||
        item.DiaChiPH.toLowerCase().includes(inputValue)
    );
    setRecords(newData);
    // const newData = records.filter((row) => {
    //   // Kiểm tra xem row.name có tồn tại không trước khi gọi toLowerCase()
    //   return row.name && row.name.toLowerCase().includes(inputValue);
    // });

    // setRecords(newData);
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
            <h1>Danh sách phòng học</h1>
            <div className="col-sm-10 offset-sm-1">
              <div className="">
                <div className="input-wrapper">
                  <input
                    className="form-control search"
                    type="text"
                    placeholder="Tìm kiếm..."
                    onChange={Filter}
                  />
                  <Button
                    className="btn btn-success"
                  >
                    <Link to="/add">
                      <FontAwesomeIcon icon={faPlus} />
                    </Link>
                  </Button>
                </div>
              </div>
              <Table className="table table-bordered">
                <tr>
                  <td>Mã PH</td>
                  <td>Tên PH</td>
                  <td>Địa Chỉ PH</td>
                  <td>Chức năng</td>
                </tr>
                {records.map((item, i) => (
                  <tr key={i}>
                    <td>{item.MaPH}</td>
                    <td>{item.TenPH}</td>
                    <td>{item.DiaChiPH}</td>
                    <td>
                      <Link>
                        <span
                          onClick={() => xoaPhong(item.MaPH)}
                          className="btn btn-danger"
                        >
                          Xoá
                        </span>
                      </Link>
                      <Link to={`/update/${item.MaPH}`}>
                        <span className="btn btn-warning">Sửa</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </Table>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default HienThiPH;
