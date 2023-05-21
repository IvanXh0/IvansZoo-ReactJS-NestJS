import React, { useEffect, useState } from "react";
import axios from "axios";
import ZookeepersList from "./ZookeepersList";
import ViewZookeeperModal from "./ViewZookeeperModal";
import "./Zookeepers.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditZookeeperModal from "./EditZookeeperModal";

const Zookeepers = () => {
  const [zookeepers, setZookeepers] = useState([]);
  const [selectedZookeeper, setSelectedZookeeper] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchZookeepers();
  }, []);

  const fetchZookeepers = async () => {
    try {
      const response = await axios.get("/api/zookeepers");
      setZookeepers(response.data);
    } catch (error) {
      console.log("Error fetching zookeepers", error);
    }
  };

  const handleZookeeperClick = async (id) => {
    try {
      const response = await axios.get(`/api/zookeepers/${id}`);
      setSelectedZookeeper(response.data);
      setShowModal(true);
    } catch (error) {
      console.log("Error fetching zookeeper details", error);
    }
  };

  const handleDeleteZookeeper = async (id) => {
    try {
      await axios.delete(`/api/zookeepers/${id}`);

      setZookeepers((prevZookeepers) =>
        prevZookeepers.filter((zookeeper) => zookeeper.id !== id)
      );

      toast("Successfully deleted zookeeper!", {
        position: "top-right",
        autoClose: 1300,
      });
    } catch (error) {
      console.log("Error deleting zookeeper", error);
    }
  };

  const handleEditZookeeper = (zookeeper) => {
    setSelectedZookeeper(zookeeper);
    setShowEditModal(true);
  };

  const handleUpdateZookeeper = async (updatedZookeeper) => {
    try {
      await axios.put(
        `/api/zookeepers/${updatedZookeeper.id}`,
        updatedZookeeper,
      );

      toast("Successfully updated zookeeper!", {
        position: "top-right",
        autoClose: 1300,
      });

      setShowEditModal(false);
      setSelectedZookeeper(null);

      fetchZookeepers();
    } catch (error) {
      console.log("Error updating zookeeper", error);
    }
  };

  const updateZookeepers = () => {
    fetchZookeepers();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowEditModal(false);
    setSelectedZookeeper(null);
  };

  return (
    <>
      <ZookeepersList
        zookeepers={zookeepers}
        onViewClick={handleZookeeperClick}
        onDeleteClick={handleDeleteZookeeper}
        onEditClick={handleEditZookeeper}
        isAdmin={role === "admin"}
        updateZookeepers={updateZookeepers}
      />
      <ViewZookeeperModal
        showModal={showModal}
        onCloseModal={handleCloseModal}
        selectedZookeeper={selectedZookeeper}
        onEditClick={handleEditZookeeper} 
      />
      <EditZookeeperModal
        showModal={showEditModal}
        onCloseModal={handleCloseModal}
        selectedZookeeper={selectedZookeeper}
        onUpdateZookeeper={handleUpdateZookeeper}
      />
    </>
  );
};

export default Zookeepers;
