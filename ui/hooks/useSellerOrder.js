import React, { useState, useEffect } from "react";
import { useWeb3Context } from "../context/Web3Context";
import useRefresh from "./useRefresh";
import useCheckUser from "./useCheckUser";

const useSellerOrder = () => {
  const { fastRefresh } = useRefresh();
  //   const [id, setId] = useState(null);
  const [data, setData] = useState(null);
  const userType = useCheckUser();
  const { web3, address, cart } = useWeb3Context();
  let ids = [];
  let sellerData = [];
  //   let orderIds = [];
  useEffect(() => {
    async function getData() {
      if (cart && userType == 2) {
        const orderIds = await cart.methods
          .Orders(address)
          .call({ from: address });
        for (let order of orderIds) {
          const prodId = await cart.methods
            .productsList(address, order)
            .call({ from: address });
          const market = await cart.methods
            .marketOrder(order)
            .call({ from: address });
          const product = await cart.methods
            .productOrder(order, prodId[0])
            .call({ from: address });
          sellerData.unshift({
            buyerAddr: market.BuyerAddr,
            orderId: order,
            orderDetails: market.orderDetails,
            timeStamp: market.timeStamp,
            totalPrice: market.totalPrice,
            confirmDelivery: product.confirmDelivery,
            isCancelled: product.isCancelled,
            isConfirmed: product.isConfirmed,
            isRejected: product.isRejected,
            isShipped: product.isShipped,
          });
        }
        setData(sellerData);
      }
    }
    getData();
  }, [setData, fastRefresh]);
  // console.log("data:::", orderId);
  return data;
};

export default useSellerOrder;
