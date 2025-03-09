// src/screens/auth/PhoneVerificationScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

const PhoneVerificationScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Animation values
  const contentOpacity = useSharedValue(0);
  const contentTranslateY = useSharedValue(20);

  useEffect(() => {
    // Play entrance animation
    contentOpacity.value = withTiming(1, { duration: 600 });
    contentTranslateY.value = withTiming(0, {
      duration: 600,
      easing: Easing.out(Easing.ease),
    });
  }, []);

  // Animated styles
  const contentStyle = useAnimatedStyle(() => {
    return {
      opacity: contentOpacity.value,
      transform: [{ translateY: contentTranslateY.value }],
    };
  });

  const handleSendOTP = () => {
    if (!phoneNumber.trim()) {
      // Would show validation error in a real app
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate("Home");
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={24} color="#1C372C" />
      </TouchableOpacity>

      <Animated.View style={[styles.content, contentStyle]}>
        <Text style={styles.title}>Enter Your Mobile Number</Text>
        <Text style={styles.subtitle}>
          Secure your account with OTP verification and access halal food in
          just a few taps.
        </Text>

        <View style={styles.inputContainer}>
          <View style={styles.countryCode}>
            <Text style={styles.flag}>🇨🇦</Text>
            <Text style={styles.codeText}>+1</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="(000) 000 00 00"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleSendOTP}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Send OTP</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.termsText}>
          By continuing you accept our{" "}
          <Text style={styles.link}>Terms of Service</Text> and{" "}
          <Text style={styles.link}>Privacy Policy</Text>
        </Text>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F3E8",
    padding: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1C372C",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 40,
  },
  countryCode: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    borderRightWidth: 1,
    borderRightColor: "#DDD",
    backgroundColor: "#FFF",
  },
  flag: {
    fontSize: 18,
    marginRight: 8,
  },
  codeText: {
    fontSize: 16,
    color: "#333",
  },
  input: {
    flex: 1,
    height: 56,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#FFF",
  },
  button: {
    height: 56,
    backgroundColor: "#7C8A84",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  termsText: {
    marginTop: 24,
    textAlign: "center",
    fontSize: 14,
    color: "#666",
  },
  link: {
    color: "#1C372C",
    fontWeight: "500",
  },
});

export default PhoneVerificationScreen;
