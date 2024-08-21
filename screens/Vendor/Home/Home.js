// import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
// import React, { useEffect, useState } from "react";
// import AppScreenTwo from "../../../components/shared/AppScreenTwo";
// const profileImage = require("../../../assets/cakeImages/Ellipse.png");
// import { useNavigation } from "@react-navigation/native";
// import { useDispatch, useSelector } from "react-redux";
// import { UserProfile_Fun } from "../../../Redux/AuthSlice";
// import { Get_Vendor_Profile } from "../../../Redux/Vendor/ProfileSlice";
// import { Get_All_Order_HIstory_Fun } from "../../../Redux/Vendor/OrderSlice";
// import CakeCategories from "./CakeCategories";

// const Home = () => {
//   const dispatch = useDispatch();
//   const [completedOrdersCount, setCompletedOrdersCount] = useState(0);
//   const vendor_profile_data1 = useSelector(
//     (state) => state?.VendorsSlice?.ProfileSlice?.vendor_profile_data
//   );
//   const vendor_profile_data = useSelector(
//     (state) =>
//       state?.VendorsSlice?.ProfileSlice?.vendor_profile_data?.vendorProfile
//   );
//   const get_all_order_history_data = useSelector(
//     (state) => state?.VendorsSlice.OrderSlice.get_all_order_history_data.orders
//   );
//   useEffect(() => {
//     dispatch(Get_Vendor_Profile());
//     dispatch(Get_All_Order_HIstory_Fun());
//     return () => {};
//   }, []);
//   useEffect(() => {
//     if (get_all_order_history_data) {
//       // Filter orders with status 'completed' and get the length
//       const completedOrders = get_all_order_history_data?.filter(
//         (order) => order.status === "completed"
//       );
//       setCompletedOrdersCount(completedOrders.length);
//     }
//   }, [get_all_order_history_data]);

//   const navigation = useNavigation();
//   return (
//     <AppScreenTwo notification={"true"}>
//       <View style={styles.container}>
//         <TouchableOpacity onPress={() => navigation.navigate("uploadProduct")}>
//           <Text style={[styles.upload, { padding: 20 }]}>Upload Product</Text>
//         </TouchableOpacity>
//         <View
//           style={{
//             margin: "auto",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           <Image
//             source={{ uri: vendor_profile_data1?.image }}
//             style={{
//               width: 80,
//               height: 80,
//               borderRadius: 40,
//             }}
//           />
//           <Text
//             style={{
//               textAlign: "center",
//               color: "#4C0016",
//               fontSize: 12,
//               fontWeight: "600",
//               marginTop: 5,
//             }}
//           >
//             {vendor_profile_data?.businessName}
//           </Text>
//         </View>
//         <View style={[styles.subContainer]}>
//           <View
//             style={{ flexDirection: "row", justifyContent: "space-between" }}
//           >
//             <Text style={styles.subtitle}>Number of Orders</Text>
//             <Text style={styles.value}>
//               {get_all_order_history_data?.length}
//             </Text>
//           </View>
//           <View
//             style={{ flexDirection: "row", justifyContent: "space-between" }}
//           >
//             <Text style={styles.subtitle}>Completed Orders</Text>
//             <Text style={styles.value}>{completedOrdersCount}</Text>
//           </View>
//           <View
//             style={{ flexDirection: "row", justifyContent: "space-between" }}
//           ></View>
//         </View>

//         <View
//           style={{
//             flex: 1,
//           }}
//         >
//           <CakeCategories />
//         </View>
//       </View>
//     </AppScreenTwo>
//   );
// };

// export default Home;

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 80,
//     // padding:20
//   },
//   upload: {
//     textAlign: "right",
//     fontSize: 12,
//     fontWeight: "500",
//     color: "#DD293E",
//   },
//   subContainer: {
//     marginTop: 10,
//     backgroundColor: "white",
//     padding: 30,
//     gap: 10,
//   },
//   subtitle: {
//     fontSize: 14,
//     fontWeight: "400",
//     color: "#4C0016",
//   },
//   value: {
//     fontSize: 14,
//     fontWeight: "700",
//     color: "#4C0016",
//   },
// });

import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import AppScreenTwo from "../../../components/shared/AppScreenTwo";
const profileImage = require("../../../assets/cakeImages/Ellipse.png");
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Get_Vendor_Profile } from "../../../Redux/Vendor/ProfileSlice";
import { Get_All_Order_HIstory_Fun } from "../../../Redux/Vendor/OrderSlice";
import CakeCategories from "./CakeCategories";

const Home = () => {
  const dispatch = useDispatch();
  const [completedOrdersCount, setCompletedOrdersCount] = useState(0);
  const vendor_profile_data1 = useSelector(
    (state) => state?.VendorsSlice?.ProfileSlice?.vendor_profile_data
  );
  const vendor_profile_data = useSelector(
    (state) =>
      state?.VendorsSlice?.ProfileSlice?.vendor_profile_data?.vendorProfile
  );
  const get_all_order_history_data = useSelector(
    (state) => state?.VendorsSlice.OrderSlice.get_all_order_history_data.orders
  );

  useEffect(() => {
    dispatch(Get_Vendor_Profile());
    dispatch(Get_All_Order_HIstory_Fun());
    return () => {};
  }, []);

  useEffect(() => {
    if (get_all_order_history_data) {
      const completedOrders = get_all_order_history_data?.filter(
        (order) => order.status === "completed"
      );
      setCompletedOrdersCount(completedOrders.length);
    }
  }, [get_all_order_history_data]);

  const navigation = useNavigation();
  return (
    <AppScreenTwo notification={"true"} style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate("uploadProduct")}>
          <Text style={[styles.upload, { padding: 20 }]}>Upload Product</Text>
        </TouchableOpacity>
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: vendor_profile_data1?.image }}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>
            {vendor_profile_data?.businessName}
          </Text>
        </View>
        <View style={[styles.subContainer]}>
          <View style={styles.infoRow}>
            <Text style={styles.subtitle}>Number of Orders</Text>
            <Text style={styles.value}>
              {get_all_order_history_data?.length}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.subtitle}>Completed Orders</Text>
            <Text style={styles.value}>{completedOrdersCount}</Text>
          </View>
        </View>
        <View style={styles.categoriesContainer}>
          <CakeCategories />
        </View>
      </View>
    </AppScreenTwo>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
  },
  upload: {
    textAlign: "right",
    fontSize: 12,
    fontWeight: "500",
    color: "#DD293E",
  },
  profileContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginVertical: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileName: {
    textAlign: "center",
    color: "#4C0016",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 5,
  },
  subContainer: {
    backgroundColor: "white",
    padding: 30,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "#4C0016",
  },
  value: {
    fontSize: 14,
    fontWeight: "700",
    color: "#4C0016",
  },
  categoriesContainer: {
    flex: 1,
  },
});
