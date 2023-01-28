import React from "react";
import { Button, Row, Col, Form, InputGroup } from "react-bootstrap";
import LoadingSpinner  from "./LoadingSpinner";
import { SessionContext } from "@/context/SessionContextProvider";
import styles from "@/styles/form.module.css";

export const SessionForm = (props) => {
  const sessionsContext = React.useContext(SessionContext);
  const [validated, setValidated] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isINTitle, setIsINTitle] = React.useState(null);
  const [isSDate, setIsISDate] = React.useState(null);
  const [isEDate, setIsIEDate] = React.useState(null);
  const [isSTime, setIsISTime] = React.useState(null);
  const [isETime, setIsIETime] = React.useState(null);
  const [isMStud, setNotMStud] = React.useState(null);

  const titleRef = React.useRef();
  const subjectRef = React.useRef();
  const startDRef = React.useRef();
  const startTRef = React.useRef();
  const endDRef = React.useRef();
  const endTRef = React.useRef();
  const maxStudRef = React.useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const title = titleRef.current.value;
    const subject = subjectRef.current.value;
    const startDate = startDRef.current.value;
    const startTime = startTRef.current.value;
    const endDate = endDRef.current.value;
    const endTime = endTRef.current.value;
    const maxStud = maxStudRef.current.value;
    if (title.length === 0) {
      setIsINTitle(true);
    } else {
      setIsINTitle(false);
    }
    if (startDate.length === 0) {
      setIsISDate(true);
    } else {
      setIsISDate(false);
    }
    if (endDate.length === 0) {
      setIsIEDate(true);
    } else {
      setIsIEDate(false);
    }
    if (startTime.length === 0) {
      setIsISTime(true);
    } else {
      setIsISTime(false);
    }
    if (endTime.length === 0) {
      setIsIETime(true);
    } else {
      setIsIETime(false);
    }
    if (startDate === endDate && startTime.length && endTime.length) {
      if (
        (startTime[0] === "0" && endTime[0] === "0") ||
        (startTime[0] !== "0" && endTime[0] !== "0")
      ) {
        if (startTime > endTime) {
          setIsIETime(true);
        } else {
          setIsIETime(false);
        }
      }
    }
    if (startDate.length && endDate.length) {
      if (startDate > endDate) {
        setIsIEDate(true);
      } else {
        setIsIEDate(false);
      }
    }
    if (!maxStud) {
      setNotMStud(true);
    } else {
      setNotMStud(false);
    }
    if (
      title.length &&
      startDate.length &&
      endDate.length &&
      startTime.length &&
      endTime.length &&
      maxStud &&
      startDate <= endDate
    ) {
      if (
        (startDate === endDate) && ((startTime[0] === "0" && endTime[0] === "0") ||
        (startTime[0] !== "0" && endTime[0] !== "0"))
      ) {
        if (startTime <= endTime) {
          console.log("entered");
          setValidated(true);
          setIsLoading(true);
          const formData = {
            title: title,
            subject: subject,
            startDate: startDate,
            startTime: startTime,
            endDate: endDate,
            endTime: endTime,
            maxStudents: maxStud,
          };
          sessionsContext.sessionSubmission(
            formData,
            props.method,
            props.sessionid
          );
        }
      }
    }
  };
  let content = null;
  if (isLoading) {
    content = <LoadingSpinner />;
  } else {
    content = (
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className={!props.isModal ? styles.formWrap : null}
        style={{ marginBottom: "30px" }}
      >
        <h3 style={{ textAlign: "center" }}>{props.title}</h3>
        <Row className="mb-3">
          <Form.Group as={Col} md={12} controlId="validationCustom01">
            <Form.Label>Title of the session</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title of the session"
              ref={titleRef}
              isInvalid={isINTitle}
              required
            />
            <Form.Control.Feedback type="invalid">
              Title is required
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group
            as={Col}
            md={12}
            controlId="validationCustom02"
            className="my-2"
          >
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter subject of the session"
              ref={subjectRef}
            />
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="validationCustomStartDate">
            <Form.Label>Start Date</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="date"
                aria-describedby="inputGroupPrepend"
                ref={startDRef}
                isInvalid={isSDate}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please choose a start date.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="validationCustomUsername">
            <Form.Label>Start Time</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="time"
                aria-describedby="inputGroupPrepend"
                ref={startTRef}
                isInvalid={isSTime}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please choose a start time.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group
            as={Col}
            md="6"
            controlId="validationCustomUsername"
            className="my-2"
          >
            <Form.Label>End Date</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="date"
                aria-describedby="inputGroupPrepend"
                ref={endDRef}
                isInvalid={isEDate}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please choose a correct end date.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group
            as={Col}
            md="6"
            controlId="validationCustomUsername"
            className="my-2"
          >
            <Form.Label>End Time</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="time"
                aria-describedby="inputGroupPrepend"
                ref={endTRef}
                isInvalid={isETime}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please choose a correct end time.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group
            as={Col}
            md="12"
            controlId="validationCustomUsername"
            className="my-2"
          >
            <Form.Label>Maximum student in the session</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="number"
                aria-describedby="inputGroupPrepend"
                placeholder="Maximum student"
                ref={maxStudRef}
                isInvalid={isMStud}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please choose a valid maximum no. of students.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>
        <div className="d-grid">
          <Button type="submit" onClick={props.handleClose}>
            Submit
          </Button>
        </div>
      </Form>
    );
  }
  return content;
};