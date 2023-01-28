import React, { createContext } from "react";
import router from "next/router";

export const SessionContext = createContext();

export const SessionContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [upcomingSessions, setUpcomingSessions] = React.useState([]);
  const [errorFetch, setErrorFetch] = React.useState(null);
  const [errorRegister, setErrorRegister] = React.useState(null);
  const [successRegister, setSuccessRegister] = React.useState(null);
  const [registerSessionId, setRegisterSessionId] = React.useState(null);
  const [errorDelete, setErrorDelete] = React.useState(null);
  const [errorSubmit, setErrorSubmit] = React.useState(null);
  const [success, setSuccess] = React.useState(false);
  
  const getSessions = async () => {
    let url = `${process.env.NEXT_PUBLIC_BASENAME}api/getSessions`;
    let token = localStorage.getItem("token");
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setIsLoading(false);
      console.log(response);
      if (response.status === 201) {
        const data = await response.json();
        console.log(data);
        setUpcomingSessions(data);
      } else {
        let errorMessage = "Cannot get upcoming sessions";
        const data = await response.json();
        if (data && data.error) {
          errorMessage = data.error;
        }
        throw new Error(errorMessage);
      }
    } catch (error) {
      setErrorFetch(error.message);
    }
  };
  const sessionSubmission = async (formData, sendMethod, sessionid) => {
    try {
      const authToken = localStorage.getItem("token");
      let url;
      if (sendMethod === "POST") {
        url = `${process.env.NEXT_PUBLIC_BASENAME}api/createSession`;
      } else {
        url = `${process.env.NEXT_PUBLIC_BASENAME}api/upcoming_sessions/${sessionid}`;
      }
      const response = await fetch(url, {
        method: sendMethod,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(formData),
      });
      setIsLoading(false);
      if (response.status === 201) {
        const data = await response.json();
        console.log(data);
        getSessions();
        router.push("/upcomingSession");
      } else {
        let errorMessage = "Cannot create a session!";
        const data = await response.json();
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
  const deleteSession = async (sessionid) => {
    try {
      const authToken = localStorage.getItem("token");
      let url = `${process.env.NEXT_PUBLIC_BASENAME}api/upcoming_sessions/${sessionid}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${authToken}`,
        },
      });
      setIsLoading(false);
      if (response.status === 201) {
        const data = await response.json();
        console.log(data);
        getSessions();
        router.push("/upcomingSession");
      } else {
        let errorMessage = "Cannot create a session!";
        const data = await response.json();
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
      const authToken = localStorage.getItem("token");
      let url = `${process.env.NEXT_PUBLIC_BASENAME}api/userRegister/${sessionid}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${authToken}`,
        },
      });
      if (response.status === 201) {
        const data = await response.json();
        console.log(data);
        setSuccessRegister(data.message);
        setSuccess(true);
        setRegisterSessionId(data.sessionId);
      } else {
        let errorMessage = "Not Registered";
        const data = await response.json();
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
    upcomingSessions,
    isLoading,
    errorFetch,
    errorDelete,
    errorSubmit,
    errorRegister,
    successRegister,
    success,
    sessionSubmission,
    deleteSession,
    getSessions,
    registerSession,
    registerSessionId,
  };
  return (
    <SessionContext.Provider value={sessionsValue}>
      {children}
    </SessionContext.Provider>
  );
};
