import { Delete, Edit } from "@mui/icons-material";
import React, { useContext, useState, useEffect } from "react";
import { Card, Modal } from "react-bootstrap";
import styles from "@/styles/card.module.css";
import { StudySessionContext } from "@/context/StudySessionContextProvider";
import RegisteredSession from "@/models/registeredSession";
import { useSession } from "next-auth/react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import { Chip, Button } from "@mui/material";
import { toast } from "react-toastify";
import { useTheme } from "next-themes";

export const UpcomingSessionItem = (props) => {
  const sessionsContext = useContext(StudySessionContext);
  const { data: session } = useSession();
  const [disabled, setDisabled] = useState(true);
  const [show, setShow] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [regStuds, setRegStuds] = useState(0);
  const [isRegistered, setIsRegistered] = useState(false);
  const currentUser = session?.user?.id;
  const { theme, setTheme } = useTheme();
  // console.log(theme);
  let darkMode = theme === "dark";
  const formatDate = (queryDate) => {
    return new Date(queryDate).toLocaleDateString("en-us", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (queryTime) => {
    return new Date(`2000-01-01T${queryTime}`).toLocaleTimeString("en-us", {
      timeStyle: "short",
    });
  };

  const handleRegStuds = async () => {
    let url = `${process.env.NEXT_PUBLIC_BASENAME}api/sessions/${props.sessionId}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setRegStuds(data.regStudCount);
    if (data.regStudIds.includes(currentUser)) {
      setIsRegistered(true);
    } else {
      setIsRegistered(false);
    }
  };

  const handleEdit = () => {
    let sessionObj = {
      sessionId: props.sessionId,
      title: props.title,
      subject: props.subject,
      start_date: props.start_date,
      start_time: props.start_time,
      end_date: props.end_date,
      end_time: props.end_time,
      max_students: props.max_students,
    };
    props.updateSessions(sessionObj);
    console.log("session edited");
  };
  const handleDelete = () => {
    sessionsContext.deleteSession(props.sessionId);
    console.log("session deleted");
  };
  const handleRegister = async () => {
    // sessionsContext.registerSession(props.sessionId); Commented this out for changing number of registered students without refreshing
    try {
      let url = `${process.env.NEXT_PUBLIC_BASENAME}api/sessions/${props.sessionId}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        if (data.action === "register") {
          setRegStuds((regStuds) => regStuds + 1);
        } else if (data.action === "unregister") {
          setRegStuds((regStuds) => regStuds - 1);
        }
        setIsRegistered(!isRegistered);
      } else {
        let errorMessage = "Not Registered";
        if (data && data.error) {
          errorMessage = data.error;
        }
        throw new Error(errorMessage);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    handleRegStuds();
    if (currentUser !== props.createdById) {
      setDisabled(false);
      setShow(false);
    }
  }, [currentUser, props.createdById, props.sessionId]);
  const handleShow = () => {
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
  };
  let modal = (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete the session</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this session?</Modal.Body>
      <Modal.Footer>
        <Button variant="contained" onClick={handleClose}>
          Close
        </Button>
        <Button variant="contained" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <>
      <Card
        className={` rounded-3  mt-4  bg-${
          darkMode ? "black" : "white"
        } border border-${darkMode ? "white" : "none"}`}
        style={{
          boxShadow: `${
            darkMode
              ? "0 -2px 10px rgba(255, 255, 255, 1)"
              : "rgba(0, 0, 0, 0.35) 0px 5px 15px"
          }`,
        }}
      >
        <Card.Body className={`px-4 ${darkMode ? "text-white" : "text-dark"}`}>
          <Card.Title className="fs-2 fw-bold">
            <div className="d-flex justify-content-between align-items-center  ">
              {props.title}
              <Chip
                variant="outlined"
                color="default"
                icon={
                  <AccountCircleRoundedIcon
                    style={{ color: darkMode ? "white" : "black" }}
                  />
                }
                className={`${darkMode ? "text-white" : "text-dark"}`}
                label={`${regStuds} / ${props.max_students} `}
              />
            </div>
          </Card.Title>
          <hr className="mb-2" />
          <div className="d-flex justify-content-between mb-2  ">
            <div
              className={`${
                darkMode ? "text-white" : "text-muted"
              }" style={{ fontSize: "0.9rem" }}`}
            >
              <span className="align-items-center d-flex gap-1">
                <CalendarMonthIcon fontSize="inherit" />
                {(props.start_date === props.end_date &&
                  formatDate(props.start_date)) ||
                  `${formatDate(props.start_date)} - ${formatDate(
                    props.end_date
                  )}`}
              </span>
              <span className="align-items-center d-flex gap-1">
                <AccessTimeIcon fontSize="inherit" />
                {formatTime(props.start_time)} - {formatTime(props.end_time)}
              </span>
            </div>
          </div>
          <Card.Text>{props.subject}</Card.Text>
          {(show && (
            <div className="d-flex justify-content-around gap-3">
              <Button
                variant="outlined"
                onClick={handleEdit}
                startIcon={<Edit />}
                className="flex-fill"
              >
                Edit
              </Button>
              <Button variant="contained" onClick={handleShow} color="error">
                <Delete fontSize="small" />
              </Button>
            </div>
          )) || (
            <div className="d-grid">
              {(isRegistered === false && (
                <Button
                  variant="contained"
                  onClick={handleRegister}
                  disabled={disabled}
                  startIcon={<PersonAddRoundedIcon />}
                >
                  Register
                </Button>
              )) || (
                <Button
                  variant="contained"
                  onClick={handleRegister}
                  disabled={disabled}
                  startIcon={<PersonAddRoundedIcon />}
                  color="warning"
                >
                  Unregister
                </Button>
              )}
            </div>
          )}
        </Card.Body>
      </Card>

      {modal}
    </>
  );
};
