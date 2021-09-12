import { combineReducers } from "redux";
import productReducers from "./productReducers";
import cartReducers from "./cartReducers";
import colorReducer from "./colorReducer";
import markReducer from "./markReducer";

export default combineReducers({
  products: productReducers,
  cart: cartReducers,
  colors: colorReducer,
  marks: markReducer
});
