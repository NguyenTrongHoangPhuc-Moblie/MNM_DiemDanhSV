import React, { useState, useEffect } from "react";
import MenuList from "../components/MenuList";
import Logo from "../components/Logo";
import { Button, Layout, theme, message } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const { Header, Sider, Content } = Layout;

function ThemSV() {
  const [collapsed, setCollapsed] = useState(true);
  const [HoTenSV, setHoTenSV] = useState("");
  const [GioiTinh, setGioiTinh] = useState("");
  const [NgaySinh, setNgaySinh] = useState("");
  const [SoDienThoai, setSoDienThoai] = useState("");
  const [Email, setEmail] = useState("");
  const [DiaChi, setDiaChi] = useState("");
  const [MaKhoa, setMaKhoa] = useState("");
  const [MaNganh, setMaNganh] = useState("");
  const [MaLNC, setMaLNC] = useState("");
  const history = useNavigate();
  const [Khoa, setKhoa] = useState([]);
  const [Nganh, setNganh] = useState([]);
  const [LopNienChe, setLopNienChe] = useState([]);
  const { id } = useParams();
  const [values, setValues] = useState({
    MaSV: id,
    HoTenSV: "",
    GioiTinh: "",
    NgaySinh: "",
    SoDienThoai: "",
    Email: "",
    DiaChi: "",
    MaKhoa: "",
    MaNganh: "",
    MaLNC: ""
  });

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    fetchKhoa();
    fetchNganh();
    fetchLopNienChe();
    let ns = new Date(NgaySinh),
    month = "" + (ns.getMonth() + 1),
    day = "" + ns.getDay(),
    year = ns.getFullYear();
    if(day.length < 2) {
        day = '0' + day
    }
    if(month.length < 2) {
        month = '0' + month
    }
    setNgaySinh([year, month, day].join('-'))
  }, []);

  async function them() {
    const formData = new FormData();
    formData.append("HoTenSV", HoTenSV);
    formData.append("GioiTinh", GioiTinh);
    formData.append("NgaySinh", NgaySinh);
    formData.append("SoDienThoai", SoDienThoai);
    formData.append("Email", Email);
    formData.append("DiaChi", DiaChi);
    formData.append("MaKhoa", MaKhoa);
    formData.append("MaNganh", MaNganh);
    formData.append("MaLNC", MaLNC);
    let result = await fetch("http://localhost:8000/api/themSV", {
      method: "POST",
      body: formData,
    });
    message.success("Thanh cong");
    history("/listSV");
  }

  const fetchKhoa = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/danhSachKhoa");
      setKhoa(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const fetchNganh = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/danhSachNganh");
      setNganh(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const fetchLopNienChe = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/danhSachLNC");
      setLopNienChe(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
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
            <h1>Thêm sinh viên</h1>
            <div className="col-sm-6 offset-sm-3">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  name="HoTenSV"
                  onChange={(e) => setHoTenSV(e.target.value)}
                />
                <label for="HoTenSV">Họ tên sinh viên</label>
              </div>
              <br />
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="GioiTinh"
                  id="GioiTinh"
                  value="Nam"
                  checked={values.GioiTinh === "Nam"}
                  onChange={(e) => setGioiTinh(e.target.value)}
                />
                <label class="form-check-label" for="GioiTinh">
                  Nam
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="GioiTinh"
                  id="GioiTinh"
                  value="Nữ"
                  checked={values.GioiTinh === "Nữ"}
                  onChange={(e) => setGioiTinh(e.target.value)}
                />
                <label class="form-check-label" for="GioiTinh">
                  Nữ
                </label>
              </div>
              <br />
              <div className="form-floating">
                <input
                  type="date"
                  className="form-control"
                  name="NgaySinh"
                  onChange={(e) => setNgaySinh(e.target.value)}
                />
                <label for="NgaySinh">Ngày sinh</label>
              </div>
              <br />
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  name="SoDienThoai"
                  onChange={(e) => setSoDienThoai(e.target.value)}
                />
                <label for="SoDienThoai">Số điện thoại</label>
              </div>
              <br />
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  name="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label for="Email">Email</label>
              </div>
              <br />
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  name="DiaChi"
                  onChange={(e) => setDiaChi(e.target.value)}
                />
                <label for="DiaChi">Địa chỉ</label>
              </div>
              <br />
              <select
                class="form-select"
                id="MaKhoa"
                aria-label="Default select example"
                //value={values.MaKhoa}
                onChange={(e) => setMaKhoa(e.target.value)}
              >
                {Khoa.map((item) => (
                  <option
                    key={item.MaKhoa}
                    value={item.MaKhoa}
                    //selected={item.MaCM == values.MaCM ? "selected" : ""}
                  >
                    {item.TenKhoa}
                  </option>
                ))}
              </select>
              <br />
              <select
                class="form-select"
                id="MaNganh"
                aria-label="Default select example"
                //value={values.MaNganh}
                onChange={(e) => setMaNganh(e.target.value)}
              >
                {Nganh.map((item) => (
                  <option
                    key={item.MaNganh}
                    value={item.MaNganh}
                    //selected={item.MaCM == values.MaCM ? "selected" : ""}
                  >
                    {item.TenNganh}
                  </option>
                ))}
              </select>
              <br />
              <select
                class="form-select"
                id="MaLNC"
                aria-label="Default select example"
                //value={values.MaNganh}
                onChange={(e) => setMaLNC(e.target.value)}
              >
                {LopNienChe.map((item) => (
                  <option
                    key={item.MaLNC}
                    value={item.MaLNC}
                    //selected={item.MaCM == values.MaCM ? "selected" : ""}
                  >
                    {item.TenLNC}
                  </option>
                ))}
              </select>
              <br/>
              <button onClick={them} className="btn btn-primary">
                Thêm
              </button>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default ThemSV;
