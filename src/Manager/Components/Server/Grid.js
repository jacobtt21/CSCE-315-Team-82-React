import React from "react";
import FoodCard from "./Card";

export default function Grid({ foods, custom }) {
  return (
    <>
      <div className="grid-container">
        {foods.map((item, i) => {
          return (
            <div key={i}>
              <FoodCard item={item} custom={custom} />
            </div>
          );
        })}
      </div>
      <style jsx>{`
        .grid-container {
          width: 100%;
          text-align: left;
          margin-bottom: 2%;
          display: grid;
          grid-template-columns: 1fr;
        }
      `}</style>
    </>
  )
};