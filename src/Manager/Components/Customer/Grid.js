import React from "react";
import FoodCard from "./Card";
/*
* What it does: Generates menu grid
*
* @return   grid for itmes in page
*/
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
      <style jsx="true">{`
        .grid-container {
          width: 90%;
          margin: auto;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 25px;
        }
      `}</style>
    </>
  )
};