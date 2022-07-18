import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import classes from "./product.module.css";
import { useWeb3Context } from "../../context/Web3Context";
import useRefresh from "../../hooks/useRefresh";
import { MdAdd } from "react-icons/md";
// import useSingleProductStats from '../../hooks/useSingleProductStats';

const SingleProduct = () => {
  const router = useRouter();
  const [counter, setCounter] = useState(1);
  const { fastRefresh } = useRefresh();

  const [product, setProduct] = useState(null);
  const { web3, cart, address } = useWeb3Context();

  const increase = () => {
    const num = counter;
    setCounter(num + 1);
  };

  const decrease = () => {
    const num = counter;
    if (num > 1) {
      setCounter(num - 1);
    }
  };

  const buy = async () => {
    const detail = {
      itemName: web3.utils.hexToAscii(product.itemName),
      itemId: router.query.id,
      itemPrice: product.itemPrice,
      itemCount: counter,
      itemTotal: counter * product.itemPrice,
    };
    const res = await cart.methods
      .order(JSON.stringify(detail), router.query.id, counter)
      .send({ from: address, gas: 1000000 });
    if (res.status) {
      console.log("status: ", res.status);
    }
    console.log(JSON.stringify(detail));
  };

  useEffect(() => {
    let data;
    async function fetch() {
      if (cart) {
        data = await cart.methods.product(router.query.id).call();
        setProduct(data);
      }
    }
    fetch();
  }, [setProduct, fastRefresh]);

  return (
    <div className={classes.Box}>
      {!!product ? (
        <Fragment>
          <figure className={classes.ImageBox}>
            <img src={product.imageUrl} />
          </figure>
          <div className={classes.ContentBox}>
            <header className={classes.ContentHeader}>
              <h1>{web3.utils.hexToAscii(product.itemName)}</h1>
            </header>
            <span className={classes.Brand}>
              Brand: {web3.utils.hexToAscii(product.itemBrand)}
            </span>
            <div className={classes.Price}>A. {product.itemPrice}</div>
            <hr className={classes.Line} />
            <div className={classes.Description}>
              <header>
                <h5>Description</h5>
              </header>
              <p>{product.itemDetails}</p>
            </div>
            <div className={classes.CounterBox}>
              <button className={classes.DecBtn} onClick={decrease}>
                -
              </button>
              <span>{counter}</span>
              <button className={classes.IncBtn} onClick={increase}>
                +
              </button>
            </div>
            <div className={classes.Button}>
              <button onClick={buy}>BUY</button>
            </div>
          </div>
        </Fragment>
      ) : (
        <div>loading.........</div>
      )}
    </div>
  );
};

export default SingleProduct;
