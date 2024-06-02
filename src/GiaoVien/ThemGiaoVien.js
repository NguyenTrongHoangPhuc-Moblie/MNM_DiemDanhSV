import React, { useEffect, useState } from "react";
import MenuList from "../components/MenuList";
import Logo from "../components/Logo";
import { Button, Layout, theme, Alert, message } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const { Header, Sider, Content } = Layout;

function ThemGiaoVien() {
  const [collapsed, setCollapsed] = useState(true);
  const [HoTenGV, setHoTenGV] = useState("");
  const [GioiTinh, setGioiTinh] = useState("");
  const [DiaChi, setDiaChi] = useState("");
  const [MaCM, setMaCM] = useState("");
  const [MaTD, setMaTD] = useState("");
  const [NamSinh, setNamSinh] = useState("");
  const history = useNavigate();
  const [ChuyenMon, setChuyenMon] = useState([]);
  const [TrinhDo, setTrinhDo] = useState([]);

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

  useEffect(() => {
    fetchChuyenMon();
    fetchTrinhDo();
    let ns = new Date(NamSinh),
      month = "" + (ns.getMonth() + 1),
      day = "" + ns.getDay(),
      year = ns.getFullYear();
    if (day.length < 2) {
      day = "0" + day;
    }
    if (month.length < 2) {
      month = "0" + month;
    }
    setNamSinh([year, month, day].join("-"));
  }, []);

  async function them() {
    const formData = new FormData();
    formData.append("HoTenGV", HoTenGV);
    formData.append("NamSinh", NamSinh);
    formData.append("GioiTinh", GioiTinh);
    formData.append("DiaChi", DiaChi);
    formData.append("MaCM", MaCM);
    formData.append("MaTD", MaTD);
    let result = await fetch("http://localhost:8000/api/themGV", {
      method: "POST",
      body: formData,
    });
    message.success("Thành công");
    history("/listGV");
  }

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
            <h1>Thêm giáo viên</h1>
            <div className="col-sm-6 offset-sm-3">
              <form>
                <div className="form-floating">
                  <input
                    className="form-control"
                    type="text"
                    name="HoTenGV"
                    id="HoTenGV"
                    onChange={(e) => setHoTenGV(e.target.value)}
                  ></input>
                  <label for="HoTenGV">Họ tên giáo viên</label>
                </div>
                <br />
                <div className="form-floating">
                  <input
                    className="form-control"
                    type="date"
                    name="NamSinh"
                    id="NamSinh"
                    onChange={(e) => setNamSinh(e.target.value)}
                  ></input>
                  <label for="NamSinh">Năm sinh</label>
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
                    className="form-control"
                    type="text"
                    name="DiaChi"
                    id="DiaChi"
                    onChange={(e) => setDiaChi(e.target.value)}
                  ></input>
                  <label for="DiaChi">Địa chỉ</label>
                </div>
                <br />
                <select
                  class="form-select"
                  id="MaCM"
                  aria-label="Default select example"
                  //value={values.MaKhoa}
                  onChange={(e) => setMaCM(e.target.value)}
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
                  //value={values.MaKhoa}
                  onChange={(e) => setMaTD(e.target.value)}
                >
                  {TrinhDo.map((item) => (
                    <option
                      key={item.MaTD}
                      value={item.MaTD}
                      //selected={item.MaCM == values.MaCM ? "selected" : ""}
                    >
                      {item.TenTD}
                    </option>
                  ))}
                </select>
                <br/>
                <button onClick={them} className="btn btn-primary">
                  Thêm
                </button>
              </form>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default ThemGiaoVien;
