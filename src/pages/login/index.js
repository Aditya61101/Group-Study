import React, { useEffect } from "react";
import RegisterLogin from "@/components/RegisterLogin";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useTheme } from "next-themes";

const Login = () => {
  const router = useRouter();
  const session = useSession();
  const { theme, setTheme } = useTheme();
  let darkMode = theme === "dark";
  useEffect(() => {
    if (session?.status === "authenticated") router.push("/upcoming-sessions");
  }, [session]);
  if (session?.status === "loading") {
    return <LoadingSpinner />;
  }
  return (
    <div
      className={`d-flex justify-content-center align-items-center bg-${
        darkMode ? "black" : "white"
      }
`}
      style={{
        height: "91vh",
      }}
    >
      <RegisterLogin
        title={"Login 🔑"}
        linked={"/signup"}
        question={"Don't have an account? "}
        oppo={"Sign Up"}
        postUrl={"Login"}
      />
    </div>
  );
};
export default Login;
