import React from "react";
import { useEffect, useState } from "react";


export const ExtraFeatures = () => {
  const [description, setDescription] = useState("");
  const handleChange = (event) => {setDescription((event).target.value)}
  const handleSubmit = (event) => {(event).preventDefault(); console.log(description)}
  return (
    <div>
      <h1>Extra Features Page</h1>
      <p>Enter Date</p>
      <form>
        <input
          type = "text"
          name = "description"
          id="description"
          value={description}
          onChange={handleChange}>

        </input>
      </form>
      <p>Sales Report</p>
      <p>Excess Report</p>
      <p>What Sells Together?</p>

    </div>
  );
};