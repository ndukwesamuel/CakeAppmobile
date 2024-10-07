// import {
//   View,
//   Text,
//   Image,
//   useWindowDimensions,
//   StyleSheet,
//   Button,
//   Pressable,
// } from "react-native";
// const backwardImg = require("../../assets/cakeImages/backward.png");
// const forwardImg = require("../../assets/cakeImages/forward.png");
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useDispatch } from "react-redux";
// import { checkOnboarding, onBoaringAction } from "../../Redux/OnboardingSlice";

// const OnBoardingItem = ({ item, scrollTo }) => {
//   const { width } = useWindowDimensions();
//   const dispatch = useDispatch();

//   // const onBoarded = async () => {
//   //   try {
//   //     await AsyncStorage.setItem("@viewedOnboarding", "true");
//   //     console.log("done");
//   //     dispatch(
//   //       onBoaringAction.checkOnboarding({
//   //         isOnboarding: false,
//   //       })
//   //     );
//   //   } catch (err) {
//   //     console.log(err);
//   //   }
//   // };

//   const handleSkip = () => {
//     // Handle skip action
//     dispatch(checkOnboarding());
//   };

//   console.log({
//     asas: item,
//   });
//   return (
//     <View>
//       {item.id !== 3 && (
//         <View style={[styles.container, { width }]}>
//           <Image
//             source={item.image}
//             style={[styles.image, { width, resizeMode: "stretch" }]}
//           />
//           <View style={{ flex: 0.2, paddingHorizontal: 70, gap: 10 }}>
//             <Text
//               style={{
//                 color: "#1E0000",
//                 fontSize: 32,
//                 fontWeight: "700",
//                 textAlign: "center",
//               }}
//             >
//               {item?.title}
//             </Text>
//             <Text
//               style={{
//                 color: "#1E0000",
//                 fontSize: 16,
//                 fontWeight: "400",
//                 textAlign: "center",
//               }}
//             >
//               {item?.description}
//             </Text>
//           </View>
//           <View
//             style={{
//               flex: 0.2,
//               marginTop: 10,
//               justifyContent: "space-evenly",
//               paddingHorizontal: 10,
//             }}
//           >
//             {/* <View style={{ gap: 10 }}> */}
//             <View
//               style={{
//                 flexDirection: "row",
//                 justifyContent: "space-between",
//               }}
//             >
//               <Pressable>
//                 <Image source={backwardImg} />
//               </Pressable>
//               <Pressable onPress={() => scrollTo()}>
//                 <Image source={forwardImg} />
//               </Pressable>
//             </View>
//             {/* </View> */}
//           </View>
//         </View>
//       )}

//       {item.id === 3 && (
//         <View style={[styles.container2, { width }]}>
//           <Image
//             source={item.image}
//             style={{ width, resizeMode: "stretch", flex: 1.2, marginTop: -10 }}
//           />
//           <View
//             style={{
//               flex: 2,
//               gap: 10,
//               backgroundColor: "white",
//               width: "95%",
//               margin: "auto",
//               paddingVertical: 30,
//             }}
//           >
//             <View style={{ paddingHorizontal: 20 }}>
//               <Text
//                 style={{
//                   color: "#1E0000",
//                   fontSize: 32,
//                   fontWeight: "700",
//                   textAlign: "left",
//                 }}
//               >
//                 {item?.title}
//               </Text>
//               <Text
//                 style={{
//                   color: "#1E0000",
//                   fontSize: 16,
//                   fontWeight: "400",
//                   textAlign: "left",
//                 }}
//               >
//                 {item?.description}
//               </Text>
//             </View>
//             <View
//               style={{
//                 // flex: ,
//                 marginTop: 20,
//                 justifyContent: "space-evenly",
//                 paddingHorizontal: 10,
//               }}
//             >
//               <View style={{ flexDirection: "column", gap: 20 }}>
//                 <Pressable
//                   style={{
//                     padding: 10,
//                     borderRadius: 5,
//                     backgroundColor: "white",
//                     borderWidth: 1,
//                     borderColor: "#330111",
//                     borderRadius: 10,
//                     borderStyle: "solid",
//                   }}
//                   onPress={handleSkip}
//                 >
//                   <Text style={{ textAlign: "left" }}>Cake Maker</Text>
//                 </Pressable>
//                 <Pressable
//                   style={{
//                     padding: 10,
//                     borderRadius: 5,
//                     backgroundColor: "white",
//                     borderWidth: 1,
//                     borderColor: "#330111",
//                     borderRadius: 10,
//                     borderStyle: "solid",
//                   }}
//                   onPress={handleSkip}
//                 >
//                   <Text style={{ textAlign: "left" }}>Buyer</Text>
//                 </Pressable>
//               </View>
//               <Pressable
//                 style={{
//                   padding: 10,
//                   borderRadius: 10,
//                   backgroundColor: "#DD293E",
//                   marginTop: 210,
//                 }}
//                 onPress={handleSkip}
//               >
//                 <Text style={{ textAlign: "center", color: "white" }}>
//                   Proceed
//                 </Text>
//               </Pressable>
//             </View>
//           </View>
//         </View>
//       )}

//       {/* OnBoading Text */}Date of Time:

//       {/* Onboarding Buttons */}
//     </View>

//     // </View>
//   );
// };

// export default OnBoardingItem;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//     // alignItems: "center",
//     margin: 0,
//     gap: 40,
//   },
//   container2: {
//     flex: 1,
//     backgroundColor: "#FFF0F0",
//     margin: 0,
//   },
//   image: {
//     flex: 1,
//     marginTop: -10,
//   },
// });

import {
  View,
  Text,
  Image,
  useWindowDimensions,
  StyleSheet,
  Pressable,
} from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native"; // For navigation
import { checkOnboarding } from "../../Redux/OnboardingSlice";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";

const backwardImg = require("../../assets/cakeImages/backward.png");
const forwardImg = require("../../assets/cakeImages/forward.png");

const OnBoardingItem = ({ item, scrollTo }) => {
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const navigation = useNavigation(); // For navigation

  const handleSkip = () => {
    console.log({
      ss: "dkfjdfkj",
    });
    dispatch(checkOnboarding());
    // navigation.navigate("Home"); // Change "Home" to your target screen name
  };

  return (
    <View
    style={[
      styles.container,
      { width, backgroundColor: `${item.backgroundImage}` },
    ]}
  >
    <View style={{ flexDirection: "row", gap: 10, justifyContent: "center" }}>
      <View style={{ gap: 10, alignItems: "center" }}>
        <Image source={require("../../assets/images/img5.png")} />
        <Image source={require("../../assets/images/img1.png")} />
      </View>
      <View style={{ gap: 20, alignItems: "center" }}>
        <Image source={require("../../assets/images/img4.png")} />
        <Image source={require("../../assets/images/img3.png")} />
        <Image source={require("../../assets/images/img2.png")} />
      </View>
    </View>
  
    {/* Gradient at the Bottom */}
    <LinearGradient
      colors={[item.gradient1, item.backgroundImage]}
      style={styles.gradientWrapper}
    >
      {/* Content inside the Gradient */}
      <View style={styles.contentContainer}>
        <Text style={styles.heading}>Consectetur adi</Text>
        <Text style={styles.paragraph}>
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Duis aute irure dolor in repr
        </Text>
      </View>
      <Pressable>
        <Text>Next</Text>
      </Pressable>
    </LinearGradient>
  </View>
  );
};

export default OnBoardingItem;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Full height of the screen
    paddingTop: 30,
  },
  gradientWrapper: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "100%",
    justifyContent:'flex-end',
    alignItems: "center", 
  },
  contentContainer: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    textAlign: "left",
  },
  paragraph: {
    fontSize: 16,
    color: "white",
    lineHeight: 24,
    textAlign: "left",
  },
});


// <View
//           style={{
//             flex: 0.2,
//             marginTop: 10,
//             justifyContent: "space-evenly",
//             paddingHorizontal: 10,
//           }}
//         >
//           {item.id === 2 ? (
//             // Render the "Next" button for the second item
//             <Pressable
//               style={{
//                 padding: 10,
//                 borderRadius: 10,
//                 backgroundColor: "#DD293E",
//               }}
//               onPress={handleSkip} // Navigate to the next page on press
//             >
//               <Text style={{ textAlign: "center", color: "white" }}>Next</Text>
//             </Pressable>
//           ) : (
//             <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
//               {/* <Pressable>
//                 <Image source={backwardImg} />
//               </Pressable> */}
//               <Pressable onPress={() => scrollTo()}>
//                 <Image source={forwardImg} />
//               </Pressable>
//             </View>
//           )}
//         </View>
