import React, { useEffect, useState, useContext, useRef } from "react";
import { Button, Row, Col, Form, InputGroup } from "react-bootstrap";
import LoadingSpinner from "./LoadingSpinner";
import { StudySessionContext } from "@/context/StudySessionContextProvider";
import styles from "@/styles/form.module.css";
import Image from "next/image";
import SessionFormImage from "@/assets/session-form-image.png";
import { useTheme } from "next-themes";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

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
  const { theme, setTheme } = useTheme();
  // console.log(theme);
  let darkMode = theme === "dark";
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
    if (maxStud <= 0) {
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
    sessionsContext.sessionSubmission(
      formData,
      props.method,
      props.sessionObj?.sessionId
    );
  };
  let content = null;
  if (isLoading) {
    content = <LoadingSpinner />;
  } else {
    content = (
      <div
        className={`d-flex justify-content-center align-items-center bg-${
          darkMode ? "black" : "white"
        }`}
        style={{
          height: "91vh",
        }}
      >
        <div
          className={
            !props.isModal
              ? "mx-3 p-4 border rounded-2 d-inline-flex justify-content-center "
              : "px-4"
          }
          style={{
            height: "fit-content",
            boxShadow: `${
              darkMode
                ? "0 -2px 10px rgba(255, 255, 255, 1)"
                : "rgba(0, 0, 0, 0.35) 0px 5px 15px"
            }`,
          }}
        >
          <div className={!props.isModal ? "mx-auto my-auto" : "d-none"}>
            <Image
              height={460}
              width={460}
              src={SessionFormImage}
              alt="Form Image"
              className="px-5 py-5 d-none d-lg-block"
              style={{
                objectFit: "scale-down",
                maxWidth: "36rem",
                marginRight: "auto",
                marginLeft: "auto",
              }}
            />
          </div>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            style={{ maxWidth: "35rem" }}
            className={`pl-5 ${darkMode ? "text-white" : "text-dark"}`}
          >
            <h3 className="fs-1 fw-bolder mb-4">{props.title}</h3>
            <Row className="mb-3">
              <Form.Group as={Col} md={12} controlId="validationCustom01">
                <Form.Label className="fw-semibold">Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Session Title"
                  ref={titleRef}
                  isInvalid={isINTitle}
                  defaultValue={props?.sessionObj?.title}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Title is required!
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group
                as={Col}
                md={12}
                controlId="validationCustom02"
                className="my-2"
              >
                <Form.Label className="fw-semibold">Description</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter a brief description of the study session, including topics to be covered, goals, or any specific instructions."
                  defaultValue={props?.sessionObj?.subject}
                  ref={subjectRef}
                  rows={4}
                />
              </Form.Group>

              <div className="d-flex gap-3 flex-wrap">
                <Form.Group
                  controlId="validationCustomStartDate"
                  className="flex-grow-1"
                >
                  <Form.Label className="fw-semibold ">Start Date</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="date"
                      aria-describedby="inputGroupPrepend"
                      ref={startDRef}
                      isInvalid={isSDate}
                      defaultValue={props?.sessionObj?.start_date}
                      required
                      className={`${
                        darkMode ? "bg-black text-white" : "bg-white text-dark"
                      } `}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please choose a valid start date.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <Form.Group
                  controlId="validationCustomUsername"
                  className="flex-grow-1"
                >
                  <Form.Label className="fw-semibold">End Date</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="date"
                      aria-describedby="inputGroupPrepend"
                      ref={endDRef}
                      isInvalid={isEDate}
                      defaultValue={props?.sessionObj?.end_date}
                      required
                      className={`${
                        darkMode ? "bg-black text-white" : "bg-white text-dark"
                      } `}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please choose a valid end date.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </div>

              <div className="d-flex gap-3 flex-wrap my-3">
                <Form.Group
                  controlId="validationCustomUsername"
                  className="flex-grow-1"
                >
                  <Form.Label className="fw-semibold">Start Time</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="time"
                      aria-describedby="inputGroupPrepend"
                      ref={startTRef}
                      isInvalid={isSTime}
                      defaultValue={props?.sessionObj?.start_time}
                      required
                      className={`${
                        darkMode ? "bg-black text-white" : "bg-white text-dark"
                      } `}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please choose a valid start time.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                <Form.Group
                  controlId="validationCustomUsername"
                  className="flex-grow-1"
                >
                  <Form.Label className="fw-semibold">End Time</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="time"
                      aria-describedby="inputGroupPrepend"
                      ref={endTRef}
                      isInvalid={isETime}
                      defaultValue={props?.sessionObj?.end_time}
                      required
                      className={`${
                        darkMode ? "bg-black text-white" : "bg-white text-dark"
                      } `}
                      style={{
                        color: "white",
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please choose a valid end time.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </div>

              <Form.Group
                as={Col}
                md="12"
                controlId="validationCustomUsername"
                className="my-2"
              >
                <Form.Label className="fw-semibold">Max. Enrollment</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    className={`${
                      darkMode ? "bg-black text-white" : "bg-white text-dark"
                    } `}
                    min={0}
                    type="number"
                    aria-describedby="inputGroupPrepend"
                    placeholder="Maximum number of students"
                    ref={maxStudRef}
                    isInvalid={isMStud}
                    defaultValue={
                      props.method === "PUT"
                        ? props.sessionObj.max_students
                        : ""
                    }
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please choose a valid number.
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
        </div>
      </div>
    );
  }
  return content;
};
