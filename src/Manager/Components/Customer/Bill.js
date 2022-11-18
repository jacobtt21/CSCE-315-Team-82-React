import React from "react";
import ItemBill from "./Item";

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