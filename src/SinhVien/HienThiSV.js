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

function HienThiSV() {
  const [collapsed, setCollapsed] = useState(true);
  const [data, setData] = useState([]);
  const [records, setRecords] = useState(data);
  const [trangHienTai, setTrangHienTai] = useState(1);
  const recordsMoiTrang = 10;
  const trangCuoi = trangHienTai * recordsMoiTrang;
  const trangDau = trangCuoi - recordsMoiTrang;
  const ghiLai = records.slice(trangDau, trangCuoi);
  const npage = Math.ceil(records.length / recordsMoiTrang)
  const soTrang = [...Array(npage + 1).keys()].slice(1)

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const truyXuat = async () => {
    let result = await fetch("http://localhost:8000/api/danhSachSV");
    result = await result.json();
    setData(result);
    setRecords(result);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/danhSachSV")
      .then((res) => {
        setData(res.data);
        setRecords(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  async function xoaSV(id) {
    let result = fetch("http://localhost:8000/api/xoaSV/" + id, {
      method: "DELETE",
    });
    result = (await result).json();
    truyXuat();
  }

  const Filter = (event) => {
    const inputValue = event.target.value.toLowerCase(); // Lấy giá trị của trường nhập liệu và chuyển đổi thành chữ thường
    const newData = data.filter(
      (item) =>
        item.MaSV.toLowerCase().includes(inputValue) ||
        item.HoTenSV.toLowerCase().includes(inputValue) ||
        item.Email.toLowerCase().includes(inputValue) ||
        item.SoDienThoai.toLowerCase().includes(inputValue) ||
        item.khoa.TenKhoa.toLowerCase().includes(inputValue) ||
        item.nganh.TenNganh.toLowerCase().includes(inputValue) ||
        item.lop_nien_che.TenLNC.toLowerCase().includes(inputValue)
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
            <h1>Danh sách sinh viên</h1>
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
                    <Link to="/themSV">
                      <FontAwesomeIcon icon={faPlus} />
                    </Link>
                  </Button>
                </div>
              </div>
              <Table className="table table-bordered">
                <tr>
                  <td>Mã SV</td>
                  <td>Họ Tên SV</td>
                  <td>Giới tính</td>
                  <td>Ngày sinh</td>
                  <td>Số điện thoại</td>
                  <td>Email</td>
                  <td>Địa chỉ</td>
                  <td>Tên khoa</td>
                  <td>Tên ngành</td>
                  <td>Lớp niên chế</td>
                  <td>Chức năng</td>
                </tr>
                {ghiLai.map((item, i) => (
                  <tr key={i}>
                    <td>{item.MaSV}</td>
                    <td>{item.HoTenSV}</td>
                    <td>{item.GioiTinh}</td>
                    <td>{item.NgaySinh}</td>
                    <td>{item.SoDienThoai}</td>
                    <td>{item.Email}</td>
                    <td>{item.DiaChi}</td>
                    <td>{item.khoa.TenKhoa}</td>
                    <td>{item.nganh.TenNganh}</td>
                    <td>{item.lop_nien_che.TenLNC}</td>
                    <td>
                      <Link>
                        <span
                          onClick={() => xoaSV(item.MaSV)}
                          className="btn btn-danger"
                        >
                          Xoá
                        </span>
                      </Link>
                      <Link to={`/suaSV/${item.MaSV}`}>
                        <span className="btn btn-warning">Sửa</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </Table>
              <nav style={{position: "absolute", left: "50%", transform: "translateX(-50%)"}}>
                <ul className="pagination">
                  <li className="page-item">
                    <a href="#" className="page-link" onClick={trangTruoc}>Prev</a>
                  </li>
                  {
                    soTrang.map((n, i) => (
                      <li className={`page-item ${trangHienTai === n ? 'active' : ''}`} key={i}>
                        <a href="#" className="page-link" onClick={()=>changeCPage(n)}>
                          {n}
                        </a>
                      </li>
                    ))
                  }
                  <li className="page-item">
                    <a href="#" className="page-link" onClick={trangSau}>Next</a>
                  </li>
                </ul>
              </nav>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );

  function trangSau() {
    if(trangHienTai !== trangCuoi) {
      setTrangHienTai(trangHienTai + 1)
    }
  }
  function trangTruoc() {
    if(trangHienTai !== trangDau) {
      setTrangHienTai(trangHienTai - 1)
    }
  }
  function changeCPage(id) {
    setTrangHienTai(id)
  }
}

export default HienThiSV;
