import React from 'react';
import classes from './products.module.css';
import Product from '../../components/Product/Product';
import {Collection} from '../../external-data';

const Products = () => {
	// const Collection = LatestCollection.push(VisitedCollection);
	return (
    <main className={classes.Container}>
      <header className={classes.Header}>
        <h1>Explore All Products</h1>
      </header>
      <div className={classes.Sort}>
        <span>{Collection.length } items found</span>
        <div className={classes.SortRight}>
          <span>Sort By:</span>
          <div className={classes.SortSelect}>Latest</div>
        </div>
      </div>
      <span className={classes.Line} />
      {/* <div className={classes.Filter}>
				<div>
					<div></div>
				</div>
			</div> */}

      <div className={classes.ProductList}>
        {Collection.map((prod) => (
          <Product
            key={prod.id}
            title={prod.title}
            image={prod.image}
            price={prod.price}
          />
        ))}
      </div>
    </main>
  );
}

export default Products;