import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';

export const MenuItems = () => {
  const [menuItems, setMenuItems] = useState([{}])
  useEffect(() => {
    fetch('/fetch').then(
      response => response.json()
    ).then(data => setMenuItems(data.menuItems))
  }, []);

  return (
    <>
      <div className="p-3">
        <Card>
          <Card.Header>
            <h3 className="d-inline align-middle">Menu Items</h3>
            <Button variant="primary" className="float-end d-inline" href="MenuItem/new">Add Menu Item</Button>
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
                    menuItems.map((item) => (
                      <tr key={item.orderTypeKey}>
                        <td>{item.orderTypeKey}</td>
                        <td>{item.name}</td>
                        <td>{item.nickName}</td>
                        <td>{item.type}</td>
                        <td>{item.price}</td>
                        <td>{item.orderable}</td>
                        <td>{item.mainItem}</td>
                        <td><a href={"MenuItem/" + item.orderTypeKey + "/edit"}>edit</a></td>
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
