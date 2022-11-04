import React from "react";
import FoodCard from "./Card";

export default function Grid({ foods }) {
  return (
    <div>
      {foods.map((item, i) => {
        return (
          <div key={i}>
            <FoodCard item={item} />
          </div>
        );
      })}
    </div>
  )
};