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

function SuaLopHocPhan() {
  const [collapsed, setCollapsed] = useState(true);
  const [data, setData] = useState([]);
  const [TenLop, setTenLop] = useState("");
  const [SiSo, setSiSo] = useState("");
  const [MaGV, setMaGV] = useState("");
  const [MaMH, setMaMH] = useState("");
  const [MaPH, setMaPH] = useState("");
  const history = useNavigate();
  const [GiaoVien, setGiaoVien] = useState([]);
  const [MonHoc, setMonHoc] = useState([]);
  const [PhongHoc, setPhongHoc] = useState([]);
  const [formCM, setFormCM] = useState({
    TenCM: "",
    MaCM: "",
  });
  const [formTD, setFormTD] = useState({
    TenTD: "",
    MaTD: "",
  });

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { id } = useParams();
  const [values, setValues] = useState({
    MaLHP: id,
    TenLop: "",
    SiSo: "",
    MaGV: "",
    MaMH: "",
    MaPH: "",
  });

  const fetchGiaoVien = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/danhSachGV");
      setGiaoVien(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const fetchMonHoc = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/danhSachMH");
      setMonHoc(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const fetchPhongHoc = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/danhSachPH");
      setPhongHoc(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  useEffect(() => {
    fetchGiaoVien();
    fetchMonHoc();
    fetchPhongHoc();
    axios
      .get("http://localhost:8000/api/layLHP/" + id)
      .then((res) => {
        setValues({
          ...values,
          TenLop: res.data.TenLop,
          SiSo: res.data.SiSo,
          MaGV: res.data.MaGV,
          MaMH: res.data.MaMH,
          MaPH: res.data.MaPH,
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
    data.MaGV = values.MaGV;
    data.MaMH = values.MaMH;
    data.MaPH = values.MaPH;
    axios
      .post(`http://localhost:8000/api/suaLHP/${id}`, data)
      .then((res) => {
        message.success("Thành công");
        history("/listLHP");
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleChange = (event) => {
    setValues({ ...values, GioiTinh: event.target.value });
  };

  const changeMaGV = (event) => {
    setValues({  ...values, MaGV: event.target.value });
  };
  const changeMaMH = (event) => {
    setValues({  ...values, MaMH: event.target.value });
  };
  const changeMaPH = (event) => {
    setValues({  ...values, MaPH: event.target.value });
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
            <h1>Cap nhat phong hoc</h1>
            <form onSubmit={handleSubmit} className="col-sm-4 offset-sm-4">
              <input
                className="form-control"
                type="text"
                placeholder={values.MaLHP}
              ></input>
              <br />
              <div className="form-floating">
                <input
                  className="form-control"
                  type="text"
                  name="TenLop"
                  defaultValue={values.TenLop}
                  id="TenLop"
                ></input>
                <label for="TenLop">Tên lớp</label>
              </div>
              <br />
              <div className="form-floating">
                <input
                  className="form-control"
                  type="date"
                  name="SiSo"
                  defaultValue={values.SiSo}
                  id="SiSo"
                ></input>
                <label for="SiSo">Sỉ số</label>
              </div>
              <br />
              <select
                class="form-select"
                id="MaGV"
                aria-label="Default select example"
                value={values.MaGV}
                onChange={changeMaGV}
              >
                {GiaoVien.map((item) => (
                  <option
                    key={item.MaGV}
                    value={item.MaGV}
                    selected={item.MaGV == values.MaGV ? "selected" : ""}
                  >
                    {item.HoTenGV}
                  </option>
                ))}
              </select>
              <br />
              <select
                class="form-select"
                id="MaMH"
                aria-label="Default select example"
                value={values.MaMH}
                onChange={changeMaMH}
              >
                {MonHoc.map((item) => (
                  <option
                    key={item.MaMH}
                    value={item.MaMH}
                    selected={item.MaMH == values.MaMH ? "selected" : ""}
                  >
                    {item.TenMH}
                  </option>
                ))}
              </select>
              <br />
              <select
                class="form-select"
                id="MaPH"
                aria-label="Default select example"
                value={values.MaPH}
                onChange={changeMaPH}
              >
                {PhongHoc.map((item) => (
                  <option
                    key={item.MaPH}
                    value={item.MaPH}
                    selected={item.MaPH == values.MaPH ? "selected" : ""}
                  >
                    {item.TenPH}
                  </option>
                ))}
              </select>
              <br />
              <button className="btn btn-success">Sửa</button>
            </form>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default SuaLopHocPhan;
