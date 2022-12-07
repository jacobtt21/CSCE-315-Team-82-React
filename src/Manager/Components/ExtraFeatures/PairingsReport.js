import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import InputGroup from 'react-bootstrap/InputGroup';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

import { useParams, Link } from "react-router-dom";
import Axios from 'axios';


export const PairingsReport = () => {
  const [Item1, setItem1] = useState([]);
  const [submitted, setSubmitted] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");


  console.log(start_date)

  const onSubmitHandler = e => {
    e.preventDefault();
    Axios.get(process.env.REACT_APP_API_URL+`/get-pairings-report/${start_date}/${end_date}`)
      .then((res) => {
        setSubmitted(true);
        return res.data
      })
      .then((data) => {
        setItem1(data);
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
          <Card.Body>
            <Form autoComplete="off" onSubmit={onSubmitHandler}>
              <Form.Group className="mb-3">
                <Form.Label>Start Date</Form.Label>
                <Form.Control id="start_date" onChange={(e) => setStartDate(e.target.value)} />
                {/* <DatePicker name="start_date" dateFormat="MM-DD-YYYY" onChange={(e) => setStartDate(e)}/> */}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>End Date</Form.Label>
                <Form.Control id="end_date" onChange={(e) => setEndDate(e.target.value)} />
                {/* <DatePicker name="end_date" dateFormat="MM-DD-YYYY" onChange={(e) => setEndDate(e)}/> */}
              </Form.Group>

              <Button type="submit" variant="primary" className="me-1">Submit</Button>
              <Link to={"/ExtraFeatures"}><Button variant="secondary">Back</Button></Link>

            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
    )
  }

  const htmlSubmitted = () => {
    return (
      <Card style={{
        backgroundColor: "#eee",
        padding: 16,
        minHeight: 70,
        display: "flex",
        alignItems: "center",
        textAlign: "center"
      }}>
        <Card.Body>
          <Card.Title>Items that sold together:</Card.Title>
          <Card.Text>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>First Item</th>
                  <th>Second Item</th>
                  <th>Frequency</th>
                </tr>
              </thead>
              <tbody>
                {Item1.map(item1 => (
                  <tr key={item1.frequency}>
                    <td>{item1.item_1}</td>
                    <td>{item1.item_2}</td>
                    <td>{item1.frequency}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Text>
          <Link to={"/ExtraFeatures"}><Button variant="primary">Done</Button></Link>
        </Card.Body>
      </Card>
    );
  }

  if (submitted) {
    return htmlSubmitted();
  } else {
    return htmlForm();
  }
}
