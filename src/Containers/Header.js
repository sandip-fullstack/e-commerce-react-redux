import React from "react";
import {browserHistory} from "react-router";
import {connect} from "react-redux";

import classNames from "classnames";

import BasketCart from "./BasketCart";

const Header = ({addedToBag})=>{
  const classes = classNames({
    "toast-message": true,
    "top-translate": addedToBag
  })
    return (
        <div className="header">
          <div className={classes}>ADDED TO CART</div>
          <div style={{cursor: "pointer"}} onClick={() => browserHistory.push("/")}>My E-Commerce</div>
          <BasketCart />
        </div>
    )
};
const mapStateToProps = (state)=>({
  addedToBag: state.AddedToBag
});

export default connect(mapStateToProps,null)(Header);