
import {
  ADD_MESSAGE_START,
  ADD_MESSAGE_SUCCESS
} from "../actions/Items";

export default (state=false,action)=>{
    switch(action.type){
        case ADD_MESSAGE_START:
            return true;
        case ADD_MESSAGE_SUCCESS:
            return false;
        default:
            return state;
    }
};