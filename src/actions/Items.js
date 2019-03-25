import {fetchItems as fetchItemsApi,
        fetchCategories  as fetchCategoriesApi}  from "../api/fetchItems";

export const FETCH_ITEM_START = "FETCH_ITEM_START";
export const FETCH_ITEM_SUCCESS = "FETCH_ITEM_SUCCESS";
export const FETCH_ITEM_FAIL = "FETCH_ITEM_FAIL";
export const FETCH_CATEGORIES_START = "FETCH_CATEGORIES_START";
export const FETCH_CATEGORIES_SUCCESS = "FETCH_CATEGORIES_SUCCESS";
export const FETCH_CATEGORIES_FAILURE = "FETCH_CATEGORIES_FAILURE";
export const ADD_ITEM_TO_BASKET = "ADD_ITEM_TO_BASKET";
export const ADD_MESSAGE_START = "ADD_MESSAGE_START";
export const ADD_MESSAGE_SUCCESS = "ADD_MESSAGE_SUCCESS";
export const APPLY_COUPON = "APPLY_COUPON";
export const REMOVE_ITEM_FROM_BASKET = "REMOVE_ITEM_FROM_BASKET";
export const CLEAN_BASKET = "CLEAN_BASKET";

export const fetchItems = ()=>{
    return async (dispatch) => {
        try{
            dispatch({
                type: FETCH_ITEM_START
            });
            const items = await fetchItemsApi();
            dispatch({
                type: FETCH_ITEM_SUCCESS,
                payload: items
            });
        }catch(err){
            dispatch({
                type: FETCH_ITEM_FAIL,
                payload: err,
                error: true
            });
        };
    };
};

export const fetchCategories = ()=>{
    return async (dispatch)=>{
        try{
            dispatch({
                type: FETCH_CATEGORIES_START
            });
            const categories = await fetchCategoriesApi();
            dispatch({
                type: FETCH_CATEGORIES_SUCCESS,
                payload: categories
            });
        }catch(err){
            dispatch({
                type: FETCH_CATEGORIES_FAILURE,
                payload: err,
                error: true
            });
        };
    };
}; 

export const addItemToBasket = id => dispatch => {
    dispatch({
        type: ADD_ITEM_TO_BASKET,
        payload: id
    });
    dispatch({
        type: ADD_MESSAGE_START
    });
    setTimeout(() => {
        dispatch({
            type: ADD_MESSAGE_SUCCESS
        });
    }, 2000);
};

export const removeItemFromBasket = (items, id)=> async dispatch =>{
    if (items.length === 1) {
        dispatch({
            type: APPLY_COUPON,
            payload: ""
        });
    }
    dispatch({
        type: REMOVE_ITEM_FROM_BASKET,
        payload: {id: id, itemsInCart: items}
    });
};   

export const cleanBasket = (items)=>dispatch => {
    dispatch({
        type: APPLY_COUPON,
        payload: ""
    });
    dispatch({
        type: CLEAN_BASKET,
        payload: items
    });
};

export const applyCoupon = (price, couponText) => dispatch => {
    dispatch({
        type: APPLY_COUPON,
        payload: {price, couponText}
    })
}