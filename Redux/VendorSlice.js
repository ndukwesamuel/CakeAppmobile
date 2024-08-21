import { combineReducers } from "@reduxjs/toolkit";
import OrderSlice from "./Vendor/OrderSlice";
import ProfileSlice from "./Vendor/ProfileSlice";

const VendorsSlice = combineReducers({
    OrderSlice:OrderSlice,
    ProfileSlice:ProfileSlice
})

export default VendorsSlice;