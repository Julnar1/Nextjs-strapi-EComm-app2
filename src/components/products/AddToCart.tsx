'use client';
import React, { useContext } from "react";
import classNames from "classnames";
import styles from "../../styles/ProductCard.module.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import styles
import { CartContext } from "@/context/CartContext";
import {Product} from '../../lib/dataTypes';


interface AddToCartProps {
  product: Product; 
}

export default function AddToCart({product}:AddToCartProps){
  const { cartData, addToCart } = useContext(CartContext);
  return (
    <button 
    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault(); // Prevent default behavior (if applicable)
      console.log('Product to add:', product);
      addToCart({ 
        documentId: product.documentId, 
        price: product.discountedPrice || product.price, // Use discountedPrice if available, otherwise use original price
        title: product.title, 
        image: product.image.url ,
        quantity: 1 
      }); 
      toast.success(`Added ${product.title} to the cart!`, {
      position: "top-right",
      autoClose: 2000,
      });
      //toast message will close after 2 seconds(2000 milliseconds)
     
      }}className={classNames("btn btn-warning rounded-pill mb-2",styles.buttonTextSize)} >
              Add to Cart
            </button>
  );

}
