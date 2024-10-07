import { View, Text, StyleSheet } from "react-native";
import React from "react";
import WebView from "react-native-webview";
import { useRoute } from "@react-navigation/native";

const Payment = () => {
  const { authorizationUrl } = useRoute()?.params?.item;

  return (
    <View style={styles.container}>
      <WebView
        style={styles.webview}
        source={{ uri: authorizationUrl }} //"https://www.exness.com/?utm_source=partners&ex_ol=1" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure the parent View takes up the full screen space
  },
  headerText: {
    padding: 16,
    fontSize: 18,
    textAlign: "center",
  },
  webview: {
    flex: 1, // Ensure the WebView takes up the remaining space
  },
});

export default Payment;
