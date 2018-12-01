import {combineReducers} from "redux";
import appReducer from "../reducer";

const rootReducer = combineReducers({
    appReducer: (appReducer),
    // ==> merchantReducer: merchantReducer,
})
export default rootReducer;