"use client";
import React, { useState } from "react";
import Image from "next/image";
import jewellery from "../../assets/images/carousel/bracelet-carousel.jpg";
import mensFashion from "../../assets/images/carousel//image-carousel-men.webp";
import womensFashionSale from "../../assets/images/carousel//womens-fashion-carousel.jpg";
import Link from "next/link";

export default function Banners() {
  const [activeIndex, setActiveIndex] = useState(0);
  const bannerImages = [
    {
      image: jewellery,
      title: "Sparkling Deals on Jewellery",
      subtitle:
        "Explore our stunning collection of bracelets, rings, and more.",
      category: "jewellery",
    },
    {
      image: mensFashion,
      title: "Men's Fashion: Style & Comfort",
      subtitle: "Discover the latest trends in men's clothing and accessories.",
      category: "men's clothing",
    },
    {
      image: womensFashionSale,
      title: "Women's Fashion Sale: Up to 30% Off",
      subtitle:
        "Elevate your style with amazing deals on women's clothing and accessories.",
      category: "women's clothing",
    },
  ];
  function handlePrevClick() {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? bannerImages.length - 1 : prevIndex - 1
    );
  }
  const handleNextClick = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === bannerImages.length - 1 ? 0 : prevIndex + 1
    );
  };
  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        {bannerImages.map((banner, index) => (
          <div
            className={`carousel-item ${index === activeIndex ? "active" : ""}`}
            key={index}
          >
            <Link href={`/products?category=${banner.category}`}>
              <Image
                height={400}
                src={banner.image}
                alt={`Banner ${index + 1}`}
                className="d-block w-100"
                priority
              />
              <div className="carousel-caption d-none d-md-block text-dark fw-bold text-end">
                <h5>{banner.title}</h5>
                <p className="text-muted">{banner.subtitle}</p>
                <button className="btn btn-dark rounded">Shop Now</button>
              </div>
              </Link>
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
        onClick={handlePrevClick}
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
        onClick={handleNextClick}
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
