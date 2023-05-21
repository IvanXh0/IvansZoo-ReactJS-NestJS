import React from "react";
import { Modal } from "react-bootstrap";

const ViewAnimalModal = ({ showModal, onCloseModal, selectedAnimal }) => {
  return (
    <Modal show={showModal} onHide={onCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Animal Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedAnimal && (
          <div>
            <p>
              <span className="animal-property">ID:</span> {selectedAnimal.id}
            </p>
            <p>
              <span className="animal-property">Name:</span>{" "}
              {selectedAnimal.name}
            </p>
            <p>
              <span className="animal-property">Age:</span> {selectedAnimal.age}
            </p>
            <p>
              <span className="animal-property">Location:</span>{" "}
              {selectedAnimal.location}
            </p>
            <p>
              <span className="animal-property">Gender:</span>{" "}
              {selectedAnimal.gender}
            </p>
            <p className="animal-property">Food:</p>
            <ul>
              {selectedAnimal.characteristics.food.map((foodItem, index) => (
                <li key={index}>{foodItem}</li>
              ))}
            </ul>
            <p>
              <span className="animal-property">Color:</span>{" "}
              {selectedAnimal.characteristics.colour}
            </p>
            <p>
              <span className="animal-property">Enclosure:</span>{" "}
              {selectedAnimal.characteristics.enclosure}
            </p>
            <p>
              <span className="animal-property">Weight:</span>{" "}
              {selectedAnimal.characteristics.weight}kg
            </p>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ViewAnimalModal;
