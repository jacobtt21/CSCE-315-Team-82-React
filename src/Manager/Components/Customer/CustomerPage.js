import React from "react";
import { useEffect, useState } from "react";
import Grid from "./Grid";
import { OrderContext, PriceContext, numberFormat } from "./lib";
import Bill from "./Bill";
import Button from "react-bootstrap/Button";
import Popup from 'reactjs-popup';

export const CustomerPage = () => {
  const [food, setFood] = useState("");
  const [order, setOrder] = useState();
  const [price, setPrice] = useState();
  const [orderNo, setOrderNo] = useState('');
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
      if (responseData[i].type === "Bowl" && responseData[i].orderable) {
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
        console.log(responseData[i])
      }
      else {
        
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
    formData.append("served", "1")
    const res = await fetch(process.env.REACT_APP_API_URL + '/new-bill', {
      method: "POST",
      body: formData
    })
    const id = await res.json();
    setOrderNo(id[0].bill_id)
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
    sleep(7000).then(() => { window.location.reload(false); });
  }

  const contentStyle = {
    background: "rgba(255,255,255, 1)",
    borderRadius: 15,
    padding: 10,
    width: 800,
    border: "none",
    textAlign: "center"
  };

  return food ? (
    <>
      <div className="classic-style">
        <OrderContext.Provider value={[order, setOrder]}>
          <PriceContext.Provider value={[price, setPrice]}>
            <main>
              <div>
                <Popup 
                open={open} 
                contentStyle={contentStyle}
                overlayStyle={{ background: "rgba(0, 0, 0, 0.5)" }} 
                closeOnDocumentClick onClose={closeModal}
                >
                  <div className="normal-style">
                    <h1>Your Order Number: {orderNo}</h1>
                    <h2>Thanks for choosing Cabo Grill!</h2>
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
                <h2>Order Cabo Grill</h2>
              </div>
              <div className="grid-container2">
                <div className="FoodHeaderTwo">
                  <div className="stick">
                    Your Order
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
                          <h4><i>There isn't anything here</i></h4>
                        )}
                      </>
                    ) : (
                      <h4><i>There isn't anything here</i></h4>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="FoodHeaderOne" id="burrito">Burritos</h3>
                  <h4><i>Best Wrapped Food in the MSC</i></h4>
                  <Grid foods={food[0]} custom={true} />
                  <h3 className="FoodHeader" id="bowl">Bowls</h3>
                  <h4><i>Enjoy Everything but Cereal</i></h4>
                  <Grid foods={food[1]} custom={true} />
                  <h3 className="FoodHeader" id="taco">Tacos</h3>
                  <h4><i>Taco'bout Tacos</i></h4>
                  <Grid foods={food[2]} custom={true} />
                  <h3 className="FoodHeader" id="salad">Salads</h3>
                  <h4><i>The Best Greens North of the Tracks</i></h4>
                  <Grid foods={food[3]} custom={true} />
                  <h3 className="FoodHeader" id="side">Sides</h3>
                  <h4><i>Sides and Everything Else</i></h4>
                  <Grid foods={food[4]} custom={false} />
                  <h3 className="FoodHeader" id="drink">Drinks</h3>
                  <h4><i>Best Beverages in Texas</i></h4>
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
                background-color: #f8fafc;
                border: 2px solid #f8fafc;
                box-shadow: 5px 10px 8px #e2e8f0;
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
