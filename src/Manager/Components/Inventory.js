import React, { useState, useEffect } from 'react';
import axios from "axios";

import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
// import './App.css';
// const baseUrl = "http://127.0.0.1:5000/"

export const Inventory = () => {
  const [itemQuantity, setItemQuantity] = useState(0);

  function getData() {
    // getData.preventDefault()
    axios({
      method: "GET",
      url:"http://localhost:5000/item_price",
    })
    .then((response) => {
      const res =response.data
      console.log(res)
      setItemQuantity(({
        itemQuantity: res}))
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}
  

  return (
    <div> 
      <p>To get your profile details: </p><button onClick={getData}>Click me</button>
        {itemQuantity
        }
    </div>
    
  );
};
