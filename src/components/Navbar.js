import React from "react";
import { Container, Nav, Navbar, NavLink } from "react-bootstrap";
import Link from "next/link";
import router from "next/router";
import { AuthContext } from "@/context/AuthContextProvider";

const Navigation = () => {
  const authContext = React.useContext(AuthContext);
  const handleLogoutFunc = () => {
    authContext.handleLogout();
    router.push("/");
  };
  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container>
        <Link className="navbar-brand" href="/">
          Study Planner Inc.
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {authContext.isLoggedIn && (
              <Link className="nav-link" href="/upcomingsessions">
                Upcoming Sessions
              </Link>
            )}
            {authContext.isLoggedIn && (
              <Link className="nav-link" href="/createsession">
                Create a Session
              </Link>
            )}
            {authContext.isLoggedIn && (
              <NavLink
                className={({ isActive }) =>
                  ["nav-link", isActive ? "active" : "not-active"]
                    .filter(Boolean)
                    .join(" ")
                }
                variant="link"
                onClick={handleLogoutFunc}
              >
                Logout
              </NavLink>
            )}
            {!authContext.isLoggedIn && (
              <Link className="nav-link" href="/login">
                Login
              </Link>
            )}
            {!authContext.isLoggedIn && (
              <Link className="nav-link" href="/signup">
                SignUp
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
