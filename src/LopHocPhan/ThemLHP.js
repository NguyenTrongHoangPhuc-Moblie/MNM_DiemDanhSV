import React, { useEffect, useState } from "react";
import MenuList from "../components/MenuList";
import Logo from "../components/Logo";
import { Button, Layout, theme, Alert, message } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

function ThemLopHocPhan() {
  const [collapsed, setCollapsed] = useState(true);
  const [TenLop, setTenLop] = useState("");
  const [SiSo, setSiSo] = useState("");
  const [MaGV, setMaGV] = useState("");
  const [MaMH, setMaMH] = useState("");
  const [MaPH, setMaPH] = useState("");
  const history = useNavigate();
  const [GiaoVien, setGiaoVien] = useState([]);
  const [MonHoc, setMonHoc] = useState([]);
  const [PhongHoc, setPhongHoc] = useState([]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    fetchGiaoVien();
    fetchMonHoc();
    fetchPhongHoc();
  }, []);

  async function them() {
    const formData = new FormData();
    formData.append("TenLop", TenLop);
    formData.append("SiSo", SiSo);
    formData.append("MaGV", MaGV);
    formData.append("MaMH", MaMH);
    formData.append("MaPH", MaPH);
    let result = await fetch("http://localhost:8000/api/themLHP", {
      method: "POST",
      body: formData,
    });
    message.success("Thành công");
    history("/listLHP");
  }

  const fetchMonHoc = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/danhSachMH");
      setMonHoc(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const fetchGiaoVien = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/danhSachGV");
      setGiaoVien(response.data);
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
            <h1>Thêm lớp học phần</h1>
            <div className="col-sm-6 offset-sm-3">
              <form>
                <div className="form-floating">
                  <input
                    className="form-control"
                    type="text"
                    name="TenLop"
                    id="TenLop"
                    onChange={(e) => setTenLop(e.target.value)}
                  ></input>
                  <label for="TenLop">Tên lớp</label>
                </div>
                <br />
                <div className="form-floating">
                  <input
                    className="form-control"
                    type="number"
                    name="SiSo"
                    id="SiSo"
                    min="0"
                    max="200"
                    onChange={(e) => setSiSo(e.target.value)}
                  ></input>
                  <label for="SiSo">Sỉ số</label>
                </div>
                <br />
                <select
                  class="form-select"
                  id="MaGV"
                  aria-label="Default select example"
                  //value={values.MaGV}
                  onChange={(e) => setMaGV(e.target.value)}
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
                  //value={values.MaGV}
                  onChange={(e) => setMaMH(e.target.value)}
                >
                  {MonHoc.map((item) => (
                    <option
                      key={item.MaMH}
                      value={item.MaMH}
                      //selected={item.MaMH == values.MaMH ? "selected" : ""}
                    >
                      {item.TenMH}
                    </option>
                  ))}
                </select>
                <br/>
                <select
                  class="form-select"
                  id="MaPH"
                  aria-label="Default select example"
                  //value={values.MaGV}
                  onChange={(e) => setMaPH(e.target.value)}
                >
                  {PhongHoc.map((item) => (
                    <option
                      key={item.MaPH}
                      value={item.MaPH}
                      //selected={item.MaPH == values.MaPH ? "selected" : ""}
                    >
                      {item.TenPH}
                    </option>
                  ))}
                </select>
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

export default ThemLopHocPhan;
