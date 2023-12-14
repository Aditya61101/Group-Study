import React from "react";
import styles from "@/styles/Home.module.css";
import { useTheme } from "next-themes";

const HomePage = () => {
  const { theme, setTheme } = useTheme();
  let darkMode = theme === "dark";
  return (
    <div
      className={` ${styles.home} ${
        darkMode === true ? "bg-dark text-white" : "bg-['#eceeef'] "
      }`}
      style={{
        boxShadow: `${
          darkMode
            ? "0 -2px 10px rgba(255, 255, 255, 1)"
            : "rgba(0, 0, 0, 0.35) 0px 5px 15px"
        }`,
      }}
    >
      <h1>Study Planner Inc.</h1>
      <p>
        Study Planner Inc. is a platform that lets students plan group study
        sessions with other students.
        <br />
        In this platform, a registered student can create its own session or can
        register for other upcoming sessions.
        <br />
        To register, click on Sign Up.
        <br />
        If you already have an account, click on Login.
      </p>
    </div>
  );
};
export default HomePage;
