import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import AppScreenTwo from "../../../components/shared/AppScreenTwo";

const UploadProduct = () => {
    const [cakeName, setCakeName] = useState("")
    const [price, setPrice] = useState("")
    const [descritption, setDescritption] = useState("")
    const [pictures, setPictures] = useState("")
    const [size, setsize] = useState("")
    const [flavour, setFlavour] = useState("")
  return (
    <AppScreenTwo arrrow={"true"}>
      <View style={styles.container}>
        <Text style={{ fontSize: 32, fontWeight: "700" }}>Add More Cakes</Text>
        <View style={{ flexDirection: "column", gap: 70 }}>
          <View style={{ marginTop: 10, gap: 15 }}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Name of Cake</Text>
              <TextInput
                style={styles.input}
                value={cakeName}
                onChangeText={(text)=> setCakeName(text)}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Price</Text>
              <TextInput
                style={styles.input}
                value={price}
                onChangeText={(text)=> setPrice(text)}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, { height: 80 }]}
                value={descritption}
                onChangeText={(text)=> setDescritption(text)}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Upload Pictures</Text>
              <TextInput
                style={[styles.input, { height: 70 }]}
                value={pictures}
                onChangeText={(text)=> setPictures(text)}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Size</Text>
              <TextInput
                style={styles.input}
                value={size}
                onChangeText={(text)=> setsize(text)}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Flavours Available</Text>
              <TextInput
                style={styles.input}
                value={flavour}
                onChangeText={(text)=> setFlavour(text)}
              />
            </View>
          </View>
          <View>
            <Pressable style={styles.button}>
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontSize: 16,
                  fontWeight: "400",
                }}
              >
                Preview
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </AppScreenTwo>
  );
};

export default UploadProduct;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    top: 100,
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
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#DD293E",
    borderRadius: 42,
  },
});
