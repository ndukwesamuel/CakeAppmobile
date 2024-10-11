import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Button,
  Pressable,
  Image,
} from "react-native";
import React from "react";
const tick = require('../../assets/icons/tick-circle.png')

export default function ReuseModals({ visible, onclose, children }) {
  return (
    <Modal transparent visible={visible} animationType="slide">
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        onPress={onclose}
      >
        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            width: "100%",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            height: "80%",
          }}
        >
          {children}
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

export function CenterReuseModals({
  children,
  visible,
  onClose,
  title,
  subText,
}) {
  return (
    <Modal transparent visible={visible} animationType="slide">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {children}
            <Image source={tick}/>  
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtext}>{subText}</Text>
            <Pressable style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Okay</Text>
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

export function BottomModal({ visible, onClose, handleLogout, children }) {
  return (
    <Modal transparent={true} animationType="slide" visible={visible}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={{}}>
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              width: "100%",
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              gap: 20,
              // height: "50%",
            }}
          >
            {children}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 30,
    width: "100%",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  button: {
    backgroundColor: "#6904EC",
    paddingHorizontal: 70,
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  title:{
    fontSize:24,
    color:"#2B025F",
    fontWeight:"600"
  },
  subtext:{
    color:'#2B025F',
    fontSize:16,
    fontWeight:"400",
    textAlign:'center'
  }
});
