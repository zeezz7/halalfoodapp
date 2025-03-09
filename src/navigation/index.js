// src/navigation/index.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import SplashScreen from "../screens/SplashScreen";
import OnboardingScreen from "../screens/onboarding/OnboardingScreen";
import PhoneVerificationScreen from "../screens/auth/PhoneVerificationScreen";
import HomeScreen from "../screens/home/HomeScreen";
import { View, Text } from "react-native";

const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

// Tab navigator for home screens
// const HomeTabNavigator = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         headerShown: false,
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;

//           if (route.name === "HomeTab") {
//             iconName = focused ? "home" : "home-outline";
//           } else if (route.name === "Search") {
//             iconName = focused ? "search" : "search-outline";
//           } else if (route.name === "Orders") {
//             iconName = focused ? "receipt" : "receipt-outline";
//           } else if (route.name === "Profile") {
//             iconName = focused ? "person" : "person-outline";
//           }

//           return <Ionicons name={iconName} size={size} color={color} />;
//         },
//         tabBarActiveTintColor: "#1C372C",
//         tabBarInactiveTintColor: "gray",
//       })}
//     >
//       <Tab.Screen
//         name="HomeTab"
//         component={HomeScreen}
//         options={{ tabBarLabel: "Home" }}
//       />
//       <Tab.Screen
//         name="Search"
//         component={PlaceholderScreen}
//         options={{ tabBarLabel: "Search" }}
//       />
//       <Tab.Screen
//         name="Orders"
//         component={PlaceholderScreen}
//         options={{ tabBarLabel: "Orders" }}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={PlaceholderScreen}
//         options={{ tabBarLabel: "Profile" }}
//       />
//     </Tab.Navigator>
//   );
// };

// Placeholder screen
const PlaceholderScreen = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Coming Soon!</Text>
  </View>
);

// Main app navigator
const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen
        name="PhoneVerification"
        component={PhoneVerificationScreen}
      />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
