import React from 'react';
import classes from './skeletonElement.module.css';

const skeletonElement = (props) => {
    const types = props.type;
    // const skeletonClass = [classes.Skeleton, props.type];
    // const classes = `Skeleton ${props.type}`;
    return (
        <div className={`${classes.Skeleton} ${types}`}>&nbsp;</div>
    )
};

export default skeletonElement;