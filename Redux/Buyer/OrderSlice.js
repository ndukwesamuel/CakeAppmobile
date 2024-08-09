import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { handleApiError } from "./shareApi";

import axios from "axios";

import Toast from "react-native-toast-message";
import { handleApiError } from "../shareApi";
const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;

// import { Alert } from "react-native";

// let userAPi = process.env.APIBASEURL + "user/login";

const initialState = {
  get_all_order_history_data: null,
  get_all_order_history_isError: false,
  get_all_order_history_isSuccess: false,
  get_all_order_history_isLoading: false,
  get_all_order_history_message: null,

  Get_All_trip_data: null,
  Get_All_trip_isError: false,
  Get_All_trip_isSuccess: false,
  Get_All_trip_isLoading: false,
  Get_All_trip_message: null,

  Get_single_trip_data: null,
  Get_single_trip_isError: false,
  Get_single_trip_isSuccess: false,
  Get_single_trip_isLoading: false,
  Get_single_trip_message: null,
};

export const Get_All_Order_HIstory_Fun = createAsyncThunk(
  "OrderSlice/Get_All_Order_HIstory_Fun",
  async (_, thunkAPI) => {
    try {
      let token = thunkAPI.getState()?.Auth?.user_data?.user?.token;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `${API_BASEURL}v1/order?page=1&perPage=100000000`,
        config
      );

      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error);

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const Get_all_Trip_Fun = createAsyncThunk(
  "TripSLice/Get_all_Trip_Fun",
  async (_, thunkAPI) => {
    try {
      let token = thunkAPI.getState()?.Auth?.user_data?.token;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(`${API_BASEURL}api/trip`, config);

      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error);

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const Get_single_Trip_Fun = createAsyncThunk(
  "TripSLice/Get_single_Trip_Fun",
  async (id, thunkAPI) => {
    try {
      let token = thunkAPI.getState()?.Auth?.user_data?.token;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(`${API_BASEURL}api/trip/${id}`, config);

      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error);

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const OrderSlice = createSlice({
  name: "OrderSlice",
  initialState,
  reducers: {
    reset_TripSLice: (state) => initialState,

    UserBookSeats_fun: (state, action) => {
      state.UserBookSeats_data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(Get_All_Order_HIstory_Fun.pending, (state) => {
        state.get_all_order_history_isLoading = true;
      })
      .addCase(Get_All_Order_HIstory_Fun.fulfilled, (state, action) => {
        state.get_all_order_history_isLoading = false;
        state.get_all_order_history_isSuccess = true;
        state.get_all_order_history_isError = false;

        state.get_all_order_history_data = action.payload;
        state.get_all_order_history_message = null;
      })
      .addCase(Get_All_Order_HIstory_Fun.rejected, (state, action) => {
        state.get_all_order_history_isLoading = false;
        state.get_all_order_history_isSuccess = false;
        state.get_all_order_history_isError = true;
        state.get_all_order_history_message = action.payload;
        state.get_all_order_history_data = null;
      })

      .addCase(Get_single_Trip_Fun.pending, (state) => {
        state.Get_single_trip_isLoading = true;
      })
      .addCase(Get_single_Trip_Fun.fulfilled, (state, action) => {
        state.Get_single_trip_isLoading = false;
        state.Get_single_trip_isSuccess = true;
        state.Get_single_trip_isError = false;
        state.Get_single_trip_data = action.payload;
      })
      .addCase(Get_single_Trip_Fun.rejected, (state, action) => {
        state.Get_single_trip_isLoading = false;
        state.Get_single_trip_isSuccess = false;
        state.Get_single_trip_isError = true;
        state.Get_single_trip_message = action.payload;
      });
  },
});

export const { reset_TripSLice } = OrderSlice.actions;

export default OrderSlice.reducer;
