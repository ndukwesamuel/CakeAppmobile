import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleApiError } from "./shareApi";

import axios from "axios";

import Toast from "react-native-toast-message";
import { axiosInstance, getAxiosConfig, getToken } from "../utills/ApiConfig";

const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;

// import { Alert } from "react-native";

// let userAPi = process.env.APIBASEURL + "user/login";

const initialState = {
  user_data: null,
  user_isError: false,
  user_isSuccess: false,
  user_isLoading: false,
  user_message: null,

  user_profile_data: null,
  user_profile_isError: false,
  user_profile_isSuccess: false,
  user_profile_isLoading: false,
  user_profile_message: null,

  current_vendor_profile_data: null,
  current_vendor_profile_isError: false,
  current_vendor_profile_isSuccess: false,
  current_vendor_profile_isLoading: false,
  current_vendor_profile_message: null,
};

const fetchResponsData = async (url, thunkAPI) => {
  try {
    const token = getToken(thunkAPI);

    const response = await axiosInstance.get(url, getAxiosConfig(token));

    return response.data;
  } catch (error) {
    // Check if the error is an Axios error and has a response from the server
    if (error.response) {
      // Server responded with a status other than 2xx
      throw new Error(
        `Failed to fetch data: ${error.response.status} - ${
          error.response.data?.message || error.response.statusText
        }`
      );
    } else if (error.request) {
      // Request was made, but no response received
      throw new Error(
        "No response received from the server. Please check your network connection."
      );
    } else {
      // Something else happened in setting up the request
      throw new Error(`Unexpected error: ${error.message}`);
    }
  }
};

// export const UserProfile_Fun = createAsyncThunk(
//   "auth/UserProfile_Fun",

//   async (query, thunkAPI) => {
//     let url = "v1/auth";

//     try {
//       // Call fetchResponsData within a try/catch block
//       const response = await fetchResponsData(url, thunkAPI);

//       return response; // Return the successful response
//     } catch (error) {
//       // Log the error and reject the async thunk

//       // You can return a rejection with a custom message
//       return thunkAPI.rejectWithValue(
//         error.message || "An error occurred while fetching vendor profile"
//       );
//     }
//   }
// );

const Login_Fun_Service = async (data) => {
  let url = `${API_BASEURL}v1/auth/signin`;

  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const Login_Fun = createAsyncThunk(
  "auth/Login_Fun",
  async (data, thunkAPI) => {
    try {
      return await Login_Fun_Service(data);
    } catch (error) {
      const errorMessage = handleApiError(error);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const UserProfile_Fun = createAsyncThunk(
  "auth/UserProfile_Fun",
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
      const response = await axios.get(`${API_BASEURL}v1/auth`, config);
      console.log({ profile: response.data });

      return response.data;

      // return await Login_Fun_Service(data);
    } catch (error) {
      const errorMessage = handleApiError(error);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const Current_vendor_profile_Fun = createAsyncThunk(
  "auth/Current_vendor_profile_Fun",
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
        `${API_BASEURL}v1/vendor/profile`,
        config
      );

      return response.data;

      // return await Login_Fun_Service(data);
    } catch (error) {
      const errorMessage = handleApiError(error);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset_login: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(Login_Fun.pending, (state) => {
        state.user_isLoading = true;
      })
      .addCase(Login_Fun.fulfilled, (state, action) => {
        state.user_isLoading = false;
        state.user_isSuccess = true;
        state.user_isError = false;
        state.user_message = null;
        state.user_data = action.payload;
        Toast.show({
          type: "success",
          text1: "Login  successfully!",
          customStyles: {
            backgroundColor: "red", // Change color here
          },
        });
      })

      .addCase(Login_Fun.rejected, (state, action) => {
        state.user_isLoading = false;
        state.user_isError = true;
        state.user_message = action.payload;
        state.user_data = null;
        state.user_isSuccess = false;
      })
      .addCase(UserProfile_Fun.pending, (state) => {
        state.user_profile_isLoading = true;
      })
      .addCase(UserProfile_Fun.fulfilled, (state, action) => {
        state.user_profile_isLoading = false;
        state.user_profile_isSuccess = true;
        state.user_profile_isError = false;
        state.user_profile_message = null;
        state.user_profile_data = action.payload;
      })
      .addCase(UserProfile_Fun.rejected, (state, action) => {
        state.user_profile_isLoading = false;
        state.user_profile_isError = true;
        state.user_profile_message = action.payload;
        state.user_profile_data = null;
        state.user_profile_isSuccess = false;
      })

      .addCase(Current_vendor_profile_Fun.pending, (state) => {
        state.current_vendor_profile_isLoading = true;
      })
      .addCase(Current_vendor_profile_Fun.fulfilled, (state, action) => {
        state.current_vendor_profile_isLoading = false;
        state.current_vendor_profile_isSuccess = true;
        state.user_profile_isError = false;
        state.current_vendor_profile_message = null;
        state.current_vendor_profile_data = action.payload;
      })
      .addCase(Current_vendor_profile_Fun.rejected, (state, action) => {
        state.current_vendor_profile_isLoading = false;
        state.current_vendor_profile_isError = true;
        state.current_vendor_profile_message = action.payload;
        state.current_vendor_profile_data = null;
        state.current_vendor_profile_isSuccess = false;
      });
  },
});

export const { reset_login } = AuthSlice.actions;

export default AuthSlice.reducer;
