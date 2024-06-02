import React, { useEffect, useState } from "react";
import MenuList from "../components/MenuList";
import Logo from "../components/Logo";
import { Button, Layout, theme, Alert, message } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const { Header, Sider, Content } = Layout;

function ThemDSSV_LHP() {
  const [collapsed, setCollapsed] = useState(true);
  const [MaSV, setMaSV] = useState("");
  const [MaLop, setMaLop] = useState("");
  const [SoLanCoMat, setSoLanCoMat] = useState("");
  const [SoLanVang, setSoLanVang] = useState("");
  const history = useNavigate();
  const [SinhVien, setSinhVien] = useState([]);
  const [LopHocPhan, setLopHocPhan] = useState([]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { masv, malop } = useParams();
  const [values, setValues] = useState({
    MaSV: masv,
    MaLop: malop,
    SoLanCoMat: "",
    SoLanVang: "",
  });

  useEffect(() => {
    fetchSinhVien();
    fetchLopHocPhan();
  }, []);

  async function them() {
    const formData = new FormData();
    formData.append("MaSV", MaSV);
    formData.append("MaLop", MaLop);
    formData.append("SoLanCoMat", SoLanCoMat);
    formData.append("SoLanVang", SoLanVang);
    let result = await fetch("http://localhost:8000/api/themDSSV_LHP", {
      method: "POST",
      body: formData,
    });
    message.success("Thành công");
    history("/listDSSV_LHP");
  }

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
            <h1>Thêm sinh viên thuộc lớp học phần</h1>
            <div className="col-sm-6 offset-sm-3">
              <form>
                <select
                  class="form-select"
                  id="MaSV"
                  aria-label="Default select example"
                  //value={values.MaKhoa}
                  onChange={(e) => setMaSV(e.target.value)}
                >
                  {SinhVien.map((item) => (
                    <option
                      key={item.MaSV}
                      value={item.MaSV}
                      //selected={item.MaCM == values.MaCM ? "selected" : ""}
                    >
                      {item.HoTenSV}
                    </option>
                  ))}
                </select>
                <br />
                <select
                  class="form-select"
                  id="MaLop"
                  aria-label="Default select example"
                  //value={values.MaKhoa}
                  onChange={(e) => setMaLop(e.target.value)}
                >
                  {LopHocPhan.map((item) => (
                    <option
                      key={item.MaLop}
                      value={item.MaLop}
                      //selected={item.MaCM == values.MaCM ? "selected" : ""}
                    >
                      {item.TenLop}
                    </option>
                  ))}
                </select>
                <div className="form-floating">
                  <input
                    className="form-control"
                    type="number"
                    name="SoLanCoMat"
                    id="SoLanCoMat"
                    min={0}
                    onChange={(e) => setSoLanCoMat(e.target.value)}
                  ></input>
                  <label for="SoLanCoMat">Số lần có mặt</label>
                </div>
                <br />
                <div className="form-floating">
                  <input
                    className="form-control"
                    type="number"
                    name="SoLanVang"
                    id="SoLanVang"
                    min={0}
                    onChange={(e) => setSoLanVang(e.target.value)}
                  ></input>
                  <label for="SoLanVang">Số lần vắng</label>
                </div>
                <br />
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

export default ThemDSSV_LHP;
