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

function SuaPH() {
  const [collapsed, setCollapsed] = useState(true);
  const [data, setData] = useState([]);
  const [TenPH, setTenPH] = useState("");
  const [DiaChiPH, setDiaChiPH] = useState("");
  const history = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { id } = useParams();
  const [values, setValues] = useState({
    MaPH: id,
    TenPH: "",
    DiaChiPH: "",
  });
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/layPH/" + id)
      .then((res) => {
        setValues({
          ...values,
          TenPH: res.data.TenPH,
          DiaChiPH: res.data.DiaChiPH,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("TenPH", TenPH);
    formData.append("DiaChiPH", DiaChiPH);
    console.log(formData.data)
    axios.post(`http://localhost:8000/api/capNhatPH/${id}`, formData)
    .then(res => {
      message.success("Thanh cong")
      history('/listPH');
    }).catch((err) => {
      alert(err)
    })
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
            <h1>Cap nhat phong hoc</h1>
            <form className="col-sm-4 offset-sm-4">
              <input
                className="form-control"
                type="text"
                placeholder={values.MaPH}
                
              ></input>
              <br />
              <input
                className="form-control"
                type="text"
                placeholder={values.TenPH}
                //value={values.TenPH}
                onChange={(e) => setTenPH(e.target.value)}
              ></input>
              <br />
              <input
                className="form-control"
                type="text"
                //value={values.DiaChiPH}
                placeholder={values.DiaChiPH}
                onChange={(e) => setDiaChiPH(e.target.value)}
              ></input>
              <br />
              <button onClick={handleSubmit} className="btn btn-success">Cap nhat phong hoc</button>
            </form>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default SuaPH;
