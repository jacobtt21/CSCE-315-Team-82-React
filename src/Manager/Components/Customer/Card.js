import React from "react";
import { OrderContext, PriceContext } from "./lib";
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
        <h1 className="name">{item.name}</h1>
        <h1 className="name">${item.price}</h1>
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
                <select>
                  <option value="brown">Brown</option>
                  <option value="white">White</option>
                  <option value="no">No Rice</option>
                </select>
                <h2>Choose your beans *</h2>
                <select>
                  <option value="brown">Pinto</option>
                  <option value="white">Black</option>
                  <option value="no">No Beans</option>
                </select>
                <h2>Choose your toppings</h2>
                <input 
                type="checkbox" 
                onSelect={console.log()}
                />
                <label>&nbsp;Cheese</label><br />
                <input type="checkbox" />
                <label>&nbsp;Veggies</label><br />
                <input type="checkbox" />
                <label>&nbsp;Sour Cream</label><br />
                <input type="checkbox" />
                <label>&nbsp;Lettuce</label><br />
                <input type="checkbox" />
                <label>&nbsp;Salsa</label><br />
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
                    margin-top: 15px;
                    font-size: 20px;
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
          background-color: #1f5156;
          color: white;
          margin-right: 0;
        }
        .buttn {
          width: 25%;
          margin: auto;
          background-color: #1f5156;
          color: white;
          margin-right: 0;
        }
      `}</style>
    </>
  )
};