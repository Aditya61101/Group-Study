import React from "react";
import RegisterForm from "@/components/RegisterForm";
import Navbar from "@/components/Navbar";
const Login = () => {
  return (
    <>
      <Navbar />
      <RegisterForm
        title={"Login"}
        linked={"/signup"}
        question={"Don't have an account? "}
        oppo={"Sign Up"}
        postUrl={"Login"}
      />
    </>
  );
};
export default Login;
