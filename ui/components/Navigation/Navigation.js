import Logo from "../Logo/Logo";
import React from "react";
import classes from "./Navigation.module.css";
import NavItems from "./NavigationItems/NavigationItems";
import PropTypes from "prop-types";

const Navigation = (props) => {
  return (
    <nav className={classes.Navbar}>
      <header className="Hide">
        <h1>Navigation Bar</h1>
      </header>
      <NavItems />
    </nav>
  );
};

Navigation.propTypes = {
  showLoginHandler: PropTypes.func,
  showSignupHandler: PropTypes.func,
};

export default Navigation;
