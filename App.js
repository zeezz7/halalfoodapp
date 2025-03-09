// App.js - Main entry point
import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation";
import { LogBox } from "react-native";

// Ignore specific warnings
LogBox.ignoreLogs(["Reanimated 2"]);

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
