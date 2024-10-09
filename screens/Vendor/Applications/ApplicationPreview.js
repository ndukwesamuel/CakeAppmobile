import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import AppScreenTwo from "../../../components/shared/AppScreenTwo";
import { useSelector } from "react-redux";
import { useMutation } from "react-query";
import axios from "axios";
import Toast from "react-native-toast-message";
import AppScreenThree from "../../../components/shared/AppScreenThree";
import VendorNavigation from "../../../Navigation/VendorNav/VendorNavigation";

const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;

const ApplicationPreview = () => {
  const navigation = useNavigation()
  const token = useSelector((state) => state?.Auth?.user_data?.data?.token);
  // console.log(token);

  const route = useRoute();
  const { formData } = route.params;
  // console.log({appppllllli:formData});

 const  ApplicationForm_Mutation = useMutation(
    async ({ formData, token }) => {
      try{
        const response = await axios.patch("https://cake-app-server.onrender.com/api/v1/vendor/profile",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )

      }catch(error){
        // console.log({applicationform: error})
        throw error;
      }
    },{
      onSuccess:(success)=>{
        navigation.goBack()
        // navigation.navigate("home")
        // console.log({success:success})
        Toast.show({
          type:"success",
          text1:`Profile successfully updated`
        })
      },
        onError: (error) => {

          // console.log(error)
          Toast.show({
            type: "error",
            text1: `${error?.response?.data?.message} `,
          });
        },
    },


  );
  const handleSubmit = () =>{
    ApplicationForm_Mutation.mutate({formData, token})
  }
  return (
    <AppScreenThree arrrow={"true"} title={"Application Preview"}>
      <ScrollView>
        <View style={styles.container}>
          {/* <Text style={styles.title}>Preview Application</Text> */}
          <View
            style={{
              backgroundColor: "white",
              gap: 20,
              paddingHorizontal: 20,
              paddingVertical: 50
              // marginTop: 50,
            }}
          >
            <View style={{ flexDirection: "row", }}>
              <Text style={styles.key}>Business Name:</Text>
              <Text style={styles.value}>{formData?.businessName}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.key}>Name of Business Owner:</Text>
              <Text style={styles.value}>{formData?.businessOwnerName}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.key}>C.A.C No</Text>
              <Text style={styles.value}>{formData?.cacNumber}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.key}>Business E-mail</Text>
              <Text style={styles.value}>{formData?.businessEmail}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.key}>Business Call line:</Text>
              <Text style={styles.value}>{formData?.businessCallLine}</Text>
            </View>
            {/* <View style={{ flexDirection: "row" }}>
              <Text style={styles.key}>Years of Experience</Text>
              <Text style={styles.value}></Text>
            </View> */}
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.key}>Nationality</Text>
              <Text style={styles.value}>{formData?.nationality}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.key}>Business Description</Text>
              <Text style={styles.value}>{formData?.businessDescription}</Text>
            </View>
            {/* button */}
            <Pressable style={styles.button} onPress={handleSubmit}>
              {ApplicationForm_Mutation.isLoading? (<ActivityIndicator size="small" color="white"/>):(<Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontSize: 16,
                  fontWeight: "400",
                }}
              >
                Submit
              </Text>)}
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </AppScreenThree>
  );
};

export default ApplicationPreview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#4C0016",
  },
  key: {
    width: "50%",
    fontSize: 16,
    fontWeight: "400",
    color: "#330111",
    // textAlign:"center"
  },
  value: {
    width: "50%",
    fontSize: 16,
    fontWeight: "600",
    color: "#330111",
  },
  button: {
    backgroundColor: "rgba(105, 4, 236, 1)",
    paddingVertical: 10,
    borderRadius: 40,
    marginTop: 50,
    // marginBottom: 50,
  },
});
