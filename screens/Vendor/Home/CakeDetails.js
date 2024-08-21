import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import AppScreenTwo from "../../../components/shared/AppScreenTwo";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

const CakeDetails = () => {
  const dispatch = useDispatch();
  const cakeDetails = useRoute()?.params;
  //   const { get_single_cake_data } = useSelector((state) => state.CakeSlice);
  console.log({ 1111111: cakeDetails.item });

  return (
    <AppScreenTwo arrrow={"true"} notification={"true"}>
      {cakeDetails ? (
        <View style={styles.container}>
          {/* Image Grid */}

          <View style={{ marginVertical: 30 }}>
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <Image
                source={{
                  uri: cakeDetails?.item?.images[0]?.url, // "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR1bGGi3JK4IknHua3xDucgbe1ah0T2s2aQcm6AeXC5jEgRKKBz",
                }}
                style={{
                  width: "45%",

                  height: 200,

                  borderRadius: 10,
                }}
              />

              <View
                style={{
                  width: "35%",
                  gap: 10,
                //   paddingHorizontal:
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                  }}
                >
                  <Image
                    source={{
                      uri: cakeDetails?.item?.images[0]?.url, // "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR1bGGi3JK4IknHua3xDucgbe1ah0T2s2aQcm6AeXC5jEgRKKBz",
                      //"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR1bGGi3JK4IknHua3xDucgbe1ah0T2s2aQcm6AeXC5jEgRKKBz",
                    }}
                    style={{
                      width: 80,
                      height: 100,
                      borderRadius: 10,
                    }}
                  />
                  <Image
                    source={{
                      uri: cakeDetails?.item?.images[0]?.url, // "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR1bGGi3JK4IknHua3xDucgbe1ah0T2s2aQcm6AeXC5jEgRKKBz",
                    }}
                    style={{
                        width: 80,
                        height: 100,
                        borderRadius: 10,
                    }}
                  />
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                  }}
                >
                  <Image
                    source={{
                      uri: cakeDetails?.item?.images[0]?.url, // "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR1bGGi3JK4IknHua3xDucgbe1ah0T2s2aQcm6AeXC5jEgRKKBz",
                    }}
                    style={{
                        width: 80,
                        height: 100,
                        borderRadius: 10,
                    }}
                  />
                  <Image
                    source={{
                      uri: cakeDetails?.item?.images[0]?.url, // "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR1bGGi3JK4IknHua3xDucgbe1ah0T2s2aQcm6AeXC5jEgRKKBz",
                    }}
                    style={{
                        width: 80,
                        height: 100,
                        borderRadius: 10,
                    }}
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Description Section */}

          <View
            style={{
              marginVertical: 20,
            }}
          >
            <Text style={styles.title}>{cakeDetails?.item?.name}</Text>

            <Text style={styles.description}>
              {cakeDetails?.item?.description}
            </Text>
          </View>

          {/* Size and Price Section */}
          <View style={styles.sizePriceContainer}>
            <View
              style={{
                width: "40%",
                marginVertical: 10,
              }}
            >
              <View style={styles.sizeSection}>
                <Text style={{color:"#8D0000"}}>Size</Text>
                <Text style={{color:"#8D0000"}}>{cakeDetails?.item?.cakeSize} inches</Text>
              </View>
              <View style={styles.sizeSection}>
                <Text style={{color:"#8D0000"}}>Layers</Text>
                <Text style={{color:"#8D0000"}}>{cakeDetails?.item?.numberOfLayers}</Text>
              </View>
              <View style={styles.sizeSection}>
                <Text style={{color:"#8D0000"}}>Color</Text>
                <Text style={{color:"#8D0000"}}>e.g., Blue</Text>
              </View>
            </View>
            <Text style={styles.price}>
              ₦{cakeDetails?.item?.price}
            </Text>
          </View>

          {/* Action Buttons */}
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 20,
            }}
          >
            <View style={{ width: "90%", gap: 40, marginTop:100 }}>
              <TouchableOpacity
                style={styles.orderButton}
                // onPress={() => {
                //   setdata1(true);
                // }}
              >
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity style={styles.customizeButton}>
                <Text style={styles.customizeText}>Customize Cakes</Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </View>
      ) : (
        <Text>
          <ActivityIndicator size="large" color="#860B34" />
        </Text>
      )}
    </AppScreenTwo>
  );
};

export default CakeDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop:80
  },
  imageGrid: {
    marginVertical: 10,
    justifyContent: "space-between",
  },
  image: {
    width: "30%",
    aspectRatio: 1, // Square images
    marginBottom: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  descriptionContainer: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 5,
    width: "70%",
    color: "#4C0016",
  },
  description: {
    fontSize: 14,
    color: "#860B34",
    textAlign: "justify",
    width: "90%",
  },
  sizePriceContainer: {
    padding: 10,
    backgroundColor: "#FFBFBF",
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  sizeSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4C0016",
    textAlign: "center",
    marginVertical: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  orderButton: {
    backgroundColor: "#DD293E",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    // width: "40%",
    // justifyContent: "center",
    alignItems: "center",
  },
  customizeButton: {
    borderColor: "#DD293E",
    borderWidth: 2,
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  customizeText: {
    color: "#DD293E",
    fontWeight: "bold",
    textAlign: "center",
  },

  label: {
    marginBottom: 8,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});
