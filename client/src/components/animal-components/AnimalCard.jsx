import React from "react";
import { Button, Card } from "react-bootstrap";

const AnimalCard = ({
  animal,
  handleAnimalClick,
  handleDeleteAnimal,
  role,
  onEditClick,
}) => {
  return (
    <Card bg="dark" text="light" style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title className="d-flex align-items-center justify-content-center">
          {animal.name}
        </Card.Title>
        <Card.Text>
          Location: {animal.location}
          <br />
          Type: {animal.type}
          <br />
          Gender: {animal.gender}
          <br />
          Age: {animal.age}
          <br />
          Weight: {animal.characteristics.weight} kg
          <br />
          Enclosure: {animal.characteristics.enclosure}
          <br />
          Colour: {animal.characteristics.colour}
          <br />
          Assigned Zookeeper:{" "}
          {animal.zookeeper ? animal.zookeeper.name : "None"}
        </Card.Text>
        <div className="d-flex align-items-center justify-content-center flex-column">
          <Button
            style={{ width: "200px" }}
            variant="warning"
            onClick={() => handleAnimalClick(animal)}
          >
            View Animal
          </Button>
          {role === "admin" && (
            <>
              <Button
                className="mt-2"
                style={{ width: "200px" }}
                variant="danger"
                onClick={() => handleDeleteAnimal(animal.id)}
              >
                Delete Animal
              </Button>
              <Button
                className="mt-2"
                style={{ width: "200px" }}
                variant="primary"
                onClick={() => onEditClick(animal)}
              >
                Edit Animal
              </Button>
            </>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default AnimalCard;
