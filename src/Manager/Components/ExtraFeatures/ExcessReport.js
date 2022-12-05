import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import InputGroup from 'react-bootstrap/InputGroup';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

import { useParams, Link } from "react-router-dom";
import Axios from 'axios';


export const ExcessReport = () => {
  const [item, setItem] = useState([]);
  const [submitted, setSubmitted] = useState("");
  const {start_date} = useParams();
  const {end_date} = useParams();

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
    const formData = new FormData();
    formData.append("start_date", "9-07-22");
    formData.append("end_date", "9-21-22");
    Axios.get(process.env.REACT_APP_API_URL+`/fetch-items`, formData, {})
      .then((res) => {
        setSubmitted(true);
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
                <Form.Control name="start date"/>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>End Date</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control name="end date"/>
                </InputGroup>
              </Form.Group>

              <Button type="submit" variant="primary">Submit</Button>
              <Link to={"/Landing"}><Button variant="secondary">Back</Button></Link>

            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
    ) 
  }

  const htmlSubmitted = () => {
    <>
    </>
  }

  // if (!submitted) {
  //   return htmlSubmitted();
  // } else {
  //   return htmlForm();
  // }
  return htmlForm();
}