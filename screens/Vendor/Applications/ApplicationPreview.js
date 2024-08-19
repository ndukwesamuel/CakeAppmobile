import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import AppScreenTwo from "../../../components/shared/AppScreenTwo";

const ApplicationPreview = () => {
  // const route= useRoute()
  // const { formData } = route.params;
  return (
    <AppScreenTwo arrrow={"true"}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Preview Application</Text>
          <View
            style={{
              backgroundColor: "white",
              gap: 20,
              padding: 20,
              marginTop: 50,
            }}
          >
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Text style={styles.key}>Business Name:</Text>
              <Text style={styles.value}>Jashmine Cakes</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.key}>Name of Business Owner:</Text>
              <Text style={styles.value}></Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.key}>C.A.C No</Text>
              <Text style={styles.value}></Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.key}>Business E-mail</Text>
              <Text style={styles.value}></Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.key}>Business Call line:</Text>
              <Text style={styles.value}></Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.key}>Years of Experience</Text>
              <Text style={styles.value}></Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.key}>Nationality</Text>
              <Text style={styles.value}></Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.key}>Business Description</Text>
              <Text style={styles.value}></Text>
            </View>
            {/* button */}
            <Pressable style={styles.button}>
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontSize: 16,
                  fontWeight: "400",
                }}
              >
                Submit
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </AppScreenTwo>
  );
};

export default ApplicationPreview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 90,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#4C0016",
  },
  key: {
    width: "50%",
    fontSize: 16,
    fontWeight: "400",
    color: "#330111",
    // textAlign:"center"
  },
  value: {
    width: "50%",
    fontSize: 16,
    fontWeight: "600",
    color: "#330111",
  },
  button: {
    marginTop:70,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#DD293E",
    borderRadius: 42,
  },
});
