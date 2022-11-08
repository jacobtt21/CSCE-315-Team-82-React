import React from "react";

export default function FoodCard({ item }) {
  return (
    <>
      <div className="card">
        <h1 className="name">{item.name} ${item.price}
        <button className="btn"> Add to Cart </button></h1>
      </div>
      <style jsx>{`
        .name {
          float: left;
          margin-left: 0%;
          font-size: 18px;
        }
        .card {
          margin-left: 0%;
          width: 100%;
          border: 3px solid #f8fafc;
        }
      `}</style>
    </>
  )
};