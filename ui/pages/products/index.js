import React, { Fragment, useMemo, useState } from "react";
import classes from "./products.module.css";
import Product from "../../components/Product/Product";
import useCheckUser from "../../hooks/useCheckUser";
import AddProduct from "../../components/AddProduct/AddProduct";
import useProductStats from "../../hooks/useProductsStats";
import { useWeb3Context } from "../../context/Web3Context";
import { MdAdd } from "react-icons/md";

const Products = () => {
  const [show, setShow] = useState(false);
  const { web3, cart, address } = useWeb3Context();
  const isSeller = useCheckUser();

  const openModal = () => {
    setShow(true);
  };
  const closeModal = () => {
    setShow(false);
  };
  // const Collection = LatestCollection.push(VisitedCollection);
  const userAuth = useCheckUser();

  const productStat = useProductStats();
  const products = useMemo(
    () => (productStat ? productStat : null),
    [productStat],
  );

  const addToCart = async (key) => {
    const orderDetails = `placed an order.`;
    const count = 1;
    const res = await cart.methods
      .order(orderDetails, key, count)
      .send({ from: address, gas: 1000000 });
    if (res.status) {
      console.log("status", res.status);
    }
  };
  // console.log(cart);

  return (
    <main className={classes.Container}>
      {userAuth == 2 ? (
        <Fragment>
          <button onClick={openModal} className={classes.Add}>
            <MdAdd />
          </button>
          <AddProduct show={show} clicked={closeModal} />
        </Fragment>
      ) : null}

      <header className={classes.Header}>
        <h1>Explore All Products</h1>
      </header>
      <div className={classes.Sort}>
        <div className={classes.SortRight}></div>
      </div>
      <span className={classes.Line} />

      {isSeller == 2 ? (
        <div className={classes.ProductList}>
          {products.map((prod) => (
            <Product
              key={prod.key}
              id={prod.key}
              title={web3.utils.hexToAscii(prod.itemName)}
              image={prod.imageUrl}
              price={prod.itemPrice}
              icon={false}
            />
          ))}
        </div>
      ) : (
        <div className={classes.ProductList}>
          {products.map((prod) => (
            <Product
              key={prod.key}
              id={prod.key}
              title={web3.utils.hexToAscii(prod.itemName)}
              image={prod.imageUrl}
              price={prod.itemPrice}
              icon={true}
              onClick={() => {
                addToCart(prod.key);
              }}
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default Products;
