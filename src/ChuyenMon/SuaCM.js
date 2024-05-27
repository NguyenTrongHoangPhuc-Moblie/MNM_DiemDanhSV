import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import MenuList from "../components/MenuList";
import Logo from "../components/Logo";
import { Button, Layout, theme, message } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

function SuaCM() {
  const [collapsed, setCollapsed] = useState(true);
  const history = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { id } = useParams();
  const [values, setValues] = useState({
    MaCM: id,
    TenCM: "",
  });
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/layCM/" + id)
      .then((res) => {
        setValues({
          ...values,
          TenCM: res.data.TenCM,
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
      .post(`http://localhost:8000/api/suaCM/${id}`, data)
      .then((res) => {
        message.success("Thành công");
        history("/listCM");
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
            <h1>Cập nhật chuyên môn</h1>
            <form onSubmit={handleSubmit} method="POST" className="col-sm-4 offset-sm-4">
              <div className="form-floating">
                <input
                  className="form-control"
                  type="text"
                  name="MaCM"
                  value={values.MaCM}
                ></input>
                <label for="MaCM">Mã chuyên môn</label>
              </div>
              <br />
              <div className="form-floating">
                <input
                  className="form-control"
                  type="text"
                  name="TenCM"
                  defaultValue={values.TenCM}
                ></input>
                <label for="TenCM">Tên chuyên môn</label>
              </div>
              <br />
              <button className="btn btn-success">
                Cập nhật
              </button>
            </form>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default SuaCM;
