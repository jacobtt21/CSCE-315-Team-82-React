import React from "react";
import Card from 'react-bootstrap/Card';

export default function FoodCard({ item }) {
  return (
    <div>
      <Card>
        <Card.Header>
          <h3 className="d-inline align-middle">{item}</h3>
        </Card.Header>
      </Card>
    </div>
  )
};