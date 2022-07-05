import React, { Fragment, useState } from "react";
import classes from "./Select.module.css";
import Option from "./Option/Option";
import PropTypes from "prop-types";

const Select = (props) => {
  // const [selectedData, setSelectedData] = useState([]);
  const [opened, setOpened] = useState(false);

  const onSelectClick = () => {
    if (opened === false) {
      setOpened(true);
    } else {
      setOpened(false);
    }
    // setOpened((prevState) => {
    //   return { opened: !prevState.opened };
    // });
  };

  console.log("select.js", props.list);
  let containerClass = [classes.SearchFilterContainer];
  if (opened) {
    containerClass = [classes.SearchFilterContainer, classes.Active];
  }
  let showTitle;
  if (props.list.length === 0) {
    showTitle = <div className={classes.Title}>{props.name}</div>;
  } else {
    showTitle = (
      <Fragment>
        {props.list.map((data) => (
          <div className={classes.SelectedTitle} key={data}>
            {data}
          </div>
        ))}
      </Fragment>
    );
  }
  return (
    <div className={classes.SearchFilter}>
      <div className={classes.SearchFilterBox}>
        <div className={containerClass.join(" ")}>
          {props.options.map((option) => (
            <Option
              value={option}
              key={option}
              changed={props.changed}
              selectType={props.selectType}
            />
          ))}
        </div>
        <div className={classes.Selected} onClick={onSelectClick}>
          {showTitle}
        </div>
      </div>
    </div>
  );
};

Select.propTypes = {
  selectType: PropTypes.oneOf(["radio", "checkbox"]),
  data: PropTypes.array,
  list: PropTypes.array,

  changed: PropTypes.func,
};

export default Select;
