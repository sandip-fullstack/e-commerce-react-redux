import {createStore, combineReducers,applyMiddleware,compose} from "redux";
import thunk from "redux-thunk";
import itemReducer from "../reducers/Item";
import {routerReducer} from "react-router-redux";
import Basket from "../reducers/Basket";
import Categories from "../reducers/Categories";
import CouponReducer from "../reducers/CouponApply";
import AddedToBagReducer from "../reducers/AddedToBag";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default ()=>{
    const store = createStore(
        combineReducers({
            routing:routerReducer,
            Item: itemReducer,
            Basket:Basket,
            Categories: Categories,
            Coupon: CouponReducer,
            AddedToBag: AddedToBagReducer
        }),composeEnhancers(applyMiddleware(thunk))
    );
    return store;
};