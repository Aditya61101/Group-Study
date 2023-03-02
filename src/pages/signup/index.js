import React, { useEffect } from "react";
import RegisterForm from "@/components/RegisterForm";
import router from "next/router";
import { useSession } from "next-auth/react";

const SignUp = () => {
  const { data: session } = useSession();
  //making this page as a protected route
  useEffect(() => {
    session?.user
      ? router.push("/upcomingsessions")
      : router.push("/signup");
  }, [session]);
  
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
