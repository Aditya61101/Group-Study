import React, { useEffect } from "react";
import RegisterForm from "@/components/RegisterForm";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import LoadingSpinner from "@/components/LoadingSpinner";

const Login = () => {
  const router = useRouter();
  const session = useSession();
  useEffect(() => {
    if (session?.status === "authenticated") router.push("/upcoming-sessions");
  }, [session]);
  if (session?.status === "loading") {
    return <LoadingSpinner />;
  }
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
