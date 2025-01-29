"use client";
import React, { Reducer, useReducer } from "react";
import {CartContext} from '../../context/CartContext';
import { CartStateType, CartActionType, initialState,updateCartItemQuantity} from '../../context/CartContext';
import { CartItem } from "@/lib/dataTypes";
// Reducer function to handle cart state updates
const reducer = (
  state: CartStateType,
  action: CartActionType
): CartStateType => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingProductIndex = state.cartData.findIndex(
        (item) => item.documentId === action.product.documentId
      );
      if (existingProductIndex !== -1) {
        // Update quantity if product already exists
        return {
          ...state,
          cartData: [
            ...state.cartData.slice(0, existingProductIndex),
            {
              ...state.cartData[existingProductIndex],
              quantity: state.cartData[existingProductIndex].quantity + 1,
            },
            ...state.cartData.slice(existingProductIndex + 1),
          ],
        };
      } else {
        // Add new product with quantity 1
        return {
          ...state,
          cartData: [...state.cartData, { ...action.product, quantity: 1 }],
        };
      }
    case "UPDATE_QUANTITY":
      return {
        ...state,
        cartData: updateCartItemQuantity(
          state.cartData,
          action.documentId,
          action.quantity
        ),
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartData: state.cartData.filter(
          (item) => item.documentId !== action.documentId
        ),
      };
    case "CLEAR_CART":
      return {
        ...state,
        cartData: [],
      };
    default:
      return state;
  }
};
// CartProvider component to manage cart state using useReducer
export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartState, dispatch] = useReducer<
    Reducer<CartStateType, CartActionType>
  >(reducer, initialState);

  const addToCart = (product: CartItem) => {
    dispatch({ type: "ADD_TO_CART", product });
  };

  const incrementQuantity = (documentId: string) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      documentId,
      quantity:
        (cartState.cartData.find((item) => item.documentId === documentId)
          ?.quantity || 0) + 1,
    });
  };

  const decrementQuantity = (documentId: string) => {
    const existingItem = cartState.cartData.find(
      (item) => item.documentId === documentId
    );
    if (existingItem && existingItem.quantity > 1) {
      dispatch({
        type: "UPDATE_QUANTITY",
        documentId,
        quantity: existingItem.quantity - 1,
      });
    } else {
      removeFromCart(documentId);
    }
  };

  const removeFromCart = (documentId: string) => {
    dispatch({ type: "REMOVE_FROM_CART", documentId });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const value = {
    cartData: cartState.cartData,
    addToCart,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
