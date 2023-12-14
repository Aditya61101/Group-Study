import { useEffect, useState, useContext, useMemo, useCallback } from "react";
import { Col, Row, Container, Modal, Button } from "react-bootstrap";
import LoadingSpinner from "@/components/LoadingSpinner";
import { UpcomingSessionItem } from "@/components/UpcomingSessionItem";
import { SessionForm } from "@/components/SessionForm";
import { StudySessionContext } from "@/context/StudySessionContextProvider";
import { useTheme } from "next-themes";

const UpcomingSessions = () => {
  const { theme, setTheme } = useTheme();
  let darkMode = theme === "dark";

  const sessionCtx = useContext(StudySessionContext);
  const [show, setShow] = useState(false);
  const [sesObj, setSesObj] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const upSessions = useMemo(
    () => sessionCtx.upSessions,
    [sessionCtx.upSessions]
  );
  useEffect(() => {
    setIsLoading(true);
    sessionCtx.getSessions();
    setIsLoading(false);
  }, []);
  const updateSessions = useCallback((sessionObj) => {
    setSesObj(sessionObj);
    setShow(true);
  }, []);
  const handleSort = () => {
    const sortedUpSessions = [...upSessions];
    const propComp = (sD, eD, sT, eT) => (a, b) => {
      if (a[sD] !== b[sD]) {
        return a[sD] > b[sD] ? 1 : -1;
      } else if (a[eD] !== b[eD]) {
        return a[eD] > b[eD] ? 1 : -1;
      } else if (a[sT] !== b[sT]) {
        return a[sT] > b[sT] ? 1 : -1;
      } else if (a[eT] !== b[eT]) {
        return a[eT] > b[eT] ? 1 : -1;
      } else {
        return 0;
      }
    };
    sortedUpSessions.sort(
      propComp("startDate", "endDate", "startTime", "endTime")
    );
    sessionCtx.setUpSessions(sortedUpSessions);
  };

  let modal = (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton />
      <Modal.Body>
        <SessionForm
          method="PUT"
          isModal={true}
          sessionObj={sesObj}
          handleClose={() => setShow(false)}
          title={"Edit the Session"}
        />
      </Modal.Body>
    </Modal>
  );

  let content = null;
  if (isLoading) {
    content = <LoadingSpinner />;
  } else if (!upSessions || upSessions.length === 0) {
    content = (
      <div style={{ margin: "auto", fontSize: "20px" }}>
        No, upcoming Study sessions!
      </div>
    );
  } else {
    content = (
      <Container className=" " style={{
        minHeight:"fit-content",
      }}>
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
      <div
        className={` bg-${darkMode ? "black" : "white"}`}
        style={{
          minHeight:"fit-content"
        }}
      >
        {modal}
        {content}
      </div>
    </>
  );
};

export default UpcomingSessions;
