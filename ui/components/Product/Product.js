import React from "react";
import classes from "./Product.module.css";
import { MdShoppingCart, MdCreditCard } from "react-icons/md";
import Link from "next/link";

const Product = (props) => {
  return (
    <article className={classes.Product}>
      <div className={classes.ProductHeader}>
        <figure className={classes.ProductImage}>
          <img src={props.image} alt={props.title} />
        </figure>
        {props.icon ? (
          <span className={classes.ProductCart}>
            <button onClick={props.onClick} className="Icon">
              <MdCreditCard />
            </button>
          </span>
        ) : null}
      </div>
      {props.id ? (
        <Link href={`products/${props.id}`}>
          <a className={classes.ProductBottom}>
            <header className={classes.ProductTitle}>
              <h3>{props.title}</h3>
            </header>
            <span className={classes.ProductPrice}>A. {props.price}</span>
          </a>
        </Link>
      ) : null}
    </article>
  );
};

export default Product;
