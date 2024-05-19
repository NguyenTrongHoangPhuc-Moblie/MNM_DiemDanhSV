import React, { useState } from "react";
import MenuList from "../components/MenuList";
import Logo from "../components/Logo";
import { Button, Layout, theme } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

function Index() {
  const [collapsed, setCollapsed] = useState(true);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

//   const truyXuat = async () => {
//     let result = await fetch("http://localhost:8000/api/danhSachPH");
//     result = await result.json();
//     setData(result);
//     setRecords(result);
//   };

//   useEffect(() => {
//     axios
//       .get("http://localhost:8000/api/danhSachPH")
//       .then((res) => {
//         setData(res.data);
//         setRecords(res.data);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   async function xoaPhong(id) {
//     let result = fetch("http://localhost:8000/api/xoaPH/" + id, {
//       method: "DELETE",
//     });
//     result = (await result).json();
//     truyXuat();
//   }

//   const Filter = (event) => {
//     // const inputValue = event.target.value.toLowerCase();
//     // console.log(records.filter(row => row.TenPH.toLowerCase().includes(inputValue)));
//     const inputValue = event.target.value.toLowerCase(); // Lấy giá trị của trường nhập liệu và chuyển đổi thành chữ thường
//     //setRecords(data.filter(f => f.TenPH))
//     const newData = data.filter(
//       (item) =>
//         item.MaPH.toLowerCase().includes(inputValue) ||
//         item.TenPH.toLowerCase().includes(inputValue) ||
//         item.DiaChiPH.toLowerCase().includes(inputValue)
//     );
//     setRecords(newData);
//   };

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
            <h1>Điểm danh sinh viên</h1>
            
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default Index;