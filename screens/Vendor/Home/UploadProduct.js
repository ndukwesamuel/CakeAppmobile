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
  Platform,
  ActivityIndicator,
  Alert,
  Modal,
} from "react-native";
import AppScreenThree from "../../../components/shared/AppScreenThree";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { Get_All_Categories_Fun } from "../../../Redux/Buyer/CakeSlice";
import { useMutation } from "react-query";
import axios from "axios";

const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;

console.log({
  fgf: API_BASEURL,
});

const UploadProduct = () => {
  const navigation = useNavigation();
  const { get_all_categories_data } = useSelector((state) => state?.CakeSlice);
  const dispatch = useDispatch();
  const { user_isLoading, user_data } = useSelector((state) => state?.Auth);

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

  const [cakeName, setCakeName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [layers, setLayers] = useState(0);
  const [pictures, setPictures] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");

  const dataRoute = useRoute()?.params?.cakeData;
  const [editMode, setEditMode] = useState(false);

  const profileImagemutation = useMutation(
    (image_data) => {
      const API_URL = `${API_BASEURL}v1/vendor/cake`;
      const tokengot = user_data?.data?.token;

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${tokengot}`,
        },
      };

      return axios.post(API_URL, image_data, config);
    },
    {
      onSuccess: (data) => {
        console.log({ firedata: data });
        Alert.alert(
          "Success",
          "Product submitted successfully!",
          [{ text: "OK" }],
          { cancelable: false }
        );
      },
      onError: (error) => {
        console.log({ error: error?.response?.data });
      },
    }
  );

  console.log({
    gggd: get_all_categories_data?.data?.categories,
  });

  useEffect(() => {
    dispatch(Get_All_Categories_Fun());
    if (dataRoute?.item) {
      setCakeName(dataRoute.item.name || "");
      setPrice(dataRoute.item.price || 0);
      setDescription(dataRoute.item.description || "");
      setSize(dataRoute.item.cakeSize || "");
      setLayers(dataRoute.item.numberOfLayers || 0);
      setSelectedStatus(
        dataRoute.item.category ||
          get_all_categories_data?.data?.categories[0]?.name
      );
      setEditMode(true);
    }
  }, [dataRoute]);

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
        } else {
          setPictures([...pictures, { uri: result.assets[0].uri }]);
        }
      }
    } catch (error) {
      console.log("Error picking image:", error);
      alert("Something went wrong while picking the image.");
    }
  };

  const uriToBlob = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };

  const uploadProductHandler = () => {
    const formData = new FormData();
    formData.append("name", cakeName);
    formData.append("price", parseInt(price)); // Ensure correct type
    formData.append("description", description);
    formData.append("cakeSize", size);
    formData.append("category", selectedStatus);
    formData.append("numberOfLayers", parseInt(layers)); // Ensure correct type
    formData.append("timeFrame", 2);

    pictures.forEach((image, index) => {
      if (Platform.OS === "web") {
        formData.append("images", image.blob, `image${index}.jpg`);
      } else {
        formData.append("images", {
          uri: image.uri,
          name: `image${index}.jpg`,
          type: "image/jpg",
        });
      }
    });

    profileImagemutation.mutate(formData);
  };

  const handleRemoveImage = (index) => {
    const updatedPictures = [...pictures];
    updatedPictures.splice(index, 1); // Remove the image at the given index
    setPictures(updatedPictures);
  };
  return (
    <AppScreenThree arrrow={"true"} title={"Upload Product"}>
      <ScrollView style={styles.container}>
        <View style={{ marginBottom: 30 }}>
          <Text style={styles.sectionTitle}>Product Details</Text>

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
              keyboardType="numeric"
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

          <TouchableOpacity style={styles.uploadContainer} onPress={pickImage}>
            <View style={styles.uploadContent}>
              <Image
                source={{ uri: "https://example.com/upload-icon.png" }}
                style={styles.icon}
              />
              <Text style={styles.uploadText}>Upload Images</Text>
            </View>
          </TouchableOpacity>

          {/* <FlatList
            data={pictures}
            horizontal
            keyExtractor={(item) => item.uri} // Use unique URIs
            renderItem={({ item }) => (
              <Image source={{ uri: item.uri }} style={styles.uploadedImage} />
            )}
          /> */}

          <FlatList
            data={pictures}
            horizontal
            keyExtractor={(item) => item.uri} // Use unique URIs
            renderItem={({ item, index }) => (
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: item.uri }}
                  style={styles.uploadedImage}
                />
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleRemoveImage(index)}
                >
                  <Text style={styles.deleteButtonText}>X</Text>
                </TouchableOpacity>
              </View>
            )}
          />

          <View style={styles.formGroup}>
            <Text style={styles.label}>Size</Text>
            <TextInput
              style={styles.input}
              value={size}
              onChangeText={(text) => setSize(text)}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Number of Layers</Text>
            <TextInput
              style={styles.input}
              value={layers.toString()}
              onChangeText={(text) => setLayers(text)}
              keyboardType="numeric"
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

        {profileImagemutation?.isLoading ? (
          <ActivityIndicator size="large" color="green" />
        ) : (
          <TouchableOpacity
            style={styles.submitButton}
            onPress={uploadProductHandler}
          >
            <Text style={styles.submitButtonText}>Submit Product</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </AppScreenThree>
  );
};

export default UploadProduct;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 50,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  uploadContainer: {
    marginTop: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  uploadContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  uploadText: {
    fontSize: 16,
  },
  uploadedImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
  },

  imageContainer: {
    position: "relative",
    marginRight: 10,
  },
  uploadedImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  deleteButton: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
