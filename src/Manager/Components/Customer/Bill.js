import React from "react";
import ItemBill from "./Item";
/*
* What it does: Displays the bill
*
* @param  foods       Object list of food items
* @return div
*/
export default function Bill({ foods }) {
  return (
    <>
      <div className="bill">
        {foods.map((item, i) => {
          return (
            <div key={i}>
              <ItemBill item={item} index={i} />
            </div>
          );
        })}
      </div>
      <style jsx="true">{`
        .bill {
          margin-top: 10px;
          text-align: left;
        }
      `}</style>
    </>
  )
};