import React from "react";
import { OrderContext } from "./lib";
import { useContext } from "react";

export default function FoodCard({ item }) {
  const [order, setOrder] = useContext(OrderContext)

  const Add = () => {
    if (order) {
      let currentCart = [];
      var i;
      for (i = 0; i < order.length; ++i) {
        currentCart.push(order[i])
      }
      currentCart.push(item)
      setOrder(currentCart)
    }
    else {
      let currentCart = [];
      currentCart.push(item)
      setOrder(currentCart)
    }
  };

  return (
    <>
      <div className="card">
        <h1 className="name">{item.name}</h1>
        <h1 className="name">${item.price}</h1>
        <button
        className="btn"
        onClick={Add}
        >
          Click to add
        </button>
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
      `}</style>
    </>
  )
};