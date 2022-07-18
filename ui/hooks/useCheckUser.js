import React, { useState, useEffect, useContext, useRef } from "react";
import { useWeb3Context } from "../context/Web3Context";
import useRefresh from "./useRefresh";

const useCheckUser = () => {
	const { cart, address } = useWeb3Context();
	const [isAuth, setIsAuth] = useState(false);
	const { fastRefresh } = useRefresh();

  useEffect(() => {
    async function userAuth() {
      if (cart) {
        const data = await cart.methods.checkUser().call({ from: address });
        setIsAuth(data);
      }
    }
    userAuth();
  }, [setIsAuth, fastRefresh]);

  return isAuth;
};

export default useCheckUser;
