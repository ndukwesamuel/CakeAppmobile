import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import OnboardingSlice from "./OnboardingSlice";
import BookATripSlice from "./BookATripSlice";
import AuthSlice from "./AuthSlice";
import RouteSlice from "./Rider/RouteSlice";
import TripSLice from "./Rider/TripSLice";
import DriverTripSLice from "./Driver/DriverTripSLice";
import { DontwantToResetSlice } from "./DontwantToResetSlice";
import OrderSlice from "./Buyer/OrderSlice";
import VendorSlice from "./Buyer/VendorSlice";
import CakeSlice from "./Buyer/CakeSlice";

// import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";

const reducers = combineReducers({
  Auth: AuthSlice,
  OrderSlice: OrderSlice,
  VendorSlice: VendorSlice,
  CakeSlice: CakeSlice,

  // this is for the old one
  OnboardingSlice: OnboardingSlice,
  BookATripSlice: BookATripSlice,
  RouteSlice: RouteSlice,
  TripSLice: TripSLice,
  DriverTripSLice: DriverTripSLice,

  DontwantToResetSlice: DontwantToResetSlice,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: ["WalletSlice"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  // middleware option needs to be provided for avoiding the error. ref: https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },

      serializableCheck: false,
      immutableCheck: false,
    }),
});

export const persistor = persistStore(store);
