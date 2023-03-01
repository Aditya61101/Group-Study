import { Delete, Edit } from "@mui/icons-material";
import React, { useContext, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import styles from "@/styles/card.module.css";
import {StudySessionContext} from "@/context/StudySessionContextProvider";
import { useSession } from "next-auth/react";

export const UpcomingSessionItem = (props) => {
  const sessionsContext = useContext(StudySessionContext);
  const { data: session } = useSession();
  const [disabled, setDisabled] = useState(true);
  const [show, setShow] = useState(true);
  const [showError, setShowError] = useState("");
  const [showSuccess, setShowSuccess] = useState("");
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
    //to show error message
    // if (
    //   props.sessionId === sessionsContext.registerSessionId &&
    //   sessionsContext.success === false
    // ) {
    //   setShowError(sessionsContext.errorRegister);
    // }
    setTimeout(() => {
      setShowError(null);
    }, 2000);
    //to show success message
    // if (
    //   props.sessionId === sessionsContext.registerSessionId &&
    //   sessionsContext.success === true
    // ) {
    //   setShowSuccess(sessionsContext.successRegister);
    // }
    setTimeout(() => {
      setShowSuccess(null);
    }, 2000);
  }, [
    currentUser,
    props.createdById,
    props.sessionId,
    // sessionsContext.registerSessionId,
    // sessionsContext.errorRegister,
    // sessionsContext.successRegister,
    // sessionsContext.success,
  ]);
  return (
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
            <Delete onClick={handleDelete} />
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
      {showSuccess && <small style={{ color: "green" }}>{showSuccess}</small>}
      {showError && <small style={{ color: "red" }}>{showError}</small>}
    </div>
  );
};
