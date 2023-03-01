import React from "react";
import { Container, Nav, Navbar, NavLink } from "react-bootstrap";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const Navigation = () => {
  const { data: session } = useSession();
  // console.log("session", session);
  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container>
        <Link className="navbar-brand" href="/">
          Study Planner Inc.
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {session?.user ? (
              <>
                <Link className="nav-link" href="/upcomingsessions">
                  Upcoming Sessions
                </Link>
                <Link className="nav-link" href="/createsession">
                  Create a Session
                </Link>
                <Link className="nav-link" href="/">
                  {session?.user?.email}
                </Link>
                <NavLink
                  className={({ isActive }) =>
                    ["nav-link", isActive ? "active" : "not-active"]
                      .filter(Boolean)
                      .join(" ")
                  }
                  variant="link"
                  onClick={() => {signOut({redirect:true, callbackUrl:"/"})}}
                >
                  Logout
                </NavLink>
              </>
            ) : (
              <>
                <Link className="nav-link" href="/login">
                  Login
                </Link>
                <Link className="nav-link" href="/signup">
                  SignUp
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
