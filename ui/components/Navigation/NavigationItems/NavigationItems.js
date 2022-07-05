import classes from "./NavigationItems.module.css";
import React, { useState } from "react";
import Link from "next/link";
import { MdSearch, MdShoppingCart, MdCreditCard } from "react-icons/md";
import Logo from "../../Logo/Logo";
import NavItem from "./NavigationItem/NavigationItem";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import Auth from "../../Auth/Auth";

const NavigationItems = (props) => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const openAuth = (link) => {
    if (loggedIn === false) {
      setShow(true);
    } else {
      router.push(link);
    }
  };
  const closeModal = () => {
    setShow(false);
  };
  return (
    <ul className={classes.NavigationList}>
      <Auth show={show} clicked={closeModal} />
      <div className={classes.NavigationStart}>
        <NavItem button onClick={""}>
          <MdSearch />
        </NavItem>
      </div>

      <div className={classes.NavigationCenter}>
        <NavItem link href="/products">all products</NavItem>
        <div className={classes.NavigationCenterLogo}>
          <NavItem link href="/">
            <Logo />
          </NavItem>
        </div>
        <span onClick={() => { openAuth("/profile");}}>
          <NavItem href='/profile'>Profile</NavItem>
        </span>
      </div>

      <div className={classes.NavigationEnd}>
        <div className={classes.NavigationEndFirst}>
          <span onClick={() => {openAuth("/orders");}}>
              <NavItem href="/orders">
                <span className="Icon">
                  <MdCreditCard />
                </span>
            </NavItem>
          </span>
        </div>
        <span onClick={() => {openAuth("/cart");}}>
          <NavItem href="/cart">
            <span className="Icon">
              <MdShoppingCart />
            </span>
          </NavItem>
        </span>
      </div>
    </ul>
  );
};

export default NavigationItems;
