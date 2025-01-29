"use client";
import React from "react";
import styles from "./Cart.module.css";

const Payment = ({ onCheckout }:{onCheckout:()=>{}}) => {
  return (
    <div className={styles.creditCardDetails}>
      <h3 className={styles.title}>Payment Details</h3>
      <form>
        <div className="mb-3 d-flex">
          <label htmlFor="cardNumber" className="form-label">
            Card Number
          </label>
          <input
            type="number"
            className="form-control"
            id="cardNumber"
            placeholder="Enter Card Number"
            required
          />
        </div>
        <div className="mb-3 d-flex">
          <label htmlFor="cardholderName" className="form-label">
            Name on Card
          </label>
          <input
            type="text"
            className="form-control"
            id="cardholderName"
            placeholder="Enter Name"
            required
          />
        </div>
        <div className="mb-3 d-flex">
          <label htmlFor="cardExpiry" className="form-label">
            Card Expiry
          </label>
          <input
            type="date"
            className="form-control"
            id="cardExpiry"
            placeholder="dd-mm-yyyy"
            required
          />
        </div>
        <div className="mb-3 d-flex">
          <label htmlFor="cvv" className="form-label">
            CVV/PIN
          </label>
          <input
            type="password"
            className="form-control"
            id="cvv"
            placeholder="Enter CVV or PIN"
            required
          />
        </div>
        <div className="d-flex justify-content-between">
          <button
            type="submit"
            className="btn btn-dark"
            onClick={(event) => {
              event.preventDefault();
              onCheckout(); // Call the checkout handler from the Cart component
            }}
          >
            Make Payment
          </button>
          <button type="reset" className="btn btn-light">
            Reset Values
          </button>
        </div>
      </form>
    </div>
  );
};

export default Payment;
