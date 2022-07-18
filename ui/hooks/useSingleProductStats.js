import React, { useState, useEffect, useContext, useRef } from "react";
import { useWeb3Context } from "../context/Web3Context";
import useRefresh from "./useRefresh";

const useSingleProductStats = (props) => {
  const { cart, address } = useWeb3Context();
  const [product, setProduct] = useState({});
  const { fastRefresh } = useRefresh();

  useEffect(() => {
    async function fetch() {
      if (cart) {
        console.log("props", props.id);
        const data = await cart.methods.product(props.id).call();
        setProduct(data);
      }
    }
    fetch();
  }, [setProduct, fastRefresh]);

  return product;
};

export default useSingleProductStats;
