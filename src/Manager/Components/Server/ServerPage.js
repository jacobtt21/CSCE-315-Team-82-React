import React from "react";
import { useEffect, useState } from "react";
import Grid from "./Grid";
import { OrderContext } from "./lib";
import Bill from "./Bill";
import {useRef} from 'react';


export const ServerPage = () => {

  const [food, setFood] = useState("");
  const [order, setOrder] = useState();

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
      <div className="classic-style">
        <OrderContext.Provider value={[order, setOrder]}>
          <main>
            <div className="title">
            </div>
            <div className="grid-container2">
              <div className="FoodHeaderTwo">
                Customer's Order
                {order ? (
                  <Bill foods={order} />
                ) : (
                  <h4></h4>
                )}
              </div>
              <div>
                <h3 className="FoodHeaderOne" id="burrito">Burritos</h3>

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
              </div>
            </div>
          </main>
          <style jsx="true">{`
            .grid-container2 {
              width: 90%;
              margin: auto;
              display: grid;
              grid-template-columns: 1fr 3fr;
              gap: 25px;
            }
            h2 {
              font-size: 50px;
            }
            .title {
              width: 90%;
              margin: -100px auto;
              padding: 10px;
              border-bottom: 2px solid black;
            }
            .FoodHeaderOne {
              font-size: 30px;
              margin-top: 120px;
              text-align: left;
              padding: 10px;
            }
            .FoodHeaderTwo {
              font-size: 30px;
              margin-top: 120px;
              text-align: left;
              padding: 10px;
              border-right: solid;
            }
            .FoodHeader {
              font-size: 30px;
              text-align: left;
              padding: 10px;
            }
            .btton {
              width: 100%;
              margin: auto;
              background-color: #316685;
              color: white;
              margin-right: 0;
            }
          `}</style>
        </OrderContext.Provider>
      </div>
    </>
  ) : (
    <div>
      <h1>Loading ...</h1>
    </div>
  );
};
