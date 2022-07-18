import React, { useState, useMemo, useRef } from "react";
import classes from "./profile.module.css";
import useBalanceStats from "../../hooks/useBalanceStats";
import { useWeb3Context } from "../../context/Web3Context";
import useUserStats from "../../hooks/useUserStats";
// import useCheckUser from "../../hooks/useCheckUser";

const Profile = () => {
  const inputRef = useRef();
  const {token, address, admin} = useWeb3Context();

  const balanceStats = useBalanceStats();
  const userStats = useUserStats();
  // use MEMO ....

  const buyToken = async (event) => {
    event.preventDefault();
    const tokenPrice = await token.methods.tokenPrice().call();
    const amount = inputRef.current.value;
    await token.methods
      .buyToken(amount)
      .send({ from: address,value: amount * tokenPrice, to: admin, gas: 100000 });
      inputRef.current.value = "";
  };
  

  return (
    <section className={classes.Profile}>
      <div className={classes.ProfileHeader}>
        <header>
          <h1>{userStats.name || "-"}</h1>
          <span>{userStats.gender || "-"}</span>
        </header>
        <div className={classes.ProfileHeaderRight}>
          <div>{userStats.type || "-"}</div>
        </div>
      </div>
      <div className={classes.Contact}>
        <header>
          <h2 className={classes.ContactHeader}>Contact Information</h2>
        </header>
        <div className={classes.ContactDetail}>
          <div className={classes.ContactDetailBox}>
            <h5 className={classes.ContactDetailBoxTitle}>Phone:</h5>
            <a className={classes.ContactDetailBoxValue} href="tel:8059379276">
              <span>+91</span>
              <span>{userStats.contact || "-"}</span>
            </a>
          </div>
          <div className={classes.ContactDetailBox}>
            <h5 className={classes.ContactDetailBoxTitle}>Address:</h5>
            <div className={classes.ContactDetailBoxValue}>
              {userStats.address || "-"}
            </div>
          </div>
          <div className={classes.ContactDetailBox}>
            <h5 className={classes.ContactDetailBoxTitle}>Email:</h5>
            <a
              href="mailto:ashish79276@gmail.com"
              className={classes.ContactDetailBoxValue}
            >
              {userStats.email || "-"}
            </a>
          </div>
        </div>
      </div>

      <div className={classes.Token}>
        <header>
          <h1 className={classes.TokenHeader}>Token Information</h1>
        </header>
        <div className={classes.TokenDetail}>
          <div className={classes.TokenDetailBox}>
            <p>{Number(balanceStats.ethBalance).toFixed(2)} eth</p>
            <header>
              <h2>ethereum available</h2>
            </header>
          </div>
          <div className={classes.TokenDetailBox}>
            <p>{balanceStats.tokenBalance} Ash</p>
            <header>
              <h2>Ash Token available</h2>
            </header>
          </div>
          <div className={classes.TokenDetailBox}>
            <p>0.0001 eth</p>
            <header>
              <h2>1 token price</h2>
            </header>
          </div>
        </div>
        <div className={classes.BuyToken}>
          <form className={classes.BuyTokenForm}>
            <input type="number" ref={inputRef} placeholder="eg: 1000" />
            <button onClick={buyToken} className={classes.BuyTokenBtn}>
              buy
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Profile;
