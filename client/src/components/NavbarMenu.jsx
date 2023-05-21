import React, { useContext } from "react";
import { Container, Image, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import logo from "../assets/logo.png";
import AdminPanel from "./AdminPanel";


const NavbarMenu = () => {
  const { accessToken } = useContext(AuthContext);
  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");


  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <Image
              className="navbar-logo"
              src={logo}
              width={150}
              height={40}
              alt="logo"
            />
          </Navbar.Brand>
          {name !== null
            ? (
              <Navbar.Text>
                Logged in as <span className="user-info">{name}</span>
                <Navbar.Text className="px-4">
                  Role <span className="user-info">{role}</span>
                </Navbar.Text>
              </Navbar.Text>
            )
            : (
              ""
            )}
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/animals">
              Animals
            </Nav.Link>
            <Nav.Link as={Link} to="/zookeepers">
              Zookeepers
            </Nav.Link>
            <Nav.Link as={Link} to="/login">
              {accessToken ? "Logout" : "Login"}
            </Nav.Link>
            {role === "admin" && (
              <Nav.Link>
                <AdminPanel />
              </Nav.Link>
            )}
            {!accessToken && (
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarMenu;
