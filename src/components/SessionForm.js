import React, { useEffect, useState, useContext, useRef } from "react";
import { Button, Row, Col, Form, InputGroup } from "react-bootstrap";
import LoadingSpinner from "./LoadingSpinner";
import { StudySessionContext } from "@/context/StudySessionContextProvider";
import styles from "@/styles/form.module.css";

export const SessionForm = (props) => {
  const sessionsContext = useContext(StudySessionContext);
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isINTitle, setIsINTitle] = useState(null);
  const [isSDate, setIsISDate] = useState(null);
  const [isEDate, setIsIEDate] = useState(null);
  const [isSTime, setIsISTime] = useState(null);
  const [isETime, setIsIETime] = useState(null);
  const [isMStud, setNotMStud] = useState(null);

  const titleRef = useRef();
  const subjectRef = useRef();
  const startDRef = useRef();
  const startTRef = useRef();
  const endDRef = useRef();
  const endTRef = useRef();
  const maxStudRef = useRef();

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
      return;
    } else {
      setIsINTitle(false);
    }
    if (startDate.length === 0) {
      setIsISDate(true);
      return;
    } else {
      setIsISDate(false);
    }
    if (endDate.length === 0) {
      setIsIEDate(true);
      return;
    } else {
      setIsIEDate(false);
    }
    if (startTime.length === 0) {
      setIsISTime(true);
      return;
    } else {
      setIsISTime(false);
    }
    if (endTime.length === 0) {
      setIsIETime(true);
      return;
    } else {
      setIsIETime(false);
    }
    console.log(startTime);
    if (startDate === endDate && startTime > endTime) {
      setIsIETime(true);
      return;
    } else {
      setIsIETime(false);
    }
    if (startDate > endDate) {
      setIsIEDate(true);
      return;
    } else {
      setIsIEDate(false);
    }
    if (maxStud<=0) {
      setNotMStud(true);
      return;
    } else {
      setNotMStud(false);
    }
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
    sessionsContext.sessionSubmission(formData, props.method, props.sessionObj?.sessionId);
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
              defaultValue={props?.sessionObj?.title}
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
              defaultValue={props?.sessionObj?.subject}
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
              defaultValue={props?.sessionObj?.start_date}
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
              defaultValue={props?.sessionObj?.start_time}

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
              defaultValue={props?.sessionObj?.end_date}

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
              defaultValue={props?.sessionObj?.end_time}

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
              defaultValue={props.method==="PUT"?props.sessionObj.max_students:""}

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
