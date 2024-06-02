import axios from "axios";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MenuList from "../components/MenuList";
import Logo from "../components/Logo";
import { Button, Layout, theme, message } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ThemChiTietNgayHoc() {
  //console.log(start);
  const query = useQuery();
  const start = query.get("start");
  const end = query.get("end");
  const [collapsed, setCollapsed] = useState(true);
  const [data, setData] = useState([]);
  const [MaNH, setMaNH] = useState("");
  const [MaTH, setMaTH] = useState("");
  const [MaLop, setMaLop] = useState("");
  const history = useNavigate();
  const [NgayHoc, setNgayHoc] = useState("");
  const [TietHoc, setTietHoc] = useState([]);
  const [LopHocPhan, setLopHocPhan] = useState([]);
  const [formCM, setFormCM] = useState({
    TenCM: "",
    MaCM: "",
  });
  const [formTD, setFormTD] = useState({
    TenTD: "",
    MaTD: "",
  });

  //const [ngayHoc, setNgayHoc] = useState('');
  const [tietBatDau, setTietBatDau] = useState('');
  const [tietKetThuc, setTietKetThuc] = useState('');
  //const [maLop, setMaLop] = useState('');

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { id } = useParams();
  const [values, setValues] = useState({
    MaNH: start,
    MaTH: "",
    MaLop: "",
  });

  const fetchNgayHoc = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/danhSachNH");
      setNgayHoc(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const fetchTietHoc = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/danhSachTH");
      setTietHoc(response.data);
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
    //fetchNgayHoc();
    fetchTietHoc();
    fetchLopHocPhan();
    if(start)
      setNgayHoc(start); 
  }, [start]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(tietBatDau)
    console.log(tietKetThuc)
    console.log(MaLop)
    console.log(NgayHoc)
    try {
      const response = await axios.post('http://localhost:8000/api/themCTNH', {
        Ngay: NgayHoc,
        TietBatDau: tietBatDau,
        TietKetThuc: tietKetThuc,
        MaLop: MaLop
      });
      console.log('Response:', response.data);
      message.success("Thành công");
      history("/listLH");
    } catch (error) {
      console.error('Error:', error);
    }
  };

  async function them() {
    try {
      const formData = new FormData();
      formData.append("MaNH", MaNH);
      formData.append("TietBatDau", tietBatDau);
      formData.append("TietKetThuc", tietKetThuc);
      formData.append("MaLop", MaLop);
      console.log(tietBatDau)
      console.log(tietKetThuc)
      let result = await fetch("http://localhost:8000/api/themCTNH", {
        method: "POST",
        body: formData,
      });
      message.success("Thành công");
      history("/listLH");
    }catch (error) {
      console.error('Error:', error);
    }
  }

  const handleChange = (event) => {
    setValues({ ...values, GioiTinh: event.target.value });
  };

  const changeMaNH = (event) => {
    setValues({ ...values, MaNH: event.target.value });
  };
  const changeMaTH = (event) => {
    setValues({ ...values, MaTH: event.target.value });
  };
  const changeMaLop = (event) => {
    setValues({ ...values, MaLop: event.target.value });
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
            <h1>Thêm buổi học vào lịch học</h1>
            {/* onSubmit={handleSubmit} */}
            <form onSubmit={handleSubmit} className="col-sm-4 offset-sm-4">
              <div className="form-floating">
                <input
                  className="form-control"
                  type="date"
                  name="Ngay"
                  id="Ngay"
                  value={NgayHoc}
                  //onChange={(e) => setTenTD(e.target.value)}
                ></input>
                <label for="Ngay">Ngày học</label>
              </div>
              <br />
              <label for="TietBatDau" className="form-label">
                Tiết bắt đầu
              </label>
              <select
                class="form-select"
                id="TietBatDau"
                name="TietBatDau"
                aria-label="Default select example"
                value={tietBatDau}
                onChange={(e) => setTietBatDau(e.target.value)}
              >
                <option value={""} disabled hidden>Chọn tiết học bắt đầu</option>
                {TietHoc.map((item) => (
                  <option
                    key={item.MaTH}
                    value={item.MaTH}
                    //selected={item.MaCM == values.MaCM ? "selected" : ""}
                  >
                    {item.TenTH}
                  </option>
                ))}
              </select>
              <br />
              <label for="TietKetThuc" className="form-label">
                Tiết kết thúc
              </label>
              <select
                class="form-select"
                id="TietKetThuc"
                name="TietKetThuc"
                aria-label="Default select example"
                value={tietKetThuc}
                onChange={(e) => setTietKetThuc(e.target.value)}
              >
                <option value={""} disabled hidden>Chọn tiết học kết thúc</option>
                {TietHoc.map((item) => (
                  <option
                    key={item.MaTH}
                    value={item.MaTH}
                    //selected={item.MaCM == values.MaCM ? "selected" : ""}
                  >
                    {item.TenTH}
                  </option>
                ))}
              </select>
              <br />
              <label for="MaLop" className="form-label">
                Lớp học phần
              </label>
              <select
                class="form-select"
                id="MaLop"
                name="MaLop"
                aria-label="Default select example"
                value={MaLop}
                onChange={(e) => setMaLop(e.target.value)}
              >
                <option value={""} disabled hidden>Chọn lớp học phần</option>
                {LopHocPhan.map((item) => (
                  <option
                    key={item.MaLop}
                    value={item.MaLop}
                    //selected={item.MaTD == values.MaTD ? "selected" : ""}
                  >
                    {item.TenLop}
                  </option>
                ))}
              </select>
              <br />
              <button className="btn btn-success">
                Thêm
              </button>
            </form>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default ThemChiTietNgayHoc;
