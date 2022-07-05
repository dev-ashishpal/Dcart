import React from 'react';
import Product from '../Product/Product';
import classes from './ProductList.module.css';

const ProductList = (props) => {
	return (
    <div className={classes.ProductList}>
      <Product title="Men Sunglasses" image="/images/1.jpg" price="A. 11999" />
      <Product
        title="High Ankle Sneaker"
        image="/images/2.jpg"
        price="A. 19999"
      />
      <Product title="LV Airpod Case" image="/images/3.jpg" price="A. 4999" />
      <Product
        title="Electric Trimmer Men"
        image="/images/4.jpg"
        price="A. 7999"
      />
      <Product title="Men Sunglasses" image="/images/1.jpg" price="A. 11999" />
    </div>
  );
}

export default ProductList;