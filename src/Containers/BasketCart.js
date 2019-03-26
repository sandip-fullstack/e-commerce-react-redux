import React from "react";
import {Link} from "react-router";
import {connect} from "react-redux";

import {getTotalBasketCount,getTotalBasketPrice, getBasketItemsWithCount} from "../selectors/Items";
import { validate } from "../utils/validator";

export const BasketCart = (props)=>{

    const {totalBasketCount,totalPrice, coupon, items} = props;
    const getDiscountedPrice = (coupon, totalPrice, items) => {
        if (coupon) {
            if (validate(coupon, totalPrice, items)) {
                return `${totalBasketCount} item(s) - £ ${totalPrice - coupon}`
            }
            return `${totalBasketCount} item(s) - £ ${totalPrice}`;
        }
        return `${totalBasketCount} item(s) - £ ${totalPrice}`;
    }

    return(
        <Link 
            to="/basket"
            id="dLabel"
            className="btn btn-large"
        >
        <span className="glyphicon glyphicon-shopping-cart cart-icon"></span> 
        {
            getDiscountedPrice(coupon, totalPrice, items)
        }
        </Link>
    );
};

const mapStateToProps = (state)=>({
    totalBasketCount: getTotalBasketCount(state),
    totalPrice: getTotalBasketPrice(state),
    coupon: state.Coupon.price,
    items: getBasketItemsWithCount(state)
});

export default connect(mapStateToProps)(BasketCart);