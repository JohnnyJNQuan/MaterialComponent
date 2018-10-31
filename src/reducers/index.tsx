import { combineReducers } from "redux";
import { AUTH } from "../actionTypes";

const appReducer = combineReducers({
    //
});

const rootReducer = (state: any, action: any) => {
	if (action.type === AUTH.LOGOUT || action.type === AUTH.CHANGEDB) {
		state = undefined;
	}
	return appReducer(state, action);
};

export default rootReducer;
