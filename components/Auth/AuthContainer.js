import { Text, View } from "react-native";
import { useState } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import OtpScreen from "../../screens/OtpScreen";
import { useDispatch, useSelector } from "react-redux";
import ForgotPassword from "./ForgotPassword";

const AuthContainer = () => {
  const [authType, setAuthtype] = useState("sign-up");

  const { otp } = useSelector((state) => state?.OnboardingSlice);

  const changeAuthType = (type) => {
    setAuthtype(type);
  };

  console.log({
    authType,
  });

  return (
    <View style={{ flex: 1 }}>
      {otp === false ? (
        <>
          {authType === "sign-up" ? (
            <SignUp onSetAuth={changeAuthType} />
          ) : authType === "sign-in" ? (
            <SignIn onSetAuth={changeAuthType} />
          ) : authType === "forgot-password" ? (
            <ForgotPassword onSetAuth={changeAuthType} />
          ) : null}
        </>
      ) : (
        <OtpScreen onSetAuth={changeAuthType} />
      )}
    </View>
  );
};

export default AuthContainer;
