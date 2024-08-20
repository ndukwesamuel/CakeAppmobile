import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { handleApiError } from "../shareApi";

const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;
const initialState = {
  vendor_profile_data: null,
  vendor_profile_isError: false,
  vendor_profile_isSuccess: false,
  vendor_profile_isLoading: false,
  vendor_profile_message: null,
};

export const Get_Vendor_Profile = createAsyncThunk(
  "ProfileSlice/Get_Vendor_Profile",
  async (status, thunkAPI) => {
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
        `${API_BASEURL}v1/vendor/profile`,
        config
      );
      console.log(response.data)
      return response.data;
    } catch(error) {
      const errorMessage = handleApiError(error);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const ProfileSlice = createSlice({
  name: "ProfileSlice",
  initialState,
  reducers: {
    reset_ProfileSlice:(state) => initialState

  },
  extraReducers:(builder) =>{
    builder
    .addCase(Get_Vendor_Profile.pending, (state) => {
        state.vendor_profile_isLoading = true;
    })
    .addCase(Get_Vendor_Profile.fulfilled, (state, action) =>{
        state.vendor_profile_isLoading = false;
        state.vendor_profile_isSuccess= true;
        state.vendor_profile_isError = false;

        state.vendor_profile_data= action.payload;
        state.vendor_profile_message = null;
    })
    .addCase(Get_Vendor_Profile.rejected, (state, action) =>{
        state.vendor_profile_isLoading = false;
        state.vendor_profile_isSuccess= false;
        state.vendor_profile_isError = true;

        state.vendor_profile_data= null;
        state.vendor_profile_message = action.payload;
    })
  }
});

export const reset_ProfileSlice = ProfileSlice.actions;
export default ProfileSlice.reducer;
