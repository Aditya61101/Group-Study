import React, { useState, useEffect, useRef } from "react";
import { Button, Row, Col, Form, InputGroup } from "react-bootstrap";
import Link from "next/link";
import router from "next/router";
import styles from "@/styles/form.module.css";
import LoadingSpinner from "./LoadingSpinner";
import { AuthContext } from "@/context/AuthContextProvider";

const RegisterForm = (props) => {
  const authContext = React.useContext(AuthContext);
  const [validated, setValidated] = useState(false);
  const [isInvalidEmail, setIsInvalidEmail] = useState(null);
  const [isInvalidPassword, setIsInvalidPassword] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const passwordRef = useRef();
  const emailRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    const enteredPassword = passwordRef.current.value;
    const enteredEmail = emailRef.current.value;
    if (enteredEmail.length === 0 || !enteredEmail.includes("@")) {
      setIsInvalidEmail(true);
      return;
    } else {
      setIsInvalidEmail(false);
    }
    if (enteredPassword.length < 6) {
      setIsInvalidPassword(true);
      return;
    } else {
      setIsInvalidPassword(false);
    }
    const formData = {
      email: enteredEmail,
      password: enteredPassword,
    };
    let url;
    if (props.postUrl === "SignUp") {
      url = `${process.env.NEXT_PUBLIC_BASENAME}api/signup`;
    } else {
      url = `${process.env.NEXT_PUBLIC_BASENAME}api/login`;
    }
    try {
      setIsLoading(true);
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.status === 201) {
        console.log(data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("isLoggedIn", "1");
        localStorage.setItem("email", data.email);
        authContext.handleLogin();
        router.push("/upcomingsessions");
        setIsLoading(false);
      } else {
        setIsLoading(false);
        let errorMessage = "Invalid Credentials!";
        if (data && data.error) {
          errorMessage = data.error;
        }
        throw new Error(errorMessage);
      }
    } catch (error) {
      setError(error.message);
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
        className={styles.formWrap}
      >
        <h3 style={{ textAlign: "center" }}>{props.title}</h3>
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationCustomEmail">
            <Form.Label>Email</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="email"
                placeholder="Enter email"
                aria-describedby="inputGroupPrepend"
                ref={emailRef}
                isInvalid={isInvalidEmail}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid email address
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group
            as={Col}
            md="12"
            controlId="validationCustomPassword"
            className="my-2"
          >
            <Form.Label>Password</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="password"
                placeholder="Enter password"
                aria-describedby="inputGroupPrepend"
                ref={passwordRef}
                isInvalid={isInvalidPassword}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please should be of at least 6 characters
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          {error && <small style={{ color: "red" }}>{error}</small>}
        </Row>
        <div className="d-grid">
          <Button type="submit">Submit</Button>
        </div>
        <p className="text-end my-2">
          {props.question}
          <Link href={props.linked} style={{ textDecoration: "none" }}>
            {props.oppo}
          </Link>
        </p>
      </Form>
    );
  }
  return content;
};
export default RegisterForm;
