import classes from "./NavigationItems.module.css";
import React from "react";
import sprite from '../../../public/svg/sprite.svg';
import Logo from "../../Logo/Logo";
import NavItem from "./NavigationItem/NavigationItem";
import PropTypes from "prop-types";

const NavigationItems = (props) => {
  return (
    <ul className={classes.NavigationList}>
      <div>
        <NavItem>
          <button onClick={""}>Search</button>
        </NavItem>
      </div>
      <div>
        <NavItem>
          <a href="/about" target="_blank">
            all product
          </a>
        </NavItem>

        <NavItem>
          <Logo/>
        </NavItem>

        <NavItem>
          <a href="/help" target="_blank">
            profile
          </a>
        </NavItem>
      </div>

      <div>
        <NavItem>
          <a href="/help" target="_blank">
            orders
          </a>
        </NavItem>
        <NavItem>
          <a href="/help" target="_blank">
            cart
          </a>
        </NavItem>
      </div>
    </ul>
  );
};

NavigationItems.propTypes = {
  showLoginHandler: PropTypes.func,
  showSignupHandler: PropTypes.func,
};

export default NavigationItems;
