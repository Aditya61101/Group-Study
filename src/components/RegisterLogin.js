import React, { useState, useRef } from "react";
import { Button, Row, Col, Form, InputGroup } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/styles/form.module.css";
import LoadingSpinner from "./LoadingSpinner";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import LogInImage from "@/assets/log-in-image.png";
import Image from "next/image";

const RegisterLogin = (props) => {
  const [validated, setValidated] = useState(false);
  const [isInvalidEmail, setIsInvalidEmail] = useState(null);
  const [isInvalidPassword, setIsInvalidPassword] = useState(null);
  const [isInvalidCnfPassword, setIsInvalidCnfPassword] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const passwordRef = useRef();
  const cnfPasswordRef = useRef();
  const emailRef = useRef();
  const router = useRouter();
  const handleSignUp = async (email, password, cnfPassword) => {
    let url = `${process.env.NEXT_PUBLIC_BASENAME}api/signup`;
    try {
      setIsLoading(true);
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          cnfPassword: cnfPassword,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        console.log(data);
        toast.success("Sign up successful!");
        router.push("/login");
      } else {
        let errorMessage = "Invalid Credentials!";
        if (data && data.error) {
          errorMessage = data.error;
        }
        throw new Error(errorMessage);
      }
    } catch (error) {
      toast.error(error.message);
      router.push("/signup");
    } finally {
      setIsLoading(false);
    }
  };
  const handleSubmitRegister = async (event) => {
    event.preventDefault();
    setError(null);
    const enteredPassword = passwordRef.current.value;
    const enteredEmail = emailRef.current.value;
    const enteredCnfPass = cnfPasswordRef.current.value;
    if (enteredEmail.length === 0 || !enteredEmail.includes("@")) {
      setIsInvalidEmail(true);
      return;
    } else setIsInvalidEmail(false);

    if (enteredPassword.length < 6) {
      setIsInvalidPassword(true);
      return;
    } else setIsInvalidPassword(false);

    if (enteredPassword !== enteredCnfPass) {
      setIsInvalidCnfPassword(true);
    } else setIsInvalidCnfPassword(false);

    handleSignUp(enteredEmail, enteredPassword, enteredCnfPass);
  };
  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    setError(null);
    const enteredPassword = passwordRef.current.value;
    const enteredEmail = emailRef.current.value;
    if (enteredEmail.length === 0 || !enteredEmail.includes("@")) {
      setIsInvalidEmail(true);
      return;
    } else setIsInvalidEmail(false);

    if (enteredPassword.length < 6) {
      setIsInvalidPassword(true);
      return;
    } else setIsInvalidPassword(false);

    handleLogin(enteredEmail, enteredPassword);
  };
  let content = null;
  if (isLoading) {
    content = <LoadingSpinner />;
  } else {
    content = (
      <div className="d-flex justify-content-center">
        <div className="mx-3 p-4 shadow my-3 border rounded-2 d-inline-flex justify-content-center">
          <div className="mx-auto my-auto">
            <Image
              height={460}
              width={460}
              src={LogInImage}
              alt="Sign up Image"
              className="px-5 py-5 d-none d-lg-block"
              style={{ objectFit: "contain", maxWidth: "36rem", marginRight: "auto", marginLeft: "auto" }}
            />
          </div>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmitRegister}
            className="mx-3"
            style={{ maxWidth: "35rem" }}
          >
            <h3 className="fw-bolder fs-1 mb-4" >{props.title}</h3>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="validationCustomEmail">
                <Form.Label className="fw-semibold">Email</Form.Label>
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
                <Form.Label className="fw-semibold">Password</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    aria-describedby="inputGroupPrepend"
                    ref={passwordRef}
                    isInvalid={isInvalidPassword}
                    required
                    autoComplete="on"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please should be of at least 6 characters
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group
                as={Col}
                md="12"
                controlId="validationCustomCnfPassword"
                className="my-2"
              >
                <Form.Label>Confirm Password</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="password"
                    placeholder="Confirm password"
                    aria-describedby="inputGroupPrepend"
                    ref={cnfPasswordRef}
                    isInvalid={isInvalidCnfPassword}
                    required
                    autoComplete="on"
                  />
                  <Form.Control.Feedback type="invalid">
                    Passwords do not match
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
        </div>
      </div>
    );
  }
  return content;
};
export default RegisterLogin;
