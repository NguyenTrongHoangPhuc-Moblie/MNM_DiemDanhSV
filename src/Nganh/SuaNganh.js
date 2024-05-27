import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, setState, useCallback } from "react";
import MenuList from "../components/MenuList";
import Logo from "../components/Logo";
import { Button, Layout, theme, message } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import useClosable from "antd/es/_util/hooks/useClosable";

const { Header, Sider, Content } = Layout;

function SuaNganh() {
  const [collapsed, setCollapsed] = useState(true);
  const [TenNganh, setTenNganh] = useState("");
  const [SoLuongSV, setSoLuongSV] = useState("");
  const history = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { id } = useParams();
  const [values, setValues] = useState({
    MaNganh: id,
    TenNganh: "",
    SoLuongSV: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/layNganh/" + id)
      .then((res) => {
        setValues({
          ...values,
          TenNganh: res.data.TenNganh,
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
      .post(`http://localhost:8000/api/capNhatNganh/${id}`, data)
      .then((res) => {
        message.success("Thành công");
        history("/listNganh");
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
            <h1>Cập nhật ngành học</h1>
            <form
              onSubmit={handleSubmit}
              method="POST"
              className="col-sm-4 offset-sm-4"
            >
              <div className="form-floating">
                <input
                  className="form-control"
                  type="text"
                  name="MaNganh"
                  value={values.MaNganh}
                ></input>
                <label for="MaNganh">Mã ngành</label>
              </div>
              <br />
              <div className="form-floating">
                <input
                  className="form-control"
                  type="text"
                  name="TenNganh"
                  defaultValue={values.TenNganh}
                  id="TenNganh"
                  //onChange={(e) => setTenNganh(e.target.value)}
                ></input>
                <label for="TenNganh">Tên ngành</label>
              </div>
              <br />
              <div className="form-floating">
                <input
                  className="form-control"
                  type="number"
                  defaultValue={values.SoLuongSV}
                  name="SoLuongSV"
                  //onChange={(e) => setSoLuongSV(e.target.name, e.target.value, true)}
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

export default SuaNganh;
