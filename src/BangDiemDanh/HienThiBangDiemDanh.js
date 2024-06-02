import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import MenuList from "../components/MenuList";
import Logo from "../components/Logo";
import { Button, Layout, theme, message } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const { Header, Sider, Content } = Layout;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function HienThiBangDiemDanh() {
  // const query = useQuery();
  // const start = query.get("start");
  // const title = query.get("title");
  const [collapsed, setCollapsed] = useState(true);
  const [data, setData] = useState([]);
  const [records, setRecords] = useState(data);
  const [trangHienTai, setTrangHienTai] = useState(1);
  const [NgayHoc, setNgayHoc] = useState("");
  const recordsMoiTrang = 10;
  const trangCuoi = trangHienTai * recordsMoiTrang;
  const trangDau = trangCuoi - recordsMoiTrang;
  const ghiLai = records.slice(trangDau, trangCuoi);
  const npage = Math.ceil(records.length / recordsMoiTrang);
  const soTrang = [...Array(npage + 1).keys()].slice(1);
  const [MaSV, setMaSV] = useState("");
  const [TrangThaiDiemDanh, setMaTrangThaiDiemDanh] = useState("");
  const [GhiChu, setGhiChu] = useState("");
  const [MaLop, setMaLop] = useState("");
  const history = useNavigate();
  const [diemDanh, setDiemDanh] = useState({});

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { title, start } = useParams();
  const { masv, malop } = useParams();
  const [values, setValues] = useState({
    MaSV: masv,
    MaLop: malop,
  });

  const truyXuat = async () => {
    let result = await fetch("http://localhost:8000/api/danhSachBDD/" + title);
    result = await result.json();
    setData(result);
    setRecords(result);
  };

  useEffect(() => {
    if (start) setNgayHoc(start);
    axios
      .get("http://localhost:8000/api/danhSachBDD/" + title)
      .then((res) => {
        setData(res.data);
        setRecords(res.data);
        //console.log(data);
      })
      .catch((err) => console.log(err));
  }, [start]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    //console.log(diemDanh);
    try {
      const diemdanhData = data.map((sinhVien) => ({
        MaSV: sinhVien.MaSV,
        MaLop: sinhVien.MaLop,
        TrangThaiDiemDanh: diemDanh[sinhVien.MaSV] ? 1 : 0,
        NgayDiemDanh: NgayHoc, // Ngày hiện tại
        GhiChu: GhiChu
      }));
      console.log(diemdanhData)
      const response = await axios.post("http://localhost:8000/api/themBDD", diemdanhData);
      console.log("Response:", response.message);
      message.success("Thành công");
      history("/listLH");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // async function xoaBDD(id) {
  //   let result = fetch("http://localhost:8000/api/xoaBDD/" + id, {
  //     method: "DELETE",
  //   });
  //   result = (await result).json();
  //   truyXuat();
  // }

  const Filter = (event) => {
    const inputValue = event.target.value.toLowerCase(); // Lấy giá trị của trường nhập liệu và chuyển đổi thành chữ thường
    //setRecords(data.filter(f => f.TenPH))
    const newData = data.filter(
      (item) =>
        item.sinh_vien.HoTenSV.toLowerCase().includes(inputValue) ||
        item.lop_hoc_phan.TenLop.toLowerCase().includes(inputValue)
    );
    setRecords(newData);
  };

  const handleCheckboxChange = (event, maSV) => {
    setDiemDanh({
      ...diemDanh,
      [maSV]: event.target.checked,
    });
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
            <h1>Danh sách sinh viên điểm danh</h1>
            <div className="col-sm-10 offset-sm-1">
              <div className="">
                <div className="input-wrapper">
                  <input
                    className="form-control search"
                    type="text"
                    placeholder="Tìm kiếm..."
                    onChange={Filter}
                  />
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <Table className="table table-bordered">
                  <tr>
                    <td>Sinh viên</td>
                    <td>Lớp học phần</td>
                    <td>Ngày điểm danh</td>
                    <td>Tình trạng</td>
                    <td>Ghi chú</td>
                  </tr>
                  {ghiLai.map((item, i) => (
                    <tr key={i}>
                      <td>{item.sinh_vien.HoTenSV}</td>
                      <td>{item.lop_hoc_phan.TenLop}</td>
                      <td>{NgayHoc}</td>
                      <td>
                        <input
                          name="TrangThaiDiemDanh"
                          type="checkbox"
                          value={1}
                          onChange={(event) => handleCheckboxChange(event, item.MaSV)}
                        />
                      </td>
                      <td>
                        <input 
                          type="text"
                          name="GhiChu"
                          className="form-control"
                          onChange={(event) => setGhiChu(event.target.value)}
                        />
                      </td>
                    </tr>
                  ))}
                </Table>
                <div className="d-flex" style={{flexDirection: "row-reverse"}}>
                  <button className="btn btn-success">Lưu</button>
                  <nav
                    style={{
                      position: "absolute",
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}
                  >
                    <ul className="pagination">
                      <li className="page-item">
                        <a href="#" className="page-link" onClick={trangTruoc}>
                          Prev
                        </a>
                      </li>
                      {soTrang.map((n, i) => (
                        <li
                          className={`page-item ${
                            trangHienTai === n ? "active" : ""
                          }`}
                          key={i}
                        >
                          <a
                            href="#"
                            className="page-link"
                            onClick={() => changeCPage(n)}
                          >
                            {n}
                          </a>
                        </li>
                      ))}
                      <li className="page-item">
                        <a href="#" className="page-link" onClick={trangSau}>
                          Next
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </form>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );

  function trangSau() {
    if (trangHienTai !== trangCuoi) {
      setTrangHienTai(trangHienTai + 1);
    }
  }
  function trangTruoc() {
    if (trangHienTai !== trangDau) {
      setTrangHienTai(trangHienTai - 1);
    }
  }
  function changeCPage(id) {
    setTrangHienTai(id);
  }
}

export default HienThiBangDiemDanh;
