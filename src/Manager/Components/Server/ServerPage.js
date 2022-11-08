import React from "react";
import { useEffect, useState } from "react";
import Grid from "./Grid";


export const ServerPage = () => {

  const [food, setFood] = useState("");

  useEffect(() => {
    getFood()
  }, []);

  const getFood = async () => {
    let tacos = [];
    let burritos = [];
    let sides = [];
    let drinks = [];
    let salads = [];
    let bowls = [];

    const res = await fetch('http://127.0.0.1:5000/fetch-menu-items', {
      method: "GET",
    });
    const responseData = await res.json();
    var i;
    for (i = 0; i < responseData.length; ++i) {
      if (responseData[i].type === "Bowl") {
        bowls.push(responseData[i]);
      }
      else if (responseData[i].type === "Tacos") {
        tacos.push(responseData[i]);
      }
      else if (responseData[i].type === "Salad") {
        salads.push(responseData[i]);
      }
      else if (responseData[i].type === "Drink") {
        drinks.push(responseData[i]);
      }
      else if (responseData[i].type === "Burrito") {
        burritos.push(responseData[i]);
      }
      else {
        sides.push(responseData[i]);
      }
    }

    let menu = []
    menu.push(burritos)
    menu.push(bowls)
    menu.push(tacos)
    menu.push(salads)
    menu.push(sides)
    menu.push(drinks)

    setFood(menu)
  }

  return food ? (
    <>
      <main>
        <div>
          <h2>Menu</h2>
        </div>
        <h3 className="FoodHeader" id="burrito">Burritos</h3>
        <Grid foods={food[0]} />
        <h3 className="FoodHeader" id="bowl">Bowls</h3>
        <Grid foods={food[1]} />
        <h3 className="FoodHeader" id="taco">Tacos</h3>
        <Grid foods={food[2]} />
        <h3 className="FoodHeader" id="salad">Salads</h3>
        <Grid foods={food[3]} />
        <h3 className="FoodHeader" id="side">Sides</h3>
        <Grid foods={food[4]} />
        <h3 className="FoodHeader" id="drink">Drinks</h3>
        <Grid foods={food[5]} />
      </main>
      <style jsx>{`
        h2 {
          font-size: 50px;
          float: middle;
        }
        .FoodHeaderOne {
          float: left;
          font-size: 30px; 
          margin-top: 120px;
          padding: 10px;
        }
        .FoodHeader {
          float: left;
          margin-left: 10%;
          font-size: 30px; 
          padding: 10px;
        }
      `}</style>
    </>
  ) : (
    <div>
      <h1>Loading ...</h1>
    </div>
  );
};