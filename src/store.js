import { configureStore } from '@reduxjs/toolkit';
import map from './reducers/map';
import order from './reducers/order';
import shop from './reducers/shop';
import shoppingBasket from './reducers/shoppingBasket';

export const store = configureStore({
  reducer: {
    basket: shoppingBasket,
    map: map,
    shop: shop,
    order: order
  },
});
