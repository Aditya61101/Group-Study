"use client";
import React from "react";
import {
  Container,
  Nav,
  Navbar,
  NavLink,
  NavDropdown,
  Button,
  Stack,
} from "react-bootstrap";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useTheme } from "next-themes";
const Navigation = () => {
  const { data: session } = useSession();
  const handleLogout = () => {
    toast.success("Logged out successfully");
    signOut();
  };
  const { theme, setTheme } = useTheme();
  let darkMode = theme === "dark";

  return (
    <Navbar
      className={`${darkMode ? "bg-dark" : "bg-primary"} `}
      expand="xl"
      variant="dark"
    >
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
          <Nav className="ms-auto fw-semibold">
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
                <Button
                  variant="contained"
                  style={{ width: "fit-content" }}
                  onClick={() => setTheme("dark")}
                >
                  <DarkModeIcon style={{ color: "white" }} />
                </Button>
                <Button
                  variant="contained"
                  style={{ width: "fit-content" }}
                  onClick={() => setTheme("light")}
                >
                  <LightModeIcon style={{ color: "white" }} />
                </Button>
              </>
            ) : (
              <>
                <Stack direction="horizontal" gap={2}>
                  <NavDropdown
                    title="Login"
                    id="basic-nav-dropdown"
                    style={{ width: "fit-content" }}
                  >
                    <NavDropdown.Item href="/signup">SignUp</NavDropdown.Item>
                    <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                  </NavDropdown>
                  <Button
                    variant="contained"
                    style={{ width: "fit-content" }}
                    onClick={() => setTheme("dark")}
                  >
                    <DarkModeIcon style={{ color: "white" }} />
                  </Button>
                  <Button
                    variant="contained"
                    style={{ width: "fit-content" }}
                    onClick={() => setTheme(" light")}
                  >
                    <LightModeIcon style={{ color: "white" }} />
                  </Button>
                </Stack>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
