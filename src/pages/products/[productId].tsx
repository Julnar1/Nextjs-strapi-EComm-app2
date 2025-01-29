import React from "react";
import { ProductService } from "../../services/products-services";
import styles from "../../styles/ProductDetail.module.css";
import classNames from "classnames";
import RenderStars from "../../components/products/RenderStars";
import AddToCart from "../../components/products/AddToCart";
import Head from "next/head";
import BackButton from "@/components/products/BackButton";
import {Product} from '../../lib/dataTypes';
export const getServerSideProps = async (context: {
  params: { productId: string };
}) => {
  const { params } = context;
  const { productId } = params;
  try {
    const product: Product = await ProductService.getProductById(productId); //fetch products
    return {
      props: { product },
    };
  } catch (error) {
    console.log("Data fetching error:", error);
    return {
      props: { product: null },
    };
  }
};
const ProductDetail = ({ product }: { product: Product | null }) => {
  // console.log("Detail of product is ",product);
  if (!product) {
    return <div className="text-center mt-5">Product not found.</div>;
  }
  return (
    <>
      <Head>
        <title>{product.title}</title> {/* Dynamically set the page title */}
      </Head>
      <div className="container">
        <div className={classNames("row mb-2", styles.productCard)}>
          <div className="col-5">
            {product.image?.url ? (
              <img
                src={product.image?.url} // Use optional chaining for safer access
                className={styles.imagewidth}
                alt={product.title}
              />
            ) : (
              <p>Image not available</p>
            )}
          </div>
          <div className="col-7 card-body">
            <h5 className="card-title fs-3 mb-1">{product.title}</h5>
            <p className="card-text fs-5 mb-1 text-muted">
              {product.description}
            </p>
            {product.discountPercentage && (
              <div>
                <div>
                  <span className="bg-danger text-white p-1 m-1">
                    Limited time deal
                  </span>
                </div>
                <p className="card-text mt-1">
                  <span className="text-danger fs-4">
                    -{product.discountPercentage}%{" "}
                  </span>
                  <span className="align-top ms-2">AED </span>
                  <span className="fs-4 fw-bold">
                    {product.discountedPrice?.toFixed(2) || "0.00"}
                  </span>
                  <span className="text-muted text-decoration-line-through ms-2">
                    {" "}
                    AED {product.price}
                  </span>
                </p>
              </div>
            )}
            {!product.discountPercentage && (
              <p className="card-text mb-1">
                <span className="align-top">AED</span>
                <span className="fs-4">{product.price}</span>
              </p>
            )}
            <div className="mb-2">
              {product.rating && product.rating.rate && (
                <div className="d-flex align-items-center mb-2">
                  {product.rating.rate}
                  <RenderStars rating={product.rating} />
                  <span className="ms-2 text-muted">
                    ({product.rating.count} ratings)
                  </span>
                </div>
              )}
            </div>
            <hr />
            <div className="mb-2">
              <AddToCart product={product} />
              <BackButton/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductDetail;
