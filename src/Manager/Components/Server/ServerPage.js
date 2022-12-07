import React from "react";
import { useEffect, useState } from "react";
import Grid from "./Grid";
import { OrderContext, PriceContext, numberFormat } from "./lib";
import Bill from "./Bill";
import Button from "react-bootstrap/Button";
import Popup from 'reactjs-popup';

export const ServerPage = () => {

  const [food, setFood] = useState("");
  const [order, setOrder] = useState();
  const [price, setPrice] = useState();
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

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
      if ((responseData[i].type === "Bowl") && (responseData[i].orderable)) {
        bowls.push(responseData[i]);
      }
      else if (responseData[i].type === "Tacos" && responseData[i].orderable) {
        tacos.push(responseData[i]);
      }
      else if (responseData[i].type === "Salad" && responseData[i].orderable) {
        salads.push(responseData[i]);
      }
      else if (responseData[i].type === "Drink" && responseData[i].orderable) {
        drinks.push(responseData[i]);
      }
      else if (responseData[i].type === "Burrito" && responseData[i].orderable) {
        burritos.push(responseData[i]);
      }
      else if (responseData[i].orderable){
        sides.push(responseData[i]);
      }
      else{

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

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const buy = async () => {
    // Calls to server
    const formData = new FormData();
    formData.append("price", price)
    formData.append("served", localStorage.getItem("user_id"))
    const res = await fetch(process.env.REACT_APP_API_URL + '/new-bill', {
      method: "POST",
      body: formData
    })
    const id = await res.json();
    console.log(id[0].bill_id)
    for (var i = 0; i < order.length; ++i) {
      const formData2 = new FormData();
      formData2.append("bid", id[0].bill_id)
      formData2.append("fid", order[i].order_id)
      await fetch(process.env.REACT_APP_API_URL + '/take-order', {
        method: "POST",
        body: formData2
      })
    }
    setOpen(o => !o)
    sleep(10000).then(() => { window.location.reload(false); });
  }

  const contentStyle = {
    background: "rgba(255,255,255, 1)",
    borderRadius: 15,
    padding: 10,
    width: 500,
    border: "none",
    textAlign: "center"
  };

  return food ? (
    <>
      <div className="p-3">
        <OrderContext.Provider value={[order, setOrder]}>
          <PriceContext.Provider value={[price, setPrice]}>
          <div>
            <Popup 
            open={open} 
            contentStyle={contentStyle}
            overlayStyle={{ background: "rgba(0, 0, 0, 0.5)" }} 
            closeOnDocumentClick onClose={closeModal}
            >
              <div className="normal-style">
                <h1> Customer's Total: </h1>
                <h2> {numberFormat(price)}</h2>
                <style jsx="true">{`
                  h1 {
                    font-size: 40px;
                  }
                  h2 {
                    font-size: 30px;
                  }
                `}</style>
              </div>
            </Popup>
          </div>
          <div className="title">
          </div>
              <div className="grid-container2">
                <div className="FoodHeaderTwo">
                  <div className="stick">
                    Customer's Order
                    {order ? (
                      <>
                        {order.length > 0 ? (
                          <>
                          <Bill foods={order} />
                          <Button 
                          variant="success"
                          onClick={buy}> 
                            Checkout {numberFormat(price)} (Tax Included)
                          </Button>
                          </>
                        ) : (
                          <h4> </h4>
                        )}
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
            <style jsx="true">{`
              .grid-container2 {
                width: auto;
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
