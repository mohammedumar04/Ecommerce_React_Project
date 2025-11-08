import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    carts: []
}
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        loadcart: (state, action) => {
            // here we can't call API
            state.carts = action.payload
        }
    }
})

export default cartSlice.reducer
export const { loadcart } = cartSlice.actions