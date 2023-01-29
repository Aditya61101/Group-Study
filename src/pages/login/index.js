import React from "react";
import RegisterForm from "@/components/RegisterForm";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  // making this page as a protected route
  React.useEffect(() => {
    localStorage.getItem("isLoggedIn")
      ? router.push("/upcomingsessions")
      : router.push("/login");
  }, []);
  return (
    <RegisterForm
      title={"Login"}
      linked={"/signup"}
      question={"Don't have an account? "}
      oppo={"Sign Up"}
      postUrl={"Login"}
    />
  );
};
export default Login;
