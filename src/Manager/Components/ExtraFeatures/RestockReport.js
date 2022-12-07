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
  const [restockItems, setRestockItems] = useState([]);
  const [submitted, setSubmitted] = useState("");

  useEffect(()=>{
    Axios.get(process.env.REACT_APP_API_URL+`/get-restock-report/`)
      .then((res) => {
        setSubmitted(true);
        return res.data
      })
      .then((data) => {
        setRestockItems(data);
      })
      .catch((err) => {
        console.log(err);
      });
  },[]);

  const htmlSubmitted = () => {
    // return (
    //   <>
    //   <div class="submitted-container">
    //     <h2>Items in excess: </h2>
    //     {restockItems.map(excessItem => (
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
          <Card.Title>Items That Need to be Restocked:</Card.Title>
          <Card.Text>
          {restockItems.map(excessItem => (
            <dl key={excessItem.deficit}> <strong>{excessItem.quantity} {excessItem.name}</strong> currently instock needs <strong>{excessItem.deficit}</strong> more </dl>
          ))}
          </Card.Text>
          <Link to={"/ExtraFeatures"}><Button variant="primary">Done</Button></Link>
        </Card.Body>
      </Card>
    )       
  }

  return htmlSubmitted();
}

