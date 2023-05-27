import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AuthReducer from "./reducers/AuthReducer";


const reducer = combineReducers({
  authReducer: AuthReducer.reducer,
});

const store = configureStore({
  reducer,
});

export { store, reducer };