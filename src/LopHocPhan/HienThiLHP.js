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

function HienThiLopHocPhan() {
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
    let result = await fetch("http://localhost:8000/api/danhSachLHP");
    result = await result.json();
    setData(result);
    setRecords(result);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/danhSachLHP")
      .then((res) => {
        setData(res.data);
        setRecords(res.data);
        //console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  async function xoaGV(id) {
    let result = fetch("http://localhost:8000/api/xoaLHP/" + id, {
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
            <h1>Danh sách giáo viên</h1>
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
                    <Link to="/themGV">
                      <FontAwesomeIcon icon={faPlus} />
                    </Link>
                  </Button>
                </div>
              </div>
              <Table className="table table-bordered">
                <tr>
                  <td>Mã lớp</td>
                  <td>Tên lớp</td>
                  <td>Sỉ số</td>
                  <td>Giáo viên</td>
                  <td>Môn học</td>
                  <td>Phòng học</td>
                  <td>Chức năng</td>
                </tr>
                {ghiLai.map((item, i) => (
                  <tr key={i}>
                    <td>{item.MaLop}</td>
                    <td>{item.TenLop}</td>
                    <td>{item.SiSo}</td>
                    <td>{item.giao_vien.HoTenGV}</td>
                    <td>{item.mon_hoc.TenMH}</td>
                    <td>{item.phong_hoc.TenPH}</td>
                    <td>
                      <Link>
                        <span
                          onClick={() => xoaLHP(item.MaLop)}
                          className="btn btn-danger"
                        >
                          Xoá
                        </span>
                      </Link>
                      <Link to={`/suaLHP/${item.MaLop}`}>
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

export default HienThiLopHocPhan;
