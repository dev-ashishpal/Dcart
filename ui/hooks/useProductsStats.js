import React, { useState, useEffect, useContext, useRef } from "react";
import { useWeb3Context } from "../context/Web3Context";
import useRefresh from "./useRefresh";

const useProductStats = () => {
  const { cart, address } = useWeb3Context();
  const [product, setProduct] = useState([]);
  const { fastRefresh } = useRefresh();

  useEffect(() => {
    async function userAuth() {
      const data = [];
      if (cart) {
        let i = 0;
        const totalProducts = await cart.methods.totalProductID().call();
        for (i = 1; i < totalProducts; i++) {
          let dt = await cart.methods.product(i).call();
          if (dt) {
            dt.key = i;
            data.push(dt);
          }
        }
        setProduct(data);
      }
    }
    userAuth();
  }, [setProduct, fastRefresh]);

  return product;
};

export default useProductStats;
