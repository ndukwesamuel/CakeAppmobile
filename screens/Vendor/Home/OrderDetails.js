import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  Modal,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import AppScreenThree from "../../../components/shared/AppScreenThree";
import { useNavigation, useRoute } from "@react-navigation/native";
import { formatDate } from "../../../utills/DateTime";
import { useMutation } from "react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import RequestModal from "../Modals/RequestModal";
import OngoingModal from "../Modals/OngoingModal";
import CancelledModal from "../Modals/CancelledModal";
import AcceptedModal from "../Modals/AcceptedModal";

export default function OrderDetails() {
  const dataRoute = useRoute()?.params;
  console.log({ dataaaaa: dataRoute?.data });

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate a network request or some async operation
    setTimeout(() => {
      setRefreshing(false);
      // setOption("");
    }, 2000);
  };
  return (
    <AppScreenThree arrrow={"true"} title={dataRoute?.title}>
      <View style={styles.container}>
        <FlatList
          data={dataRoute?.data}
          renderItem={({ item }) => {
            if (dataRoute?.title === "pending") {
              return <RequestModal item={item} />;
            } else if (dataRoute?.title === "ongoing") {
              return <OngoingModal item={item} />;
            } else if (dataRoute?.title === "cancelled") {
              return <CancelledModal item={item} />;
            } else if (dataRoute?.title === "accepted") {
              return <AcceptedModal item={item} />;
            }
          }}
          contentContainerStyle={{ gap: 10 }}
          ListEmptyComponent={
            <View>
              <Text style={{ textAlign: "center" }}>No Orders yet.</Text>
            </View>
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </AppScreenThree>
  );
}

// const RenderItem = ({ item }) => {
//   const navigation = useNavigation();
//   const token = useSelector((state) => state?.Auth?.user_data?.data?.token);
//   const [openModal, setOpenModal] = useState(false);
//   const [acceptModal, setAcceptModal] = useState(false);
//   const [rejectModal, setRejectModal] = useState(false);

//   const updateOrder_Mutation = useMutation(
//     async ({ formData, token }) => {
//       try {
//         const response = await axios.patch(
//           `https://cake-app-server.onrender.com/api/v1/vendor/order/${item._id}`,
//           formData,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );
//       } catch (error) {
//         console.log({ applicationform: error });
//         throw error;
//       }
//     },
//     {
//       onSuccess: (success) => {
//         Toast.show({
//           type: "success",
//           text1: `${success?.data?.message}`,
//         });
//         setAcceptModal(true);
//       },
//       onError: (error) => {
//         console.log(error);
//         Toast.show({
//           type: "error",
//           text1: `${error?.response?.data?.message} `,
//         });
//       },
//     }
//   );

//   const handleAcceptOffer = () => {
//     const formData = {
//       status: "accepted",
//     };
//     updateOrder_Mutation.mutate({ formData, token });

//     // setOpenModal(false);
//   };
//   return (
//     <View style={styles.container2}>
//       <View style={{ gap: 12 }}>
//         <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
//           <Text style={styles.key}>Cake Name</Text>
//           <Text style={styles.value}>{item?.cake?.name}</Text>
//         </View>
//         <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
//           <Text style={styles.key}>Date Order</Text>
//           <Text style={styles.value}>{formatDate(item?.createdAt)}</Text>
//         </View>
//         <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
//           <Text style={styles.key}>Delivery Date</Text>
//           <Text style={styles.value}>{formatDate(item?.deliveryDate)}</Text>
//         </View>
//         <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
//           <Text style={styles.key}>Price</Text>
//           <Text style={styles.value}>{item?.totalPrice}</Text>
//         </View>
//       </View>
//       <Pressable onPress={() => setOpenModal(true)}>
//         <Text
//           style={{
//             textDecorationLine: "underline",
//             color: "#6904EC",
//             fontSize: 16,
//             fontWeight: "500",
//           }}
//         >
//           View
//         </Text>
//       </Pressable>

//       <Modal visible={acceptModal} transparent={true} animationType="slide">
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             {/* Modal Content */}
//             <View
//               style={{
//                 backgroundColor: "white",
//                 padding: 20,
//                 width: "100%",
//                 gap: 10,
//               }}
//             >
//               <Text style={styles.title}>{item?.cake?.name}</Text>
//               <View style={{ gap: 17 }}>
//                 <View style={{ gap: 8 }}>
//                   <Text style={styles.subtitle}>Cake Description</Text>
//                   <Text>{item?.cake?.description}</Text>
//                 </View>
//                 <View style={{ gap: 8 }}>
//                   <Text style={styles.subtitle}>Cake Text</Text>
//                   <Text>{item?.cakeText}</Text>
//                 </View>
//                 <View style={{ gap: 8 }}>
//                   <Text style={styles.subtitle}>Quantity</Text>
//                   <Text>{item?.quantity}</Text>
//                 </View>
//                 <View style={{ gap: 8 }}>
//                   <Text style={styles.subtitle}>Address</Text>
//                   <Text>{item?.address}</Text>
//                 </View>
//               </View>
//               <Pressable
//                 onPress={handleAcceptOffer}
//                 style={[styles.button, { backgroundColor: "#6904EC" }]}
//               >
//                 <Text style={{ textAlign: "center", color: "white" }}>
//                   Accept Offer
//                 </Text>
//               </Pressable>
//               <Pressable
//                 onPress={() => setOpenModal(false)}
//                 style={[
//                   styles.button,
//                   {
//                     backgroundColor: "white",
//                     borderWidth: 1,
//                     borderColor: "#6904EC",
//                   },
//                 ]}
//               >
//                 <Text style={{ textAlign: "center", color: "#2B025F" }}>
//                   Reject Offer
//                 </Text>
//               </Pressable>
//             </View>
//           </View>
//         </View>
//       </Modal>

//       {/* accept offer modal */}
//       <Modal visible={openModal} transparent={true} animationType="slide">
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <View
//               style={{
//                 backgroundColor: "white",
//                 padding: 20,
//                 width: "100%",
//                 gap: 20,
//                 paddingVertical:50
//               }}
//             >
//                 <Text style={{textAlign:"center", color:"#2B025F", fontSize:24, fontWeight:"600"}}>Offer Accepted</Text>
//                 <Text style={{textAlign:"center", color:"#2B025F", fontSize:14, fontWeight:"400"}}>You have accepted this offered, Kindly proceed to baking the cake</Text>
//                 <Pressable style= {[styles.button, {backgroundColor:"#6904EC"}]}>
//                     <Text style={{textAlign:"center", color:"white"}}>
//                         Okay
//                     </Text>
//                 </Pressable>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 60,
    padding: 10,
  },
  container2: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    gap: 20,
  },
  key: {
    color: "#2B025F",
    fontSize: 14,
    fontWeight: "400",
  },
  value: {
    color: "#2B025F",
    fontSize: 16,
    fontWeight: "500",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalContent: {
    width: "100%",
    backgroundColor: "#F0F9FF",
    padding: 5,
    borderRadius: 10,
    alignItems: "center",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 50,
  },
  title: {
    color: "#020D44",
    fontSize: 24,
    fontWeight: "600",
  },
  subtitle: {
    color: "#292D32",
    fontSize: 18,
    fontWeight: "500",
  },
});
