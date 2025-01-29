"use client";
import Link from "next/link";
import Image from "next/image";
import LogoImg from "../../assets/images/logo_img.png";
import classNames from "classnames";
import styles from './Nav.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import {useState,useContext} from "react";
import { CartContext } from '../../context/CartContext';

export default function Nav() {
  const links = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "About Us", href: "/about-us" },
  { name: "Contact Us", href: "/contact-us" },
  { name: 'Cart', href: '/cart' } // Use FontAwesomeIcon 'faShoppingCart' for cart 
];
const [searchText, setSearchText] = useState('');
const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
  setSearchText(event.target.value);
};
  const { cartData } = useContext(CartContext);
  const cartLength = cartData.length;
  // console.log("cartData",cartData);
  return (
    <div>
       <nav
        className="navbar navbar-expand-lg bg-dark border-bottom border-body"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <Link href="/" className="navbar-brand">
            <Image src={LogoImg} height={55} alt={"Logo"} priority />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="d-flex flex-grow-1 mx-xl-5" role="search">
              <div className="input-group mb-3">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="form-control"
                  aria-label="Search"
                  aria-describedby="basic-addon2"
                  onChange={handleSearch}
                />
                <div className="input-group-append">
                  <button
                    className={classNames("btn", styles.searchButton)}
                    type="submit"
                  >
                  <Link href={`/products?searchText=${searchText}`}>
  <FontAwesomeIcon icon={faSearch} />
  </Link>
                  </button>
                </div>
              </div>
            </form>
            <ul className="navbar-nav mb-2 mb-lg-0">
             {links.map((link) => (
                <li className="nav-item me-xl-2" key={link.href}>
                   <Link href={link.href} className="nav-link">
                    {link.name === 'Cart' ? (
                      <> 
                      {/* Wrap icons and badge */}
                      <FontAwesomeIcon icon={faShoppingCart} />
                       {(cartLength > 0) && (
      <span
        className={classNames("badge", styles.badgeHeader)}
      >
        {cartLength}
      </span>
    )}
                    </>
                    ) : (
                      link.name // Display link name for others
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav> 
    </div>
    );
}


