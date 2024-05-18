import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
function Header() {
  let user = JSON.parse(localStorage.getItem("user-info"));
  const history = useNavigate();
  function logOut() {
    localStorage.clear();
    history("/login");
  }
  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Navbar.Brand href="#home">DiemDanhSV</Navbar.Brand>
        <Nav className="me-auto navbar_warapper">
          {localStorage.getItem("user-info") ? (
            <>
              <Link to="/">Danh sach phong hoc</Link>
              <Link to="/add">Add Department</Link>
              <Link to="/update">Update Department</Link>
              <Link to="/search">Search Department</Link>
            </>
          ) : (
            <>
              <Link to="/login">Login Department</Link>
            </>
          )}
        </Nav>
        {localStorage.getItem("user-info") ? (
          <Nav>
            <NavDropdown title={user && user.Email}>
              <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        ) : null}
      </Navbar>
    </>
  );
}

export default Header;
