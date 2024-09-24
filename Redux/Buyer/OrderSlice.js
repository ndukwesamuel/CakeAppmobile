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

  get_single_order_history_data: null,
  get_single_order_history_isError: false,
  get_single_order_history_isSuccess: false,
  get_single_order_history_isLoading: false,
  get_single_order_history_message: null,
};

export const Get_All_Order_HIstory_Fun = createAsyncThunk(
  "OrderSlice/Get_All_Order_HIstory_Fun",
  async (status, thunkAPI) => {
    try {
      let token = thunkAPI.getState()?.Auth?.user_data?.data?.token;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `${API_BASEURL}v1/order?page=1&status=${status}&perPage=20000000`,
        config
      );
      console.log({orders:response.data})
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error);

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const Get_single__Order_HIstory_Fun = createAsyncThunk(
  "TripSLice/Get_single_Trip_Fun",
  async (id, thunkAPI) => {
    try {
      let token = thunkAPI.getState()?.Auth?.user_data?.data?.token;
      let url = `${API_BASEURL}v1/order/${id}`;
      console.log({
        url,
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(`${API_BASEURL}v1/order/${id}`, config);
      // console.log({
      //   zzz: response.data,
      // });
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
    reset_OrderSlice: (state) => initialState,
    reset_Get_Single_Order_HIstory_Fun: (state) => {
      state.get_single_order_history_data = null;
      state.get_single_order_history_isError = false;
      state.get_single_order_history_isSuccess = false;
      state.get_single_order_history_isLoading = false;
      state.get_single_order_history_message = null;
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

      .addCase(Get_single__Order_HIstory_Fun.pending, (state) => {
        state.get_single_order_history_isLoading = true;
      })
      .addCase(Get_single__Order_HIstory_Fun.fulfilled, (state, action) => {
        state.get_single_order_history_isLoading = false;
        state.get_single_order_history_isSuccess = true;
        state.get_single_order_history_isError = false;

        state.get_single_order_history_data = action.payload;
        state.get_single_order_history_message = null;
      })
      .addCase(Get_single__Order_HIstory_Fun.rejected, (state, action) => {
        state.get_single_order_history_isLoading = false;
        state.get_single_order_history_isSuccess = false;
        state.get_single_order_history_isError = true;
        state.get_single_order_history_message = action.payload;
        state.get_single_order_history_data = null;
      });
  },
});

export const { reset_OrderSlice, reset_Get_Single_Order_HIstory_Fun } =
  OrderSlice.actions;

export default OrderSlice.reducer;
