import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import InputGroup from 'react-bootstrap/InputGroup';
import "./Landing.css"

// import Calendar from 'react-calendar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

import { useParams, Link } from "react-router-dom";
import Axios from 'axios';

/*
* What it does: Generates a fleshed out excess report of excess items for a set date range
*/
export const ExcessReport = () => {

  const [item, setItem] = useState([]);
  // Contact database and obtain generated excess report
  useEffect(()=>{
    Axios.get(process.env.REACT_APP_API_URL+`/get-excess-report/9-07-22/9-21-22`)
      .then(response => {
        return response.data
    })
  });

  const [excessItems, setExcessItems] = useState([]);
  const [submitted, setSubmitted] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  console.log(start_date);

  const onSubmitHandler = e => {
    e.preventDefault();
    Axios.get(process.env.REACT_APP_API_URL+`/get-excess-report/${start_date}/${end_date}`)
      .then((res) => {
        setSubmitted(true);
        // const excessItems = res.data;
        // console.log(excessItems);
        return res.data

      })
      .then((data) => {
        setExcessItems(data);
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
                <div className="dateSelect">
                  <input type="date" onChange={e=>setStartDate(e.target.value)}></input>
                </div>

                {/* <Form.Control name="start date" onChange={(e) => setStartDate(e.target.value)} placeholder="MM-DD-YYYY" /> */}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>End Date</Form.Label>
                <InputGroup className="mb-3">
                  <div className="dateSelect">
                    <input type="date" onChange={e=>setEndDate(e.target.value)}></input>
                  </div>
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
          <Card.Title>Items in Excess:</Card.Title>
          <Card.Text>
          {excessItems.map(excessItem => (
            <li key={excessItem.item_id}>{excessItem.name}</li>
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
