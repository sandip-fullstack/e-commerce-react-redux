import React from "react";
import {connect} from "react-redux";
import { getTotalBasketPrice,getBasketItemsWithCount } from "../selectors/Items";
import R from "ramda";
import {Link} from "react-router";

import {removeItemFromBasket,cleanBasket, applyCoupon} from "../actions/Items";
import { validate } from "../utils/validator";

import Header from "./Header";
import EmptyCart from "./EmptyCart";

const Basket = ({items,totalPrice,
                removeItemFromBasket,cleanBasket, coupon,
                applyCoupon, couponText
                })=>{
    
    const isBasketEmpty = R.isEmpty(items);

    const getDiscountedPrice = (coupon, totalPrice) => {
        if (coupon) {
            if (validate(coupon, totalPrice, items)) {
                return (<span>
                    <span className="old-price">£ {totalPrice}</span>
                    <span>£ {totalPrice - coupon}</span>
                    </span>);
            }
            return `£ ${totalPrice}`;
        }
        return `£ ${totalPrice}`;
    }

    const getCouponCode = () => {
        if (!coupon) {
            return ``;
        } else if (coupon && validate(coupon, totalPrice, items)) {
            return <div>Coupon Applied: <b>SAVE{coupon}</b></div>
        } return <div className="red-text">Sorry!! Coupon is invalid</div>;
    }

    const renderContent = () => {
        return (
            <div>
                {isBasketEmpty && <div> <EmptyCart/> </div>}
                <div className="table-responsive">
                    <table className="table-bordered table-striped table-condensed cf">
                        <tbody>
                            {items.map((item,index)=>(
                                <tr key={index}
                                    className="item-checkout">
                                    <td className="first-column-checkout">
                                        <img className="img-thumbnail"
                                            src={item.image}
                                            alt={item.name}  
                                        />
                                    </td>
                                    <td>{item.name}</td>
                                    <td>£{item.price}</td>
                                    <td>{item.count}</td>
                                    <td>
                                        <span className="delete-cart"
                                        onClick={()=>removeItemFromBasket(items, item.id)}></span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {
                    R.not(isBasketEmpty) &&
                    <div className="row">
                        <div className="pull-right total-user-checkout">

                            <b>Total: </b>
                            {
                                getDiscountedPrice(coupon, totalPrice)
                            }
                        </div>
                        <div className="coupn-applied">
                            {getCouponCode()}
                        </div>
                    </div>
                }
            </div>
            )
        };

        const renderSidebar = ()=>{
            return(
                <div>   
                    <Link
                        className="btn btn-info"
                        to="/"
                    >
                    <span> Continue Shopping</span>
                    </Link>
                    {
                        R.not(isBasketEmpty) &&
                        <div>
                                <div>
                                <button className="btn btn-danger"
                                        onClick={()=>cleanBasket(items)}        
                                >
                                <span className="glyphicon glyphicon-trash cart-icon"/>
                                Clean Cart
                                </button>
                            </div>
                            <div>Apply Coupon</div>
                            <div className="coupon-container">
                                <input type="radio" name="coupon" value="5" onChange={() => applyCoupon(5, "£5 off on your order")}
                                checked={coupon === 5}/>
                                    <label htmlFor="5" className="label-container">SAVE5</label>
                                <input type="radio" name="coupon" value="10" onChange={() => applyCoupon(10, "£10 off on minimum purchase of £50")}
                                checked={coupon === 10}/>
                                    <label htmlFor="10" className="label-container">SAVE10</label>
                                <input type="radio" name="coupon" value="15" onChange={() => applyCoupon(15, "£15 off on minimum purchase of £75 and atleast one footwear")}
                                checked={coupon === 15}/>
                                    <label htmlFor="15" className="label-container">SAVE15</label>
                            </div>
                            <div className="coupon-text">{couponText}</div>
                        </div>
                    }
                </div>
            );
        };

    return(
        <div className="view-container">
            <Header/>
            <div className="container">
            
                <div className="row">
                {
                    <div className={`${isBasketEmpty ? `col-md-12` : `col-md-9`}`}>
                        {renderContent()}
                    </div>
                }
                    <div className={`col-md-3 btn-user-checkout ${isBasketEmpty && `checkout-center`}`}>
                        {renderSidebar()}
                    </div>
                </div>
            </div>
        </div>
    );
    };


const mapStateToProps = (state)=>({
    items: getBasketItemsWithCount(state),
    totalPrice: getTotalBasketPrice(state),
    coupon: state.Coupon.price,
    couponText: state.Coupon.couponText
});

const mapDispatchToProps = (dispatch)=>({
    removeItemFromBasket: (items, id)=>dispatch(removeItemFromBasket(items, id)),
    cleanBasket: (items)=>dispatch(cleanBasket(items)),
    applyCoupon: (price, couponText) => dispatch(applyCoupon(price, couponText))
});

export default connect(mapStateToProps,mapDispatchToProps)(Basket);