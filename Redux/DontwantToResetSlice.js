import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  localremember: null,
  userlogin: "LOGIN",
  otpemail: "",
};

export const DontwantToResetSlice = createSlice({
  name: "DontwantToResetSlice",
  initialState,
  reducers: {
    remeberUSerPassword: (state, action) => {
      state.localremember = action.payload; // or action.type, depending on what you need
    },

    authscreensatet: (state, action) => {
      state.userlogin = action.payload;
      // state.localremember = action.payload; // or action.type, depending on what you need
    },

    setOtpEmail: (state, action) => {
      state.otpemail = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOtpEmail, remeberUSerPassword, authscreensatet } =
  DontwantToResetSlice.actions;
export default DontwantToResetSlice.reducer;
