import { ADD_ITEM_TO_BASKET, REMOVE_ITEM_FROM_BASKET, CLEAN_BASKET } from "../actions/Items"; 
const initialState = [];

export default (state=initialState,action)=>{
    switch(action.type){
        case ADD_ITEM_TO_BASKET:
            return [...state, action.payload]
        case REMOVE_ITEM_FROM_BASKET: 
            return state.filter(id => id != action.payload.id)
        case CLEAN_BASKET:
            return initialState;
        default:
            return state;
    }
};