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
  const {start_date} = useParams();
  const {end_date} = useParams();

  useEffect(()=>{
    Axios.get(process.env.REACT_APP_API_URL+`/get-excess-report/9-07-22/9-21-22`)
      .then(response => {
        return response.data
      })
      .then(data => {
        setItem(data)
      })
  },[]);

  const onSubmitHandler = e => {
    e.preventDefault();
    const form = document.querySelector("form");
    const formData = new FormData(form);
    
    Axios.post(process.env.REACT_APP_API_URL+`/edit-menu-item/${id}`, formData, {})
      .then((res) => {
        setSubmitted(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // const htmlForm = () => {
  return (
    <>
      <div className="p-3">
      <Card>
          <Card.Body>
            <Form autoComplete="off" onSubmit={onSubmitHandler}>
              <Form.Group className="mb-3">
                <Form.Label>Start Date</Form.Label>
                <Form.Control start_date="start date"/>
              </Form.Group>


              <Form.Group className="mb-3">
                <Form.Label>End Date</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    name="end date"
                  />
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
  // }

}

export default ExcessReport