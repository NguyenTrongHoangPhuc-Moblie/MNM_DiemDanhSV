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

function SuaGiaoVien() {
  const [collapsed, setCollapsed] = useState(true);
  const [data, setData] = useState([]);
  const [TenPH, setTenPH] = useState("");
  const [DiaChiPH, setDiaChiPH] = useState("");
  const history = useNavigate();
  const [ChuyenMon, setChuyenMon] = useState([]);
  const [TrinhDo, setTrinhDo] = useState([]);
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
    MaGV: id,
    HoTenGV: "",
    NamSinh: "",
    GioiTinh: "",
    DiaChi: "",
    MaCM: "",
    MaTD: "",
  });

  const fetchChuyenMon = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/danhSachCM");
      setChuyenMon(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const fetchTrinhDo = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/danhSachTD");
      setTrinhDo(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  useEffect(() => {
    fetchChuyenMon();
    fetchTrinhDo();
    axios
      .get("http://localhost:8000/api/layGV/" + id)
      .then((res) => {
        setValues({
          ...values,
          HoTenGV: res.data.HoTenGV,
          NamSinh: res.data.NamSinh,
          GioiTinh: res.data.GioiTinh,
          DiaChi: res.data.DiaChi,
          MaCM: res.data.MaCM,
          MaTD: res.data.MaTD,
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
    data.MaCM = values.MaCM;
    data.MaTD = values.MaTD;
    axios
      .post(`http://localhost:8000/api/suaGV/${id}`, data)
      .then((res) => {
        message.success("Thành công");
        history("/listGV");
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleChange = (event) => {
    setValues({ ...values, GioiTinh: event.target.value });
  };

  const changeMaCM = (event) => {
    setValues({  ...values, MaCM: event.target.value });
  };
  const changeMaTD = (event) => {
    setValues({  ...values, MaTD: event.target.value });
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
                placeholder={values.MaGV}
              ></input>
              <br />
              <div className="form-floating">
                <input
                  className="form-control"
                  type="text"
                  name="HoTenGV"
                  defaultValue={values.HoTenGV}
                  id="HoTenGV"
                ></input>
                <label for="TenPH">Họ tên giáo viên</label>
              </div>
              <br />
              <div className="form-floating">
                <input
                  className="form-control"
                  type="date"
                  name="NamSinh"
                  defaultValue={values.NamSinh}
                  id="NamSinh"
                ></input>
                <label for="NamSinh">Năm sinh</label>
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
              <br />
              <select
                class="form-select"
                id="MaCM"
                aria-label="Default select example"
                value={values.MaCM}
                onChange={changeMaCM}
              >
                {ChuyenMon.map((item) => (
                  <option
                    key={item.MaCM}
                    value={item.MaCM}
                    //selected={item.MaCM == values.MaCM ? "selected" : ""}
                  >
                    {item.TenCM}
                  </option>
                ))}
              </select>
              <br />
              <select
                class="form-select"
                id="MaTD"
                aria-label="Default select example"
                value={values.MaTD}
                onChange={changeMaTD}
              >
                {TrinhDo.map((item) => (
                  <option
                    key={item.MaTD}
                    value={item.MaTD}
                    //selected={item.MaTD == values.MaTD ? "selected" : ""}
                  >
                    {item.TenTD}
                  </option>
                ))}
              </select>
              <br />
              <button className="btn btn-success">Trình độ</button>
            </form>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default SuaGiaoVien;
