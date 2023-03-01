import React, { useEffect } from "react";
import RegisterForm from "@/components/RegisterForm";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const Login = () => {
  const router = useRouter();
  const {data:session} = useSession();
  // making this page as a protected route
  useEffect(() => {
    session?.user ? router.push("/upcomingsessions")
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
