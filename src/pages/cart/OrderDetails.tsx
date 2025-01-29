import React from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import styles from "./Cart.module.css";
import PropTypes from "prop-types";

const OrderDetails = ({ subTotal, total }:{subTotal:number; total:number}) => {

  return (
    <div className="card">
      <div className={styles.cartTotals}>
        <h3>Cart Totals</h3>
        <div className={classNames("fw-bold", styles.subtotal)}>
          <span>Subtotal:</span>
          <span className={styles.subtotalAmount}>
            AED {subTotal.toFixed(2)}
          </span>
        </div>
        <div className={styles.shipping}>
          <span className={styles.textStart}>Shipping Cost:</span>
          <span className={styles.shippingAmount}>AED 25.00</span>
        </div>
        <p className={classNames("text-start", styles.shippingNote)}>
          Shipping options will be updated during{" "}
          <a className="text-decoration-none">checkout.</a>
        </p>

        <a
          className={classNames(
            "text-start text-decoration-none",
            styles.calculateShippingLink
          )}
        >
          Calculate Shipping Cost <FontAwesomeIcon icon={faChevronDown} />
        </a>
        <div className={classNames("fw-bold", styles.total)}>
          <span>Total:</span>
          <span>AED {total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
