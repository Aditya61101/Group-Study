import React from "react";
import LandingImage from "@/assets/landing-image.png";
import LandingImageTwo from "@/assets/landing-page-2.webp";
import Image from "next/image";
import { Button } from "@mui/material";
import EventNoteIcon from '@mui/icons-material/EventNote';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Card } from "react-bootstrap";
import NoteImage from "@/assets/note-text-svgrepo-com.svg";
import ConfImage from "@/assets/conference-room-svgrepo-com.svg";

const theme = createTheme({
  palette: {
    blue: {
      main: '#0D6EFD',
      light: '#0D6EFD',
      dark: '#0D6EFD',
      contrastText: '#fff'
    },
  },
});

const HomePage = () => {
  return (
    <ThemeProvider theme={theme}>
      <section id="landing-page-1">
        <h1 id="heading" className="fw-bold text-center mt-4"><span style={{ color: "#0D6EFD" }}>Efficient Study Planning</span> <br />Made Easy!</h1>
        <div className="d-flex justify-content-center px-3 my-4 gap-3 flex-wrap" >
          <Button variant="contained" color="blue" endIcon={<EventNoteIcon style={{ color: "white" }} />} href="/create-session">
            <span style={{ color: "white" }}>Create Session</span>
          </Button>
          <Button variant="outlined" color="blue" endIcon={<PersonAddAlt1Icon style={{ color: "black" }} />} href="/upcoming-sessions">
            <span style={{ color: "black" }}>Join Session</span>
          </Button>
        </div>
        <div className="d-flex justify-content-center" id="landing-image">
          <Image
            src={LandingImage}
            height={360}
            width={540}
            alt="Landing Page image"
            as="image/png"
            style={{ objectFit: "contain", aspectRatio: "16 / 9" }}
            priority
          />
        </div>
      </section>
      <section id="landing-page-2" className="py-5" style={{ backgroundColor: "#d9e8ff" }}>
        <div className="px-3 text-center" >
          <h1 className="fw-bold mb-3 fs-1">What is Study Planner Inc.?</h1>
          <p className="mx-auto" style={{ maxWidth: "45rem" }}>
            Study Planner Inc. is a platform that lets students plan group study sessions with other students.
            In this platform, a registered student can create its own session or can register for other upcoming sessions.
          </p>
        </div>
        <div className="d-flex justify-content-center flex-wrap gap-5 px-5 mt-5">
          <Card style={{ width: '16rem', backgroundColor: "#0000" }} className="shadow">
            <Card.Body>
              <div className="d-flex justify-content-center pb-3">
                <Image
                  height={64}
                  width={64}
                  alt="note image"
                  src={NoteImage}
                />
              </div>
              <Card.Title className="text-center fw-bold">Create Sessions Easily</Card.Title>
              <Card.Text className="text-center">
                This platform allows you to create sessions and plan your study sessions accordingly
              </Card.Text>
            </Card.Body>
          </Card>
          <Card style={{ width: '16rem', backgroundColor: "#0000" }} className="shadow">
            <Card.Body>
              <div className="d-flex justify-content-center pb-3">
                <Image
                  height={64}
                  width={64}
                  alt="note image"
                  src={ConfImage}
                />
              </div>
              <Card.Title className="text-center fw-bold">Join Other Sessions</Card.Title>
              <Card.Text className="text-center">
                Connect, Collaborate, Create: Join Other Sessions for Limitless Inspiration
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </section>
      <section className="py-5">
        <h1 className="text-center fw-bold">Get Started Now!⚡</h1>
        <p className="text-center">Go ahead and create a powerful session! Or join someone else's!</p>
        <div className="d-flex justify-content-center gap-3 px-3 my-4 flex-wrap" >
          <Button variant="contained" color="blue" endIcon={<EventNoteIcon style={{ color: "white" }} />} href="/create-session">
            <span style={{ color: "white" }}>Create Session</span>
          </Button>
          <Button variant="outlined" color="blue" endIcon={<PersonAddAlt1Icon style={{ color: "black" }} />} href="/upcoming-sessions">
            <span style={{ color: "black" }}>Join Session</span>
          </Button>
        </div>
        <div className="d-flex justify-content-center pb-3">
          <Image
            height={360}
            width={360}
            object-fit="contain"
            alt="Landing page image 2"
            src={LandingImageTwo}
          />
        </div>
      </section>
    </ThemeProvider>
  );
};
export default HomePage;
