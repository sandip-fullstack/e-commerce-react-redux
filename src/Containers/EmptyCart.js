import React from "react";

const EmptyCart = () => {
  return(<div>
    <div className="basket-image"/>
    <div className="emptycart-base-empty-text">Hey, it feels so light!</div>
    <div className="emptyCart-base-emptyDesc">There is nothing in your cart. Let's add some items. </div>
  </div>);
};

export default EmptyCart;