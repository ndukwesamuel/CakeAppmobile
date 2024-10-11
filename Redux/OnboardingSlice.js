import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOnboarding: true,
  value: 0,
  userlogin: "LOGIN",
  otp: false,
  otpemail: "",
  otpValue: "",
  verifyEmail: false,
};

export const OnboardingSlice = createSlice({
  name: "OnboardingSlice",
  initialState,
  reducers: {
    reset_isOnboarding: (state) => initialState,
    reset_otpemail: (state) => {
      state.otpemail = "";
    },
    reset_otpValue: (state) => {
      state.otpValue = "";
    },

    reser_otp: (state) => {
      state.otp = false;
    },
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },

    // checkOnboarding: (state, action) => {
    //   state.isOnboarding = action.payload.isOnboarding;
    //   // Toggle the value (true becomes false, false becomes true)
    // },

    checkOnboarding: (state) => {
      state.isOnboarding = !state.isOnboarding;
      console.log("this is isOnboarding", state.isOnboarding);
      // Toggle the value (true becomes false, false becomes true)
    },

    reset_isOnboarding_data: () => {
      state.isOnboarding = true;
    },
    checkOtp: (state) => {
      state.otp = !state.otp;
      console.log("this is otp", state.otp);
      // Toggle the value (true becomes false, false becomes true)
    },
    checkResetPassword: (state) => {
      state.verifyEmail = !state.verifyEmail;
    },

    setOtpEmail: (state, action) => {
      state.otpemail = action.payload;
    },
    setOtp: (state, action) => {
      state.otpValue = action.payload;
    },

    authScreenChange: (state, action) => {
      state.userlogin = action.payload; // or action.type, depending on what you need
      console.log("this is userlogin", state.userlogin);
    },

    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  reset_isOnboarding,
  checkOnboarding,
  authScreenChange,
  setOtp,
  checkOtp,
  setOtpEmail,
  checkResetPassword,
  reset_otpemail,
  reser_otp,
  reset_otpValue,
  reset_isOnboarding_data,
} = OnboardingSlice.actions;
export const onBoaringAction = OnboardingSlice.actions;
export default OnboardingSlice.reducer;
