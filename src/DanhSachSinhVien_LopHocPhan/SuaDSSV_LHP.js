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

function SuaDSSV_LHP() {
  const [collapsed, setCollapsed] = useState(true);
  const [data, setData] = useState([]);
  const [HoTenGV, setHoTenGV] = useState("");
  const [GioiTinh, setGioiTinh] = useState("");
  const [DiaChi, setDiaChi] = useState("");
  const [MaCM, setMaCM] = useState("");
  const [MaTD, setMaTD] = useState("");
  const [NamSinh, setNamSinh] = useState("")
  const history = useNavigate();
  const [SinhVien, setSinhVien] = useState([]);
  const [LopHocPhan, setLopHocPhan] = useState([]);
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

  const { masv, malop } = useParams();
  const [values, setValues] = useState({
    MaSV: masv,
    MaLop: malop,
  });

  const fetchSinhVien = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/danhSachSV");
      setSinhVien(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const fetchLopHocPhan = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/danhSachLHP");
      setLopHocPhan(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  useEffect(() => {
    fetchSinhVien();
    fetchLopHocPhan();
    axios
      .get("http://localhost:8000/api/layDDSV_LHP/" + masv + "/" + malop)
      .then((res) => {
        setValues({
          ...values,
          MaSV: res.data.MaSV,
          MaLop: res.data.MaLop,
          SoLanCoMat: res.data.SoLanCoMat,
          SoLanVang: res.data.SoLanVang
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
    data.MaSV = values.MaSV;
    data.MaLop = values.MaLop;
    axios
      .post(`http://localhost:8000/api/suaDSSV_LHP/${masv}/${malop}`, data)
      .then((res) => {
        message.success("Thành công");
        history("/listDSSV_LHP");
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleChange = (event) => {
    setValues({ ...values, GioiTinh: event.target.value });
  };

  const changeMaSV = (event) => {
    setValues({  ...values, MaSV: event.target.value });
  };
  const changeMaLop = (event) => {
    setValues({  ...values, MaLop: event.target.value });
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
            <h1>Cập nhật sinh viên thuộc lớp học phần</h1>
            <form onSubmit={handleSubmit} className="col-sm-4 offset-sm-4">
              {/* <input
                className="form-control"
                type="text"
                name="MaSV"
                placeholder={values.MaSV}
              ></input> */}
              <select
                class="form-select"
                id="MaSV"
                aria-label="Default select example"
                value={values.MaSV}
                onChange={changeMaSV}
              >
                {SinhVien.map((item) => (
                  <option
                    key={item.MaSV}
                    value={item.MaSV}
                    selected={item.MaSV == values.MaSV ? "selected" : ""}
                  >
                    {item.HoTenSV}
                  </option>
                ))}
              </select>
              <br/>
              <select
                class="form-select"
                id="MaLop"
                aria-label="Default select example"
                value={values.MaLop}
                onChange={changeMaLop}
              >
                {LopHocPhan.map((item) => (
                  <option
                    key={item.MaLop}
                    value={item.MaLop}
                    selected={item.MaLop == values.MaLop ? "selected" : ""}
                  >
                    {item.TenLop}
                  </option>
                ))}
              </select>
              {/* <input
                className="form-control"
                type="text"
                name="MaLop"
                placeholder={values.MaLop}
              ></input> */}
              <br />
              <div className="form-floating">
                <input
                  className="form-control"
                  type="number"
                  name="SoLanCoMat"
                  defaultValue={values.SoLanCoMat}
                  id="SoLanCoMat"
                  min={0}
                ></input>
                <label for="SoLanCoMat">Số lần có mặt</label>
              </div>
              <br />
              <div className="form-floating">
                <input
                  className="form-control"
                  type="number"
                  name="SoLanVang"
                  defaultValue={values.SoLanVang}
                  id="SoLanVang"
                  min={0}
                ></input>
                <label for="SoLanVang">Số lần vắng</label>
              </div>
              <br />
              <button className="btn btn-success">Cập nhật</button>
            </form>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default SuaDSSV_LHP;
