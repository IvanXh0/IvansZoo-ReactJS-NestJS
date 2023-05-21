import React from "react";
import { Container } from "react-bootstrap";
import Lottie from "lottie-react";
import animationData from "../../assets/panda.json";

const Homepage = () => {
  return (
    <>
      <div className="jumbotron">
        <Container className="d-flex justify-content-center align-items-center flex-column mt-3">
          <h1>Welcome to Ivan's Zoo!</h1>
          <Lottie style={{ width: "400px" }} animationData={animationData} />
          <p>
            Explore the amazing world of animals and zookeepers with our
            interactive zoo app. Get information about various animals, discover
            interesting facts, and learn about the dedicated zookeepers who care
            for them.
          </p>
        </Container>
      </div>
    </>
  );
};

export default Homepage;
