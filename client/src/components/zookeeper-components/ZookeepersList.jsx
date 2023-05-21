import React from "react";
import { Container } from "react-bootstrap";
import ZookeeperCard from "./ZookeeperCard";
import AddZookeeperModal from "./AddZookeeperModal";

const ZookeepersList = ({
  zookeepers,
  onViewClick,
  onDeleteClick,
  onEditClick,
  isAdmin,
  updateZookeepers
}) => {
  return (
    <Container className="mt-3">
      <h2>All zookeepers in our zoo</h2>
      <div className="zookeeper-card">
        {zookeepers.map((zookeeper) => (
          <ZookeeperCard
            key={zookeeper.id}
            zookeeper={zookeeper}
            onViewClick={onViewClick}
            onDeleteClick={onDeleteClick}
            onEditClick={onEditClick}
            isAdmin={isAdmin}
          />
        ))}
        {isAdmin && <AddZookeeperModal updateZookeepers={updateZookeepers}/>}
      </div>
    </Container>
  );
};

export default ZookeepersList;
