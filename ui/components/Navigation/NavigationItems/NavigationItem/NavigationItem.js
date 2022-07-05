import React from "react";
import Link from "next/link";
import classes from "./NavigationItem.module.css";
import { useRouter } from "next/router";

const NavigationItem = (props) => {
  const router = useRouter();
  let container;
  if (props.button) {
    container = (
      <button onClick={props.onClick} className="Icon">
        {props.children}
      </button>
    );
  } else if (props.link) {
    container = (
      <Link href={props.href}>
        <a
          className={router.pathname == `${props.href}` ? classes.Active : null}
        >
          {props.children}
        </a>
      </Link>
    );
  } else {
    container = (
      <a className={router.pathname == `${props.href}` ? classes.Active : null}>
        {props.children}
      </a>
    );
  }
  return (
    <li className={classes.NavigationItem}>
      {container}
    </li>
  );
};

export default NavigationItem;
