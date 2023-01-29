import React from "react";
import router from "next/router";

const upComingSessions = () => {
  //making this page as a protected route
  React.useEffect(() => {
    localStorage.getItem("isLoggedIn")
      ? router.push("/upcomingsessions")
      : router.push("/login");
  }, []);
  return (
    <>
      <div>upComingSessions</div>
    </>
  );
};

export default upComingSessions;
