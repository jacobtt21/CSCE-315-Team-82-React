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
        .then(res => {
          const item = res.data;
          setItem(item[0]);
        })
    },[]);

  return (
    <>
      <div class="col-md-6">
        <div class="h-80 p-5 bg-light border rounded-3">
          <h2>Sales Report</h2>
          <Grid foods={item[0]} custom={true} />
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lectus ex, elementum sed sagittis id, ultricies et magna. Morbi vel consequat est. Fusce tristique enim ut ipsum dictum, vel feugiat elit placerat.</p>
          <h2>item</h2>
          <Link to="/ExtraFeatures/SalesReport"><button class="btn btn-outline-secondary" type="button">View Report</button></Link>
        </div>
      </div>
    </>
  )
};
