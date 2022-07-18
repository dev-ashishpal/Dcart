import React, { useState, useEffect } from "react";
import { useWeb3Context } from "../context/Web3Context";
import useUserStats from "./useUserStats";
import useRefresh from "./useRefresh";
import useCheckUser from "./useCheckUser";

const useOrdersStats = () => {
  const { fastRefresh } = useRefresh();
  const userStats = useUserStats();
  const userType = useCheckUser();
  const [orders, setOrders] = useState(null);
  const { web3, address, cart } = useWeb3Context();
  let data = [];
  useEffect(() => {
    async function getData() {
      if (userStats.orders && userType == 1) {
        for (let order of userStats.orders) {
          const market = await cart.methods
            .marketOrder(order)
            .call({ from: address });
          const prod = await cart.methods
            .productOrder(order, JSON.parse(market.orderDetails).itemId)
            .call({ from: address });
        //   market.id = order;
        //   console.log("market:", market);
        //   console.log("product: ", prod);
          //   data.push(market);
          data.unshift({
            buyerAddr: market.BuyerAddr,
            id: order,
            orderDetails: market.orderDetails,
            timeStamp: market.timeStamp,
            totalPrice: market.totalPrice,
            confirmDelivery: prod.confirmDelivery,
            isCancelled: prod.isCancelled,
            isConfirmed: prod.isConfirmed,
            isRejected: prod.isRejected,
            isShipped: prod.isShipped,
          });
        }
        setOrders(data);
      }
    }
    getData();
  }, [setOrders, fastRefresh]);
  // console.log("data:::", data);
  return orders;
};

export default useOrdersStats;
