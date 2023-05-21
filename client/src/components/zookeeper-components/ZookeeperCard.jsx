import React from "react";
import { Card, Button } from "react-bootstrap";

const ZookeeperCard = ({
  zookeeper,
  onViewClick,
  onDeleteClick,
  onEditClick,
  isAdmin,
}) => {
  return (
    <Card bg="dark" text="white" style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title className="d-flex align-items-center justify-content-center">
          {zookeeper.name}
        </Card.Title>
        <Card.Text>
          Age: {zookeeper.age}
          <br />
          Location: {zookeeper.location}
          <br />
          Activity: {zookeeper.isActive ? "Active" : "Inactive"}
          <br />
          Animals Assigned:{" "}
          {zookeeper.animals.length === 0 ? "None" : zookeeper.animals.length}
        </Card.Text>
        <div className="d-flex align-items-center justify-content-center flex-column">
          <Button
            style={{ width: "200px" }}
            variant="warning"
            href="#"
            onClick={() => onViewClick(zookeeper.id)}
          >
            View Zookeeper
          </Button>
          {isAdmin && (
            <>
              <Button
                className="mt-2"
                style={{ width: "200px" }}
                variant="danger"
                href="#"
                onClick={() => onDeleteClick(zookeeper.id)}
              >
                Delete Zookeeper
              </Button>
              <Button
                className="mt-2"
                style={{ width: "200px" }}
                variant="primary"
                href="#"
                onClick={() => onEditClick(zookeeper)}
              >
                Edit Zookeeper
              </Button>
            </>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ZookeeperCard;
