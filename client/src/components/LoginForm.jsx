import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../assets/login.json";
import logoutAnimation from "../assets/logout.json";
import {ToastContainer ,toast } from "react-toastify";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, logout, accessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth/login", {
        username,
        password,
      });

      const { accessToken, user } = response.data;
      localStorage.setItem("accessToken", accessToken);

      login(accessToken);

      console.log("Login successful:", response.data);

      localStorage.setItem("name", user.name);
      localStorage.setItem("role", user.role);

      // using this to go back to the page before redirecting if not logged in
      navigate(-1);
    } catch (error) {
      console.log("Sorry something went wrong", error.response.data);
      if (error) {

        setPassword("")
        setUsername("")
      toast.error("Invalid credentials, try again.", {
        position: "top-right",
        autoClose: 2000 
      })
      }
    }
  };

  const removeAccessToken = () => {
    logout();
    localStorage.clear();
  };

  if (accessToken !== null) {
    return (
      <>
        <Container
          className="mt-3 d-flex justify-content-center align-items-center flex-column "
          style={{ maxWidth: "450px" }}
        >
          <h2>Are you sure you want to log out?</h2>
          <div>
            <Lottie
              animationData={logoutAnimation}
              style={{ width: "400px" }}
            />
          </div>
          <p>You can log out here if you wish:</p>
          <Button
            style={{ width: "150px" }}
            variant="dark"
            onClick={removeAccessToken}
          >
            Logout
          </Button>
        </Container>
      </>
    );
  }

  return (
    <>
      <Container className="mt-3" style={{ maxWidth: "700px" }}>
        <h2>Login</h2>
        <div className="d-flex justify-content-center align-items-center flex-column">
          <Lottie style={{ maxWidth: "450px" }} animationData={animationData} />
        </div>
        <div className="mt-3" style={{ maxWidth: "700px" }}>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button
              style={{ width: "150px" }}
              className="mt-3"
              variant="dark"
              type="success"
            >
              Login
            </Button>
          </Form>
        </div>
      </Container>
      <ToastContainer />
    </>
  );
};

export default LoginForm;
