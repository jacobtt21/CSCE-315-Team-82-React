import { createContext } from 'react';

export const OrderContext = createContext(null);
export const PriceContext = createContext(null);
/*
* What it does: formats library of items
*/
export const numberFormat = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);