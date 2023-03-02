import React, { useEffect, useState, useContext } from "react";
import { Col, Row, Container, Modal, Button } from "react-bootstrap";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { UpcomingSessionItem } from "@/components/UpcomingSessionItem";
import { SessionForm } from "@/components/SessionForm";
import { StudySessionContext } from "@/context/StudySessionContextProvider";

const upComingSessions = () => {
  const sessionCtx = useContext(StudySessionContext);
  const [show, setShow] = useState(false);
  const [sesObj, setSesObj] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [upSessions, setUpSessions] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    sessionCtx.getSessions();
    setIsLoading(false);
  }, []);
  useEffect(() => {
    setUpSessions(sessionCtx.upSessions);
  },[sessionCtx.upSessions])
  const handleClose = () => {
    setShow(false);
  };
  const updateSessions = (sessionObj) => {
    setSesObj(sessionObj);
    setShow(true);
  };
  const displaySessions = () => {
    const sortedUpSessions = [...upSessions];
    const propComp = (sD, eD, sT, eT) => (a, b) => {
      if (a[sD] !== b[sD]) {
        if (a[sD] > b[sD]) {
          return 1;
        } else {
          return -1;
        }
      } else if (a[eD] !== b[eD]) {
        if (a[eD] > b[eD]) {
          return 1;
        } else {
          return -1;
        }
      } else if (a[sT] !== b[sT]) {
        if (a[sT] > b[sT]) {
          return 1;
        } else {
          return -1;
        }
      } else if (a[eT] !== b[eT]) {
        if (a[eT] > b[eT]) {
          return 1;
        } else {
          return -1;
        }
      } else {
        return 0;
      }
    };
    sortedUpSessions.sort(propComp("startDate", "endDate", "startTime", "endTime"));
    setUpSessions(sortedUpSessions);
  };
  const handleSort = () => {
    displaySessions();
  };
  let modal = (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton />
      <Modal.Body>
        <SessionForm
          method="PUT"
          isModal={true}
          sessionObj={sesObj}
          handleClose={handleClose}
          title={"Edit the Session"}
        />
      </Modal.Body>
    </Modal>
  );

  let content = null;
  if (isLoading) {
    content = <LoadingSpinner />;
  } else if (upSessions?.length === 0|| upSessions===undefined) {
    content = (
      <div style={{ margin: "auto", fontSize: "20px" }}>
        No, upcoming Study sessions!
      </div>
    );
  } else {
    content = (
      <Container>
        <Row>
          {upSessions?.map((session) => {
            return (
              <Col lg={4} xl={4} md={6} key={session._id}>
                <UpcomingSessionItem
                  sessionId={session._id}
                  createdById={session.user}
                  title={session.title}
                  subject={session.subject}
                  start_date={session.startDate.substr(0, 10)}
                  start_time={session.startTime}
                  end_date={session.endDate.substr(0, 10)}
                  end_time={session.endTime}
                  max_students={session.maxStudents}
                  updateSessions={updateSessions}
                />
              </Col>
            );
          })}
        </Row>
        <Button className="my-3 btn-lg" onClick={handleSort}>
          Sort
        </Button>
      </Container>
    );
  }
  return (
    <>
      {modal}
      {content}
    </>
  );
};

export default upComingSessions;
