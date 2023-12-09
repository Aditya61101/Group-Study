import { Delete, Edit } from "@mui/icons-material";
import React, { useContext, useState, useEffect } from "react";
import { Card, Modal } from "react-bootstrap";
import styles from "@/styles/card.module.css";
import { StudySessionContext } from "@/context/StudySessionContextProvider";
import RegisteredSession from "@/models/registeredSession";
import { useSession } from "next-auth/react";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import { Chip, Button } from "@mui/material";

export const UpcomingSessionItem = (props) => {
  const sessionsContext = useContext(StudySessionContext);
  const { data: session } = useSession();
  const [disabled, setDisabled] = useState(true);
  const [show, setShow] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const currentUser = session?.user?.id;

  const formatDate = (queryDate) => {
    return new Date(queryDate).toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" })
  }

  const formatTime = (queryTime) => {
    return new Date(`2000-01-01T${queryTime}`).toLocaleTimeString('en-us', { timeStyle: "short" })
  }

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
    }
    props.updateSessions(sessionObj);
    console.log("session edited");
  };
  const handleDelete = () => {
    sessionsContext.deleteSession(props.sessionId);
    console.log("session deleted");
  };
  const handleRegister = () => {
    sessionsContext.registerSession(props.sessionId);
  };
  useEffect(() => {
    if (currentUser !== props.createdById) {
      setDisabled(false);
      setShow(false);
    }
  }, [
    currentUser,
    props.createdById,
    props.sessionId,
  ]);
  const handleShow = () => {
    setShowModal(true);
  }
  const handleClose = () => {
    setShowModal(false);
  }
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
  )
  return (
    <>
      <Card className=" rounded-3 shadow mt-4">
        <Card.Body className="px-4">
          <Card.Title className="fs-2 fw-bold">
            <div className="d-flex justify-content-between align-items-center">
              {props.title}
              {/* Number of students currently registered to a session is hardcoded rn */}
              <Chip variant="outlined" color="default" icon={<AccountCircleRoundedIcon />} label={`${props.max_students}`} />
            </div>

          </Card.Title>
          <hr className="mb-2" />
          <div className="d-flex justify-content-between align- mb-2">
            <div
              className="text-muted"
              style={{ fontSize: "0.9rem" }}
            >
              <span className="align-items-center d-flex gap-1">
                <CalendarMonthIcon fontSize="inherit" />
                {props.start_date === props.end_date && formatDate(props.start_date) || `${formatDate(props.start_date)} - ${formatDate(props.end_date)}`}
              </span>
              <span className="align-items-center d-flex gap-1">
                <AccessTimeIcon fontSize="inherit" />
                {formatTime(props.start_time)} - {formatTime(props.end_time)}
              </span>
            </div>
          </div>
          <Card.Text>
            {props.subject}
          </Card.Text>
          {show && (
            <div className="d-flex justify-content-around gap-3">
              <Button variant="outlined" onClick={handleEdit} startIcon={<Edit />} className="flex-fill">
                Edit
              </Button>
              <Button variant="contained" onClick={handleShow} color="error">
                <Delete fontSize="small" />
              </Button>
            </div>
          ) || (
              <div className="d-grid">
                <Button variant="contained" onClick={handleRegister} disabled={disabled} startIcon={<PersonAddRoundedIcon />}>
                  Register
                </Button>
              </div>
            )}
        </Card.Body>
      </Card>

      {modal}
    </>
  );
};
