import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

import Axios from 'axios';

import {Link} from "react-router-dom";

function myFunction(price) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return formatter.format(price);
}

export const MenuItems = () => {

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
            <h3 className="d-inline align-middle">Menu Items </h3><Badge pill bg="secondary" className="d-inline align-middle">{menuItems.length}</Badge>
            <Link to="MenuItems/new"><Button variant="primary" className="float-end d-inline">Add Menu Item</Button></Link>

          </Card.Header>
          <Card.Body>
            <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Key</th>
                    <th>Name</th>
                    <th>Nickname</th>
                    <th>Type</th>
                    <th>Price</th>
                    <th>Orderable</th>
                    <th>Main Item</th>
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
                        <td>{item.order_id}</td>
                        <td>{item.name}</td>
                        <td>{item.nickname}</td>
                        <td>{item.type}</td>
                        <td>{myFunction(item.price)}</td>
                        <td>{item.orderable ? <span class="badge bg-success">TRUE</span> : <span class="badge bg-danger">FALSE</span>}</td>
                        <td>{item.mainitemname ? item.mainitemname : "NONE"}</td>
                        <td><Link to={`MenuItems/${item.order_id}/edit`}>edit</Link></td>
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
