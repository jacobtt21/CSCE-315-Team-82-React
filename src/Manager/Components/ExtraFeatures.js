import React from "react";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';


export const ExtraFeatures = () => {
  const [description, setDescription] = useState("");
  const handleChange = (event) => {setDescription((event).target.value)}
  const handleSubmit = (event) => {(event).preventDefault(); console.log(description)}
  return (
    <div>
      <Card>
          <Card.Header>
            <h3 className="d-inline align-middle">Extra Features</h3>
          </Card.Header>
          <Card.Body>
      <p>Enter Date</p>
      <form>
        <input
          type = "text"
          name = "description"
          id="description"
          value={description}
          onChange={handleChange}>
        </input>
      </form>
      <p ></p>
      <Button variant="primary">Sales Report</Button>
      <Button variant="primary">Excess Inventory Report</Button>
      <Button variant="primary">Sale Bundle Report</Button>
      </Card.Body>
      </Card>
    </div>
  );
};