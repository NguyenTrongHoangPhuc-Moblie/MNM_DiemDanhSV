import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import MenuList from "../components/MenuList";
import Logo from "../components/Logo";
import { Button, Layout, theme, message } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

function SuaTH() {
  const [collapsed, setCollapsed] = useState(true);
  const [TenTH, setTenTH] = useState("");
  const [GioBD, setGioBD] = useState("");
  const [GioKT, setGioKT] = useState("");
  const history = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { id } = useParams();
  const [values, setValues] = useState({
    MaTH: id,
    TenTH: "",
    GioBD: "",
    GioKT: "",
  });
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/layTH/" + id)
      .then((res) => {
        setValues({
          ...values,
          TenTH: res.data.TenTH,
          GioBD: res.data.GioBD,
          GioKT: res.data.GioKT,
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
      .post(`http://localhost:8000/api/capNhatTH/${id}`, data)
      .then((res) => {
        message.success("Thành công");
        history("/listTH");
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
            <h1>Cập nhật tiết học</h1>
            <form onSubmit={handleSubmit} method="POST" className="col-sm-4 offset-sm-4">
              <div className="form-floating">
                <input
                  className="form-control"
                  type="text"
                  name="MaTH"
                  value={values.MaTH}
                ></input>
                <label for="MaTH">Mã tiết học</label>
              </div>
              <br />
              <div className="form-floating">
                <input
                  className="form-control"
                  type="text"
                  name="TenTH"
                  defaultValue={values.TenTH}
                  //onChange={(e) => setTenTH(e.target.value)}
                ></input>
                <label for="TenTH">Tên tiết học</label>
              </div>
              <br />
              <div className="form-floating">
                <input
                  className="form-control"
                  type="time"
                  name="GioBD"
                  defaultValue={values.GioBD}
                  //onChange={(e) => setSoTietLyThuyet(e.target.value)}
                ></input>
                <label for="GioBD">Giờ bắt đầu</label>
              </div>
              <br />
              <div className="form-floating">
                <input
                  className="form-control"
                  type="time"
                  name="GioKT"
                  defaultValue={values.GioKT}
                  //onChange={(e) => setSoTietThucHanh(e.target.value)}
                ></input>
                <label for="GioKT">Giờ kết thúc</label>
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

export default SuaTH;
