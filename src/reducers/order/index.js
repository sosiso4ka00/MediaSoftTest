import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
	name: null,
	lastName: null,
	phone: null,
	email: null,
	card: {
		cvc: '',
    expiry: '01',
		expiryyear: '20',
		focus: '',
		number: '',
		name: '',
		number: ''
	}
};



export const orderSlice = createSlice({
	name: 'order',
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		// payload {field, value}
		setOrderData(state, { payload }) {
			state[payload.field] = payload.value
		},
		setOrderCardData(state, {payload}){
			state.card[payload.field] = payload.value

		}

	},


});

export const { setOrderData, setOrderCardData } = orderSlice.actions;


export default orderSlice.reducer;
