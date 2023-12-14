import React, { useState, useRef } from "react";
import { Button, Row, Col, Form, InputGroup } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/styles/form.module.css";
import LoadingSpinner from "./LoadingSpinner";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import SignUpImage from "@/assets/sign-up-image.png";
import Image from "next/image";
import { useTheme } from "next-themes";

const RegisterSignup = (props) => {
  const [validated, setValidated] = useState(false);
  const [isInvalidEmail, setIsInvalidEmail] = useState(null);
  const [isInvalidPassword, setIsInvalidPassword] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { theme, setTheme } = useTheme();
  // console.log(theme);
  let darkMode = theme === "dark";
  // User Data
  const passwordRef = useRef();
  const emailRef = useRef();
  const nameRef = useRef();
  const ageRef = useRef();
  const collegeRef = useRef();
  const addressRef = useRef();

  const router = useRouter();

  const handleSignUp = async (email, password, name, age, college, address) => {
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
          name: name,
          age: age,
          college: college,
          address: address,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        // console.log(data);
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

  const handleLogin = async (email, password) => {
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      // console.log(res);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    const enteredPassword = passwordRef.current.value;
    const enteredEmail = emailRef.current.value;
    const enteredName = nameRef.current.value;
    const enteredAge = ageRef.current.value;
    const enteredcollege = collegeRef.current.value;
    const enteredAddress = addressRef.current.value;

    if (enteredEmail.length === 0 || !enteredEmail.includes("@")) {
      setIsInvalidEmail(true);
      return;
    } else setIsInvalidEmail(false);

    if (enteredPassword.length < 6) {
      setIsInvalidPassword(true);
      return;
    } else setIsInvalidPassword(false);

    if (props.postUrl === "SignUp") {
      handleSignUp(
        enteredEmail,
        enteredPassword,
        enteredName,
        enteredAge,
        enteredcollege,
        enteredAddress
      );
    } else {
      handleLogin(enteredEmail, enteredPassword);
    }
  };

  let content = null;
  if (isLoading) {
    content = <LoadingSpinner />;
  } else {
    content = (
      <div
        className={` d-flex justify-content-center align-items-center  ${
          darkMode ? "bg-black text-white" : "bg-white text-dark"
        } `}
        style={{
          height: "91vh",
          
        }}
      >
        <div
          className="p-4 border rounded-2 d-inline-flex justify-content-center "
          style={{
            height: "fit-content",
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
              src={SignUpImage}
              alt="Sign up Image"
              className="px-5 py-5 d-none d-lg-block"
              style={{
                objectFit: "contain",
                maxWidth: "36rem",
                marginRight: "auto",
                marginLeft: "auto",
              }}
              priority
            />
          </div>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
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
              {error && <small style={{ color: "red" }}>{error}</small>}

              <Form.Group as={Col} md="12" controlId="validationCustomName">
                <Form.Label className="fw-semibold">Name</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    placeholder="Enter your Name"
                    aria-describedby="inputGroupPrepend"
                    ref={nameRef}
                    required
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group
                className="mt-2"
                as={Col}
                md="12"
                controlId="validationCustomAge"
              >
                <Form.Label className="fw-semibold">Age</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    min={0}
                    type="number"
                    placeholder="Enter your Age"
                    aria-describedby="inputGroupPrepend"
                    ref={ageRef}
                    required
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group
                className="mt-2"
                as={Col}
                md="12"
                controlId="validationCustomcollege"
              >
                <Form.Label className="fw-semibold">College</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    placeholder="Enter your College Name"
                    aria-describedby="inputGroupPrepend"
                    ref={collegeRef}
                    required
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group
                className="mt-2"
                as={Col}
                md="12"
                controlId="validationCustomaddress"
              >
                <Form.Label className="fw-semibold">Address</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    placeholder="Enter your Address"
                    aria-describedby="inputGroupPrepend"
                    ref={addressRef}
                    required
                  />
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
export default RegisterSignup;
