import React from "react";
import classes from "./Spinner.module.css";

const Spinner = () => (
  <div className={classes.Container}>
    <div>
      <div>
        <span className={`${classes.One} ${classes.H6}`}></span>
        <span className={`${classes.Two} ${classes.H3}`}></span>
      </div>
    </div>

    <div>
      <div>
        <span className={`${classes.One} ${classes.H1}`}></span>
        <span className={`${classes.Two} ${classes.H4}`}></span>
      </div>
    </div>

    <div>
      <div>
        <span className={`${classes.One} ${classes.H5}`}></span>
        <span className={`${classes.Two} ${classes.H2}`}></span>
      </div>
    </div>
  </div>
);

export default Spinner;
