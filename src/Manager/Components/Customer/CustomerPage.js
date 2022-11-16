import React from "react";
import { useEffect, useState } from "react";
import Grid from "./Grid";
import { OrderContext, PriceContext, numberFormat } from "./lib";
import Bill from "./Bill";
import Button from "react-bootstrap/Button";

export const CustomerPage = () => {
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

  const buy = async () => {
    // Calls to server
    window.location.reload(false);
  }

  return food ? (
    <>
      <div className="classic-style">
        <OrderContext.Provider value={[order, setOrder]}>
          <PriceContext.Provider value={[price, setPrice]}>
            <main>
              <div className="title">
                <h2>Order Cabo Grill</h2>
              </div>
              <div className="grid-container2">
                <div className="FoodHeaderTwo">
                  <div className="stick">
                    Your Order
                    {order ? (
                      <>
                        <Bill foods={order} />
                        <Button 
                        variant="success" 
                        onClick={buy}>
                          Checkout {numberFormat(price)} (Tax Included)
                        </Button>
                      </>
                    ) : (
                      <h4><i>There isn't anything here</i></h4>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="FoodHeaderOne" id="burrito">Burritos</h3>
                  <h4><i>Enjoy whatever this is</i></h4>
                  <Grid foods={food[0]} custom={true} />
                  <h3 className="FoodHeader" id="bowl">Bowls</h3>
                  <h4><i>Enjoy a worse version of chipotle</i></h4>
                  <Grid foods={food[1]} custom={true} />
                  <h3 className="FoodHeader" id="taco">Tacos</h3>
                  <h4><i>Taco'bout tacos, idk</i></h4>
                  <Grid foods={food[2]} custom={true} />
                  <h3 className="FoodHeader" id="salad">Salads</h3>
                  <h4><i>salads</i></h4>
                  <Grid foods={food[3]} custom={true} />
                  <h3 className="FoodHeader" id="side">Sides</h3>
                  <h4><i>Sides and everything else</i></h4>
                  <Grid foods={food[4]} custom={false} />
                  <h3 className="FoodHeader" id="drink">Drinks</h3>
                  <h4><i>I care a lot still</i></h4>
                  <Grid foods={food[5]} custom={false} />
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
                margin: auto auto;
                padding: 10px;
                border-bottom: 2px solid black;
              }
              .FoodHeaderOne {
                font-size: 30px;
                margin-top: 10px;
                padding: 10px;
              }
              .FoodHeaderTwo {
                font-size: 30px;
                margin-top: 10px;
                padding: 10px;
                border-right: solid;
              }
              .stick {
                position: -webkit-sticky;
                position: sticky;
                top: 10;
                padding: 5px;
                background-color: #cae8ca;
                border: 2px solid #4CAF50;
                border-radius: 15px;
                padding: 10px;
              }
              .FoodHeader {
                font-size: 30px;
                padding: 10px;
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
