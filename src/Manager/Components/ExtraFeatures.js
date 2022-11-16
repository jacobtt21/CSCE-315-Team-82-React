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
    <>
    <div className="normal-style">
      <Card>
          <Card.Header>
            <h1 className="left">Extra Features</h1>
          </Card.Header>
          <Card.Body>
      <h1>Enter Date</h1>
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
      <button className="btn">Sales Report</button>
      <button className="btn">Excess Inventory Report</button>
      <button className="btn">Sale Bundle Report</button>
      </Card.Body>
      </Card>
    </div>
    <style jsx>{`
    .btn {
      width: 20%;
      margin-left: 10%;
      background-color: #1f5156;
      color: white;
      margin-right: 10%;
      margin-bottom: 5%;
    }
    .left {
      text-align: left;
    }
  `}</style>
  </>
  );
};