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
          background-color: #1f5156;
          color: white;
          margin-right: 0;
        }
      `}</style>
    </>
  )
};