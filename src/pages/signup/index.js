import React from "react";
import RegisterForm from "@/components/RegisterForm";
import Navbar from "@/components/Navbar";
const SignUp = () => {
  return (
    <>
    <Navbar/>
    <RegisterForm
      title={"Sign Up"}
      linked={"/login"}
      question={"Already have an account? "}
      oppo={"Login"}
      postUrl={"SignUp"}
    />
    </>
  );
};
export default SignUp;
