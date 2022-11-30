import React from "react";
import { OrderContext, PriceContext, numberFormat } from "./lib";
import { useContext, useState } from "react";
import Popup from 'reactjs-popup';

export default function FoodCard({ item, custom }) {
  const [order, setOrder] = useContext(OrderContext)
  const [, setPrice] = useContext(PriceContext)
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

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
      {custom ? (
          <>
          <button 
          className="bttn btn name" 
          onClick={() => setOpen(o => !o)}
          >
            {item.name} {numberFormat(item.price)}
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
                
                
                <input type="checkbox" class="check"/>
                <label class="container">Cheese</label>
                
                <input type="checkbox" class="check"/>
                <label class= "container">Veggies</label>
                
                <input type="checkbox" class="check"/>
                <label class="container">Sour Cream</label>
                
                <input type="checkbox" class="check"/>
                <label class="container">Lettuce</label>
                
                <input type="checkbox" class="check"/>
                <label class="container">Salsa</label><br />
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
          className="name bttn btn" 
          onClick={Add}
          >
            {item.name}{numberFormat(item.price)}
          </button>
        )}
      </div>
      <style jsx>{`
        .name {
          font-size: 20px;
        }
        .card {
          margin-left: 0%;
          width: 50%;
          border: 3px solid #f8fafc;
        }
        .bttn {
          width: 100%;
          margin: auto;
          background-color: #53898d;
          color: white;
          margin-left: 0;
        }
        .btn:hover {
          box-shadow: 5px 10px 8px #e2e8f0;
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
      `}</style>
    </>
  )
};