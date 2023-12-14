import React, { useState, useRef } from "react";
import { Button, Row, Col, Form, InputGroup } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import LoadingSpinner from "./LoadingSpinner";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import LogInImage from "@/assets/log-in-image.png";
import Image from "next/image";
import { useTheme } from "next-themes";

const RegisterLogin = (props) => {
  const [validated, setValidated] = useState(false);
  const [isInvalidEmail, setIsInvalidEmail] = useState(null);
  const [isInvalidPassword, setIsInvalidPassword] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const passwordRef = useRef();
  const emailRef = useRef();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  // console.log(theme);
  let darkMode = theme === "dark";
  const handleLogin = async (email, password) => {
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      console.log(res);
      if (res.error) {
        throw new Error(res.error);
      } else if (res.ok) {
        toast.success("Login successful! 🎉");
        router.push("/upcoming-sessions");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
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
      <div
        className={`d-flex justify-content-center ${
          darkMode ? "text-white" : "text-dark"
        }`}
        style={{
          height: "fit-content",
        }}
      >
        <div
          className="mx-3 p-4 my-3 border rounded-2 d-inline-flex justify-content-center"
          style={{
            boxShadow: `${
              darkMode
                ? "0 -2px 10px rgba(255, 255, 255, 1)"
                : "rgba(0, 0, 0, 0.35) 0px 5px 15px"
            }`,
          }}
        >
          <div className="mx-auto my-auto">
            <Image
              height={460}
              width={460}
              src={LogInImage}
              alt="Log in Image"
              className="px-5 py-5 d-none d-lg-block"
              style={{
                objectFit: "contain",
                maxWidth: "36rem",
                marginRight: "auto",
                marginLeft: "auto",
              }}
            />
          </div>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmitLogin}
            className="mx-3 my-auto"
            style={{ maxWidth: "35rem" }}
          >
            <h3 className="fw-bolder fs-1 mb-4">{props.title}</h3>
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
