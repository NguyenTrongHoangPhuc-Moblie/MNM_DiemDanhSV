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
    const form = event.target;
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    axios
      .post(`http://localhost:8000/api/capNhatMH/${id}`, data)
      .then((res) => {
        message.success("Thành công");
        history("/listMH");
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
            <h1>Cập nhật môn học</h1>
            <form onSubmit={handleSubmit} method="POST" className="col-sm-4 offset-sm-4">
              <div className="form-floating">
                <input
                  className="form-control"
                  type="text"
                  name="MaMH"
                  value={values.MaMH}
                ></input>
                <label for="MaMH">Mã môn học</label>
              </div>
              <br />
              <div className="form-floating">
                <input
                  className="form-control"
                  type="text"
                  name="TenMH"
                  defaultValue={values.TenMH}
                  //onChange={(e) => setTenMH(e.target.value)}
                ></input>
                <label for="TenMH">Tên môn học</label>
              </div>
              <br />
              <div className="form-floating">
                <input
                  className="form-control"
                  type="number"
                  name="SoTietLyThuyet"
                  defaultValue={values.SoTietLyThuyet}
                  //onChange={(e) => setSoTietLyThuyet(e.target.value)}
                ></input>
                <label for="SoTietLyThuyet">Số tiết lý thuyết</label>
              </div>
              <br />
              <div className="form-floating">
                <input
                  className="form-control"
                  type="number"
                  name="SoTietThucHanh"
                  defaultValue={values.SoTietThucHanh}
                  //onChange={(e) => setSoTietThucHanh(e.target.value)}
                ></input>
                <label for="SoTietThucHanh">Số tiết thực hành</label>
              </div>
              <br />
              <div className="form-floating">
                <input
                  className="form-control"
                  type="number"
                  name="TongSoTiet"
                  defaultValue={values.TongSoTiet}
                  //onChange={(e) => setTongSoTiet(e.target.value)}
                ></input>
                <label for="TongSoTiet">Tổng số tiết</label>
              </div>
              <br />
              <div className="form-floating">
                <input
                  className="form-control"
                  type="number"
                  name="SoTinChi"
                  defaultValue={values.SoTinChi}
                  onChange={(e) => setSoTinChi(e.target.value)}
                ></input>
                <label for="SoTinChi">Số tín chỉ</label>
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

export default SuaMH;
