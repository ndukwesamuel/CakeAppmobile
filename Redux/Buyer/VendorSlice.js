import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { handleApiError } from "./shareApi";

import axios from "axios";

import Toast from "react-native-toast-message";
import { handleApiError } from "../shareApi";
const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;

// import { Alert } from "react-native";

// let userAPi = process.env.APIBASEURL + "user/login";

const initialState = {
  get_all_vendor_data: null,
  get_all_vendor_isError: false,
  get_all_vendor_isSuccess: false,
  get_all_vendor_isLoading: false,
  get_all_vendor_message: null,

  get_single_vendor_data: null,
  get_single_vendor_isError: false,
  get_single_vendor_isSuccess: false,
  get_single_vendor_isLoading: false,
  get_single_vendor_message: null,

  get_vendor_Cake_data: null,
  get_vendor_Cake_isError: false,
  get_vendor_Cake_isSuccess: false,
  get_vendor_Cake_isLoading: false,
  get_vendor_Cake_message: null,
};

export const Get_All_Vendor_Fun = createAsyncThunk(
  "VendorSlice/Get_All_Vendor_Fun",
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
        `${API_BASEURL}v1/vendor?page=1&perPage=100000000`,
        config
      );

      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error);

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const Get_Single_Vendor_Fun = createAsyncThunk(
  "VendorSlice/Get_Single_Vendor_Fun",
  async (id, thunkAPI) => {
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
        `${API_BASEURL}v1/vendor/profile/${id}`,
        config
      );

      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error);

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const Get_vendor_Cake_Fun = createAsyncThunk(
  "VendorSlice/Get_vendor_Cake_Fun",
  async (data, thunkAPI) => {
    try {
      let url = `${API_BASEURL}v1/cake?category=${data?.option}&vendor=${data?.vendorId}&page=1&perPage=10000000`;

      let token = thunkAPI.getState()?.Auth?.user_data?.user?.token;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(url, config);

      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const VendorSlice = createSlice({
  name: "VendorSlice",
  initialState,
  reducers: {
    reset_VendorSlice: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(Get_All_Vendor_Fun.pending, (state) => {
        state.get_all_vendor_isLoading = true;
      })
      .addCase(Get_All_Vendor_Fun.fulfilled, (state, action) => {
        state.get_all_vendor_isLoading = false;
        state.get_all_vendor_isSuccess = true;
        state.get_all_vendor_isError = false;
        state.get_all_vendor_data = action.payload;
        state.get_all_vendor_message = null;
      })
      .addCase(Get_All_Vendor_Fun.rejected, (state, action) => {
        state.get_all_vendor_isLoading = false;
        state.get_all_vendor_isSuccess = false;
        state.get_all_vendor_isError = true;
        state.get_all_vendor_message = action.payload;
      })
      .addCase(Get_Single_Vendor_Fun.pending, (state) => {
        state.get_single_vendor_isLoading = true;
      })
      .addCase(Get_Single_Vendor_Fun.fulfilled, (state, action) => {
        state.get_single_vendor_isLoading = false;
        state.get_single_vendor_isSuccess = true;
        state.get_single_vendor_isError = false;
        state.get_single_vendor_data = action.payload;
        state.get_single_vendor_message = null;
      })
      .addCase(Get_Single_Vendor_Fun.rejected, (state, action) => {
        state.get_single_vendor_isLoading = false;
        state.get_single_vendor_isSuccess = false;
        state.get_single_vendor_isError = true;
        state.get_single_vendor_message = action.payload;
        state.get_single_vendor_data = null;
      })

      .addCase(Get_vendor_Cake_Fun.pending, (state) => {
        state.get_vendor_Cake_isLoading = true;
      })
      .addCase(Get_vendor_Cake_Fun.fulfilled, (state, action) => {
        state.get_vendor_Cake_isLoading = false;
        state.get_vendor_Cake_isSuccess = true;
        state.get_vendor_Cake_isError = false;
        state.get_vendor_Cake_data = action.payload;
        state.get_vendor_Cake_message = null;
      })
      .addCase(Get_vendor_Cake_Fun.rejected, (state, action) => {
        state.get_vendor_Cake_isLoading = false;
        state.get_vendor_Cake_isSuccess = false;
        state.get_vendor_Cake_isError = true;
        state.get_vendor_Cake_message = action.payload;
        state.get_vendor_Cake_data = null;
      });
  },
});

export const { reset_VendorSlice } = VendorSlice.actions;

export default VendorSlice.reducer;
