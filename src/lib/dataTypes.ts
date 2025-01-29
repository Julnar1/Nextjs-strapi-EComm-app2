export interface Product {
    documentId: string;
    title: string;
    description: string;
    category: string;
    price: number;
    color: string;
    availableQty: number;
    rating: {
      rate: number;
      count: number;
    };
    discountPercentage: number | null;
    image: { url: string };
    discountedPrice?: number | null;
  }
  
  export interface CartItem {
    documentId: string;
    title: string;
    price: number;
    image: string;
    quantity: number;
  }
  
  export interface RatingProps {
    rating: { rate: number; count: number };
  }