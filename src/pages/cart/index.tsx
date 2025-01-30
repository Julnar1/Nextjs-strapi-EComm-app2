"use client";
import Head from "next/head";
import React, { useContext, useEffect } from "react";
import CartItem from "../../components/cart/CartItem";
import OrderDetails from "./OrderDetails";
import Payment from "./Payment";
import { CartContext } from "../../context/CartContext";
import { useRouter } from "next/navigation";
const Cart = () => {
  const { cartData, clearCart } = useContext(CartContext);
  const router = useRouter(); // Get router instance
  // Calculate subtotal
  const subTotal = cartData.reduce(
    (acc, cartItem) => acc + cartItem.price * cartItem.quantity,
    0
  );
  const total = subTotal + 25; // Add shipping cost
  useEffect(() => {
    console.log("Cart data updated:", cartData); // Log for debugging
  }, [cartData]); // Re-run effect whenever cartData changes
  const handleCheckout = async () => {
    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItems: cartData }),
      });

      if (response.ok) {
        const data = await response.json();
        router.push(`/orders/${data.orderId}`);
        clearCart(); //clear the cart
      } else {
        console.error("Error creating order:", response.status);
        // Display an error message to the user (e.g., using a toast notification)
      }
    } catch (error) {
      console.error("Error creating order:", error);
      // Display an error message to the user
    }
  };
  return (
    <>
      <Head>
        <title>Cart page</title>
      </Head>
      <div className="container">
        <h2>My Cart</h2>
        {cartData.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="row">
            <div className="col-md-5">
              <ul>
                <hr />
                {cartData.map((cartItem) => (
                  <CartItem key={cartItem.documentId} cartItem={cartItem} />
                ))}
              </ul>
            </div>
            <div className="col-md-3 mb-3">
            {subTotal !== undefined && total !== undefined && (
  <OrderDetails subTotal={subTotal} total={total} />
)}
            </div>
            <div className="col-md-4">
              <Payment onCheckout={handleCheckout} />
            </div>
          </div>
        )}
        <div>
          <button
            onClick={() => router.push("/products")}
            className="btn btn-dark text-start mb-2"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </>
  );
};
export default Cart;

