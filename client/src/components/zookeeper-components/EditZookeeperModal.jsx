import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const EditZookeeperModal = ({
  showModal,
  onCloseModal,
  selectedZookeeper,
  onUpdateZookeeper,
}) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (selectedZookeeper) {
      setName(selectedZookeeper.name);
      setAge(selectedZookeeper.age);
      setLocation(selectedZookeeper.location);
      setIsActive(selectedZookeeper.isActive);
    }
  }, [selectedZookeeper]);

  const handleUpdateZookeeper = () => {
    const updatedZookeeper = {
      id: selectedZookeeper.id,
      name,
      age: parseInt(age),
      location,
      isActive,
    };
    onUpdateZookeeper(updatedZookeeper);
  };

  return (
    <>
      <Modal show={showModal} onHide={onCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Zookeeper</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formActivity">
              <Form.Check
                type="checkbox"
                label="Active"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateZookeeper}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditZookeeperModal;
