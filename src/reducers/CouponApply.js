import { APPLY_COUPON } from "../actions/Items";

const initialState = "";

export default (state=initialState,action)=>{
    switch(action.type){
        case APPLY_COUPON:
            return action.payload
        default:
            return state;
    }
};