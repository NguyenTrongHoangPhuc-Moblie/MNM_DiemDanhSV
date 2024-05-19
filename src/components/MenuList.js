import React from "react";
import { Menu } from "antd";
// import Login from "../Login";
// import Register from "../Register";
// import ThemPH from "../PhongHoc/ThemPH";
// import SuaPH from "../PhongHoc/SuaPH";
// import Protected from "../Protected";
// import HienThiPH from "../PhongHoc/HienThiPH";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDoorClosed,
  faChartSimple,
  faCalendarDays,
  faBook,
  faChalkboardTeacher,
  faGraduationCap,
  faChalkboard,
  faHouse,
  faTableColumns,
  faRightToBracket,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

const MenuList = () => {
  JSON.parse(localStorage.getItem("user-info"));
  const history = useNavigate();
  function logOut() {
    localStorage.clear();
    history("/login");
  }
  return (
    <div>
      <Menu
        theme="dark"
        mode="inline"
        className="menu-bar"
        defaultSelectedKeys={["home"]}
      >
        {localStorage.getItem("user-info") ? (
          <>
            <Menu.Item key="home" icon={<FontAwesomeIcon icon={faHouse} />}>
              <Link to="/">Trang chủ</Link>
            </Menu.Item>
            <Menu.Item
              key="dashboard"
              icon={<FontAwesomeIcon icon={faTableColumns} />}
            >
              <Link to="/">Dashboard</Link>
            </Menu.Item>
            <Menu.Item
              key="thongke"
              icon={<FontAwesomeIcon icon={faChartSimple} />}
            >
              Thống Kê
            </Menu.Item>
            <Menu.Item
              key="phonghoc"
              icon={<FontAwesomeIcon icon={faDoorClosed} />}
            >
              <Link to="/listPH">Phòng Học</Link>
            </Menu.Item>
            <Menu.Item
              key="lophocphan"
              icon={<FontAwesomeIcon icon={faChalkboard} />}
            >
              Lớp Học Phần
            </Menu.Item>
            <Menu.Item
              key="sinhvien"
              icon={<FontAwesomeIcon icon={faGraduationCap} />}
            >
              Sinh Viên
            </Menu.Item>
            <Menu.Item key="monhoc" icon={<FontAwesomeIcon icon={faBook} />}>
              <Link to="/listMH">Môn Học</Link>
            </Menu.Item>
            <Menu.Item
              key="giaovien"
              icon={<FontAwesomeIcon icon={faChalkboardTeacher} />}
            >
              Giáo Viên
            </Menu.Item>
            <Menu.Item
              key="lichhoc"
              icon={<FontAwesomeIcon icon={faCalendarDays} />}
            >
              Lịch Học
            </Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item
              key="login"
              icon={<FontAwesomeIcon icon={faRightToBracket} />}
            >
              <Link to="/login">Đăng nhập tài khoản</Link>
            </Menu.Item>
          </>
        )}
        {localStorage.getItem("user-info") ? (
          <Menu.Item
            key="logout"
            icon={<FontAwesomeIcon icon={faRightFromBracket} />}
          >
            <Link onClick={logOut}>Đăng xuất</Link>
          </Menu.Item>
        ) : null}
      </Menu>
    </div>
  );
};

export default MenuList;
