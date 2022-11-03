import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

export const Edit = (orderTypeKey) => {
  const [orderItem, setOrderItem] = useState([{}])
  const [items, setItems] = useState([{}])
  useEffect(() => {
    fetch('/MenuItem/' + orderTypeKey + '/edit').then(
      response => response.json()
    ).then(data => setOrderItem(data.orderItem))
    .then(data => setItems(data.items))
  }, []);

  return (
    <>
      <div className="p-3">
      <Card>
          <Card.Header>
            <h3 className="d-inline align-middle">Edit</h3>
          </Card.Header>
          <Card.Body>
            <Form autoComplete="off" method="post">
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control name="name"/>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Nickname</Form.Label>
                <Form.Control name="nickname"/>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Type</Form.Label>
                <Form.Control name="type" list="typeList"/>
                <datalist id="typeList">
                  <option value="Burrito"></option>
                  <option value="Taco"></option>
                  <option value="Bowl"></option>
                  <option value="Salad"></option>
                  <option value="Side"></option>
                  <option value="Drink"></option>
                </datalist>

              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control name="price"/>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Orderable</Form.Label>
                <Form.Select>
                  <option value="1">TRUE</option>
                  <option value="0">FALSE</option>
                </Form.Select>
              </Form.Group>


              <Form.Group className="mb-3">
                <Form.Label>Main Item</Form.Label>
                <Form.Select>
                {
                  items.forEach(element => {
                    <option value={element.item_id}>{element.name}</option>
                  })
                }
                </Form.Select>
              </Form.Group>

              <Button type="submit" variant="primary">Submit</Button>
              <Button variant="sencondary">Cancel</Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};
