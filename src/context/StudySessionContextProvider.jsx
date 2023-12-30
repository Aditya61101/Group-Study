import React, { createContext, useState } from "react";
import router from "next/router";
import { toast } from "react-toastify";

export const StudySessionContext = createContext();
export const StudySessionContextProvider = ({ children }) => {
  const [upSessions, setUpSessions] = useState([]);
  // const [registrations, setRegistrations] = useState([]);

  const getSessions = async () => {
    
    let url = `${process.env.NEXT_PUBLIC_BASENAME}api/sessions`;
    try {
      const response = await fetch(url, {
        method: "GET",
      });
      const data = await response.json();
      if (response.status === 200) {
        setUpSessions(data?.upComingSessions);
      } else {
        let errorMessage = "Cannot get upcoming sessions";
        if (data && data.error) {
          errorMessage = data.error;
        }
        throw new Error(errorMessage);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getRegistrations = async () => {
    let url = `${process.env.NEXT_PUBLIC_BASENAME}api/registrations`;

    try {
      const response = await fetch(url, {
        method: "GET",
      });
      const data = await response.json();
      if (response.status === 200) {
        return data.registeredsession;
      } else {
        let errorMessage = "Cannot get upcoming sessions";
        if (data && data.error) {
          errorMessage = data.error;
        }
        throw new Error(errorMessage);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const sessionSubmission = async (formData, sendMethod, sessionid) => {
    try {
      let url;
      if (sendMethod === "POST") {
        url = `${process.env.NEXT_PUBLIC_BASENAME}api/createSession`;
      } else {
        url = `${process.env.NEXT_PUBLIC_BASENAME}api/sessions/${sessionid}`;
      }
      const response = await fetch(url, {
        method: sendMethod,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        getSessions();
        if (sendMethod === "POST") {
          toast.success("Session created successfully!");
        } else {
          toast.success("Session updated successfully!");
        }
        router.push("/upcoming-sessions");
      } else {
        let errorMessage = "Cannot create a session!";
        if (data && data.error) {
          errorMessage = data.error;
        }
        throw new Error(errorMessage);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const deleteSession = async (sessionid) => {
    try {
      let url = `${process.env.NEXT_PUBLIC_BASENAME}api/sessions/${sessionid}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Session deleted successfully!");
        getSessions();
      } else {
        let errorMessage = "Cannot delete the session!";
        if (data && data.error) {
          errorMessage = data.error;
        }
        throw new Error(errorMessage);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const registerSession = async (sessionid) => {
    try {
      let url = `${process.env.NEXT_PUBLIC_BASENAME}api/sessions/${sessionid}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
      } else {
        let errorMessage = "Not Registered";
        if (data && data.error) {
          errorMessage = data.error;
        }
        throw new Error(errorMessage);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const sessionsValue = {
    upSessions,
    getSessions,
    getRegistrations,
    sessionSubmission,
    deleteSession,
    registerSession,
    setUpSessions,
  };
  return (
    <StudySessionContext.Provider value={sessionsValue}>
      {children}
    </StudySessionContext.Provider>
  );
};
