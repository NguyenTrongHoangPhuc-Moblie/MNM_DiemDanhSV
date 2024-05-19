import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import MenuList from "../components/MenuList";
import Logo from "../components/Logo";
import { Button, Layout, theme, message } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

function SuaMH() {
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

  const { id } = useParams();
  const [values, setValues] = useState({
    MaMH: id,
    TenMH: "",
    SoTietLyThuyet: "",
    SoTietThucHanh: "",
    TongSoTiet: "",
    SoTinChi: "",
  });
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/layMH/" + id)
      .then((res) => {
        setValues({
          ...values,
          TenMH: res.data.TenMH,
          SoTietLyThuyet: res.data.SoTietLyThuyet,
          SoTietThucHanh: res.data.SoTietThucHanh,
          TongSoTiet: res.data.TongSoTiet,
          SoTinChi: res.data.SoTinChi,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("TenMH", TenMH);
    formData.append("SoTietLyThuyet", SoTietLyThuyet);
    formData.append("SoTietThucHanh", SoTietThucHanh);
    formData.append("TongSoTiet", TongSoTiet);
    formData.append("SoTinChi", SoTinChi);
    console.log(formData.data)
    axios.post(`http://localhost:8000/api/capNhatMH/${id}`, formData)
    .then(res => {
      message.success("Thành công")
      history('/listMH');
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
            <h1>Cập nhật môn học</h1>
            <form className="col-sm-4 offset-sm-4">
              <input
                className="form-control"
                type="text"
                placeholder={values.MaMH}
                
              ></input>
              <br />
              <input
                className="form-control"
                type="text"
                placeholder={values.TenMH}
                onChange={(e) => setTenMH(e.target.value)}
              ></input>
              <br />
              <input
                className="form-control"
                type="number"
                placeholder={values.SoTietLyThuyet}
                onChange={(e) => setSoTietLyThuyet(e.target.value)}
              ></input>
              <br />
              <input
                className="form-control"
                type="number"
                placeholder={values.SoTietThucHanh}
                onChange={(e) => setSoTietThucHanh(e.target.value)}
              ></input>
              <br />
              <input
                className="form-control"
                type="number"
                placeholder={values.TongSoTiet}
                onChange={(e) => setTongSoTiet(e.target.value)}
              ></input>
              <br />
              <input
                className="form-control"
                type="number"
                placeholder={values.SoTinChi}
                onChange={(e) => setSoTinChi(e.target.value)}
              ></input>
              <br />
              <button onClick={handleSubmit} className="btn btn-success">Cập nhật môn học</button>
            </form>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default SuaMH;
