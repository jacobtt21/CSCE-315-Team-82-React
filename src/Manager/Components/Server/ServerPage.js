import React from "react";
import { useEffect, useState } from "react";
import Grid from "./Grid";
import { OrderContext, PriceContext, numberFormat } from "./lib";
import Bill from "./Bill";


export const ServerPage = () => {

  const [food, setFood] = useState("");
  const [order, setOrder] = useState();
  const [price, setPrice] = useState();
  
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

    const res = await fetch(process.env.REACT_APP_API_URL + '/fetch-menu-items', {
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
          <PriceContext.Provider value={[price, setPrice]}>
            <main>
              <div className="title">
              </div>
              <div className="grid-container2">
                <div className="FoodHeaderTwo">
                  <div className="stick">
                    Customer's Order
                    {order ? (
                      <>
                        <Bill foods={order} />
                        <h4> </h4>
                      </>
                    ) : (
                      <h4> </h4>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="FoodHeaderOne" id="burrito">Burritos</h3>
                  <Grid foods={food[0]} custom={true} />
                  <h3 className="FoodHeader" id="bowl">Bowls</h3>
                  <Grid foods={food[1]} custom={true} />
                  <h3 className="FoodHeader" id="taco">Tacos</h3>
                  <Grid foods={food[2]} custom={true} />
                  <h3 className="FoodHeader" id="salad">Salads</h3>
                  <Grid foods={food[3]} custom={true} />
                  <h3 className="FoodHeader" id="side">Sides</h3>
                  <Grid foods={food[4]} custom={false} />
                  <h3 className="FoodHeader" id="drink">Drinks</h3>
                  <Grid foods={food[5]} custom={false} />
                </div>
              </div>
            </main>
            <style jsx="true">{`
              .grid-container2 {
                width: 100%;
                margin-top: 0;
                margin-left: 5%;
                display: grid;
                grid-template-columns: 1fr 3fr;
                gap: 25px;
              }
              h2 {
                font-size: 50px;
              }
              .title {
                width: 90%;
                margin: auto;
                padding: 10px;
                border-bottom: 2px solid black;
              }
              .FoodHeaderOne {
                font-size: 30px;
                margin-top: 5%;
                padding: 10px;
                width: 50%;
                text-align: center;
              }
              .FoodHeaderTwo {
                font-size: 30px;
                margin-top: 5%;
                padding: 10px;
                border-right: solid;
                text-align: center;
              }
              .stick {
                position: -webkit-sticky;
                position: sticky;
                top: 10;
                width: auto;
                padding: 5px;
                border-radius: 15px;
                padding: 10px;
              }
              .FoodHeader {
                font-size: 30px;
                padding: 10px;
                width: 50%;
                text-align: center;
              }
            `}</style>
          </PriceContext.Provider>
        </OrderContext.Provider>
      </div>
    </>
  ) : (
    <div>
      <h1>Loading ...</h1>
    </div>
  );
};