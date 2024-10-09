import { combineReducers } from "@reduxjs/toolkit";
import OrderSlice from "./Vendor/OrderSlice";
import ProfileSlice from "./Vendor/ProfileSlice";
import WalletSlice from "./Vendor/WalletSlice";

const VendorsSlice = combineReducers({
    OrderSlice:OrderSlice,
    ProfileSlice:ProfileSlice,
    WalletSlice: WalletSlice
    
})

export default VendorsSlice;