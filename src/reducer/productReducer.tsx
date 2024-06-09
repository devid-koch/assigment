// src/reducers/productReducer.ts
import { ProductAction, ProductState } from '../types/product';

export const productReducer = (state: ProductState, action: ProductAction): ProductState => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return { ...state, products: action.payload };
        case 'ADD_TO_CART':
            const existingCartItem = state.cart.find(item => item.id === action.payload.id);
            if (existingCartItem) {
                return {
                    ...state,
                    cart: state.cart.map(item => item.id === action.payload.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item)
                };
            }
            return { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }] };
        case 'REMOVE_FROM_CART':
            return { ...state, cart: state.cart.filter(item => item.id !== action.payload) };
        case 'CLEAR_CART':
            return { ...state, cart: [] };
        default:
            return state;
    }
};
