import { combineReducers } from "@reduxjs/toolkit";
import OrderSlice from "./Vendor/OrderSlice";

const VendorsSlice = combineReducers({
    OrderSlice:OrderSlice,
})

export default VendorsSlice;