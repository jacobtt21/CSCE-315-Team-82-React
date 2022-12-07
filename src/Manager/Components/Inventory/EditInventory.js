import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

import { useParams, Link } from "react-router-dom";
import Axios from 'axios';

function option ( value, display, actual) {

  if (actual === true) actual = "TRUE";
  if (actual === false) actual = "FALSE";

  if (value === actual) {
    return <option value={value} selected>{display}</option>
  }
  return <option value={value}>{display}</option>;
}

export const EditInventory = () => {

  const [submitted, setSubmitted] = useState("");
  const [deleted, setDeleted] = useState("");

  const [item, setItem] = useState([]);
  const [items, setItems] = useState([]);

  const { id } = useParams();

  useEffect(()=>{
    Axios.get(process.env.REACT_APP_API_URL+`/get-item/${id}`)
      .then(res => {
        const item = res.data;
        setItem(item[0]);
      })
  },[]);

  useEffect(()=>{
    Axios.get(process.env.REACT_APP_API_URL+"/fetch-items")
      .then(res => {
        const items = res.data;
        setItems(items);
        console.log(items);
      })
  },[]);

  const onSubmitHandler = e => {
    e.preventDefault();
    const form = document.querySelector("form");
    const formData = new FormData(form);
    Axios.post(process.env.REACT_APP_API_URL+`/edit-inventory-item/${id}`, formData, {})
      .then((res) => {
        setSubmitted(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const deleteHandler = () => {
    // e.preventDefault();
    Axios.post(process.env.REACT_APP_API_URL+`/delete-item/${id}`)
      .then((res) => {
        setDeleted(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const htmlForm = () => {
    return (
      <>
        <div className="p-3">
        <Card>
            <Card.Header>
              <h3 className="d-inline align-middle">Edit</h3>
              <Button variant="danger" onClick={() => {if(window.confirm('Are you sure you want to delete this item?')){ deleteHandler()};}} className="float-end d-inline">Delete Item</Button>
            </Card.Header>
            <Card.Body>
              <Form autoComplete="off" onSubmit={onSubmitHandler}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control name="name" defaultValue={item.name}/>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control name="quantity" defaultValue={item.quantity}/>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Minimum Needed</Form.Label>
                  <Form.Control name="minimum_needed" defaultValue={item.minimum_needed}/>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Amount Used Per Order</Form.Label>
                  <Form.Control name="amount_used_per_order" defaultValue={item.amount_used_per_order}/>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Type</Form.Label>
                  <Form.Control name="type" list="typeList" defaultValue={item.type}/>
                  <datalist id="typeList">
                    <option value="Packaging">Packaging</option>
                    <option value="Ingredient">Ingredient</option>
                    <option value="Cleaning">Cleaning</option>
                  </datalist>
                </Form.Group>

                <Button type="submit" variant="primary" className="me-1">Submit</Button>
                <Link to={"/Inventory"}><Button variant="secondary">Cancel</Button></Link>

              </Form>
            </Card.Body>
          </Card>
        </div>
      </>
    )
  }

  const htmlDeleted = () => {
    return (
      <>
        <Card>
          <Card.Body>
            <Alert variant="success">
              <Alert.Heading><FontAwesomeIcon icon={faTrash}/> Sucessful Deletion!</Alert.Heading>
              <p>
                You have successfully deleted an item. Scary!
              </p>
              <hr />
                <Link to={"/Inventory"}><Button variant="light">Back</Button></Link>
              </Alert>

          </Card.Body>
        </Card>
      </>
    )
  }

  const htmlSubmitted = () => {
    return (
      <>
        <Card>
          <Card.Body>
            <Alert variant="success">
              <Alert.Heading><FontAwesomeIcon icon={faPenToSquare}/> Sucessful Update!</Alert.Heading>
              <p>
                You have successfully updated a inventory item. I'm proud of you. Good job.
              </p>
              <hr />
                <Link to={"/Inventory"}><Button variant="light">Back</Button></Link>
              </Alert>

          </Card.Body>
        </Card>
      </>
    )
  }

  if (deleted) {
    return htmlDeleted();
  } else if (submitted) {
    return htmlSubmitted();
  } else {
    return htmlForm();
  }

};
