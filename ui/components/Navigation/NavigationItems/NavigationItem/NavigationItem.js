import classes from "./NavigationItem.module.css";
import React from "react";

const NavigationItem = (props) => {
  return <li className={classes.NavigationItem}>{props.children}</li>;
};

export default NavigationItem;
