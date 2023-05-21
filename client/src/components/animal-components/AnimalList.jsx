import React from "react";
import AnimalCard from "./AnimalCard";
import AddAnimalModal from "./AddAnimalModal";

const AnimalList = ({
  animals,
  handleAnimalClick,
  handleDeleteAnimal,
  role,
  onEditClick,
  updateAnimals,
}) => {
  return (
    <div className="animal-card">
      {animals.map((animal) => (
        <AnimalCard
          key={animal.id}
          animal={animal}
          handleAnimalClick={handleAnimalClick}
          handleDeleteAnimal={handleDeleteAnimal}
          role={role}
          onEditClick={onEditClick}
        />
      ))}
      {role === "admin" && <AddAnimalModal updateAnimals={updateAnimals} />}
    </div>
  );
};

export default AnimalList;
