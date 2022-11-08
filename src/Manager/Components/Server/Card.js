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
        <button
        className="btn bttn"
        onClick={Add}
        >
          Add to Order
        </button>
      </div>
      <style jsx>{`
        .name {
          font-size: 20px;
        }
        .card {
          margin-left: 0%;
          width: 100%;
          border: 3px solid #f8fafc;
        }
        .bttn {
          width: 25%;
          margin: auto;
          background-color: #316685;
          color: white;
          margin-right: 0;
        }
      `}</style>
    </>
  )
};