import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import { useParams, Link } from "react-router-dom";
import Axios from 'axios';

function option ( value, display, actual) {

  if (actual === true) actual = "1";
  if (actual === false) actual = "0";

  if (value === actual) {
    return <option value={value} selected>{display}</option>
  }
  return <option value={value}>{display}</option>;
}

export const Edit = (orderTypeKey) => {

  const [orderType, setOrderType] = useState([]);
  const [items, setItems] = useState([]);

  const { id } = useParams();

  useEffect(()=>{
    Axios.get(`http://127.0.0.1:5000/get-order-type/${id}`)
      .then(res => {
        const orderType = res.data;
        setOrderType(orderType[0]);
      })
  },[]);

  useEffect(()=>{
    Axios.get("http://127.0.0.1:5000/fetch-items")
      .then(res => {
        const items = res.data;
        setItems(items);
        console.log(items);
      })
  },[]);

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
                <Form.Control name="name" value={orderType.name}/>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Nickname</Form.Label>
                <Form.Control name="nickname" value={orderType.nickname}/>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Type</Form.Label>
                <Form.Control name="type" list="typeList" value={orderType.type}/>
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
                <Form.Control name="price" value={orderType.price}/>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Orderable</Form.Label>
                <Form.Select>
                  {option("1", "TRUE", orderType.orderable)}
                  {option("0", "FALSE", orderType.orderable)}
                </Form.Select>
              </Form.Group>


              <Form.Group className="mb-3">
                <Form.Label>Main Item</Form.Label>
                <Form.Select>
                {
                  items.map(function(e) {
                    return option(e.item_id, e.name, orderType.item_key);
                  })
                }
                { option("", "NONE", "") }
                </Form.Select>
              </Form.Group>

              <Button type="submit" variant="primary">Submit</Button>
              <Link to={"/MenuItems"}><Button variant="secondary">Cancel</Button></Link>

            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};
