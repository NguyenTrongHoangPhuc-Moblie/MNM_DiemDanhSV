import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, setState, useCallback } from "react";
import MenuList from "../components/MenuList";
import Logo from "../components/Logo";
import { Button, Layout, theme, message } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

function SuaKhoa() {
  const [collapsed, setCollapsed] = useState(true);
  const [TenKhoa, setTenKhoa] = useState("");
  const [SoLuongSV, setSoLuongSV] = useState("");
  const history = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { id } = useParams();
  const [values, setValues] = useState({
    MaKhoa: id,
    TenKhoa: "",
    SoLuongSV: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/layKhoa/" + id)
      .then((res) => {
        setValues({
          ...values,
          TenKhoa: res.data.TenKhoa,
          SoLuongSV: res.data.SoLuongSV,
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
      .post(`http://localhost:8000/api/suaKhoa/${id}`, data)
      .then((res) => {
        message.success("Thành công");
        history("/listKhoa");
      })
      .catch((err) => {
        alert(err);
      });
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
            <h1>Cập nhật khoa</h1>
            <form
              onSubmit={handleSubmit}
              method="POST"
              className="col-sm-4 offset-sm-4"
            >
              <div className="form-floating">
                <input
                  className="form-control"
                  type="text"
                  name="MaKhoa"
                  value={values.MaKhoa}
                ></input>
                <label for="MaKhoa">Mã khoa</label>
              </div>
              <br />
              <div className="form-floating">
                <input
                  className="form-control"
                  type="text"
                  name="TenKhoa"
                  defaultValue={values.TenKhoa}
                  id="TenKhoa"
                ></input>
                <label for="TenKhoa">Tên khoa</label>
              </div>
              <br />
              <div className="form-floating">
                <input
                  className="form-control"
                  type="number"
                  defaultValue={values.SoLuongSV}
                  name="SoLuongSV"
                ></input>
                <label for="SoLuongSV">Số lượng SV</label>
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

export default SuaKhoa;
