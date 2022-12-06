import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import InputGroup from 'react-bootstrap/InputGroup';
// import Calendar from 'react-calendar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

import { useParams, Link } from "react-router-dom";
import Axios from 'axios';


export const PairingsReport = () => {
  const [Item1, setItem1] = useState([]);
  const [Item2, setItem2] = useState([]);
  const [submitted, setSubmitted] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");

  const onSubmitHandler = e => {
    e.preventDefault();
    Axios.get(process.env.REACT_APP_API_URL+`/get-pairings-report/${start_date}/${end_date}`)
      .then((res) => {
        setSubmitted(true);
        // const excessItems = res.data;
        // console.log(excessItems);
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
                <Form.Control name="start date" onChange={(e) => setStartDate(e.target.value)} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>End Date</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control name="end date" onChange={(e) => setEndDate(e.target.value)} />
                </InputGroup>
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
          <Card.Title>Items in sold together:</Card.Title>
          <Card.Text>
          {Item1.map(item1 => (
            <li key={item1.frequency}> {item1.item_1} & {item1.item_2}: {item1.frequency}</li>
          ))}
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
