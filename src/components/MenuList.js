import React from "react";
import { Menu } from "antd";
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
  faBriefcase,
  faDna,
  faFillDrip,
  faBrain,
  faPersonChalkboard,
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
              <Link to="/listLHP">Lớp Học Phần</Link>
            </Menu.Item>
            <Menu.Item
              key="tiethoc"
              icon={<FontAwesomeIcon icon={faPersonChalkboard} />}
            >
              <Link to="/listTH">Tiết học</Link>
            </Menu.Item>
            <Menu.Item
              key="sinhvien"
              icon={<FontAwesomeIcon icon={faGraduationCap} />}
            >
              <Link to="/listSV">Sinh Viên</Link>
            </Menu.Item>
            <Menu.Item key="monhoc" icon={<FontAwesomeIcon icon={faBook} />}>
              <Link to="/listMH">Môn Học</Link>
            </Menu.Item>
            <Menu.Item
              key="giaovien"
              icon={<FontAwesomeIcon icon={faChalkboardTeacher} />}
            >
              <Link to="/listGV">Giáo Viên</Link>
            </Menu.Item>
            <Menu.Item
              key="lichhoc"
              icon={<FontAwesomeIcon icon={faCalendarDays} />}
            >
            <Link to="/listLH">Lịch Học</Link>
            </Menu.Item>
            <Menu.Item
              key="nganhoc"
              icon={<FontAwesomeIcon icon={faBriefcase} />}
            >
              <Link to="/listNganh">Ngành Học</Link>
            </Menu.Item>
            <Menu.Item
              key="khoa"
              icon={<FontAwesomeIcon icon={faDna} />}
            >
              <Link to="/listKhoa">Khoa</Link>
            </Menu.Item>
            <Menu.Item
              key="chuyemon"
              icon={<FontAwesomeIcon icon={faFillDrip} />}
            >
              <Link to="/listCM">Chuyên môn</Link>
            </Menu.Item>
            <Menu.Item
              key="trinhdo"
              icon={<FontAwesomeIcon icon={faBrain} />}
            >
              <Link to="/listTD">Trình độ</Link>
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
