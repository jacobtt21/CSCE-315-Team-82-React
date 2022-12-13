import React from "react";
import { OrderContext, PriceContext } from "./lib";
import { useContext, useState } from "react";
import Popup from 'reactjs-popup';
/*
* What it does: Displays food items
*
* @param item      menu item object
* @param custom    custom menu item object
* @return div
*/
export default function FoodCard({ item, custom }) {
  const [order, setOrder] = useContext(OrderContext)
  const [, setPrice] = useContext(PriceContext)
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
// Add items to cart and update total proce
  const Add = () => {
    if (order) {
      let currentCart = [];
      var i;
      for (i = 0; i < order.length; ++i) {
        currentCart.push(order[i])
      }
      currentCart.push(item)
      setOrder(currentCart)
      var priceHolder = 0;
      var j;
      for (j = 0; j < currentCart.length; ++j) {
        priceHolder = priceHolder + parseFloat(currentCart[j].price);
      }
      setPrice(priceHolder * 1.0825)
    }
    else {
      let currentCart = [];
      currentCart.push(item)
      setOrder(currentCart)
      setPrice(item.price * 1.0825)
    }
  };
// Customize item and add to cart, update current price
  const AddCustom = () => {
    if (order) {
      let currentCart = [];
      var i;
      for (i = 0; i < order.length; ++i) {
        currentCart.push(order[i])
      }
      currentCart.push(item)
      setOrder(currentCart)
      var priceHolder = 0;
      var j;
      for (j = 0; j < currentCart.length; ++j) {
        priceHolder = priceHolder + parseFloat(currentCart[j].price);
      }
      setPrice(priceHolder * 1.0825)
    }
    else {
      let currentCart = [];
      currentCart.push(item)
      setOrder(currentCart)
      setPrice(item.price * 1.0825)
    }
    closeModal()
  };

  const contentStyle = {
    background: "rgba(255,255,255, 1)",
    borderRadius: 15,
    padding: 10,
    width: 800,
    border: "none",
    textAlign: "center"
  };


  return (
    <>
      <div className="card">
        <h1 className="name">{item.name}</h1>
        <h1 className="name">${item.price}</h1>
        <style jsx="true">{`
          .food-img {
            object-fit: cover;
            width: 180px;
            height: 180px;
          }
        `}</style>
        {item.image && (
          <img className="food-img"
          src={item.image}
          />
        )}
        {custom ? (
          <>

            <button
            className="bttn name btn"
            onClick={() => setOpen(o => !o)}
            >
              Add to Order
            </button>
            <div>

              <Popup
              open={open}
              contentStyle={contentStyle}
              overlayStyle={{ background: "rgba(0, 0, 0, 0.5)" }}
              closeOnDocumentClick onClose={closeModal}

              >
                <div className="normal-style">
                  <h1>Cutomize Your {item.name}</h1>
                  <h2>Choose your rice *</h2>
                  <select className="butn">
                    <option value="brown">Brown</option>
                    <option value="white">White</option>
                    <option value="no">No Rice</option>
                  </select>
                  <h2>Choose your beans *</h2>
                  <select className="butn">
                    <option value="brown">Pinto</option>
                    <option value="white">Black</option>
                    <option value="no">No Beans</option>
                  </select>
                  <h2>Choose your toppings</h2>

                  <input
                  type="checkbox"
                  class="check"
                  onSelect={console.log()}
                  />
                  <label class="container">&nbsp;Cheese</label>
                  <input type="checkbox" class="check"/>
                  <label class="container">&nbsp;Veggies</label>
                  <input type="checkbox" class="check"/>
                  <label class="container">&nbsp;Sour Cream</label>
                  <input type="checkbox" class="check"/>
                  <label class="container">&nbsp;Lettuce</label>
                  <input type="checkbox" class="check"/>
                  <label class="container">&nbsp;Salsa</label>
                  <button
                  className="btn buttn"
                  onClick={AddCustom}

                  >
                    Add to Order
                  </button>
                  <style jsx="true">{`

                    h1 {
                      font-size: 30px;
                    }
                    h2 {
                      margin: 2%;
                      font-size: 20px;
                    }
                    .check {
                      top: 0;
                      left: 0;
                      height: 25px;
                      width: 25px;
                      background-color: #eee;
                      display: inline;
                      cursor: pointer;
                    }
                    .container {
                      display: inline;
                      margin-bottom: 10%;
                      font-size: 22px;
                    }
                    .container input {
                      display: inline;
                      opacity: 0;
                      height: 0;
                      width: 0;
                    }
                  `}</style>

                </div>
              </Popup>
            </div>
          </>
        ) : (
          <button
            className="btn bttn"
            onClick={Add}
          >
            Add to Order
          </button>
        )}
      </div>
      <style jsx="true">{`
        .name {
          font-size: 18px;
        }
        .card {
          margin: 25px auto;
          width: 100%;
          border: 3px solid #f8fafc;
          padding: 10px;
          box-shadow: 5px 10px 8px #e2e8f0;
        }
        .bttn {
          width: 100%;
          margin: auto;
          background-color: #53898d;
          color: white;
          margin-right: 0;
        }
        .butn {
          width:  20%;
          height: 2.5rem;
          font-size: 1.5rem;
          text-align: center;
          margin: auto;
          color: black;
        }
        .buttn {
          width: 25%;
          margin: auto;
          margin-top: 5%;
          background-color: #53898d;
          color: white;
          margin-right: 0;
        }
        img {
          max-width: 200px;
          margin: 30px auto;
          border-radius: 20px;
        }
      `}</style>
    </>
  )
};
