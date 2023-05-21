import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";

const RegistrationForm = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      await axios.post("api/auth/register", {
        username,
        password,
        name,
      });
      window.location.href = "/login";
    } catch (error) {
      console.log("Sorry, wrong info provided", error);
    }
  };

  return (
    <>
      <Container className="mt-3" style={{ maxWidth: "700px" }}>
        <h2>Register</h2>
        <div>
          <Form onSubmit={handleRegistration}>
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

            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Button className="mt-3" variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default RegistrationForm;
