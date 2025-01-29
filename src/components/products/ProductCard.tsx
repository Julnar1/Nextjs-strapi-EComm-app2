"use client";
import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";
import styles from "../../styles/ProductCard.module.css";
import RenderStars from "./RenderStars";
import AddToCart from "./AddToCart";
import {Product} from '../../lib/dataTypes';

export default function ProductCard(props: { product: Product }) {
  var prod = props.product;
  return (
    <div className={classNames("card", styles.productCard)}>
      <Link href={`/products/${prod.documentId}?populate=*`}>
        <Image
          src={prod.image.url}
          height={180}
          width={300}
          className={"card-img-top object-fit-contain"}
          style={{ width: "300px", height: "180px" }}
          alt={prod.title}
        />
      </Link>
      <div className="card-body p-0">
        <h6
          className={classNames(
            "card-title mb-0 text-secondary",
            styles.cardTitleHeight
          )}
        >
          <Link
            href={`/products/${prod.documentId}?populate=*`}
            className="text-reset text-decoration-none "
          >
            {prod.title}
          </Link>
        </h6>
        {prod.discountPercentage && 
          // Check if discountPercentage is defined and greater than 0
          typeof prod.discountPercentage === 'number' && 
          prod.discountPercentage > 0 ? (
          <div>
            <div className="text-danger fw-bold">Limited Time Deal</div>
            <p className="card-text">
              <span className="align-top">AED </span>
              <span className="fs-4 fw-bold">
                {prod.discountedPrice?.toFixed(2) || "0.00"}
              </span>
              <span className="text-muted text-decoration-line-through ms-2">
                {" "}
                AED {prod.price}
              </span>
            </p>
          </div>
        ) : (
          <p className="card-text mb-1">
            <span className="align-top">AED</span>
            <span className="fs-4">{prod.price}</span>
          </p>
        )}
        <div className="mb-2">
          {prod.rating &&
            prod.rating.rate && ( // Check if rating exists
              <div className="d-flex align-items-center mb-2">
                <RenderStars rating={prod.rating} />
                <span className="ms-2 text-muted">
                  ({prod.rating.count} ratings)
                </span>
              </div>
            )}
        </div>
        <AddToCart product={prod} />
      </div>
    </div>
  );
}
