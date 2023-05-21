import React, { useContext, useEffect } from "react";
import Zookeepers from "../zookeeper-components/Zookeepers";
import { AuthContext } from "../AuthContext";
import Lottie from "lottie-react";
import forbiddenAnimation from "../../assets/forbidden.json";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ZookeeperPage = () => {
  const { accessToken } = useContext(AuthContext);

  useEffect(() => {
    if (accessToken === null) {
      const timeout = setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [accessToken]);

  if (accessToken === null) {
    return (
      <>
        <div className="d-flex justify-content-center align-items-center flex-column">
          <h1 className="mt-3 mb-3">
            You must be logged in before viewing this page!
          </h1>
          <Lottie
            style={{ width: "400px" }}
            animationData={forbiddenAnimation}
          />
          <p className="mt-3">You'll be redirected in 2 seconds</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Zookeepers />
      <ToastContainer />
    </>
  );
};

export default ZookeeperPage;
