import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

import Axios from 'axios';

import {Link} from "react-router-dom";
// Format price
function priceFormatter(price) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return formatter.format(price);
}
// Fetch current menu items
export const MenuItems = () => {

  const [menuItems, setMenuItems] = useState([]);

  useEffect(()=>{
    Axios.get(process.env.REACT_APP_API_URL + '/fetch-menu-items')
      .then(res => {
        const menuItems = res.data;
        console.log(menuItems);
        setMenuItems(menuItems);
      })
  },[]);

  return (
    <>
      <div class="container py-4">
        <header class="pb-3 mb-4 border-bottom">
          <a href="/" class="d-flex align-items-center text-dark text-decoration-none">
            <span class="fs-4">Menu Items</span>
          </a>
        </header>
        <Card>
          <Card.Header className="d-inline">
          <h4 className="d-inline  align-middle">Table</h4> <Badge pill bg="secondary" className="d-inline align-middle">{menuItems.length}</Badge>
            <Link to="MenuItems/new"><Button variant="primary" className="float-end d-inline">Add Menu Item</Button></Link>
          </Card.Header>
          <Card.Body>
            <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Key</th>
                    <th>Name</th>
                    <th>Nickname</th>
                    <th>Price</th>
                    <th>Type</th>
                    <th>Orderable</th>
                    <th>Main Item</th>
                    <th>Image</th>
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
                        <td>{priceFormatter(item.price)}</td>
                        <td><span class="badge bg-secondary">{(item.type || "").toUpperCase() || "NONE"}</span></td>
                        <td>{item.orderable ? <span class="badge bg-success">TRUE</span> : <span class="badge bg-danger">FALSE</span>}</td>
                        <td>{item.mainitemname ? item.mainitemname : "NONE"}</td>
                        <td>{item.image ? (<a href={item.image} target="_blank">see image</a>) : "NONE"}</td>
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
