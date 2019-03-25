import {fetchItems as fetchItemsApi,
        fetchCategories  as fetchCategoriesApi}  from '../api/fetchItems';

export const fetchItems = ()=>{
    return async (dispatch) => {
        try{
            dispatch({
                type: 'FETCH_ITEM_START'
            });
            const items = await fetchItemsApi();
            dispatch({
                type: 'FETCH_ITEM_SUCCESS',
                payload: items
            });
        }catch(err){
            dispatch({
                type: 'FETCH_ITEM_FAIL',
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
                type: 'FETCH_CATEGORIES_START'
            });
            const categories = await fetchCategoriesApi();
            dispatch({
                type: 'FETCH_CATEGORIES_SUCCESS',
                payload: categories
            });
        }catch(err){
            dispatch({
                type: 'FETCH_CATEGORIES_FAILURE',
                payload: err,
                error: true
            });
        };
    };
}; 

export const addItemToBasket = id => dispatch => {
    dispatch({
        type: 'ADD_ITEM_TO_BASKET',
        payload: id
    });
};

export const removeItemFromBasket = (items, id)=> async dispatch =>{
    if (items.length === 1) {
        dispatch({
            type: 'APPLY_COUPON',
            payload: ""
        });
    }
    dispatch({
        type: 'REMOVE_ITEM_FROM_BASKET',
        payload: {id: id, itemsInCart: items}
    });
};   

export const cleanBasket = (items)=>dispatch => {
    dispatch({
        type: 'APPLY_COUPON',
        payload: ""
    });
    dispatch({
        type: 'CLEAN_BASKET',
        payload: items
    });
};

export const applyCoupon = (price, couponText) => dispatch => {
    dispatch({
        type: 'APPLY_COUPON',
        payload: {price, couponText}
    })
}