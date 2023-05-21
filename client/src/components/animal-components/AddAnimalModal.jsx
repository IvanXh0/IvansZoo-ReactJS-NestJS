import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  Form,
  Modal,
  ModalBody,
  ModalHeader,
} from "react-bootstrap";
import { toast } from "react-toastify";

const AddAnimalModal = ({ updateAnimals }) => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [gender, setGender] = useState("");
  const [food, setFood] = useState("");
  const [colour, setColour] = useState("");
  const [isDangerous, setIsDangerous] = useState(false);
  const [weight, setWeight] = useState("");
  const [enclosure, setEnclosure] = useState("");

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddNewAnimal = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/animals", {
        name,
        type,
        age: parseInt(age),
        location,
        gender,
        characteristics: {
          food: food.split(",").map((item) => item.trim()),
          colour,
          isDangerous,
          weight: parseInt(weight),
          enclosure,
        },
      });
      toast("Successfully added animal!", {
        position: "top-right",
        autoClose: 1300,
      });
      updateAnimals();
      setShowModal(false)
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  const ViewModal = () => {
    setShowModal(true);
  };

  return (
    <>
      <Card
        bg="dark"
        text="white"
        className="zookeeper-card"
        style={{ width: "18rem" }}
      >
        <Card.Body className="d-flex align-items-center justify-content-center">
          <Button size="lg" variant="success" onClick={ViewModal}>
            +
          </Button>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleCloseModal}>
        <ModalHeader>Add New Animal</ModalHeader>
        <ModalBody>
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the name of the animal"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="type">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the type of the animal"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="age">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter the age of the animal"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the location of the animal"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="gender">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option disabled value="">
                  Select gender
                </option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="food">
              <Form.Label>Food</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the food of the animal (comma-separated)"
                value={food}
                onChange={(e) => setFood(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="colour">
              <Form.Label>Colour</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the colour of the animal"
                value={colour}
                onChange={(e) => setColour(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="isDangerous">
              <Form.Check
                type="checkbox"
                label="Is Dangerous"
                checked={isDangerous}
                onChange={(e) => setIsDangerous(e.target.checked)}
              />
            </Form.Group>

            <Form.Group controlId="weight">
              <Form.Label>Weight</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter the weight of the animal"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="enclosure">
              <Form.Label>Enclosure</Form.Label>
              <Form.Select
                value={enclosure}
                onChange={(e) => setEnclosure(e.target.value)}
              >
                <option disabled value="">
                  Select enclosure
                </option>
                <option value="mountain">Mountain</option>
                <option value="ice">Ice</option>
                <option value="water">Water</option>
                <option value="jungle">Jungle</option>
                <option value="desert">Desert</option>
                <option value="savana">Savana</option>
                <option value="ocean">Ocean</option>
                <option value="rainforest">Rainforest</option>
              </Form.Select>
            </Form.Group>

            <Button
              onClick={handleAddNewAnimal}
              className="mt-3"
              variant="success"
              type="submit"
            >
              Add Animal
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default AddAnimalModal;
