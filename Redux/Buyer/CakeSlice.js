import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { handleApiError } from "./shareApi";

import axios from "axios";

import Toast from "react-native-toast-message";
import { handleApiError } from "../shareApi";
const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;

const initialState = {
  get_all_cake_data: null,
  get_all_cake_isError: false,
  get_all_cake_isSuccess: false,
  get_all_cake_isLoading: false,
  get_all_cake_message: null,

  get_single_cake_data: null,
  get_single_cake_isError: false,
  get_single_cake_isSuccess: false,
  get_single_cake_isLoading: false,
  get_single_cake_message: null,
};

export const Get_All_Cake_Fun = createAsyncThunk(
  "CakeSlice/Get_All_Cake_Fun",
  async (data, thunkAPI) => {
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
        `${API_BASEURL}v1/cake?category=${data}&page=1&perPage=100000000`,
        config
      );
      console.log({
        response: response.data,
      });

      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error);

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const Get_Single_Cake_Fun = createAsyncThunk(
  "CakeSlice/Get_Single_Cake_Fun",
  async (data, thunkAPI) => {
    try {
      let token = thunkAPI.getState()?.Auth?.user_data?.user?.token;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(`${API_BASEURL}v1/cake/${data}`, config);
      console.log({
        emeka: response.data,
      });

      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error);

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const CakeSlice = createSlice({
  name: "CakeSlice",
  initialState,
  reducers: {
    reset_CakeSlice: (state) => initialState,

    reset_Get_Single_Cake_Fun: (state) => {
      state.get_single_cake_data = null;
      state.get_single_cake_isError = false;
      state.get_single_cake_isSuccess = false;
      state.get_single_cake_isLoading = false;
      state.get_single_cake_message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(Get_All_Cake_Fun.pending, (state) => {
        state.get_all_cake_isLoading = true;
      })
      .addCase(Get_All_Cake_Fun.fulfilled, (state, action) => {
        state.get_all_cake_isLoading = false;
        state.get_all_cake_isError = false;
        state.get_all_cake_isSuccess = true;
        state.get_all_cake_data = action.payload;
        state.get_all_cake_message = null;
      })
      .addCase(Get_All_Cake_Fun.rejected, (state, action) => {
        state.get_all_cake_isLoading = false;
        state.get_all_cake_isError = true;
        state.get_all_cake_isSuccess = false;
        state.get_all_cake_data = null;
        state.get_all_cake_message = action.payload;
      })

      .addCase(Get_Single_Cake_Fun.pending, (state) => {
        state.get_single_cake_isLoading = true;
      })
      .addCase(Get_Single_Cake_Fun.fulfilled, (state, action) => {
        state.get_single_cake_isLoading = false;
        state.get_single_cake_isError = false;
        state.get_single_cake_isSuccess = true;
        state.get_single_cake_data = action.payload;
        state.get_single_cake_message = null;
      })
      .addCase(Get_Single_Cake_Fun.rejected, (state, action) => {
        state.get_single_cake_isLoading = false;
        state.get_single_cake_isError = true;
        state.get_single_cake_isSuccess = false;
        state.get_single_cake_data = null;
        state.get_single_cake_message = action.payload;
      });
  },
});

export const { reset_CakeSlice, reset_Get_Single_Cake_Fun } = CakeSlice.actions;

export default CakeSlice.reducer;
