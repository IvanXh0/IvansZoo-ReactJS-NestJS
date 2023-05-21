import React, { useEffect, useState } from "react";
import { Button, Form, Modal, ModalBody, ModalHeader } from "react-bootstrap";

const EditAnimalModal = (
  { showModal, onCloseModal, selectedAnimal, onUpdateAnimal },
) => {
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

  useEffect(() => {
    if (selectedAnimal) {
      setName(selectedAnimal.name);
      setType(selectedAnimal.type);
      setAge(selectedAnimal.age);
      setLocation(selectedAnimal.location);
      setGender(selectedAnimal.gender);
      const {food, colour, isDangerous, weight, enclosure} = selectedAnimal.characteristics
      setFood(food.join(', '));
      setColour(colour);
      setIsDangerous(isDangerous);
      setWeight(weight);
      setEnclosure(enclosure);
    }
  }, [selectedAnimal]);

  const handleUpdateAnimal = () => {
    const updatedAnimal = {
      id: selectedAnimal.id,
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
    };
    onUpdateAnimal(updatedAnimal);
  };
  return (
    <Modal show={showModal} onHide={onCloseModal}>
      <ModalHeader>Edit Animal</ModalHeader>
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
              <option value="svana">Savana</option>
              <option value="ocean">Ocean</option>
              <option value="rainforest">Rainforest</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </ModalBody>
      <Modal.Footer>
        <Button
          onClick={onCloseModal}
          variant="secondary"
          type="submit"
        >
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdateAnimal}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditAnimalModal;
