import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from "react";
import { SSRProvider } from "react-bootstrap";
import { StudySessionContextProvider } from "@/context/StudySessionContextProvider";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerServiceWorker } from "@/sw_register";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {

  useEffect(() => {
    if (typeof window !== 'undefined') {
      registerServiceWorker();
    }
  }, []);

  return (
    <SSRProvider>
      <SessionProvider session={session}>
        <StudySessionContextProvider>
          <Navbar />
          <Component {...pageProps} />
          <ToastContainer />
        </StudySessionContextProvider>
      </SessionProvider>
    </SSRProvider>
  );
}
