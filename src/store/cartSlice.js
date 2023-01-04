import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItemToCart: (state, action) => {
            const existingCartItem = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
            );
            console.log(existingCartItem)
            if (existingCartItem >= 0) {
                state.cartItems[existingCartItem].quantity += 1;
            } else {
                const tempProduct = { ...action.payload, quantity: 1 };
                state.cartItems.push(tempProduct);
            }
        },

        removeItemFromCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
            );

            if (existingCartItem >= 0) {
                state.cartItems[existingCartItem].quantity += 1;
            } else {
                const tempProduct = { ...action.payload, quantity: 1 };
                state.cartItems.push(tempProduct);
            }
        }
    }
})

export const { addItemToCart, removeItemFromCart } = cartSlice.actions;

export const getCartItems = (state) => state.cart.cartItems;

export default cartSlice.reducer;