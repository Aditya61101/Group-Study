import React from "react";
import { Container, Nav, Navbar, NavLink } from "react-bootstrap";
import Link from "next/link";

const Navigation = () => {
  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container>
        <Link className="navbar-brand" href="/">
          Study Planner Inc.
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link className="nav-link" href="/login">
              Login
            </Link>
            <Link className="nav-link" href="/signup">
              SignUp
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;