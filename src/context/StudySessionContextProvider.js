import React, { createContext, useState } from "react";
import router from "next/router";

export const StudySessionContext = createContext();

export const StudySessionContextProvider = ({ children }) => {
  const [errorRegister, setErrorRegister] = useState(null);
  const [successRegister, setSuccessRegister] = useState(null);
  const [registerSessionId, setRegisterSessionId] = useState(null);
  const [errorDelete, setErrorDelete] = useState(null);
  const [errorSubmit, setErrorSubmit] = useState(null);
  const [success, setSuccess] = useState(false);

  const sessionSubmission = async (formData, sendMethod, sessionid) => {
    try {
      let url;
      if (sendMethod === "POST") {
        url = `${process.env.NEXT_PUBLIC_BASENAME}api/createSession`;
      } else {
        //have to check
        url = `${process.env.NEXT_PUBLIC_BASENAME}api/upcoming_sessions/${sessionid}`;
      }
      const response = await fetch(url, {
        method: sendMethod,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.status === 201) {
        console.log(data);
        router.push("/upcomingsessions");
      } else {
        let errorMessage = "Cannot create a session!";
        console.log(data);
        if (data && data.error) {
          errorMessage = data.error;
        }
        throw new Error(errorMessage);
      }
    } catch (error) {
      setErrorSubmit(error.message);
    }
  };
  //have to check
  const deleteSession = async (sessionid) => {
    try {
      let url = `${process.env.NEXT_PUBLIC_BASENAME}api/upcoming_sessions/${sessionid}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.status === 201) {
        console.log(data);
        getSessions();
        router.push("/upcomingSession");
      } else {
        let errorMessage = "Cannot create a session!";
        console.log(data);
        if (data && data.error) {
          errorMessage = data.error;
        }
        throw new Error(errorMessage);
      }
    } catch (error) {
      setErrorDelete(error.message);
    }
  };
  const registerSession = async (sessionid) => {
    try {
      //have to check
      let url = `${process.env.NEXT_PUBLIC_BASENAME}api/userRegister/${sessionid}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.status === 201) {
        console.log(data);
        setSuccessRegister(data.message);
        setSuccess(true);
        setRegisterSessionId(data.sessionId);
      } else {
        let errorMessage = "Not Registered";
        console.log(data);
        setSuccess(false);
        setRegisterSessionId(data.sessionId);
        if (data && data.error) {
          errorMessage = data.error;
        }
        throw new Error(errorMessage);
      }
    } catch (error) {
      setErrorRegister(error.message);
    }
  };
  const sessionsValue = {
    errorDelete,
    errorSubmit,
    errorRegister,
    successRegister,
    success,
    sessionSubmission,
    deleteSession,
    registerSession,
    registerSessionId,
  };
  return (
    <StudySessionContext.Provider value={sessionsValue}>
      {children}
    </StudySessionContext.Provider>
  );
};
