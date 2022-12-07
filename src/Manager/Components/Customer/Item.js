import React from "react";
import { OrderContext, PriceContext } from "./lib";
import { useContext } from "react";
import Button from "react-bootstrap/Button";
/*
* What it does: Generates visual bill for customers
*
* @return   bill
*/
export default function ItemBill({ item, index }) {
  const [order, setOrder] = useContext(OrderContext)
  const [, setPrice] = useContext(PriceContext)
// Remove item from cart and update price
  const remove = () => {
    let currentCart = [];
    var i;
    for (i = 0; i < order.length; ++i) {
      if (i !== index) {
        currentCart.push(order[i])
      }
    }
    setOrder(currentCart)
    var priceHolder = 0;
    var j;
    for (j = 0; j < currentCart.length; ++j) {
      priceHolder = priceHolder + parseFloat(currentCart[j].price);
    }
    setPrice(priceHolder * 1.0825)
  }

  return (
    <>
      <h5>
        {index + 1}. {item.name} ${item.price} &nbsp;
        <Button 
        variant="danger" 
        onClick={remove}
        >
          X
        </Button>
      </h5>
    </>
  )
};