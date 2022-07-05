import React from "react";
// import Image from "next/image";
import classes from "./Product.module.css";
import { MdShoppingCart } from "react-icons/md";
// import image from "../../assets/images/1.jpg";

const Product = (props) => {
  return (
    <article className={classes.Product}>
      <div className={classes.ProductHeader}>
        <figure className={classes.ProductImage}>
          <img src={props.image} alt={props.title} />
        </figure>
        <span className={classes.ProductCart}>
          <button className="Icon">
            <MdShoppingCart />
          </button>
        </span>
      </div>
      <a className={classes.ProductBottom}>
        <header className={classes.ProductTitle}>
          <h3>{props.title}</h3>
        </header>
        <span className={classes.ProductPrice}>{props.price}</span>
      </a>
    </article>
  );
};

export default Product;
