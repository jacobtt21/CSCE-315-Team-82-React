import React from "react";
import FoodCard from "./Card";

export default function Grid({ foods }) {
  return (
    <>
      <div className="grid-container">
        {foods.map((item, i) => {
          return (
            <div key={i}>
              <FoodCard item={item} />
            </div>
          );
        })}
      </div>
      <style jsx>{`
        .grid-container {
          width: 90%;
          text-align: left;
          button-align: right;
          margin-bottom: 2%;
          display: grid;
          grid-template-columns: 1fr;
        }
      `}</style>
    </>
  )
};