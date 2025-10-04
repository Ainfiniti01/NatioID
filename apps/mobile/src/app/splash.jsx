import React, { useEffect, useRef, useState } from "react";
import { View, Text, Animated } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import {
  useFonts,
  Inter_400Regular,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { useTheme } from "../context/ThemeContext";

export default function SplashScreen() {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  // Animation refs for the loading dots
  const dot1Opacity = useRef(new Animated.Value(0.3)).current;
  const dot2Opacity = useRef(new Animated.Value(0.3)).current;
  const dot3Opacity = useRef(new Animated.Value(0.3)).current;

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  useEffect(() => {
    // Start loading animation
    const createPulseAnimation = (animatedValue, delay) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 0.3,
            duration: 600,
            useNativeDriver: true,
          }),
        ]),
        { iterations: -1 },
      );
    };

    const animation1 = createPulseAnimation(dot1Opacity, 0);
    const animation2 = createPulseAnimation(dot2Opacity, 200);
    const animation3 = createPulseAnimation(dot3Opacity, 400);

    // Start animations with delays
    animation1.start();
    setTimeout(() => animation2.start(), 200);
    setTimeout(() => animation3.start(), 400);

    const checkFirstLaunch = async () => {
      try {
        const hasLaunched = await AsyncStorage.getItem("hasLaunchedBefore");
        if (hasLaunched === null) {
          router.replace("/onboarding");
          await AsyncStorage.setItem("hasLaunchedBefore", "true");
        } else {
          router.replace("/login");
        }
      } catch (error) {
        console.error("Failed to fetch launch status:", error);
        // Fallback to onboarding in case of error
        router.replace("/onboarding");
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(checkFirstLaunch, 3000);

    return () => {
      clearTimeout(timer);
      animation1.stop();
      animation2.stop();
      animation3.stop();
    };
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <StatusBar style="light" />

      {/* Background Pattern */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
        }}
      >
        <View
          style={{
            position: "absolute",
            top: 100,
            right: -50,
            width: 200,
            height: 200,
            borderRadius: 100,
            backgroundColor: colors.secondary,
          }}
        />
        <View
          style={{
            position: "absolute",
            bottom: 150,
            left: -80,
            width: 160,
            height: 160,
            borderRadius: 80,
            backgroundColor: colors.secondary,
          }}
        />
      </View>

      {/* Logo Section */}
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            backgroundColor: colors.primaryText,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 24,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 8,
          }}
        >
          <Text
            style={{
              fontFamily: "Inter_700Bold",
              fontSize: 36,
              color: colors.primary,
              letterSpacing: -1,
            }}
          >
            NID
          </Text>
        </View>

        <Text
          style={{
            fontFamily: "Inter_700Bold",
            fontSize: 32,
            color: colors.primaryText,
            textAlign: "center",
            marginBottom: 8,
          }}
        >
          NatioID
        </Text>

        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 16,
            color: colors.primaryText,
            textAlign: "center",
            opacity: 0.9,
          }}
        >
          Your Identity, Secured
        </Text>
      </View>

      {/* Loading Indicator */}
      <View
        style={{
          position: "absolute",
          bottom: 80,
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Animated.View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: colors.secondary,
              marginHorizontal: 4,
              opacity: dot1Opacity,
            }}
          />
          <Animated.View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: colors.secondary,
              marginHorizontal: 4,
              opacity: dot2Opacity,
            }}
          />
          <Animated.View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: colors.secondary,
              marginHorizontal: 4,
              opacity: dot3Opacity,
            }}
          />
        </View>

        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 14,
            color: colors.primaryText,
            marginTop: 16,
            opacity: 0.8,
          }}
        >
          Loading...
        </Text>
      </View>
    </View>
  );
}
