import { createContext} from "react";
import {CartItem} from '../lib/dataTypes';

// Define state type and action type for clarity
export type CartStateType = {
  cartData: CartItem[];
};
export type CartActionType =
  | { type: "ADD_TO_CART"; product: CartItem }
  | { type: "UPDATE_QUANTITY"; documentId: string; quantity: number }
  | { type: "REMOVE_FROM_CART"; documentId: string }
  | { type: "CLEAR_CART" };

// Initial state for the cart
export const initialState: CartStateType = {
  cartData: [],
};
// Helper function to update cart item quantity
export const updateCartItemQuantity = (
  cartData: CartItem[],
  documentId: string,
  newQuantity: number
): CartItem[] => {
  return cartData.map((item) =>
    item.documentId === documentId
      ? { ...item, quantity: Math.max(newQuantity, 1) }
      : item
  );
};

// Create the CartContext with initial state and dispatch function
export const CartContext = createContext({
  cartData: initialState.cartData,
  addToCart: (product: CartItem) => {},
  incrementQuantity: (documentId: string) => {},
  decrementQuantity: (documentId: string) => {},
  removeFromCart: (documentId: string) => {},
  clearCart: () => {},
});
