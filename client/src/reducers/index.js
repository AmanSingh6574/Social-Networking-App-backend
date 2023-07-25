import { combineReducers } from "redux";
import userSlice from "./slices/userSlice";
import postSlice from "./slices/postSlice";


const rootReducer = combineReducers({
    auth : userSlice ,
    post : postSlice
})


export default rootReducer ; 