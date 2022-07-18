import React, { useMemo } from "react";
import classes from "./orders.module.css";
// import useUserStats from "../../hooks/useUserStats";
import useOrdersStats from "../../hooks/useOrdersStats";
import useSellerOrder from "../../hooks/useSellerOrder";
import { formatDate } from "../../utils/formatDate";
import useCheckUser from "../../hooks/useCheckUser";

import { useWeb3Context } from "../../context/Web3Context";

const Order = () => {
  const { cart, address } = useWeb3Context();
  const userType = useCheckUser();
  let orderStats, status;
  // if (!!userType && userType == 1) {
  orderStats = useOrdersStats();
  status = (value) => {
    if (value.isRejected) {
      return "Rejected";
    } else if (value.confirmDelivery) {
      return "Received";
    } else if (value.isShipped) {
      return "Shipped";
    } else if (value.isConfirmed) {
      return "Accepted";
    } else {
      return "Pending";
    }
  };
  let sellerOrderStat;
  sellerOrderStat = useSellerOrder();
  console.log("data", sellerOrderStat);

  const confirmOrder = async (o_id, p_id) => {
    // console.log("oid, pid", o_id, p_id);
    const res = await cart.methods
      .confirmOrder(o_id, p_id)
      .send({ from: address, gas: 100000 });
    console.log(res.status);
  };

  const shipOrder = async (o_id, p_id) => {
    console.log("o_id", "p_id", o_id, p_id);
    const res = await cart.methods
      .shipOrder(o_id, p_id)
      .send({ from: address, gas: 100000 });
    console.log(res.status);
  };

  const rejectOrder = (o_id, p_id) => {
    console.log("o_id", "p_id", o_id, p_id);
  };

  const confirmDelivery = async (o_id, p_id) => {
    const res = await cart.methods
      .confirmDelivery(o_id, p_id)
      .send({ from: address, gas: 100000 });
    console.log(res.status);
  };

  let article = <div>Loading ...</div>;

  if (userType == 1 && orderStats) {
    article = (
      <section className={classes.Section}>
        <header className={classes.FlexBox}>
          <div className={classes.Flex}>
            <h5 className={`${classes.Title} ${classes.Bold}`}>Order ID</h5>
            <h5 className={`${classes.Title} ${classes.Bold}`}>Name</h5>
            <h5 className={`${classes.Title} ${classes.Bold}`}>Date</h5>
          </div>
          <div className={classes.Flex}>
            <h5 className={`${classes.Title} ${classes.Bold}`}>TotalPrice</h5>
            <h5 className={`${classes.Title} ${classes.Bold}`}>Status</h5>
            <h5 className={`${classes.Title} ${classes.Bold} ${classes.Width}`}>
              Action
            </h5>
          </div>
        </header>
        {orderStats.map((order) => {
          let receivedBtn = true;
          const articleStyle = [classes.FlexBoxIn];
          const statusStyle = [classes.Title, classes.Bold];
          if (status(order) === "Received") {
            articleStyle.push(classes.Faded);
            receivedBtn = true;
          } else if (status(order) === "Shipped") {
            receivedBtn = false;
            statusStyle.push(classes.Green);
          } else if (status(order) === "Approved") {
          } else if (status(order) === "Rejected") {
            articleStyle.push(classes.Faded);
          } else if (status(order) === "Pending") {
            statusStyle.push(classes.Red);
          }

          return (
            <article className={articleStyle.join(" ")} key={order.id}>
              <div className={classes.Flex}>
                <div className={`${classes.Id} ${classes.Title}`}>
                  #{order.id}
                </div>
                <div className={classes.Title}>
                  {JSON.parse(order.orderDetails).itemName}
                </div>
                <div className={classes.Title}>
                  {formatDate(order.timeStamp)}
                </div>
              </div>
              <div className={classes.Flex}>
                <div className={classes.Title}>A. {order.totalPrice}</div>
                <div className={statusStyle.join(" ")}>{status(order)}</div>
                <div className={`${classes.Title} ${classes.Width}`}>
                  <button
                    disabled={receivedBtn}
                    onClick={() => {
                      confirmDelivery(
                        order.id,
                        JSON.parse(order.orderDetails).itemId,
                      );
                    }}
                    className={classes.Btn}
                  >
                    Received
                  </button>
                </div>
              </div>
            </article>
          );
        })}
        ;
      </section>
    );
  }

  if (userType == 2 && sellerOrderStat) {
    article = (
      <section className={classes.Section}>
        <header className={classes.FlexBox}>
          <div className={classes.Flex}>
            <h5 className={`${classes.Title} ${classes.Bold}`}>Order ID</h5>
            <h5 className={`${classes.Title} ${classes.Bold}`}>Name</h5>
            <h5 className={`${classes.Title} ${classes.Bold}`}>Count</h5>
          </div>
          <div className={classes.Flex}>
            <h5 className={`${classes.Title} ${classes.Bold}`}>Action</h5>
            <h5 className={`${classes.Title} ${classes.Bold}`}>Action</h5>
            <h5 className={`${classes.Title} ${classes.Bold} ${classes.Width}`}>
              Action
            </h5>
          </div>
        </header>
        {sellerOrderStat.map((data) => {
          let rejectBtn = false;
          let confirmBtn = false;
          let shipBtn = true;
          const articleStyle = [classes.FlexBoxIn];
          if (status(data) === "Received" || status(data) === "Rejected") {
            articleStyle.push(classes.Faded);
            rejectBtn = true;
            confirmBtn = true;
            shipBtn = true;
          }

          if (status(data) === "Confirm") {
            rejectBtn = true;
            shipBtn = false;
          }
          if (status(data) === "Shipped") {
            shipBtn = true;
          }
          return (
            <article className={articleStyle.join(" ")} key={data.orderId}>
              <div className={classes.Flex}>
                <div className={`${classes.Id} ${classes.Title}`}>
                  #{data.orderId}
                </div>
                <div className={classes.Title}>
                  {JSON.parse(data.orderDetails).itemName}
                </div>
                <div className={classes.Title}>
                  {JSON.parse(data.orderDetails).itemCount}
                </div>
              </div>
              <div className={classes.Flex}>
                <div className={classes.Title}>
                  <button
                    disabled={rejectBtn}
                    onClick={() => {
                      rejectOrder(
                        data.orderId,
                        JSON.parse(data.orderDetails).itemId,
                      );
                    }}
                    className={`${classes.Btn} ${classes.Reject}`}
                  >
                    Reject
                  </button>
                </div>
                <div className={classes.Title}>
                  <button
                    disabled={confirmBtn}
                    onClick={() => {
                      confirmOrder(
                        data.orderId,
                        JSON.parse(data.orderDetails).itemId,
                      );
                    }}
                    className={`${classes.Btn} ${classes.Confirm}`}
                  >
                    Approve
                  </button>
                </div>
                <div className={`${classes.Title} ${classes.Width}`}>
                  <button
                    disabled={shipBtn}
                    onClick={() => {
                      shipOrder(
                        data.orderId,
                        JSON.parse(data.orderDetails).itemId,
                      );
                    }}
                    className={classes.Btn}
                  >
                    Ship
                  </button>
                </div>
              </div>
            </article>
          );
        })}
        ;
      </section>
    );
  }

  return (
    <div className={classes.Container}>
      <header className={classes.Header}>
        <h1>Orders</h1>
      </header>
      {article}
    </div>
  );
};

export default Order;
