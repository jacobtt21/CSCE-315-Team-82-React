import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

import Axios from 'axios';

import {Link} from "react-router-dom";
// Set initial formatting for price
function formatPrice(price) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return formatter.format(price);
}
// Fetch inventory
export const Inventory = () => {

  const [InventoryItems, setInventoryItems] = useState([]);

  useEffect(()=>{
    Axios.get(process.env.REACT_APP_API_URL + '/fetch-items')
      .then(res => {
        const InventoryItems = res.data;
        setInventoryItems(InventoryItems);
      })
  },[]);

  return (
    <>
      <div class="container py-4">
        <header class="pb-3 mb-4 border-bottom">
          <a href="/" class="d-flex align-items-center text-dark text-decoration-none">
            <span class="fs-4">Inventory Items</span>
          </a>
        </header>
        <Card>
          <Card.Header>
          <h4 className="d-inline  align-middle">Table</h4> <Badge pill bg="secondary" className="d-inline align-middle">{InventoryItems.length}</Badge>
          <Link to="Inventory/new"><Button variant="primary" className="float-end d-inline">Add Item</Button></Link>
          </Card.Header>
          <Card.Body>
            <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Key</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Minimum Needed</th>
                    <th>Type</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    InventoryItems.sort((a, b) => {
                      if (a.item_id < b.item_id) {
                        return -1;
                      } else {
                        return 1;
                      }
                    }).map((item) => (
                      <tr key={item.item_id}>
                        <td>{item.item_id}</td>
                        <td>{item.name}</td>
                        <td>{formatPrice(item.price)}</td>
                        <td>{item.quantity}</td>
                        <td>{item.minimum_needed}</td>
                        <td><span class="badge bg-secondary">{(item.type || "").toUpperCase() || "NONE"}</span></td>
                        <td><Link to={`InventoryItems/${item.item_id}/edit`}>edit</Link></td>
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
