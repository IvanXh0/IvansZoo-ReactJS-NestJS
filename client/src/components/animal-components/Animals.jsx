import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import AnimalList from "./AnimalList";
import ViewAnimalModal from "./ViewAnimalModal";
import "./Animals.css";
import { toast } from "react-toastify";
import EditAnimalModal from "./EditAnimalModal";
import api from "../auth/axiosInstance";

const Animals = () => {
  const [animals, setAnimals] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchAnimals();
  }, []);

  const fetchAnimals = async () => {
    try {
      const response = await api.get("/api/animals");
      setAnimals(response.data);
    } catch (error) {
      console.error("Error fetching animals:", error);
    }
  };

  const handleAnimalClick = (animal) => {
    setSelectedAnimal(animal);
    setShowModal(true);
  };

  const handleDeleteAnimal = async (id) => {
    try {
      await api.delete(`/api/animals/${id}`);
      toast("Successfully deleted animal!", {
        position: "top-right",
        autoClose: 1300,
      });
      updateAnimals();
    } catch (error) {
      console.log("Error deleting animal", error);
    }
  };

  const handleEditAnimal = (animal) => {
    setSelectedAnimal(animal);
    setShowEditModal(true);
  };

  const handleUpdateAnimal = async (updatedAnimal) => {
    try {
      await api.put(`/api/animals/${updatedAnimal.id}`, updatedAnimal);

      toast("Successfully updated animal!", {
        position: "top-right",
        autoClose: 1300,
      });

      setShowEditModal(false);
      setSelectedAnimal(null);
      updateAnimals();
    } catch (error) {
      console.log("Error updating animal", error);
    }
  };

  const updateAnimals = () => {
    fetchAnimals();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowEditModal(false);
    setSelectedAnimal(null);
  };

  return (
    <>
      <Container className="mt-3">
        <h2>All animals in our zoo</h2>
        <AnimalList
          animals={animals}
          onEditClick={handleEditAnimal}
          handleAnimalClick={handleAnimalClick}
          handleDeleteAnimal={handleDeleteAnimal}
          role={role}
          updateAnimals={updateAnimals}
        />
      </Container>
      <ViewAnimalModal
        showModal={showModal}
        onCloseModal={handleCloseModal}
        selectedAnimal={selectedAnimal}
        onEditClick={handleEditAnimal}
      />
      <EditAnimalModal
        showModal={showEditModal}
        onCloseModal={handleCloseModal}
        selectedAnimal={selectedAnimal}
        onUpdateAnimal={handleUpdateAnimal}
      />
    </>
  );
};

export default Animals;
