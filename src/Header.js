import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
function Header() {
  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Navbar.Brand href="#home">DiemDanhSV</Navbar.Brand>
        <Nav className="me-auto navbar_warapper">
          {localStorage.getItem("user-info") ? (
            <>
              <Link to="/add">Add Department</Link>
              <Link to="/update">Update Department</Link>
            </>
          ) : (
            <>
              <Link to="/login">Login Department</Link>
              <Link to="/register">Register Department</Link>
            </>
          )}
        </Nav>
      </Navbar>
    </>
  );
}

export default Header;
