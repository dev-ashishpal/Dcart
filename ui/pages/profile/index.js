import React from "react";
import classes from "./profile.module.css";

const Profile = () => {
  return (
    <section className={classes.Profile}>
      <div className={classes.ProfileHeader}>
        <header>
          <h1>Ashish Pal</h1>
          <span>Male</span>
        </header>
        <div className={classes.ProfileHeaderRight}>
          <div>buyer</div>
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
              <span>8059379276</span>
            </a>
          </div>
          <div className={classes.ContactDetailBox}>
            <h5 className={classes.ContactDetailBoxTitle}>Address:</h5>
            <div className={classes.ContactDetailBoxValue}>
              VPO Khudda Kalan, Ambala Cantt, Haryana 133104
            </div>
          </div>
          <div className={classes.ContactDetailBox}>
            <h5 className={classes.ContactDetailBoxTitle}>Email:</h5>
            <a
              href="mailto:ashish79276@gmail.com"
              className={classes.ContactDetailBoxValue}
            >
              ashish79276@gmail.com
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
            <p>17 eth</p>
            <header>
              <h2>ethereum available</h2>
            </header>
          </div>
          <div className={classes.TokenDetailBox}>
            <p>70900 eth</p>
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
            <input type="number"/>
            <button className={classes.BuyTokenBtn}>buy</button>
          </form>
        </div>
      </div>

    </section>
  );
};

export default Profile;
