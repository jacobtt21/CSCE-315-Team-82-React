import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';

import Axios from 'axios';

import {Link} from "react-router-dom";

function myFunction(price) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return formatter.format(price);
}

export const Server = () => {

  const [menuItems, setMenuItems] = useState([]);

  useEffect(()=>{
    Axios.get('http://127.0.0.1:5000/fetch-menu-items')
      .then(res => {
        const menuItems = res.data;
        setMenuItems(menuItems);
      })
  },[]);

  return (
    <>
      <div className="p-3">
        <Card>
          <Card.Header>
            <h3 className="d-inline align-middle">Menu Items</h3>
            <Button variant="primary" className="float-end d-inline" href="MenuItem/new">Checkout</Button>
          </Card.Header>
          <Card.Body>
            <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    menuItems.sort((a, b) => {
                      if (a.order_id < b.order_id) {
                        return -1;
                      } else {
                        return 1;
                      }
                    }).map((item) => (
                      <tr key={item.order_id}>
                        <td>{item.orderable ? item.name : ""}</td>
                        <td>{item.orderable ? myFunction(item.price) : ""}</td>
                        <td>{item.orderable ? <Button variant="primary" className="d-inline align-middle" href="MenuItem/new">Add to Order</Button>: ""}</td>
                      </tr>
                      )
                    )
                  }
                </tbody>
              </Table>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};