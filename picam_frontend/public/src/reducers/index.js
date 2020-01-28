import { combineReducers } from "redux";

//Import reducers
import mainReducer from "./mainReducer";

export default combineReducers({
    mainReducer: mainReducer,
})
