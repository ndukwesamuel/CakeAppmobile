import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AppScreenTwo from "../../../components/shared/AppScreenTwo";
import { useNavigation } from "@react-navigation/native";

export default function ApplicationForm() {
  const navigation = useNavigation()
  const [businessName, setBusinessName] = useState("");
  const [businessOwner, setBusinessOwner] = useState("");
  const [cacNo, setcacNo] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [businessCallLine, setBusinessCallLine] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [nationality, setNationality] = useState("");
  const [descritption, setDescritption] = useState("");

  const applicationFormHandler = () =>{
    const formData = {
      businessName: businessName,
      businessOwner: businessOwner,
      cacNo: cacNo,
      businessEmail: businessEmail,
      businessCallLine: businessCallLine,
      yearsOfExperience: yearsOfExperience,
      nationality: nationality,
      descritption: descritption
    }
    navigation.navigate("applicationPreviewPage", {formData: formData})
    
  }

  return (
    <AppScreenTwo arrrow={"true"}>
      <View style={styles.container}>
        <Text style={styles.title}>Application Form</Text>
        <View style={{ marginTop: 10, gap: 15 }}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Business Name</Text>
            <TextInput
              style={styles.input}
              value={businessName}
              onChangeText={(text) => setBusinessName(text)}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Name of Business Owner </Text>
            <TextInput
              style={styles.input}
              value={businessOwner}
              onChangeText={(text) => setBusinessOwner(text)}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>C.A.C No:</Text>
            <TextInput
              style={styles.input}
              value={cacNo}
              onChangeText={(text) => setcacNo(text)}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Business Email</Text>
            <TextInput
              style={styles.input}
              value={businessEmail}
              onChangeText={(text) => setBusinessEmail(text)}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Business Call Line</Text>
            <TextInput
              style={styles.input}
              value={businessCallLine}
              onChangeText={(text) => setBusinessCallLine(text)}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Years of Experience</Text>
            <TextInput
              style={styles.input}
              value={yearsOfExperience}
              onChangeText={(text) => setYearsOfExperience(text)}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Nationality</Text>
            <TextInput
              style={styles.input}
              value={nationality}
              onChangeText={(text) => setNationality(text)}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Business Description</Text>
            <TextInput
              style={[styles.input, { height: 70 }]}
              value={descritption}
              onChangeText={(text) => setDescritption(text)}
            />
          </View>
          <Pressable style={styles.button} onPress={applicationFormHandler}>
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 16,
                fontWeight: "400",
              }}
            >
              Proceed
            </Text>
          </Pressable>
        </View>
      </View>
    </AppScreenTwo>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#4C0016",
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
