import React from "react";
import { Container, Dropdown, Navbar } from "react-bootstrap";
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const NavBar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get user data
  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleLogoClick = () => {
    if (isAuthenticated && user) {
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <Navbar className="bg-light px-3 border-bottom navbar-custom">
      <Container fluid className="d-flex justify-content-between align-items-center">
        {/* Left-aligned Logo */}
        <Navbar.Brand className="d-flex align-items-center">
          <img
            src={"/assets/Gsynergy.svg"}
            alt="Gsynergy Logo"
            className="navbar-logo"
            onClick={handleLogoClick}
          />
        </Navbar.Brand>

        {/* Center-aligned Heading (Responsive) */}
        <div className="navbar-title">
          <h2 className="navbar-title-text">Data Viewer App</h2>
        </div>

        {/* Right-aligned User Icon */}
        {isAuthenticated && user && (
          <Dropdown align="end">
            <Dropdown.Toggle
              variant="link"
              id="dropdown-basic"
              className="text-dark border-0 shadow-none"
            >
              <FaRegUserCircle size={22} color="#000" />
            </Dropdown.Toggle>

            <Dropdown.Menu className="p-3" style={{ width: "200px" }}>
              <Dropdown.ItemText>
                <h5>{user.username || user.email}</h5>
              </Dropdown.ItemText>
              <Dropdown.Item onClick={handleLogout} className="text-danger">
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
