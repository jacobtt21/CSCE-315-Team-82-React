import React from "react";
import Button from "react-bootstrap/Button";
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';

export const MenuItems = () => {
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
                    <tr>
                      <td>1</td>
                      <td>Example Name</td>
                      <td>Example Nickname</td>
                      <td>Example Type</td>
                      <td>Example Price</td>
                      <td>Example Orderable</td>
                      <td>Example Main Item</td>
                      <td><a href="MenuItem/1/edit">edit</a></td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Example Name</td>
                      <td>Example Nickname</td>
                      <td>Example Type</td>
                      <td>Example Price</td>
                      <td>Example Orderable</td>
                      <td>Example Main Item</td>
                      <td><a href="MenuItem/2/edit">edit</a></td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Example Name</td>
                      <td>Example Nickname</td>
                      <td>Example Type</td>
                      <td>Example Price</td>
                      <td>Example Orderable</td>
                      <td>Example Main Item</td>
                      <td><a href="MenuItem/3/edit">edit</a></td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Example Name</td>
                      <td>Example Nickname</td>
                      <td>Example Type</td>
                      <td>Example Price</td>
                      <td>Example Orderable</td>
                      <td>Example Main Item</td>
                      <td><a href="MenuItem/4/edit">edit</a></td>
                    </tr>
                </tbody>
              </Table>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};
