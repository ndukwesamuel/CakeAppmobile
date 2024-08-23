import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
} from "react-native";
import React, { useState } from "react";
import AppScreenTwo from "../../../components/shared/AppScreenTwo";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
const UploadProduct = () => {
  const navigation = useNavigation();
  const [cakeName, setCakeName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [pictures, setPictures] = useState("");
  const [size, setsize] = useState("");
  const [flavour, setFlavour] = useState("");

  const uploadProductHandler = () => {
    const formData = {
      cakeName: cakeName,
      price: price,
      description: description,
      pictures: pictures,
      size: size,
      flavour: flavour,
    };

    navigation.navigate("previewPage", { formData: formData });
  };

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // Request permission to access the gallery
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access gallery is required!");
      return;
    }

    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const [selectedStatus, setSelectedStatus] = useState("anniversary");
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
    <AppScreenTwo arrrow={"true"}>
      <ScrollView style={styles.container}>
        <Text style={{ fontSize: 32, fontWeight: "700" }}>Add Cake</Text>
        <View style={{ flexDirection: "column", gap: 50 }}>
          <View style={{ marginTop: 10, gap: 15 }}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Name of Cake</Text>
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
                value={price}
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
              {image ? (
                <Image source={{ uri: image }} style={styles.uploadedImage} />
              ) : (
                <View style={styles.uploadContent}>
                  <Image
                    source={{ uri: "https://example.com/upload-icon.png" }} // Replace with your upload icon URL
                    style={styles.icon}
                  />
                  <Text style={styles.uploadText}>upload</Text>
                </View>
              )}
            </TouchableOpacity>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Size</Text>
              <TextInput
                style={styles.input}
                value={size}
                onChangeText={(text) => setsize(text)}
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
                Select Status:
              </Text>
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Flavours Available</Text>
              <TextInput
                style={styles.input}
                value={flavour}
                onChangeText={(text) => setFlavour(text)}
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
                Select Status:
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
                      data={statuses}
                      keyExtractor={(item) => item}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          style={{
                            paddingVertical: 10,
                          }}
                          onPress={() => handleStatusSelect(item)}
                        >
                          <Text
                            style={{
                              fontSize: 18,
                              textTransform: "lowercase",
                            }}
                          >
                            {item}
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
              backgroundColor: "#DD293E",
              padding: 10,
              borderRadius: 20,
            }}
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
    </AppScreenTwo>
  );
};

export default UploadProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 80,
  },
  formGroup: {
    flexDirection: "column",
    gap: 5,
  },
  input: {
    borderWidth: 0.5,
    borderColor: "#4C060E",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "400",
  },
  button: {
    // marginTop:0,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#DD293E",
    borderRadius: 42,
  },

  uploadContainer: {
    height: 100,
    width: "100%",
    borderWidth: 1,
    borderColor: "#FF0000", // Red dashed border
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
    color: "#FF0000", // Red color for text
    fontSize: 16,
  },
  uploadedImage: {
    height: "100%",
    width: "100%",
    borderRadius: 5,
  },
});
