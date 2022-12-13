import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

// import Calendar from 'react-calendar';

import LineChart from "./LineChart";

import { useParams, Link } from "react-router-dom";
import Axios from 'axios';


export const SalesReport = () => {
  const [response, setResponse] = useState([]);
  const [submitted, setSubmitted] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");

  const [menuItems, setMenuItems] = useState([]);

  const onSubmitHandler = e => {
    e.preventDefault();

    const form = document.querySelector("form");
    const formData = new FormData(form);

    Axios.get(process.env.REACT_APP_API_URL+`/get-sales-report/${start_date}/${end_date}/${formData.get("order_id")}`)
      .then((res) => {
        setSubmitted(true);
        return res.data
      })
      .then((data) => {
        setResponse(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(()=>{
    Axios.get(process.env.REACT_APP_API_URL + '/fetch-menu-items')
      .then(res => {
        const menuItems = res.data;
        setMenuItems(menuItems);
      })
  },[]);

  function option ( value, display, actual) {

    if (actual === true) actual = "TRUE";
    if (actual === false) actual = "FALSE";

    if (value === actual) {
      return <option value={value} selected>{display}</option>
    }
    return <option value={value}>{display}</option>;
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
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>End Date</Form.Label>
                <InputGroup className="mb-3">
                  <div className="dateSelect">
                    <input type="date" onChange={e=>setEndDate(e.target.value)}></input>
                  </div>
                </InputGroup>
              </Form.Group>

              {/* <Form.Group className="mb-3">
                <Form.Label>Start Date</Form.Label>
                <Form.Control name="start_date" onChange={(e) => setStartDate(e.target.value)} placeholder="MM-DD-YYYY"/>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>End Date</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control name="end_date" onChange={(e) => setEndDate(e.target.value)} placeholder="MM-DD-YYYY"/>
                </InputGroup>
              </Form.Group> */}

              <Form.Group className="mb-3">
                <Form.Label>Order Type</Form.Label>
                <Form.Select name="order_id">
                {
                  menuItems.map(function(e) {
                    return option(e.order_id, e.name, "");
                  })
                }
                </Form.Select>
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
          <Card.Title>Sales Report:</Card.Title>
          <Card.Text>
            <LineChart chartData={response} style={{width:1000}}/>
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
