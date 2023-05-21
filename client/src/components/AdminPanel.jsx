import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { toast } from "react-toastify";

const AdminPanel = () => {
  const [show, setShow] = useState(false);
  const [selectedAnimalId, setSelectedAnimalId] = useState("");
  const [selectedZookeeperId, setSelectedZookeeperId] = useState("");
  const [animals, setAnimals] = useState([]);
  const [zookeepers, setZookeepers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [users, setUsers] = useState([]);
  const [userRole, setUserRole] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChangeUserRole = async () => {
    if (!selectedUserId) {
      toast.error("Please select a user and role!", {
        autoClose: 2000,
      });
      return;
    }

    try {
      await axios.patch(`/api/user/${selectedUserId}/role/${userRole}`);

      handleClose();
      toast("Successfully changed user role!", {
        position: "top-right",
        autoClose: 1300,
      });


      fetchUsers()
      setSelectedUserId("");
      setUserRole("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleAssignAnimal = async () => {
    if (!selectedAnimalId || !selectedZookeeperId) {
      handleClose();
      toast.error("Please select both an animal and zookeeper to delete!", {
        autoClose: 2000,
      });
      return;
    }

    try {
      await axios.patch(`/api/zookeepers/${selectedZookeeperId}/animals`, {
        animalIds: [selectedAnimalId],
      });

      toast("Successfully assigned animal!", {
        position: "top-right",
        autoClose: 1300,
      });

      setTimeout(() => {
        window.location.reload();
      }, 2000);

      handleClose();
      setSelectedAnimalId("");
      setSelectedZookeeperId("");
    } catch (error) {
      console.error("Error assigning animal:", error);
      alert("Failed to assign the animal.");
    }
  };

  useEffect(() => {
    fetchAnimals();
    fetchZookeepers();
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/user/");
      setUsers(response.data);
    } catch (error) {
      console.log("Error fetching users", error);
    }
  };

  const fetchAnimals = async () => {
    try {
      const response = await axios.get("/api/animals");
      setAnimals(response.data);
    } catch (error) {
      console.error("Error fetching animals:", error);
    }
  };

  const fetchZookeepers = async () => {
    try {
      const response = await axios.get("/api/zookeepers");
      setZookeepers(response.data);
    } catch (error) {
      console.error("Error fetching zookeepers:", error);
    }
  };

  return (
    <>
      <Button variant="secondary" size="sm" onClick={handleShow}>
        Admin Panel
      </Button>

      <Offcanvas placement="end" show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Admin Panel</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Container>
            <Row className="justify-content-center">
              <Col xs={12} md={8}>
                <h2 className="text-center">Assign Animals</h2>
                <Form>
                  <Form.Group controlId="formZookeeper">
                    <Form.Label>Select a zookeeper</Form.Label>
                    <Form.Select
                      value={selectedZookeeperId}
                      onChange={(e) => setSelectedZookeeperId(e.target.value)}
                    >
                      <option value="" disabled>
                        Select a zookeeper
                      </option>
                      {zookeepers.map((zookeeper) => (
                        <option key={zookeeper.id} value={zookeeper.id}>
                          {zookeeper.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mt-2" controlId="formAnimal">
                    <Form.Label>Select an animal to assign</Form.Label>
                    <Form.Select
                      value={selectedAnimalId}
                      onChange={(e) => setSelectedAnimalId(e.target.value)}
                    >
                      <option value="" disabled>
                        Select an animal to assign
                      </option>
                      {animals.map((animal) => (
                        <option key={animal.id} value={animal.id}>
                          {animal.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <div className="text-center">
                    <Button
                      variant="primary"
                      className="mt-3"
                      onClick={handleAssignAnimal}
                    >
                      Assign
                    </Button>
                  </div>
                </Form>
              </Col>
            </Row>
          </Container>

          <Container>
            <Row className="justify-content-center mt-3">
              <Col xs={12} md={8}>
                <h2 className="text-center">Change user role</h2>
                <Form>
                  <Form.Group controlId="formUser">
                    <Form.Label>Select a user</Form.Label>
                    <Form.Select
                      value={selectedUserId}
                      onChange={(e) => setSelectedUserId(e.target.value)}
                    >
                      <option value="" disabled>
                        Select a user
                      </option>
                      {users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name} - {user.username} - {user.role}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mt-2" controlId="formRole">
                    <Form.Label>Select role</Form.Label>
                    <Form.Select
                      value={userRole}
                      onChange={(e) => setUserRole(e.target.value)}
                    >
                      <option value="" disabled>
                        Select a role
                      </option>

                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </Form.Select>
                  </Form.Group>

                  <div className="text-center">
                    <Button
                      variant="primary"
                      className="mt-3"
                      onClick={handleChangeUserRole}
                    >
                      Change
                    </Button>
                  </div>
                </Form>
              </Col>
            </Row>
          </Container>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default AdminPanel;
