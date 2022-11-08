import React from "react";

export default function Bill({ foods }) {
  return (
    <>
      <div className="bill">
        {foods.map((item, i) => {
          return (
            <div key={i}>
              <h5>{i + 1}. {item.name} ${item.price}</h5>
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