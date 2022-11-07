import React from "react";

export default function FoodCard({ item }) {
  return (
    <>
      <div className="card">
        <h1 className="name">{item.name}</h1>
        <h1 className="name">${item.price}</h1>
        <button
        className="btn"
        >
          Click to add
        </button>
      </div>
      <style jsx>{`
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