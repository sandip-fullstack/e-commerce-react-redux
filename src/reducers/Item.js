import { FETCH_ITEM_SUCCESS, ADD_ITEM_TO_BASKET, REMOVE_ITEM_FROM_BASKET, CLEAN_BASKET } from "../actions/Items";

const initialState = [];

export default (state=initialState, action)=>{
    switch(action.type) {
        case FETCH_ITEM_SUCCESS :
        {
            if (state.length === 0) // for initial load
                return [...state, ...action.payload];
            return [...state];
        }
        case ADD_ITEM_TO_BASKET :
        {
            const idToBeAdded = action.payload;
            return [...state, ...state[idToBeAdded].quantity--];
        }
        case REMOVE_ITEM_FROM_BASKET :
        {
            const { id, itemsInCart } = action.payload;
            const elemPos = itemsInCart.map((x) => x.id).indexOf(id);
            const count = itemsInCart[elemPos].count;
            return [...state, ...state[id].quantity += count];
        }
        case CLEAN_BASKET :
        {
            const itemsInCart = action.payload;
            itemsInCart.map((item) => {
                return [...state, ...state[item.id].quantity += item.count]
            })
        }
        default:
            return state;
    }};