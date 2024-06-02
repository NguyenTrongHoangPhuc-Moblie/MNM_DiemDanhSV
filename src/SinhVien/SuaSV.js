import axios from "axios";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MenuList from "../components/MenuList";
import Logo from "../components/Logo";
import { Button, Layout, theme, message } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

function SuaSV() {
  const [collapsed, setCollapsed] = useState(true);
  const [data, setData] = useState([]);
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

  const {
    token: { colorBgContainer },
  } = theme.useToken();

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
  useEffect(() => {
    fetchKhoa();
    fetchNganh();
    fetchLopNienChe();
    axios
      .get("http://localhost:8000/api/laySV/" + id)
      .then((res) => {
        setValues({
          ...values,
          HoTenSV: res.data.HoTenSV,
          GioiTinh: res.data.GioiTinh,
          NgaySinh: res.data.NgaySinh,
          SoDienThoai: res.data.SoDienThoai,
          Email: res.data.Email,
          DiaChi: res.data.DiaChi,
          MaKhoa: res.data.MaKhoa,
          MaNganh: res.data.MaNganh,
          MaLNC: res.data.MaLNC,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    axios
      .post(`http://localhost:8000/api/suaSV/${id}`, data)
      .then((res) => {
        message.success("Thành công");
        history("/listSV");
      })
      .catch((err) => {
        alert(err);
      });
  };

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

  const handleChange = (event) => {
    setValues({ ...values, GioiTinh: event.target.value });
  };

  const changeMaKhoa = (event) => {
    setValues({  ...values, MaKhoa: event.target.value });
  };

  const changeMaNganh = (event) => {
    setValues({  ...values, MaNganh: event.target.value });
  };

  const changeMaLNC = (event) => {
    setValues({  ...values, MaLNC: event.target.value });
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
            <h1>Cập nhật sinh viên</h1>
            <form onSubmit={handleSubmit} className="col-sm-4 offset-sm-4">
              <input
                className="form-control"
                type="text"
                placeholder={values.MaSV}
              ></input>
              <br />
              <div className="form-floating">
                <input
                  className="form-control"
                  type="text"
                  name="HoTenSV"
                  defaultValue={values.HoTenSV}
                  id="HoTenSV"
                ></input>
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
                  onChange={handleChange}
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
                  onChange={handleChange}
                />
                <label class="form-check-label" for="GioiTinh">
                  Nữ
                </label>
              </div>
              <br/>
              <div className="form-floating">
                <input
                  type="date"
                  className="form-control"
                  name="NgaySinh"
                  onChange={handleChange}
                />
                <label for="NgaySinh">Ngày sinh</label>
              </div>
              <br />
              <div className="form-floating">
                <input
                  className="form-control"
                  type="text"
                  name="SoDienThoai"
                  defaultValue={values.SoDienThoai}
                  id="SoDienThoai"
                ></input>
                <label for="SoDienThoai">Số điện thoại</label>
              </div>
              <br />
              <div className="form-floating">
                <input
                  className="form-control"
                  type="text"
                  name="Email"
                  defaultValue={values.Email}
                  id="Email"
                ></input>
                <label for="Email">Email</label>
              </div>
              <br />
              <div className="form-floating">
                <input
                  className="form-control"
                  type="text"
                  name="DiaChi"
                  defaultValue={values.DiaChi}
                  id="DiaChi"
                ></input>
                <label for="DiaChi">Địa chỉ</label>
              </div>
              <br />
              <select
                class="form-select"
                id="MaKhoa"
                aria-label="Default select example"
                value={values.MaKhoa}
                onChange={changeMaKhoa}
              >
                {Khoa.map((item) => (
                  <option
                    key={item.MaKhoa}
                    value={item.MaKhoa}
                    selected={item.MaKhoa == values.MaKhoa ? "selected" : ""}
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
                value={values.MaNganh}
                onChange={changeMaNganh}
              >
                {Nganh.map((item) => (
                  <option
                    key={item.MaNganh}
                    value={item.MaNganh}
                    selected={item.MaNganh == values.MaNganh ? "selected" : ""}
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
                value={values.MaLNC}
                onChange={changeMaLNC}
              >
                {LopNienChe.map((item) => (
                  <option
                    key={item.MaLNC}
                    value={item.MaLNC}
                    selected={item.MaLNC == values.MaLNC ? "selected" : ""}
                  >
                    {item.TenLNC}
                  </option>
                ))}
              </select>
              <br />
              <button className="btn btn-success">
                Cập nhật
              </button>
            </form>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default SuaSV;
