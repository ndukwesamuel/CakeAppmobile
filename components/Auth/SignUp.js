import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  ActivityIndicator,
  useWindowDimensions,
  Image,
} from "react-native";
import Toast from "react-native-toast-message";
import axios from "axios";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { checkOtp, setOtpEmail } from "../../Redux/OnboardingSlice";
const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;

const SignUp = ({ onSetAuth }) => {
  const { width } = useWindowDimensions();

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [homeAddress, setHomeAddress] = useState("");

  const [startSignUp, setStartSignUp] = useState(true);
  const otpemail = useSelector((state) => state?.OnboardingSlice);

  console.log({
    d: otpemail,
  });
  const { user_data, user_isLoading } = useSelector((state) => state?.Auth);
  console.log({
    login_data: user_data,
  });

  const Registration_Mutation = useMutation(
    (data_info) => {
      let url = `${API_BASEURL}v1/auth/signup`;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          //   "Content-Type": "multipart/form-data",
          // Authorization: `Bearer ${user_data?.token}`,
        },
      };

      return axios.post(url, data_info, config);
    },
    {
      onSuccess: (success) => {
        Toast.show({
          type: "success",
          text1: `${success?.data?.message} `,
        });
        dispatch(checkOtp(true));

        // onPress={() => onSetAuth("sign-in")}
      },

      onError: (error) => {
        Toast.show({
          type: "error",
          text1: `${error?.response?.data?.message} `,
          //   text2: ` ${error?.response?.data?.errorMsg} `,
        });
      },
    }
  );

  return (
    <>
      {startSignUp ? (
        <WelcomeScreen data1={startSignUp} setdata={setStartSignUp} />
      ) : (
        <ScrollView style={styles.container}>
          <View
            style={{
              paddingBottom: 30,
              flex: 1,
            }}
          >
            {/* heading texts */}
            <View style={{ gap: 10 }}>
              <Text style={{ fontSize: 24, lineHeight: 36, fontWeight: "900" }}>
                Sign Up
              </Text>
            </View>

            {/* inputs container*/}
            <View style={styles.inputGroup}>
              {/* username */}
              <View style={styles.inputContainer}>
                <Text style={styles.labels}>First Name</Text>

                <TextInput
                  style={styles.inputs}
                  value={firstName}
                  onChangeText={(text) => setFirstName(text)}
                  placeholder="Enter your first name"
                />
              </View>

              {/* last name */}
              <View style={styles.inputContainer}>
                <Text style={styles.labels}>Last Name</Text>
                <TextInput
                  style={styles.inputs}
                  value={lastName}
                  onChangeText={(text) => setLastName(text)}
                  placeholder="Enter your last name"
                />
              </View>

              {/* Phone Number */}
              <View style={styles.inputContainer}>
                <Text style={styles.labels}>Phone Number</Text>
                <TextInput
                  style={styles.inputs}
                  value={phoneNumber}
                  onChangeText={(text) => setPhoneNumber(text)}
                  placeholder="Enter your phone number"
                  keyboardType="phone-pad"
                />
              </View>

              {/* email address */}
              <View style={styles.inputContainer}>
                <Text style={styles.labels}>Email Address</Text>

                <TextInput
                  style={styles.inputs}
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  placeholder="Enter your email"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.labels}>Lacation </Text>

                <TextInput
                  style={styles.inputs}
                  value={homeAddress}
                  onChangeText={(text) => setHomeAddress(text)}
                  placeholder="Enter your home address"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.labels}>Password</Text>
                <TextInput
                  style={styles.inputs}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry
                />
              </View>
            </View>

            {/* action buttons */}
            <View
              style={{
                justifyContent: "flex-end",
                alignContent: "flex-center",
                flex: 3,
                paddingVertical: 30,
                gap: 10,
              }}
            >
              <Pressable
                // onPress={() => onSetAuth("sign-in")}
                onPress={() => {
                  dispatch(setOtpEmail(email));

                  Registration_Mutation.mutate({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                    location: homeAddress,
                    roles: ["user"],
                  });
                }}
                style={{
                  padding: 10,
                  borderRadius: 40,
                  backgroundColor: "#DD293E",
                }}
              >
                {Registration_Mutation.isLoading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontSize: 16,
                      fontWeight: "700",
                      lineHeight: 24.05,
                    }}
                  >
                    Sign Up
                  </Text>
                )}
              </Pressable>
              <View style={{ justifyContent: "center" }}>
                <Pressable>
                  <Text style={{ fontSize: 14, lineHeight: 22.4 }}>
                    You do not have an account?{" "}
                    <Text
                      onPress={() => onSetAuth("sign-in")}
                      style={{
                        fontSize: 16,
                        fontWeight: "500",
                        lineHeight: 25.6,
                      }}
                    >
                      Login
                    </Text>
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 10,
    gap: 20,
  },

  inputGroup: {
    gap: 5,
  },

  inputContainer: {
    gap: 5,
  },

  labels: {
    fontSize: 14,
    fontWeight: "500",
  },

  inputs: {
    borderWidth: 0.5,
    borderRadius: 8,
    padding: 7,
  },
});

const WelcomeScreen = ({ data1, setdata }) => {
  const { width } = useWindowDimensions();

  return (
    <View>
      <View
        style={{
          width,

          flex: 1,
          backgroundColor: "#FFF0F0",
          margin: 0,
        }}
      >
        <Image
          source={{
            flex: 1,
            marginTop: -10,
          }}
          style={{ width, resizeMode: "stretch", flex: 1.2, marginTop: -10 }}
        />
        <View
          style={{
            flex: 2,
            gap: 10,
            backgroundColor: "white",
            width: "95%",
            margin: "auto",
            paddingVertical: 30,
          }}
        >
          <View style={{ paddingHorizontal: 20 }}>
            <Text
              style={{
                color: "#1E0000",
                fontSize: 32,
                fontWeight: "700",
                textAlign: "left",
              }}
            >
              item?.title
            </Text>
            <Text
              style={{
                color: "#1E0000",
                fontSize: 16,
                fontWeight: "400",
                textAlign: "left",
              }}
            >
              item?.description
            </Text>
          </View>
          <View
            style={{
              // flex: ,
              marginTop: 20,
              justifyContent: "space-evenly",
              paddingHorizontal: 10,
            }}
          >
            <View style={{ flexDirection: "column", gap: 20 }}>
              <Pressable
                style={{
                  padding: 10,
                  borderRadius: 5,
                  backgroundColor: "white",
                  borderWidth: 1,
                  borderColor: "#330111",
                  borderRadius: 10,
                  borderStyle: "solid",
                }}
                // onPress={handleSkip}
              >
                <Text style={{ textAlign: "left" }}>Cake Maker</Text>
              </Pressable>
              <Pressable
                style={{
                  padding: 10,
                  borderRadius: 5,
                  backgroundColor: "white",
                  borderWidth: 1,
                  borderColor: "#330111",
                  borderRadius: 10,
                  borderStyle: "solid",
                }}
                // onPress={handleSkip}
              >
                <Text style={{ textAlign: "left" }}>Buyer</Text>
              </Pressable>
            </View>
            <Pressable
              style={{
                padding: 10,
                borderRadius: 10,
                backgroundColor: "#DD293E",
                marginTop: 210,
              }}
              onPress={() => setdata(false)}
              // onPress={handleSkip}
            >
              <Text style={{ textAlign: "center", color: "white" }}>
                Proceed
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};
