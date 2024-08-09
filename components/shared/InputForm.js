import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Checkbox from "expo-checkbox";
import { MaterialIcons } from "@expo/vector-icons";

export const Forminput = ({
  placeholder,
  onChangeText,
  value,
  keyboardtype,
}) => {
  return (
    <View style={{}}>
      <TextInput
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        keyboardType={keyboardtype ? keyboardtype : "default"}
        style={{
          padding: 10,
          borderRadius: 5,
          fontSize: 16,
          borderWidth: 1,
          //   backgroundColor: "rgba(255, 255, 255, 0.5)", // 50% transparency
        }}
      />
    </View>
  );
};

export const Forminput_Icon = ({
  placeholder,
  onChangeText,
  value,
  icon,
  containerstyle,
  textstyle,
}) => {
  return (
    <View style={[containerstyle]}>
      {icon && <View>{icon}</View>}
      <TextInput
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        style={[textstyle]}
      />
    </View>
  );
};

export const CustomTextArea = ({
  style,
  inputStyle,
  placeholder,
  value,
  onChangeText,
}) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View>
        <TextInput
          multiline
          numberOfLines={4}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          style={inputStyle}
          onSubmitEditing={Keyboard.dismiss}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export const Forminputpassword = ({ placeholder, onChangeText, value }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F6F8FAE5",
        paddingHorizontal: 10,
      }}
    >
      <TextInput
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={!isPasswordVisible}
        style={{
          flex: 1,
          padding: 10,
        }}
      />
      <TouchableOpacity onPress={togglePasswordVisibility}>
        <MaterialIcons
          name={isPasswordVisible ? "visibility" : "visibility-off"}
          size={24}
          color="#888"
        />
      </TouchableOpacity>
    </View>
  );
};

export const FormLabel = ({ data }) => {
  return (
    <Text
      style={{
        color: "rgba(38, 50, 56, 0.71)",
        fontWeight: "400",
        fontSize: 13,
        fontFamily: "RobotoSlab-Medium",
        marginBottom: 5,
      }}
    >
      {data}
    </Text>
  );
};

export const Formbutton = ({
  buttonStyle,
  textStyle,
  data,
  icon,
  isLoading,
  isLoading_color,
  onPress,
}) => {
  return (
    <TouchableOpacity style={[buttonStyle]} onPress={onPress}>
      {isLoading ? (
        <ActivityIndicator size="small" color={isLoading_color || "white"} />
      ) : (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          {icon && <View>{icon}</View>}
          <Text style={[textStyle]}>{data}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export const Otpinput = ({ onOTPChange, containerView, inputStyle }) => {
  const [otp, setOTP] = useState("");
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    const otpValue = otp.split("").filter((char) => !isNaN(Number(char)));
    setOTP(otpValue.join(""));
    onOTPChange(otpValue.join(""));

    if (otp.length === 1) {
      inputRefs[1].current?.focus();
    }
    if (otp.length === 2) {
      inputRefs[2].current?.focus();
    }
    if (otp.length === 3) {
      inputRefs[3].current?.focus();
    }
  }, [otp, onOTPChange]);

  const handleInputChange = (text, index) => {
    const newOTP = otp.split("");
    newOTP[index] = text;
    setOTP(newOTP.join(""));
  };

  return (
    <View style={[containerView]}>
      {inputRefs.map((inputRef, index) => (
        <TextInput
          key={index}
          ref={inputRef}
          style={[inputStyle]}
          value={otp[index]}
          onChangeText={(text) => handleInputChange(text, index)}
          keyboardType="numeric"
          maxLength={1}
        />
      ))}
    </View>
  );
};

export const CustomCheckbox = ({
  value,
  onValueChange,
  label,
  inputStyle,
  containerView,
  TextStyle,
}) => {
  return (
    <View style={[containerView]}>
      <Checkbox
        style={[inputStyle]}
        value={value}
        onValueChange={onValueChange}
      />
      <Text style={[TextStyle]}>{label}</Text>
    </View>
  );
};

export const RadioButton = ({ label, selected, onSelect, inputStyle }) => {
  return (
    <TouchableOpacity onPress={onSelect} style={{ marginBottom: 10 }}>
      <View style={styles.radioButton}>
        <View
          style={[
            styles.radioCircle,
            { backgroundColor: selected ? "lightgray" : "white" },
          ]}
        />
        <Text style={inputStyle}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "lightgray",
    marginRight: 10,
  },
});
