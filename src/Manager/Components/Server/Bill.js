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
        <button className="btton btn"> Checkout </button>
      </div>
      <style jsx="true">{`
        .bill {
          margin-top: 10px;
          text-align: left;
        }
        .btton {
          width: 100%;
          margin: auto;
          background-color: #53898d;
          color: white;
          margin-right: 0;
        }
      `}</style>
    </>
  )
};