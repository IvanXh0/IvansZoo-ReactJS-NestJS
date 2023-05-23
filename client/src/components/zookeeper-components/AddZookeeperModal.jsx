import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { toast } from "react-toastify";
import api from '../auth/axiosInstance'

const AddZookeeperModal = ({updateZookeepers}) => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [isActive, setIsActive] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddNewZookeeper = async (e) => {
    e.preventDefault();
    try {
      await api.post("api/zookeepers/", {
        name,
        age: parseInt(age),
        location,
        isActive,
      });

      toast("Successfully added zookeeper!", {
        position: "top-right",
        autoClose: 1300,
      });

      updateZookeepers()
      setShowModal(false);
   //   setTimeout(() => {
     //   window.location.reload();
      //}, 2000);
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
        <ModalHeader>Add New Zookeeper</ModalHeader>
        <ModalBody>
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the name of the zookeeper"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="age">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter the age of the zookeeper"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the location of the zookeeper"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="isActive">
              <Form.Check
                type="checkbox"
                label="Is the zookeeper active?"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
              />
            </Form.Group>

            <Button
              onClick={handleAddNewZookeeper}
              className="mt-3"
              variant="success"
              type="submit"
            >
              Add Zookeeper
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default AddZookeeperModal;
