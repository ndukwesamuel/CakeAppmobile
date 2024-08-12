import {
  View,
  Text,
  Image,
  useWindowDimensions,
  StyleSheet,
  Button,
  Pressable,
} from "react-native";
const backwardImg = require("../../assets/cakeImages/backward.png");
const forwardImg = require("../../assets/cakeImages/forward.png");
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { checkOnboarding, onBoaringAction } from "../../Redux/OnboardingSlice";

const OnBoardingItem = ({ item, scrollTo }) => {
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();

  // const onBoarded = async () => {
  //   try {
  //     await AsyncStorage.setItem("@viewedOnboarding", "true");
  //     console.log("done");
  //     dispatch(
  //       onBoaringAction.checkOnboarding({
  //         isOnboarding: false,
  //       })
  //     );
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleSkip = () => {
    // Handle skip action
    dispatch(checkOnboarding());
  };

  return (
    <View>
      {item.id !== 3 && (
        <View style={[styles.container, { width }]}>
          <Image
            source={item.image}
            style={[styles.image, { width, resizeMode: "stretch" }]}
          />
          <View style={{ flex: 0.2, paddingHorizontal: 70, gap: 10 }}>
            <Text
              style={{
                color: "#1E0000",
                fontSize: 32,
                fontWeight: "700",
                textAlign: "center",
              }}
            >
              {item?.title}
            </Text>
            <Text
              style={{
                color: "#1E0000",
                fontSize: 16,
                fontWeight: "400",
                textAlign: "center",
              }}
            >
              {item?.description}
            </Text>
          </View>
          <View
            style={{
              flex: 0.2,
              marginTop: 10,
              justifyContent: "space-evenly",
              paddingHorizontal: 10,
            }}
          >
            {/* <View style={{ gap: 10 }}> */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Pressable>
                <Image source={backwardImg} />
              </Pressable>
              <Pressable onPress={() => scrollTo()}>
                <Image source={forwardImg} />
              </Pressable>
            </View>
            {/* </View> */}
          </View>
        </View>
      )}

      {item.id === 3 && (
        <View style={[styles.container2, { width }]}>
          <Image
            source={item.image}
            style={{ width, resizeMode: "stretch", flex: 1.2, marginTop: -10 }}
          />
          <View style={{ flex: 2,  gap: 10, backgroundColor: "white", width:"95%", margin:"auto", paddingVertical:30}}>
            <View style={{paddingHorizontal: 20,}}>
              <Text
                style={{
                  color: "#1E0000",
                  fontSize: 32,
                  fontWeight: "700",
                  textAlign: "left",
                }}
              >
                {item?.title}
              </Text>
              <Text
                style={{
                  color: "#1E0000",
                  fontSize: 16,
                  fontWeight: "400",
                  textAlign: "left",
                }}
              >
                {item?.description}
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
                  onPress={handleSkip}
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
                  onPress={handleSkip}
                >
                  <Text style={{ textAlign: "left" }}>Buyer</Text>
                </Pressable>
              </View>
              <Pressable
                style={{
                  padding: 10,
                  borderRadius: 10,
                  backgroundColor: "#DD293E",
                  marginTop:210
                }}
                onPress={handleSkip}
              >
                <Text style={{ textAlign: "center", color: "white" }}>
                  Proceed
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}

      {/* OnBoading Text */}

      {/* Onboarding Buttons */}
    </View>

    // </View>
  );
};

export default OnBoardingItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    // alignItems: "center",
    margin: 0,
    gap: 40,
  },
  container2: {
    flex: 1,
    backgroundColor: "#FFF0F0",
    margin: 0,
  },
  image: {
    flex: 1,
    marginTop: -10,
  },
});
