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

export const New = () => {

  const [submitted, setSubmitted] = useState("");

  const [items, setItems] = useState([]);

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
    console.log(formData);
    Axios.post(process.env.REACT_APP_API_URL+`/new-menu-item`, formData, {})
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
                <Form.Label>Nickname</Form.Label>
                <Form.Control name="nickname" defaultValue=""/>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Type</Form.Label>
                <Form.Control name="type" list="typeList" defaultValue=""/>
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
                    />
                  </InputGroup>
                </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Orderable</Form.Label>
                <Form.Select name="orderable">
                  {option("TRUE", "TRUE", "")}
                  {option("FALSE", "FALSE", "")}
                </Form.Select>
              </Form.Group>


              <Form.Group className="mb-3">
                <Form.Label>Main Item</Form.Label>
                <Form.Select name="item_key">
                {
                  items.map(function(e) {
                    return option(e.item_id, e.name, "NONE");
                  })
                }
                { option("", "NONE", "") }
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control name="image" defaultValue="" />
              </Form.Group>

              <Button type="submit" variant="primary">Submit</Button>
              <Link to={"/MenuItems"}><Button variant="secondary">Cancel</Button></Link>

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
              You just added a new menu item to the database. I'm proud of you. Good job.
            </p>
            <hr />
              <Link to={"/MenuItems"}><Button variant="light">Back</Button></Link>
            </Alert>
        </Card.Body>
      </Card>
    </>
  )
};
