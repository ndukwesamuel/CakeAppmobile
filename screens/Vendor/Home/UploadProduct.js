import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  Platform,
} from "react-native";
import AppScreenTwo from "../../../components/shared/AppScreenTwo";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import AppScreenThree from "../../../components/shared/AppScreenThree";
import { useDispatch, useSelector } from "react-redux";
import { Get_All_Categories_Fun } from "../../../Redux/Buyer/CakeSlice";

const UploadProduct = () => {
  useEffect(() => {
    console.log("Updated pictures:", pictures);
  }, [pictures]);

  const navigation = useNavigation();

  const { get_all_categories_data } = useSelector((state) => state?.CakeSlice);
  const dataRoute = useRoute()?.params?.cakeData;
  console.log({ edit: dataRoute });

  const dispatch = useDispatch();
  const [cakeName, setCakeName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [pictures, setPictures] = useState([]);
  const [size, setSize] = useState("");
  const [layers, setLayers] = useState(0);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    dispatch(Get_All_Categories_Fun());
    return () => {};
  }, []);

  useEffect(() => {
    if (dataRoute?.item) {
      setCakeName(dataRoute.item.name || "");
      setPrice(dataRoute.item.price || 0);
      setDescription(dataRoute.item.description || "");
      setSize(dataRoute.item.cakeSize || "");
      setLayers(dataRoute.item.numberOfLayers || 0);
      setSelectedStatus(dataRoute.item.category || selectedStatus);
      setEditMode(true);
    }
  }, [dataRoute]);
  // console.log({ categories: get_all_categories_data.data.categories.name });

  const pickImage = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        alert("Permission to access gallery is required!");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        if (Platform.OS === "web") {
          const imageBlob = await uriToBlob(result.assets[0].uri);
          setPictures([
            ...pictures,
            { uri: result.assets[0].uri, blob: imageBlob },
          ]);
          console.log({ pictures: pictures });
        } else {
          setPictures([...pictures, { uri: result.assets[0].uri }]);
        }
      }
    } catch (error) {
      console.log("Error picking image:", error);
      alert("Something went wrong while picking the image.");
    }
  };

  // Convert image URI to Blob for web uploads
  const uriToBlob = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };

  console.log({
    ddd: image,
  });

  const uploadProductHandler = () => {
    // const formData = new FormData();
    // formData.append("name", cakeName);
    // formData.append("price", price);
    // formData.append("description", description);
    // formData.append("cakeSize", size);
    // formData.append("category", selectedStatus);
    // formData.append("numberOfLayers", layers);
    // formData.append("timeFrame", 2);
    // pictures.forEach((image, index) => {
    //   if (Platform.OS === "web") {
    //     formData.append("images", image.blob, `image${index}.jpg`); // Use Blob for web
    //   } else {
    //     formData.append("images", {
    //       uri: image.uri,
    //       name: `image${index}.jpg`,
    //       type: "image/jpg",
    //     });
    //   }
    // });
    // // Here you can now upload formData to the server
    // console.log({ cakePreview: formData._parts });
    // navigation.navigate("previewPage", { formData: formData , edit:editMode, id:dataRoute?.item?._id});
  };
  const [selectedStatus, setSelectedStatus] = useState(
    get_all_categories_data?.data?.categories[0]?.name
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  const statuses = [
    "anniversary",
    "birthday",
    "wedding",
    "customized",
    "cupcake",
  ];

  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
    setIsModalVisible(false);
  };

  return (
    <AppScreenThree arrrow={"true"} title={"Upload Product"}>
      <ScrollView style={styles.container}>
        {/* <Text style={{ fontSize: 32, fontWeight: "700" }}>Add Cake</Text> */}
        <View style={{ flexDirection: "column", gap: 50 }}>
          <View style={{ marginTop: 30, gap: 24 }}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Cake Name</Text>
              <TextInput
                style={styles.input}
                value={cakeName}
                onChangeText={(text) => setCakeName(text)}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Price</Text>
              <TextInput
                style={styles.input}
                value={price.toString()}
                onChangeText={(text) => setPrice(text)}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, { height: 80 }]}
                value={description}
                onChangeText={(text) => setDescription(text)}
              />
            </View>

            <TouchableOpacity
              style={styles.uploadContainer}
              onPress={pickImage}
            >
              <View style={styles.uploadContent}>
                <Image
                  source={{ uri: "https://example.com/upload-icon.png" }} // Replace with your upload icon URL
                  style={styles.icon}
                />
                <Text style={styles.uploadText}>Upload Images</Text>
              </View>
            </TouchableOpacity>

            {/* <FlatList
              data={pictures}
              horizontal
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View style={styles.imageContainer}>
                  <Image source={{ uri: item }} style={styles.uploadedImage} />
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeImage(index)}
                  >
                    <Text style={styles.removeButtonText}>X</Text>
                  </TouchableOpacity>
                </View>
              )}
            /> */}

            <View style={styles.formGroup}>
              <Text style={styles.label}>Size</Text>
              <TextInput
                style={styles.input}
                value={size}
                onChangeText={(text) => setSize(text)}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Number of Layers</Text>
              <TextInput
                style={styles.input}
                value={layers.toString()}
                onChangeText={(text) => setLayers(text)}
              />
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: "center",
                paddingHorizontal: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  marginBottom: 10,
                }}
              >
                Select Category:
              </Text>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: "#ccc",
                  padding: 10,
                  borderRadius: 5,
                }}
                onPress={() => setIsModalVisible(true)}
              >
                <Text
                  style={{
                    fontSize: 16,
                    textTransform: "lowercase",
                  }}
                >
                  {selectedStatus}
                </Text>
              </TouchableOpacity>

              <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="slide"
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "white",
                      width: "80%",
                      borderRadius: 10,
                      padding: 20,
                    }}
                  >
                    <FlatList
                      data={get_all_categories_data?.data?.categories}
                      keyExtractor={(item) => item._id}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          style={{
                            paddingVertical: 10,
                          }}
                          onPress={() => handleStatusSelect(item?.name)}
                        >
                          <Text
                            style={{
                              fontSize: 18,
                              textTransform: "lowercase",
                            }}
                          >
                            {item?.name}
                          </Text>
                        </TouchableOpacity>
                      )}
                    />
                  </View>
                </View>
              </Modal>
            </View>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: "#6904EC",
              padding: 10,
              borderRadius: 20,
              marginBottom: 20,
            }}
            onPress={uploadProductHandler}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                fontWeight: "400",
                color: "white",
              }}
            >
              Preview
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </AppScreenThree>
  );
};

export default UploadProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 60,
    backgroundColor: "white",
  },
  formGroup: {
    flexDirection: "column",
    gap: 5,
  },
  input: {
    borderWidth: 0.5,
    borderColor: "#4C060E",
    height: 48,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "400",
    color: "#000000",
  },
  uploadContainer: {
    height: 100,
    width: "100%",
    borderWidth: 1,
    borderColor: "#4C060E", // Red dashed border
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#f9f9f9", // Optional: Background color for the container
  },
  uploadContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    height: 24,
    width: 24,
    tintColor: "#FF0000", // Red color for icon
  },
  uploadText: {
    marginTop: 5,
    color: "#6904EC", // Red color for text
    fontSize: 16,
  },
  uploadedImage: {
    height: 100,
    width: 100,
    borderRadius: 5,
    marginRight: 10,
  },
  imageContainer: {
    position: "relative",
  },
  removeButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "#6904EC",
    borderRadius: 50,
    padding: 5,
  },
  removeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
