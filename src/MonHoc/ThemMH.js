import React, { useState } from "react";
import MenuList from "../components/MenuList";
import Logo from "../components/Logo";
import { Button, Layout, theme, Alert, message } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

function ThemMH() {
  const [collapsed, setCollapsed] = useState(true);
  const [TenMH, setTenMH] = useState("");
  const [SoTietLyThuyet, setSoTietLyThuyet] = useState("");
  const [SoTietThucHanh, setSoTietThucHanh] = useState("");
  const [TongSoTiet, setTongSoTiet] = useState("");
  const [SoTinChi, setSoTinChi] = useState("");
  const history = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  async function them() {
    const formData = new FormData();
    formData.append("TenMH", TenMH);
    formData.append("SoTietLyThuyet", SoTietLyThuyet);
    formData.append("SoTietThucHanh", SoTietThucHanh);
    formData.append("TongSoTiet", TongSoTiet);
    formData.append("SoTinChi", SoTinChi);
    let result = await fetch("http://localhost:8000/api/themMH", {
      method: "POST",
      body: formData,
    });
    message.success("Thành công");
    history("/listMH");
  }
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
            <h1>Thêm môn học</h1>
            <div className="col-sm-6 offset-sm-3">
              <form>
                <div className="form-floating">
                  <input
                    className="form-control"
                    type="text"
                    name="tenmh"
                    id="tenmh"
                    onChange={(e) => setTenMH(e.target.value)}
                  ></input>
                  <label for="tenmh">Tên môn học</label>
                </div>

                <br />
                <div className="form-floating">
                  <input
                    className="form-control"
                    type="number"
                    name="sotietlythuyet"
                    min="0"
                    max="45"
                    onChange={(e) => setSoTietLyThuyet(e.target.value)}
                  ></input>
                  <label for="sotietlythuyet">Số tiết lý thuyết</label>
                </div>

                <br />
                <div className="form-floating">
                  <input
                    className="form-control"
                    type="number"
                    name="sotietthuchanh"
                    min="0"
                    max="30"
                    onChange={(e) => setSoTietThucHanh(e.target.value)}
                  ></input>
                  <label for="sotietthuchanh">Số tiết thực hành</label>
                </div>

                <br />
                <div className="form-floating">
                  <input
                    className="form-control"
                    type="number"
                    name="tongsotiet"
                    min="0"
                    onChange={(e) => setTongSoTiet(e.target.value)}
                  ></input>
                  <label for="tongsotiet">Tổng số tiết</label>
                </div>

                <br />
                <div className="form-floating">
                  <input
                    className="form-control"
                    type="number"
                    min="1"
                    max="3"
                    name="sotinchi"
                    onChange={(e) => setSoTinChi(e.target.value)}
                  ></input>
                  <label for="sotinchi">Số tín chỉ</label>
                </div>

                <br />
                <button onClick={them} className="btn btn-primary">
                  Thêm môn học
                </button>
              </form>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default ThemMH;
