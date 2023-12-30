import React from "react";
import { Container, Nav, Navbar, NavLink, NavDropdown } from "react-bootstrap";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { toast } from "react-toastify";

const Navigation = () => {
  const { data: session } = useSession();
  const handleLogout = () => {
    toast.success("Logged out successfully");
    signOut();
  };
  return (
    <Navbar bg="primary" expand="xl" variant="dark">
      <Container>
        <Link className="navbar-brand" href="/">
          <img
            src="/logo.png"
            alt="nav-logo"
            style={{ height: 50, width: 75 }}
          />
        </Link>
        <Link className="navbar-brand" href="/">
          Study Planner Inc.
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {session?.user ? (
              <>
                <Link className="nav-link" href="/upcoming-sessions">
                  Upcoming Sessions
                </Link>
                <Link className="nav-link" href="/past-sessions">
                  Past Sessions
                </Link>
                <Link className="nav-link" href="/create-session">
                  Create Session
                </Link>
                <Link className="nav-link" href="/profile">
                  {session?.user?.email}
                </Link>
                <NavLink
                  className={({ isActive }) =>
                    ["nav-link", isActive ? "active" : "not-active"]
                      .filter(Boolean)
                      .join(" ")
                  }
                  variant="link"
                  onClick={handleLogout}
                >
                  Logout
                </NavLink>
              </>
            ) : (
              <>
                <Link className="nav-link" href="/signup">
                  SignUp
                </Link>
                <Link className="nav-link" href="/login">
                  Login
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
