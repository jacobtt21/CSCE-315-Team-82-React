import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';

import Axios from 'axios';

import {Link} from "react-router-dom";

function formatPrice(price) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return formatter.format(price);
}

export const Inventory = () => {

  const [InventoryItems, setInventoryItems] = useState([]);

  useEffect(()=>{
    Axios.get(process.env.REACT_APP_API_URL+'/fetch-items')
      .then(res => {
        const InventoryItems = res.data;
        console.log(InventoryItems);
        setInventoryItems(InventoryItems);
      })
  },[]);

  return (
    <>
      <div className="p-3">
        <Card>
          <Card.Header>
            <h3 className="d-inline align-middle">Inventory Items</h3>
          </Card.Header>
          <Card.Body>
            <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Key</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Type</th>
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
                        <td>{item.type}</td>
                        <td><Link to={`InventoryItems/${item.item_id}`}>edit</Link></td>
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
