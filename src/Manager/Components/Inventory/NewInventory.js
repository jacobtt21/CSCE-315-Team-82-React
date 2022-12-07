import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import InputGroup from 'react-bootstrap/InputGroup';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare} from '@fortawesome/free-solid-svg-icons'

import { Link } from "react-router-dom";
import Axios from 'axios';

function option ( value, display, actual) {

  if (actual === true) actual = "TRUE";
  if (actual === false) actual = "FALSE";

  if (value === actual) {
    return <option value={value} selected>{display}</option>
  }
  return <option value={value}>{display}</option>;
}

export const NewInventory = () => {

  const [submitted, setSubmitted] = useState("");

  const onSubmitHandler = e => {
    e.preventDefault();
    const form = document.querySelector("form");
    const formData = new FormData(form);
    console.log(formData);
    Axios.post(process.env.REACT_APP_API_URL+`/new-item`, formData, {})
      .then((res) => {
        setSubmitted(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return !submitted ? (
    <>
      <div className="p-3">
      <Card>
          <Card.Header>
            <h3 className="d-inline align-middle">New</h3>
          </Card.Header>
          <Card.Body>
            <Form autoComplete="off" onSubmit={onSubmitHandler}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control name="name" defaultValue=""/>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Type</Form.Label>
                <Form.Control name="type" list="typeList" defaultValue=""/>
                <datalist id="typeList">
                  <option value="Packaging">Packaging</option>
                  <option value="Ingredient">Ingredient</option>
                  <option value="Cleaning">Cleaning</option>
                </datalist>
              </Form.Group>

              <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>$</InputGroup.Text>
                    <Form.Control
                      name="price"
                    />
                  </InputGroup>
                </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Quantity</Form.Label>
                <Form.Control name="quantity" defaultValue=""/>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Minimum Needed</Form.Label>
                <Form.Control name="minimum_needed" defaultValue=""/>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Amount Used Per Order</Form.Label>
                <Form.Control name="amount_used_per_order" defaultValue=""/>
              </Form.Group>

              <Button type="submit" variant="primary" className="me-1">Submit</Button>
              <Link to={"/Inventory"}><Button variant="secondary">Cancel</Button></Link>

            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  ) : (
    <>
      <Card>
        <Card.Body>
          <Alert variant="success">
            <Alert.Heading><FontAwesomeIcon icon={faPenToSquare}/> Sucessful Creation!</Alert.Heading>
            <p>
              You just added a new item to the database. I'm proud of you. Good job.
            </p>
            <hr />
              <Link to={"/Inventory"}><Button variant="light">Back</Button></Link>
            </Alert>
        </Card.Body>
      </Card>
    </>
  )
};
