import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  count: 10,
  products: [{ id: 1, count: 3 }, { id: 2, count: 5 }, { id: 6, count: 2 }] // {id, count}
};

export const updateProducts = createAsyncThunk(
  'basket/updateProducts',
  async (payload, { getState }) => {
    const responseArr = await Promise.all(getState().basket.products.map(el => fetch(`${process.env.REACT_APP_URL}/products/${el.id}`)))
    const json = await Promise.all(responseArr.map(el => el.json()))
    return json
  }
)

export const shoppingBasketSlice = createSlice({
  name: 'basket',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addProduct(state, action) {
      state.count++;
      let find = false;
      for (let product of state.products) {
        if (product.id === action.payload) {
          product.count++
          find = true
        }
      }
      if (!find)
        state.products.push({ id: action.payload, count: 1 })
    },
    removeProduct(state, action) {
      state.count--;
      for (let product of state.products) {
        if (product.id === action.payload) {
          if (product.count > 1)
            product.count--
          else
            state.products.splice(state.products.indexOf(product), 1)
        }
      }
    },
    removeAllProduct(state, { payload }) {
      for (let productId in state.products) {
        const product = state.products[productId]
        if (product.id === payload) {
          state.count -= product.count
          state.products.splice(productId, 1)
        }
      }
    }
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers(builder) {
    builder.addCase(updateProducts.fulfilled, (state, action) => {
      const payload = action.payload

      for (const newProduct of payload)
        for (const productId in state.products)
          if (newProduct.id === state.products[productId].id) {
            state.products[productId] = { ...newProduct, count: state.products[productId].count }
          }
    }
    )}

  });

export const { addProduct, removeProduct, removeAllProduct } = shoppingBasketSlice.actions;


export default shoppingBasketSlice.reducer;
