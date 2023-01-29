import React from "react";
import RegisterForm from "@/components/RegisterForm";
import router from "next/router";

const SignUp = () => {
  //making this page as a protected route
  React.useEffect(() => {
    localStorage.getItem("isLoggedIn")
      ? router.push("/upcomingsessions")
      : router.push("/signup");
  }, []);
  return (
    <>
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
