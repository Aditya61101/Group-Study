import React, { useEffect } from "react";
import RegisterSignup from "@/components/RegisterSignup";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import LoadingSpinner from "@/components/LoadingSpinner";

const SignUp = () => {
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session?.status === "authenticated")
      router.push("/upcoming-sessions");
  }, [session]);
  if (session.status === "loading") {
    return <LoadingSpinner />;
  }
  return (
    <RegisterSignup
      title={"Sign Up ✍️"}
      linked={"/login"}
      question={"Already have an account? "}
      oppo={"Login"}
      postUrl={"SignUp"}
    />
  );
};
export default SignUp;
