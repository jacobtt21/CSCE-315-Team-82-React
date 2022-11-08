import { createContext } from 'react';

export const OrderContext = createContext(null);
export const PriceContext = createContext(null);

export const numberFormat = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);