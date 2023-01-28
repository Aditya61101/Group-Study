import React from "react";
import Navbar from "@/components/Navbar";
import { SessionForm } from "@/components/SessionForm";

const createSession = () => {
  return (
    <>
      <Navbar />
      <SessionForm title="Create A Session" method="POST" />
    </>
  );
};

export default createSession;
