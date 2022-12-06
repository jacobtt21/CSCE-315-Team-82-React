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


export const ExcessReport = () => {
  const [excessItems, setExcessItems] = useState([]);
  const [submitted, setSubmitted] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");

  // function sleep(ms) {
  //   return new Promise(resolve => setTimeout(resolve, ms));
  // }

  // const submit = async() => {
  //   const formData = new FormData();
  //   formData.append("start_date", "9-01-22")
  //   formData.append("end_date", "9-07-22")
  //   const res = await fetch(process.env.REACT_APP_API_URL + '/get-excess-report', {
  //     method: "GET",
  //     body: formData
  //   })
  //   const id = await res.json();
  //   // sleep(7000).then(() => { window.location.reload(false); });
  // }
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
                <Form.Control name="start date" onChange={(e) => setStartDate(e.target.value)} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>End Date</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control name="end date" onChange={(e) => setEndDate(e.target.value)} />
                </InputGroup>
              </Form.Group>

              <Button type="submit" variant="primary" className="pe-3">Submit</Button>
              <Link to={"/ExtraFeatures"}><Button variant="secondary">Back</Button></Link>

            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
    )
  }

  const htmlSubmitted = () => {
    // return (
    //   <>
    //   <div class="submitted-container">
    //     <h2>Items in excess: </h2>
    //     {excessItems.map(excessItem => (
    //       <li key={excessItem.item_id}>{excessItem.name}</li>
    //     ))}
    //     <Link to="/ExtraFeatures"><button class="btn btn-outline-secondary" type="button">View Report</button></Link>
    //   </div>
    //   <style jsx="true">{`
    //     .submitted-container {
    //       display: flex;
    //       justify-content: center;
    //       align-items: center;
    //       height: 100vh;
    //     }
    //   `}</style>
    //   </>
    // )
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
