import { Delete, Edit } from "@mui/icons-material";
import React, { useContext, useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import styles from "@/styles/card.module.css";
import {StudySessionContext} from "@/context/StudySessionContextProvider";
import { useSession } from "next-auth/react";

export const UpcomingSessionItem = (props) => {
  const sessionsContext = useContext(StudySessionContext);
  const { data: session } = useSession();
  const [disabled, setDisabled] = useState(true);
  const [show, setShow] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const currentUser = session.user.id;
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
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
    </Modal>
  )
  return (
    <>
    <div className={styles.session_card}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p>Title: {props.title}</p>
        {show && (
          <div>
            <Edit className="mx-2" onClick={handleEdit} />
            <Delete onClick={handleShow} />
          </div>
        )}
      </div>
      <p>Subject: {props.subject}</p>
      <p>
        Start Date: {props.start_date} Start Time: {props.start_time}
      </p>
      <p>
        End Date: {props.end_date} End Time: {props.end_time}
      </p>
      <p>Maximum Students: {props.max_students}</p>

      <div className="d-grid">
        <Button onClick={handleRegister} disabled={disabled}>
          Register
        </Button>
      </div>
    </div>
    {modal}
    </>
  );
};
