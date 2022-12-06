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


export const RestockReport = () => {
  const [excessItems, setExcessItems] = useState([]);
  const [submitted, setSubmitted] = useState("");

  useEffect(()=>{
    Axios.get(process.env.REACT_APP_API_URL+`/get-restock-report/`)
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
  },[]);

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
          <Card.Title>Items That Need to be Restocked:</Card.Title>
          <Card.Text>
          {excessItems.map(excessItem => (
            <li key={excessItem.item_id}> {excessItem.quantity} {excessItem.name} currently instock needs {excessItem.deficit} more </li>
          ))}
          </Card.Text>
          <Link to={"/ExtraFeatures"}><Button variant="primary">Done</Button></Link>
        </Card.Body>
      </Card>
    )       
  }

  return htmlSubmitted();
}

