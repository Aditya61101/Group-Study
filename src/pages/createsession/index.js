import React from "react";
import { SessionForm } from "@/components/SessionForm";
import router from "next/router";

const createSession = () => {
  //making this page as a protected route
  React.useEffect(() => {
    localStorage.getItem("isLoggedIn")
      ? router.push("/createsession")
      : router.push("/login");
  }, []);
  return (
    <>
      <SessionForm title="Create A Session" method="POST" />
    </>
  );
};

export default createSession;
