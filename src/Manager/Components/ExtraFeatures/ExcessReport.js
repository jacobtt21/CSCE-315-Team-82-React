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

  useEffect(()=>{
    Axios.get(process.env.REACT_APP_API_URL+`/get-excess-report/9-07-22/9-21-22`)
      .then(response => {
        return response.data
      })
      .then(data => {
        setItem(data)
      })
  },[]);

  return (
    <div>
      {item.length > 0 && (
        <ul>
          {item.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ExcessReport