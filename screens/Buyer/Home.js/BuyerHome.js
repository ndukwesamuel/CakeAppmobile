import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import AppScreenTwo from "../../../components/shared/AppScreenTwo";
import { useDispatch, useSelector } from "react-redux";
import { UserProfile_Fun } from "../../../Redux/AuthSlice";
import Orderhistory from "../Profile/Orderhistory";
import Personalinfo from "../Profile/Personalinfo";
import VendorList from "./VendorList";
import { Get_All_Vendor_Fun } from "../../../Redux/Buyer/VendorSlice";
import CakeCategories from "./CakeCategories";
import AppScreen from "../../../components/shared/AppScreen";

const BuyerHome = () => {
  const dispatch = useDispatch();
  const { user_data } = useSelector((state) => state?.Auth);

  const userData = user_data?.data?.user

  const { get_all_vendor_data } = useSelector((state) => state.VendorSlice);

  const [profletab, setprofletab] = useState("vendors");

  useEffect(() => {
    dispatch(UserProfile_Fun());
    dispatch(Get_All_Vendor_Fun());
  }, []);

  console.log({user:userData})

  return (
    // <AppScreenTwo>
    //   <View style={{ flex: 1 }}>
    //     <View
    //       style={{
    //         flexDirection: "row",
    //         paddingHorizontal: 40,

    //         gap: 50,
    //         marginTop: 20,
    //       }}
    //     >
    //       <TouchableOpacity
    //         // style={
    //         //   profletab === "personal"
    //         //     ? styles.buttonstyleTrue
    //         //     : styles.buttonstyleFalse
    //         // }
    //         onPress={() => setprofletab("vendors")}
    //       >
    //         <Text
    //           style={{
    //             fontSize: 16,
    //             fontWeight: "500",
    //             color: profletab === "vendors" ? "#DD293E" : "black",
    //           }}
    //         >
    //           Vendors
    //         </Text>

    //         {profletab === "vendors" && (
    //           <View
    //             style={{
    //               borderWidth: 1,
    //               borderColor: "#DD293E",
    //               width: 40,
    //               marginLeft: 10,
    //             }}
    //           />
    //         )}
    //       </TouchableOpacity>

    //       <TouchableOpacity
    //         // style={
    //         //   profletab === "order"
    //         //     ? styles.buttonstyleTrue
    //         //     : styles.buttonstyleFalse
    //         // }
    //         onPress={() => setprofletab("Categories_of_Cakes")}
    //       >
    //         <Text
    //           style={{
    //             fontSize: 16,
    //             fontWeight: "500",
    //             color:
    //               profletab === "Categories_of_Cakes" ? "#DD293E" : "black",
    //           }}
    //         >
    //           Categories of Cakes
    //         </Text>

    //         {profletab === "Categories_of_Cakes" && (
    //           <View
    //             style={{
    //               borderWidth: 1,
    //               borderColor: "#DD293E",
    //               width: 100,
    //               marginLeft: 30,
    //             }}
    //           />
    //         )}
    //       </TouchableOpacity>
    //     </View>

    //     <View
    //       style={{
    //         flex: 1,
    //         marginTop: 20,
    //       }}
    //     >
    //       {profletab === "vendors" && <VendorList />}
    //       {profletab === "Categories_of_Cakes" && <CakeCategories />}
    //     </View>
    //   </View>
    // </AppScreenTwo>
    <AppScreen>
      <View style={styles.container}>
        <View style={{backgroundColor:"white", padding:10, flexDirection:"row"}}>
          <View>
            <Text>Hello {userData?.firstName}</Text>
          </View>
          <View>
            
          </View>
          
        </View>
        <CakeCategories/>
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1
  }
  // buttonstyleTrue: {
  //   backgroundColor: "#DD293E",
  //   padding: 12,
  //   paddingHorizontal: 15,
  //   paddingVertical: 10,
  //   borderRadius: 30,
  // },
  // buttonstyleFalse: {
  //   backgroundColor: "#F0F0F0", // Define a background color for inactive buttons
  //   padding: 12,
  //   paddingHorizontal: 15,
  //   paddingVertical: 10,
  //   borderRadius: 30,
  // },
});

export default BuyerHome;
