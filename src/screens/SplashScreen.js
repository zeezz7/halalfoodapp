import React, { useEffect } from "react";
import { View, StyleSheet, StatusBar, useWindowDimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from "react-native-reanimated";

const SplashScreen = ({ navigation }) => {
  // Animation values
  const opacity = useSharedValue(1); // Ensure visibility at the start
  const scale = useSharedValue(1); // Default scale
  const progressWidth = useSharedValue(0);

  // Get screen dimensions
  const { width } = useWindowDimensions();

  // Letters for animation
  const halalLetters = "HALAL".split("");
  const goesLetters = "GOES".split("");

  // Create shared values for each letter
  const halalOpacity = halalLetters.map(() => useSharedValue(0));
  const halalY = halalLetters.map(() => useSharedValue(20));

  const goesOpacity = goesLetters.map(() => useSharedValue(0));
  const goesY = goesLetters.map(() => useSharedValue(20));

  useEffect(() => {
    // Animate each letter of "HALAL"
    halalLetters.forEach((_, index) => {
      halalOpacity[index].value = withDelay(
        100 + index * 80,
        withTiming(1, { duration: 300 })
      );

      halalY[index].value = withDelay(
        100 + index * 80,
        withTiming(0, { duration: 400, easing: Easing.out(Easing.back()) })
      );
    });

    // Animate each letter of "GOES" after HALAL
    goesLetters.forEach((_, index) => {
      goesOpacity[index].value = withDelay(
        600 + index * 80,
        withTiming(1, { duration: 300 })
      );

      goesY[index].value = withDelay(
        600 + index * 80,
        withTiming(0, { duration: 400, easing: Easing.out(Easing.back()) })
      );
    });

    // Progress bar animation
    progressWidth.value = withDelay(
      1000,
      withTiming(width * 0.4, {
        duration: 800,
        easing: Easing.inOut(Easing.quad),
      })
    );

    // Navigate to onboarding screen after animation
    const timer = setTimeout(() => {
      // Fade out animation
      opacity.value = withTiming(0, { duration: 300 });
      scale.value = withTiming(1.1, { duration: 300 });

      // Navigate after fade out
      setTimeout(() => {
        navigation.replace("Onboarding");
      }, 300);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Create container animation style
  const containerStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  // Create progress bar animation style
  const progressStyle = useAnimatedStyle(() => {
    return {
      width: progressWidth.value,
    };
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1C372C" />

      <Animated.View style={[styles.content, containerStyle]}>
        <View style={styles.textContainer}>
          {/* HALAL and GOES text in one line */}
          {halalLetters.map((letter, index) => {
            const letterStyle = useAnimatedStyle(() => {
              return {
                opacity: halalOpacity[index].value,
                transform: [{ translateY: halalY[index].value }],
              };
            });

            return (
              <Animated.Text
                key={`halal-${index}`}
                style={[styles.halalText, letterStyle]}
              >
                {letter}
              </Animated.Text>
            );
          })}

          {goesLetters.map((letter, index) => {
            const letterStyle = useAnimatedStyle(() => {
              return {
                opacity: goesOpacity[index].value,
                transform: [{ translateY: goesY[index].value }],
              };
            });

            return (
              <Animated.Text
                key={`goes-${index}`}
                style={[styles.goesText, letterStyle]}
              >
                {letter}
              </Animated.Text>
            );
          })}
        </View>
      </Animated.View>

      {/* Progress bar */}
      {/* <View style={styles.progressContainer}>
        <Animated.View style={[styles.progressBar, progressStyle]} />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B3B31",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  wordContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  halalText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#A8C4B8",
  },
  goesText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  progressContainer: {
    height: 4,
    width: "60%",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 2,
    marginBottom: 80,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 2,
  },
});

export default SplashScreen;
