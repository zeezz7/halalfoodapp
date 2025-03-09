// src/screens/home/HomeScreen.js
import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from "react-native-reanimated";

const HomeScreen = () => {
  // Animation values
  const headerOpacity = useSharedValue(0);
  const searchOpacity = useSharedValue(0);
  const categoriesOpacity = useSharedValue(0);
  const restaurantsOpacity = useSharedValue(0);

  useEffect(() => {
    // Staggered animation for content
    headerOpacity.value = withTiming(1, { duration: 500 });
    searchOpacity.value = withDelay(100, withTiming(1, { duration: 500 }));
    categoriesOpacity.value = withDelay(200, withTiming(1, { duration: 500 }));
    restaurantsOpacity.value = withDelay(300, withTiming(1, { duration: 500 }));
  }, []);

  // Animated styles
  const headerStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
  }));

  const searchStyle = useAnimatedStyle(() => ({
    opacity: searchOpacity.value,
  }));

  const categoriesStyle = useAnimatedStyle(() => ({
    opacity: categoriesOpacity.value,
  }));

  const restaurantsStyle = useAnimatedStyle(() => ({
    opacity: restaurantsOpacity.value,
  }));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View style={[styles.header, headerStyle]}>
          <View>
            <Text style={styles.greeting}>Hello, Guest!</Text>
            <Text style={styles.subtitle}>Find your halal food</Text>
          </View>

          <TouchableOpacity style={styles.profileButton}>
            <Ionicons name="person-circle" size={40} color="#1C372C" />
          </TouchableOpacity>
        </Animated.View>

        {/* Search Bar */}
        <Animated.View style={[styles.searchContainer, searchStyle]}>
          <Ionicons name="search" size={20} color="#666" />
          <Text style={styles.searchPlaceholder}>
            Search for restaurants or dishes
          </Text>
        </Animated.View>

        {/* Categories */}
        <Animated.View style={[styles.sectionContainer, categoriesStyle]}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesContainer}
          >
            {["Fast Food", "Indian", "Arabic", "Asian", "Desserts"].map(
              (category, index) => (
                <TouchableOpacity key={index} style={styles.categoryItem}>
                  <View style={styles.categoryIcon}>
                    <Ionicons
                      name={
                        [
                          "fast-food",
                          "restaurant",
                          "cafe",
                          "nutrition",
                          "ice-cream",
                        ][index]
                      }
                      size={24}
                      color="#1C372C"
                    />
                  </View>
                  <Text style={styles.categoryText}>{category}</Text>
                </TouchableOpacity>
              )
            )}
          </ScrollView>
        </Animated.View>

        {/* Restaurants */}
        <Animated.View style={[styles.sectionContainer, restaurantsStyle]}>
          <Text style={styles.sectionTitle}>Nearby Restaurants</Text>

          {[1, 2, 3].map((item) => (
            <View key={item} style={styles.restaurantCard}>
              <View style={styles.cardImageContainer}>
                <View style={styles.cardImage} />
                <View style={styles.cardBadge}>
                  <Text style={styles.cardBadgeText}>Halal Certified</Text>
                </View>
              </View>

              <View style={styles.cardContent}>
                <Text style={styles.restaurantName}>
                  Halal Restaurant {item}
                </Text>
                <Text style={styles.restaurantInfo}>
                  <Ionicons name="star" size={14} color="#FFD700" /> 4.{item} •
                  20-30 min
                </Text>
              </View>
            </View>
          ))}
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F3E8",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1C372C",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  profileButton: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 20,
    paddingHorizontal: 16,
    height: 48,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchPlaceholder: {
    marginLeft: 12,
    color: "#999",
    fontSize: 16,
  },
  sectionContainer: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1C372C",
    marginBottom: 16,
  },
  categoriesContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  categoryItem: {
    alignItems: "center",
    marginRight: 20,
  },
  categoryIcon: {
    width: 64,
    height: 64,
    backgroundColor: "white",
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 14,
    color: "#333",
  },
  restaurantCard: {
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    overflow: "hidden",
  },
  cardImageContainer: {
    position: "relative",
  },
  cardImage: {
    height: 150,
    backgroundColor: "#1C372C",
  },
  cardBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "#1C372C",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  cardBadgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  cardContent: {
    padding: 16,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1C372C",
    marginBottom: 4,
  },
  restaurantInfo: {
    fontSize: 14,
    color: "#666",
  },
});

export default HomeScreen;
