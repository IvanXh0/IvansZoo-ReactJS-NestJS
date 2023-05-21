import React from "react";
import { Modal, ModalHeader, ModalBody, ModalTitle } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";

const ViewZookeeperModal = ({ showModal, onCloseModal, selectedZookeeper }) => {
 
  return (
    <Modal show={showModal} onHide={onCloseModal}>
      <ModalHeader closeButton>
        <ModalTitle>Zookeeper Details</ModalTitle>
      </ModalHeader>
      <ModalBody>
        {selectedZookeeper && (
          <div>
            <p>
              <span className="zookeeper-property">ID:</span>{" "}
              {selectedZookeeper.id}
            </p>
            <p>
              <span className="zookeeper-property">Name:</span>{" "}
              {selectedZookeeper.name}
            </p>
            <p>
              <span className="zookeeper-property">Age:</span>{" "}
              {selectedZookeeper.age}
            </p>
            <p>
              <span className="zookeeper-property">Location:</span>{" "}
              {selectedZookeeper.location}
            </p>
            <p>
              <span className="zookeeper-property">Activity:</span>{" "}
              {selectedZookeeper.isActive ? "Active" : "Inactive"}
            </p>
            {selectedZookeeper.animals.length !== 0 && (
              <p className="zookeeper-property d-flex justify-content-center">
                Animals Assigned:
              </p>
            )}
            <ListGroup>
              {selectedZookeeper.animals.map((animal) => (
                <ListGroup.Item key={animal.id}>
                  <span className="animal-property">Animal ID:</span>{" "}
                  {animal.id}
                  <br />
                  <span className="animal-property"> Animal Name:</span>{" "}
                  {animal.name}
                  <br />
                  <span className="animal-property"> Age:</span> {animal.age}
                  <br />
                  <span className="animal-property"> Location:</span>{" "}
                  {animal.location}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        )}
      </ModalBody>
    </Modal>
  );
};

export default ViewZookeeperModal;
