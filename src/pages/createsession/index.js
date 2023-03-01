import React from "react";
import { SessionForm } from "@/components/SessionForm";

const createSession = () => {
  return (
    <>
      <SessionForm title="Create A Session" method="POST" />
    </>
  );
};

export default createSession;
