import React from "react";
import classes from "./Button.module.css";
import PropTypes from "prop-types";

const Button = (props) => (
  <button
    onClick={props.onClick}
    className={classes.Btn}
    disabled={props.disabled}
  >
    {props.children}
  </button>
);

Button.propTypes = {
  disabled: PropTypes.bool,
  clicked: PropTypes.func,
};

export default Button;
