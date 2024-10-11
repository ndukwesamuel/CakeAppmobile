import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { handleApiError } from "../shareApi";

const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;
const initialState = {
  wallet_details_data: null,
  wallet_details_isError: false,
  wallet_details_isSuccess: false,
  wallet_details_isLoading: false,
  wallet_details_message: null,

  get_banks_data: null,
  get_banks_isError: false,
  get_banks_isSuccess: false,
  get_banks_isLoading: false,
  get_banks_message: null,

  transaction_history_data: null,
  transaction_history_isError: false,
  transaction_history_isSuccess: false,
  transaction_history_isLoading: false,
  transaction_history_message: null,
};
export const Get_All_Banks_Fun = createAsyncThunk(
  "WalletSlice/Get_All_Banks_Fun",
  async (_, thunkAPI) => {
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
        `${API_BASEURL}v1/vendor/wallet/banks`,
        config
      );
      console.log({ response: response.data });
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const Get_Wallet_Details_Fun = createAsyncThunk(
  "WalletSlice/Get_Wallet_Details_Fun",
  async (_, thunkAPI) => {
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
        `${API_BASEURL}v1/vendor/wallet`,
        config
      );
      //   console.log({response:response.data})
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const Get_Transaction_History_Fun = createAsyncThunk(
  "WalletSlice/Get_Transaction_History_Fun",
  async (_, thunkAPI) => {
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
        `${API_BASEURL}v1/vendor/transactions`,
        config
      );
      // console.log({response:response.data})
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const WalletSlice = createSlice({
  name: "WalletSlice",
  initialState,
  reducers: {
    reset_WalletSlice: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(Get_All_Banks_Fun.pending, (state) => {
        state.get_banks_isLoading = true;
      })
      .addCase(Get_All_Banks_Fun.fulfilled, (state, action) => {
        state.get_banks_isLoading = false;
        state.get_banks_isSuccess = true;
        state.get_banks_isError = false;
        state.get_banks_data = action.payload;
        state.get_banks_message = null;
      })
      .addCase(Get_All_Banks_Fun.rejected, (state, action) => {
        state.get_banks_isLoading = false;
        state.get_banks_isSuccess = false;
        state.get_banks_isError = true;
        state.get_banks_message = action.payload;
        state.get_banks_data = null;
      })
      .addCase(Get_Wallet_Details_Fun.pending, (state) => {
        state.wallet_details_isLoading = true;
      })
      .addCase(Get_Wallet_Details_Fun.fulfilled, (state, action) => {
        state.wallet_details_isLoading = false;
        state.wallet_details_isSuccess = false;
        state.wallet_details_isError = false;
        state.wallet_details_data = action.payload;
        state.wallet_details_message = null;
      })
      .addCase(Get_Wallet_Details_Fun.rejected, (state, action) => {
        state.wallet_details_isLoading = false;
        state.wallet_details_isSuccess = false;
        state.wallet_details_isError = true;
        state.wallet_details_message = action.payload;
        state.get_banks_data = null;
      })
      .addCase(Get_Transaction_History_Fun.pending, (state) => {
        state.transaction_history_isLoading = true;
      })
      .addCase(Get_Transaction_History_Fun.fulfilled, (state, action) => {
        state.transaction_history_isLoading = false;
        state.transaction_history_isSuccess = false;
        state.transaction_history_isError = false;
        state.transaction_history_data = action.payload;
        state.transaction_history_message = null;
      })
      .addCase(Get_Transaction_History_Fun.rejected, (state, action) => {
        state.transaction_history_isLoading = false;
        state.transaction_history_isSuccess = false;
        state.transaction_history_isError = true;
        state.transaction_history_message = action.payload;
        state.transaction_history_data = null;
      });
  },
});
export const { reset_WalletSlice } = WalletSlice.actions;

export default WalletSlice.reducer;
