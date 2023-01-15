import React from "react";
import styles from "@/styles/Home.module.css";
import Navbar from "@/components/Navbar";
const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className={styles.home}>
        <h1>Study Planner Inc.</h1>
        <p>
          Study Planner Inc. is a platform that lets students plan group study
          sessions with other students.
          <br />
          In this platform, a registered student can create its own session or
          can register for other upcoming sessions.
          <br />
          To register, click on Sign Up.
          <br />
          If you already have an account, click on Login.
        </p>
      </div>
    </>
  );
};
export default HomePage;
