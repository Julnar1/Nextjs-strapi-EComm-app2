import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../../context/CartContext';
import { useContext } from 'react';
import { CartItem as CartItemType } from '../../lib/dataTypes';

const CartItem: React.FC<{ cartItem: CartItemType }> = ({ cartItem }) => {
  const { incrementQuantity, decrementQuantity, removeFromCart } = useContext(CartContext);
  return (
    <>
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        <img src={cartItem.image} width={60} alt={cartItem.title} className="cart-item-image" />
        <div className="ms-3">
          <h6 className="mb-0 text-start">{cartItem.title}</h6>
          <p className="mb-0 text-start text-secondary">
            AED {cartItem.price.toFixed(2)} 
            <span className="text-dark">*{cartItem.quantity}</span>
          </p>
        </div>
      </div>
      <div className="d-flex align-items-center">
        <button 
          className="btn btn-sm btn-outline-secondary" 
          onClick={() => {
          if (cartItem.quantity > 1) {
            decrementQuantity(cartItem.documentId);
          } else {
            removeFromCart(cartItem.documentId);
          }}}
        >
          -
        </button>
        <span className="mx-2">{cartItem.quantity}</span>
        <button 
          className="btn btn-sm btn-outline-secondary" 
          onClick={() => {
            incrementQuantity(cartItem.documentId);
          }}
        >
          +
        </button>
        <button 
          className="btn btn-sm text-danger ms-3 fs-5" 
          onClick={() => removeFromCart(cartItem.documentId)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
     
    </li>
     <hr/>
     </>
  );
};

export default CartItem;