import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  ActivityIndicator,
  TextInput,
  Button,
  Modal,
  Alert,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";

import DateTimePicker from "@react-native-community/datetimepicker";
import {
  Get_Single_Cake_Fun,
  reset_Get_Single_Cake_Fun,
} from "../../../Redux/Buyer/CakeSlice";
import AppScreenTwo from "../../../components/shared/AppScreenTwo";
import {
  formatDate,
  formatDateString,
  formatTime,
} from "../../../utills/DateTime";
import { Forminput } from "../../../components/shared/InputForm";
import { useMutation } from "react-query";
import Toast from "react-native-toast-message";
import axios from "axios";
import AppScreenThree from "../../../components/shared/AppScreenThree";
const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;

const images = [
  {
    id: "1",
    url: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR1bGGi3JK4IknHua3xDucgbe1ah0T2s2aQcm6AeXC5jEgRKKBz",
  },
  {
    id: "2",
    url: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR1bGGi3JK4IknHua3xDucgbe1ah0T2s2aQcm6AeXC5jEgRKKBz",
  },
  {
    id: "3",
    url: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR1bGGi3JK4IknHua3xDucgbe1ah0T2s2aQcm6AeXC5jEgRKKBz",
  },
  {
    id: "4",
    url: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR1bGGi3JK4IknHua3xDucgbe1ah0T2s2aQcm6AeXC5jEgRKKBz",
  },
  // More images...
];

const CakeDetails = () => {
  const navigation = useNavigation()
  const dataroute = useRoute()?.params;
  const cakeData = dataroute?.item;

  const { get_single_cake_data } = useSelector((state) => state.CakeSlice);

  const dispatch = useDispatch();

  // console.log({
  //   dataroute: cakeData,
  // });

  const [preview, setpreview] = useState(false);

  // useEffect(() => {
  //   dispatch(Get_Single_Cake_Fun(dataroute?.item?._id));
  //   return () => {
  //     dispatch(reset_Get_Single_Cake_Fun());
  //   };
  // }, []);

  return (
    <AppScreenThree arrrow={"true"}>
      <ScrollView style={style.container} keyboardShouldPersistTaps="handled">
        {/* image container */}
        <View style={style.imageContainer}>
          <Image
            source={{ uri: cakeData?.images[0]?.url }}
            style={{
              width: "100%",
              height: 150,
              resizeMode: "stretch",
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
            }}
          />
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Image
              source={{ uri: cakeData?.images[1]?.url }}
              style={{
                width: "50%",
                height: 90,
                resizeMode: "stretch",
                borderBottomLeftRadius: 12,
              }}
            />
            <Image
              source={{ uri: cakeData?.images[2]?.url }}
              style={{
                width: "50%",
                height: 90,
                resizeMode: "stretch",
                borderBottomRightRadius: 12,
              }}
            />
          </View>
        </View>

        {/* cake details */}
        <View style={style.detailsContainer}>
          <View>
            <Text style={style.title}>{cakeData?.name} cake</Text>
            <Text style={style.description}>{cakeData?.description}</Text>
          </View>
          <View style={style.pricingContainer}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{color:"#090765", fontSize:16, fontWeight:"600"}}>{cakeData?.name}</Text>
              <Text style={{color:"#2B025F", fontSize:16, fontWeight:"700"}}>{cakeData?.price}</Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={style.text}>Size</Text>
              <Text style={style.text}>{cakeData?.cakeSize}</Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between", borderTopWidth:0.5, borderBottomWidth:0.5, borderColor:"#00000033", paddingVertical:15 }}
            >
              <Text style={style.text}>Layers</Text>
              <Text style={style.text}>{cakeData.numberOfLayers}</Text>
            </View>
            <TouchableOpacity style={style.button} onPress={()=> navigation.navigate('additionalInformation', {cakeData})}>
              <Text style={{textAlign:"center", color:"white"}}>Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </AppScreenThree>
    // <AppScreenTwo arrrow={"true"}>
    //   {preview ? (
    //     <Preview data1={preview} setdata1={setpreview} />
    //   ) : (
    //     <Details data1={preview} setdata1={setpreview} />
    //   )}
    // </AppScreenTwo>
  );
};

// const Details = ({ data1, setdata1 }) => {
//   const { get_single_cake_data } = useSelector((state) => state.CakeSlice);

//   return (
//     <>
//       {get_single_cake_data ? (
//         <View style={styles.container}>
//           {/* Image Grid */}

//           <View style={{ marginVertical: 30 }}>
//             <View
//               style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
//             >
//               <Image
//                 source={{
//                   uri: get_single_cake_data?.cake?.images[0]?.url, // "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR1bGGi3JK4IknHua3xDucgbe1ah0T2s2aQcm6AeXC5jEgRKKBz",
//                 }}
//                 style={{
//                   width: "45%",

//                   height: 200,

//                   borderRadius: 10,
//                   // margin: 10,
//                 }}
//               />

//               <View
//                 style={{
//                   width: "45%",
//                   gap: 10,
//                 }}
//               >
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     //   justifyContent: "space-between",
//                     //   flexWrap: "wrap",
//                     gap: 5,
//                   }}
//                 >
//                   <Image
//                     source={{
//                       uri: get_single_cake_data?.cake?.images[1]?.url, // "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR1bGGi3JK4IknHua3xDucgbe1ah0T2s2aQcm6AeXC5jEgRKKBz",
//                       //"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR1bGGi3JK4IknHua3xDucgbe1ah0T2s2aQcm6AeXC5jEgRKKBz",
//                     }}
//                     style={{
//                       width: 100,
//                       height: 100,
//                       borderRadius: 10,
//                       // margin: 10,
//                     }}
//                   />
//                   <Image
//                     source={{
//                       uri: get_single_cake_data?.cake?.images[2]?.url, // "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR1bGGi3JK4IknHua3xDucgbe1ah0T2s2aQcm6AeXC5jEgRKKBz",
//                     }}
//                     style={{
//                       width: 100,
//                       height: 100,
//                       borderRadius: 10,
//                       // margin: 10,
//                     }}
//                   />
//                 </View>

//                 <View
//                   style={{
//                     flexDirection: "row",
//                     //   justifyContent: "space-between",
//                     //   flexWrap: "wrap",
//                     gap: 5,
//                   }}
//                 >
//                   <Image
//                     source={{
//                       uri: get_single_cake_data?.cake?.images[2]?.url, // "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR1bGGi3JK4IknHua3xDucgbe1ah0T2s2aQcm6AeXC5jEgRKKBz",
//                     }}
//                     style={{
//                       width: 100,
//                       height: 100,
//                       borderRadius: 10,
//                       // margin: 10,
//                     }}
//                   />
//                   <Image
//                     source={{
//                       uri: get_single_cake_data?.cake?.images[2]?.url, // "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR1bGGi3JK4IknHua3xDucgbe1ah0T2s2aQcm6AeXC5jEgRKKBz",
//                     }}
//                     style={{
//                       width: 100,
//                       height: 100,
//                       borderRadius: 10,
//                       // margin: 10,
//                     }}
//                   />
//                 </View>
//               </View>
//             </View>
//           </View>

//           {/* Description Section */}

//           <View
//             style={{
//               marginVertical: 20,
//             }}
//           >
//             <Text style={styles.title}>{get_single_cake_data?.cake?.name}</Text>

//             <Text style={styles.description}>
//               {get_single_cake_data?.cake?.description}
//             </Text>
//           </View>

//           {/* Size and Price Section */}
//           <View style={styles.sizePriceContainer}>
//             <View
//               style={{
//                 width: "40%",
//                 marginVertical: 10,
//               }}
//             >
//               <View style={styles.sizeSection}>
//                 <Text>Size</Text>
//                 <Text>{get_single_cake_data?.cake?.cakeSize} inches</Text>
//               </View>
//               <View style={styles.sizeSection}>
//                 <Text>Layers</Text>
//                 <Text>{get_single_cake_data?.cake?.numberOfLayers}</Text>
//               </View>
//               <View style={styles.sizeSection}>
//                 <Text>Color</Text>
//                 <Text>e.g., Blue</Text>
//               </View>
//             </View>
//             <Text style={styles.price}>
//               ₦{get_single_cake_data?.cake?.price}
//             </Text>
//           </View>

//           {/* Action Buttons */}
//           <View
//             style={{
//               width: "100%",
//               justifyContent: "center",
//               alignItems: "center",
//               marginVertical: 20,
//             }}
//           >
//             <View style={{ width: "80%", gap: 40 }}>
//               <TouchableOpacity
//                 style={styles.orderButton}
//                 onPress={() => {
//                   setdata1(true);
//                 }}
//               >
//                 <Text style={styles.buttonText}>Order</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.customizeButton}>
//                 <Text style={styles.customizeText}>Customize Cakes</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       ) : (
//         <Text>
//           <ActivityIndicator size="large" color="#860B34" />
//         </Text>
//       )}
//     </>
//   );
// };

// const Preview = ({ data1, setdata1 }) => {
//   const { get_single_cake_data } = useSelector((state) => state.CakeSlice);
//   const { user_data } = useSelector((state) => state.Auth);

//   const { control, handleSubmit, watch } = useForm();
//   const [endDate, setEndDate] = useState(new Date());

//   const [forminput, setForminput] = useState(true);

//   const onEndChange = (event, selectedDate) => {
//     const currentDate = selectedDate || endDate;
//     // setShowEndPicker(Platform.OS === "ios");
//     setEndDate(currentDate);
//   };

//   const [name, setName] = useState("");

//   const [quantity, setQuantity] = useState("");

//   const [address, setAddress] = useState("");

//   const [date, setDate] = useState(new Date());
//   const [show, setShow] = useState(false);

//   const [showEndPicker, setShowEndPicker] = useState(false);

//   const toggleEndPicker = () => {
//     setShowEndPicker(!showEndPicker);
//   };

//   const Order_Mutation = useMutation(
//     (data_info) => {
//       let url = `${API_BASEURL}v1/order`;

//       let datas = {
//         cakeId: get_single_cake_data?.cake?._id, // "669e7d268268ee783fdf2aa8",
//         customized: true,
//         cakeText: name,
//         quantity: quantity,
//         deliveryDate: formatDate(endDate),
//         address: address,
//       };
//       console.log({
//         url,
//       });

//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           //   "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${user_data?.user?.token}`,
//         },
//       };

//       return axios.post(url, datas, config);
//     },
//     {
//       onSuccess: (success) => {
//         Toast.show({
//           type: "success",
//           text1: `${success?.data?.message} `,
//         });

//         setdata1(false);
//       },

//       onError: (error) => {
//         console.log({
//           error: error,
//         });
//         Toast.show({
//           type: "error",
//           text1: `${error?.response?.data?.message} `,
//           //   text2: ` ${error?.response?.data?.errorMsg} `,
//         });
//       },
//     }
//   );

//   return (
//     <>
//       {forminput ? (
//         <View
//           style={{
//             flex: 1,
//             padding: 20,

//             marginTop: 20,
//           }}
//         >
//           <View>
//             <Text style={styles.label}>Cake Text:</Text>

//             <Forminput placeholder="Name" onChangeText={setName} value={name} />
//           </View>
//           <View style={{ marginTop: 20 }}>
//             <Text style={styles.label}>Date of Delivery:</Text>

//             <TouchableOpacity
//               style={{
//                 // borderWidth: 1,
//                 padding: 10,
//                 borderRadius: 5,
//                 fontSize: 16,
//                 //   backgroundColor: "#F6F8FAE5",
//                 borderWidth: 1,
//                 // opacity: 0.4
//               }}
//               onPress={toggleEndPicker}
//             >
//               <Text>{formatDateString(endDate)}</Text>
//             </TouchableOpacity>
//             {showEndPicker && (
//               <DateTimePicker
//                 testID="endDateTimePicker"
//                 value={endDate}
//                 mode="date"
//                 //   is24Hour={true}
//                 display="calendar"
//                 onChange={onEndChange}
//               />
//             )}
//           </View>

//           <View style={{ marginVertical: 20 }}>
//             <Text style={styles.label}>Date of Time:</Text>

//             <TouchableOpacity
//               style={{
//                 borderWidth: 1,
//                 padding: 10,
//                 borderRadius: 5,
//                 fontSize: 16,
//                 //   backgroundColor: "#F6F8FAE5",
//                 // opacity: 0.4
//               }}
//               onPress={toggleEndPicker}
//             >
//               <Text>{formatDateString(endDate)}</Text>
//             </TouchableOpacity>
//             {showEndPicker && (
//               <DateTimePicker
//                 testID="endDateTimePicker"
//                 value={endDate}
//                 mode="time"
//                 is24Hour={true}
//                 display="clock"
//                 onChange={onEndChange}
//               />
//             )}
//           </View>

//           <View style={{ marginVertical: 10 }}>
//             <Text style={styles.label}>Quantity:</Text>

//             <Forminput
//               placeholder="Enter quantity"
//               onChangeText={setQuantity}
//               value={quantity}
//               keyboardtype="numeric"
//             />
//           </View>

//           <View style={{ marginVertical: 10 }}>
//             <Text style={styles.label}>Address:</Text>

//             <Forminput
//               placeholder="Enter address"
//               onChangeText={setAddress}
//               value={address}
//             />
//           </View>

//           <View
//             style={{
//               width: "100%",
//               justifyContent: "center",
//               alignItems: "center",
//               marginVertical: 20,
//             }}
//           >
//             <View style={{ width: "80%", gap: 40 }}>
//               <TouchableOpacity
//                 style={styles.orderButton}
//                 onPress={() => {
//                   if (
//                     name == "" ||
//                     quantity == "" ||
//                     address == "" ||
//                     endDate == ""
//                   ) {
//                     Toast.show({
//                       type: "error",
//                       text1: "Please fill all the fields",
//                     });
//                   } else {
//                     setForminput(false);
//                   }
//                 }}
//               >
//                 <Text style={styles.buttonText}>Preview</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       ) : (
//         <View
//           style={{
//             flex: 1,
//             padding: 20,

//             marginTop: 20,
//           }}
//         >
//           <Text
//             style={{
//               fontSize: 32,
//               fontWeight: "700",
//             }}
//           >
//             Preview Order
//           </Text>

//           <View
//             style={{
//               width: "90%",
//               backgroundColor: "rgba(255, 255, 255, 0.5)",
//               padding: 20,
//               borderRadius: 10,
//               marginTop: 20,
//             }}
//           >
//             <View
//               style={{ flexDirection: "row", justifyContent: "space-between" }}
//             >
//               <Text
//                 style={{
//                   fontSize: 16,
//                   fontWeight: "bold",
//                   color: "#4A0033",
//                 }}
//               >
//                 Cake Name:
//               </Text>
//               <Text
//                 style={{
//                   fontSize: 16,
//                   color: "#4A0033",
//                   marginBottom: 10,
//                 }}
//               >
//                 {name}
//               </Text>
//             </View>
//             <View
//               style={{ flexDirection: "row", justifyContent: "space-between" }}
//             >
//               <Text
//                 style={{
//                   fontSize: 16,
//                   fontWeight: "bold",
//                   color: "#4A0033",
//                 }}
//               >
//                 Date
//               </Text>
//               <Text
//                 style={{
//                   fontSize: 16,
//                   color: "#4A0033",
//                   marginBottom: 10,
//                 }}
//               >
//                 {formatDate(endDate)}
//               </Text>
//             </View>

//             <View
//               style={{ flexDirection: "row", justifyContent: "space-between" }}
//             >
//               <Text
//                 style={{
//                   fontSize: 16,
//                   fontWeight: "bold",
//                   color: "#4A0033",
//                 }}
//               >
//                 Time
//               </Text>
//               <Text
//                 style={{
//                   fontSize: 16,
//                   color: "#4A0033",
//                   marginBottom: 10,
//                 }}
//               >
//                 {formatTime(endDate)}
//               </Text>
//             </View>

//             <View
//               style={{ flexDirection: "row", justifyContent: "space-between" }}
//             >
//               <Text
//                 style={{
//                   fontSize: 16,
//                   fontWeight: "bold",
//                   color: "#4A0033",
//                 }}
//               >
//                 Quantity
//               </Text>
//               <Text
//                 style={{
//                   fontSize: 16,
//                   color: "#4A0033",
//                   marginBottom: 10,
//                 }}
//               >
//                 {quantity}
//               </Text>
//             </View>

//             <View
//               style={{ flexDirection: "row", justifyContent: "space-between" }}
//             >
//               <Text
//                 style={{
//                   fontSize: 16,
//                   fontWeight: "bold",
//                   color: "#4A0033",
//                 }}
//               >
//                 Price
//               </Text>
//               <Text
//                 style={{
//                   fontSize: 16,
//                   color: "#4A0033",
//                   marginBottom: 10,
//                 }}
//               >
//                 ₦ {get_single_cake_data?.cake?.price * quantity}
//               </Text>
//             </View>

//             <Text
//               style={{
//                 fontSize: 16,
//                 fontWeight: "bold",
//                 color: "#4A0033",
//               }}
//             >
//               Address:
//             </Text>
//             <Text
//               style={{
//                 fontSize: 16,
//                 color: "#4A0033",
//                 marginBottom: 10,
//               }}
//             >
//               {address}
//             </Text>
//           </View>

//           <View
//             style={{
//               width: "100%",
//               justifyContent: "center",
//               alignItems: "center",
//               marginVertical: 20,
//             }}
//           >
//             {Order_Mutation?.isLoading ? (
//               <ActivityIndicator size="large" color="blue" />
//             ) : (
//               <View style={{ width: "80%", gap: 40 }}>
//                 <TouchableOpacity
//                   style={styles.orderButton}
//                   onPress={() => {
//                     Order_Mutation.mutate();
//                     //   setForminput(false);
//                   }}
//                 >
//                   <Text style={styles.buttonText}>Order</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   style={styles.customizeButton}
//                   onPress={() => {
//                     setForminput(true);
//                   }}
//                 >
//                   <Text style={styles.customizeText}>Edit Order</Text>
//                 </TouchableOpacity>
//               </View>
//             )}
//           </View>
//         </View>
//       )}
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//   },
//   imageGrid: {
//     marginVertical: 10,
//     justifyContent: "space-between",
//   },
//   image: {
//     width: "30%",
//     aspectRatio: 1, // Square images
//     marginBottom: 10,
//     borderRadius: 10,
//     overflow: "hidden",
//   },
//   descriptionContainer: {
//     padding: 10,
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: "700",
//     marginBottom: 5,
//     width: "70%",
//     color: "#4C0016",
//   },
//   description: {
//     fontSize: 14,
//     color: "#860B34",
//     textAlign: "justify",
//     width: "90%",
//   },
//   sizePriceContainer: {
//     padding: 10,
//     backgroundColor: "#FFBFBF",
//     borderRadius: 10,
//     marginBottom: 10,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginVertical: 10,
//   },
//   sizeSection: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginVertical: 5,
//   },
//   price: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#DD293E",
//     textAlign: "center",
//     marginVertical: 10,
//   },
//   buttonsContainer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginBottom: 20,
//   },
//   orderButton: {
//     backgroundColor: "#DD293E",
//     borderRadius: 25,
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     // width: "40%",
//     // justifyContent: "center",
//     alignItems: "center",
//   },
//   customizeButton: {
//     borderColor: "#DD293E",
//     borderWidth: 2,
//     borderRadius: 25,
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//   },
//   buttonText: {
//     color: "#fff",
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   customizeText: {
//     color: "#DD293E",
//     fontWeight: "bold",
//     textAlign: "center",
//   },

//   label: {
//     marginBottom: 8,
//     fontWeight: "bold",
//   },
//   input: {
//     height: 40,
//     borderColor: "gray",
//     borderWidth: 1,
//     marginBottom: 16,
//     paddingHorizontal: 8,
//   },
// });

export default CakeDetails;
const style = StyleSheet.create({
  container: {
    top: 60,
    marginBottom: 20,
    flex: 1,
  },
  imageContainer: {
    backgroundColor: "white",
    padding: 15,
    gap: 10,
  },
  detailsContainer: {
    backgroundColor: "white",
    padding: 25,
    marginTop: 20,
    gap:24,
  },
  title: {
    color: "#2B025F",
    fontSize: 24,
    fontWeight: "600",
  },
  description: {
    fontSize: 16,
    fontWeight: "400",
    color: "#2B025F",
  },
  pricingContainer: {
    borderColor: "#00000033",
    borderRadius: 4,
    borderWidth: 0.5,
    padding: 10,
    gap:16
  },
  button: {
    backgroundColor: "#6904EC",
    borderRadius: 30,
    paddingHorizontal: 37,
    paddingVertical: 15,
    marginTop:30
  },
  text:{
    fontSize:16,
    fontWeight:"400",
    color:"#2B025F"
  }
});
