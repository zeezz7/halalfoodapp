import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  SafeAreaView,
  StatusBar,
  Image,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
  useAnimatedGestureHandler,
  runOnJS,
} from "react-native-reanimated";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { PanGestureHandler } from "react-native-gesture-handler";

// Import images statically
import location1 from "../../../assets/location1.png";
import location2 from "../../../assets/delivery1.png";
import location3 from "../../../assets/halal1.png";

const OnboardingScreen = ({ navigation }) => {
  const [activeScreen, setActiveScreen] = useState(0);
  const { width } = useWindowDimensions();

  // Animation values
  const imageOpacity = useSharedValue(0);
  const imageScale = useSharedValue(0.9);
  const contentOpacity = useSharedValue(0);
  const contentTranslateY = useSharedValue(20);

  const onboardingData = [
    {
      id: 1,
      title: "Find Verified Halal Food Easily",
      description:
        "Explore halal-certified restaurants near you, ensuring authenticity and quality in every meal.",
      icon: location1, // Use imported image
      iconColor: "#E73C3C",
    },
    {
      id: 2,
      title: "Fast & Reliable Delivery",
      description:
        "Enjoy seamless ordering and fast delivery, bringing your favorite halal dishes straight to your doorstep.",
      icon: location2, // Use imported image
      iconColor: "#4299E1",
    },
    {
      id: 3,
      title: "Order with Confidence",
      description:
        "All restaurants on our platform are verified for halal compliance, so you can order worry-free.",
      icon: location3, // Use imported image
      iconColor: "#48BB78",
    },
  ];

  useEffect(() => {
    // Reset animations when screen changes
    imageOpacity.value = 0;
    imageScale.value = 0.9;
    contentOpacity.value = 0;
    contentTranslateY.value = 20;

    // Play animations
    imageOpacity.value = withTiming(1, { duration: 600 });
    imageScale.value = withTiming(1, {
      duration: 600,
      easing: Easing.out(Easing.back()),
    });
    contentOpacity.value = withDelay(300, withTiming(1, { duration: 600 }));
    contentTranslateY.value = withDelay(300, withTiming(0, { duration: 600 }));
  }, [activeScreen]);

  // Navigate to next screen
  const goToNext = () => {
    if (activeScreen < onboardingData.length - 1) {
      setActiveScreen(activeScreen + 1);
    } else {
      navigation.navigate("PhoneVerification");
    }
  };

  // Navigate to previous screen
  const goToPrevious = () => {
    if (activeScreen > 0) {
      setActiveScreen(activeScreen - 1);
    }
  };

  // Navigate to PhoneVerification
  const goToPhoneVerification = () => {
    navigation.navigate("PhoneVerification");
  };

  // Handle swipe gestures without animation effects
  const handleSwipeGesture = (direction) => {
    const isFirstScreen = activeScreen === 0;
    const isLastScreen = activeScreen === onboardingData.length - 1;

    if (direction < 0) {
      // Left swipe
      if (isFirstScreen) {
        // On first screen, left swipe acts like Next button
        goToNext();
      } else if (isLastScreen) {
        // On last screen, left swipe goes to PhoneVerification
        goToPhoneVerification();
      } else {
        // On middle screens, left swipe goes to next onboarding screen
        goToNext();
      }
    } else if (direction > 0) {
      // Right swipe
      if (isFirstScreen) {
        // No effect on first screen for right swipe
        return;
      } else if (isLastScreen) {
        // On last screen, right swipe goes to previous onboarding screen
        goToPrevious();
      } else {
        // On middle screens, right swipe goes to previous onboarding screen
        goToPrevious();
      }
    }
  };

  // Gesture handler for swipe
  const gestureHandler = useAnimatedGestureHandler({
    onStart: () => {},
    onActive: () => {},
    onEnd: (event) => {
      // Determine swipe direction based on velocity or distance
      const direction = event.velocityX > 0 ? 1 : -1;
      const shouldTriggerSwipe =
        Math.abs(event.velocityX) > 300 ||
        Math.abs(event.translationX) > width * 0.2;

      if (shouldTriggerSwipe) {
        runOnJS(handleSwipeGesture)(direction);
      }
    },
  });

  // Animated styles
  const imageContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: imageOpacity.value,
      transform: [{ scale: imageScale.value }],
    };
  });

  const contentContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: contentOpacity.value,
      transform: [{ translateY: contentTranslateY.value }],
    };
  });

  const handleSkip = () => {
    navigation.navigate("Home");
  };

  const renderDots = () => {
    return (
      <View style={styles.dotsContainer}>
        {onboardingData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeScreen === index ? styles.activeDot : null,
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={styles.swipeContainer}>
          {/* Top Section with Icon */}
          <View style={styles.topSection}>
            <Animated.View style={[styles.iconContainer, imageContainerStyle]}>
              <Image
                source={onboardingData[activeScreen].icon}
                style={styles.iconImage}
                resizeMode="contain"
              />
            </Animated.View>
          </View>

          {/* Bottom Section with Content */}
          <View style={styles.bottomSection}>
            <Animated.View
              style={[styles.contentContainer, contentContainerStyle]}
            >
              <Text style={styles.title}>
                {onboardingData[activeScreen].title}
              </Text>
              <Text style={styles.description}>
                {onboardingData[activeScreen].description}
              </Text>
            </Animated.View>

            {/* Navigation Controls */}
            <View style={styles.controlsContainer}>
              <TouchableOpacity onPress={handleSkip}>
                <Text style={styles.skipText}>Skip</Text>
              </TouchableOpacity>

              {renderDots()}

              <TouchableOpacity onPress={goToNext}>
                <Text style={styles.nextText}>
                  {activeScreen === onboardingData.length - 1
                    ? "Get Started"
                    : "Next"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C372C",
  },
  swipeContainer: {
    flex: 1,
  },
  topSection: {
    height: "45%",
    backgroundColor: "#F8F3E8",
    borderBottomLeftRadius: 180,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  iconImage: {
    width: 170, // Adjust the width of the image
    height: 170, // Adjust the height of the image
  },
  bottomSection: {
    height: "55%",
    paddingHorizontal: 30,
    paddingVertical: 40,
    justifyContent: "space-between",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: "#E0E0E0",
    lineHeight: 24,
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  skipText: {
    color: "#A8C4B8",
    fontSize: 16,
  },
  nextText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  dotsContainer: {
    flexDirection: "row",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    marginHorizontal: 4,
  },
  activeDot: {
    width: 24,
    height: 8,
    backgroundColor: "white",
  },
});

export default OnboardingScreen;
