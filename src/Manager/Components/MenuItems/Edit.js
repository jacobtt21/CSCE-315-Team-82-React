import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import InputGroup from 'react-bootstrap/InputGroup';

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

export const Edit = () => {

  const [submitted, setSubmitted] = useState("");
  const [deleted, setDeleted] = useState("");

  const [orderType, setOrderType] = useState([]);
  const [items, setItems] = useState([]);

  const { id } = useParams();

  useEffect(()=>{
    Axios.get(process.env.REACT_APP_API_URL+`/get-order-type/${id}`)
      .then(res => {
        const orderType = res.data;
        setOrderType(orderType[0]);
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
    Axios.post(process.env.REACT_APP_API_URL+`/edit-menu-item/${id}`, formData, {})
      .then((res) => {
        setSubmitted(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const deleteHandler = () => {
    // e.preventDefault();
    Axios.post(process.env.REACT_APP_API_URL+`/delete-menu-item/${id}`)
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
              <Button variant="danger" onClick={() => {if(window.confirm('Are you sure you want to delete this item?')){ deleteHandler()};}} className="float-end d-inline">Delete Menu Item</Button>
            </Card.Header>
            <Card.Body>
              <Form autoComplete="off" onSubmit={onSubmitHandler}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control name="name" defaultValue={orderType.name}/>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Nickname</Form.Label>
                  <Form.Control name="nickname" defaultValue={orderType.nickname}/>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Type</Form.Label>
                  <Form.Control name="type" list="typeList" defaultValue={orderType.type}/>
                  <datalist id="typeList">
                    <option value="Burrito">Burrito</option>
                    <option value="Taco">Taco</option>
                    <option value="Bowl">Bowl</option>
                    <option value="Salad">Salad</option>
                    <option value="Side">Side</option>
                    <option value="Drink">Drink</option>
                  </datalist>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>$</InputGroup.Text>
                    <Form.Control
                      name="price"
                      defaultValue={orderType.price}
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Orderable</Form.Label>
                  <Form.Select name="orderable">
                    {console.log(orderType.orderable)}
                    {option("TRUE", "TRUE", orderType.orderable)}
                    {option("FALSE", "FALSE", orderType.orderable)}
                  </Form.Select>
                </Form.Group>


                <Form.Group className="mb-3">
                  <Form.Label>Main Item</Form.Label>
                  <Form.Select name="item_key">
                  {
                    items.map(function(e) {
                      return option(e.item_id, e.name, orderType.item_key);
                    })
                  }
                  { option("", "NONE", "") }
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control name="image" defaultValue={orderType.image}/>
                </Form.Group>


                <Button type="submit" variant="primary">Submit</Button>
                <Link to={"/MenuItems"}><Button variant="secondary">Cancel</Button></Link>

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
                You have successfully deleted a menu item. Scary!
              </p>
              <hr />
                <Link to={"/MenuItems"}><Button variant="light">Back</Button></Link>
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
                You have successfully updated a menu item. I'm proud of you. Good job.
              </p>
              <hr />
                <Link to={"/MenuItems"}><Button variant="light">Back</Button></Link>
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
