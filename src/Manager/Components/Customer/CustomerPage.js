import React from "react";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Grid from "./Grid";
import Card from 'react-bootstrap/Card';


export const CustomerPage = () => {
  const [food, setFood] = useState("");

  useEffect(() => {
    getFood()
  }, []);

  const getFood = async () => {
    // Call Data from server here and set it as food using setFood
    let data = ["Nachos", "drinks", "Water"]
    setFood(data)
  }

  return food ?(
    <div>
      <Card>
        <Card.Header>
          <h3 className="d-inline align-middle">Welcome to Cabo Grill!</h3>
          </Card.Header>
          <Card.Body>
            <Button variant="primary">Food</Button>
            <Button variant="primary">Drinks</Button>
          </Card.Body>
      </Card>
      <Grid foods={food} />
    </div>
  ) : (
    <div>
      <h1>Loading</h1>
    </div>
  );
};