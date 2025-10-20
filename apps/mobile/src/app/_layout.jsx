import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "../context/ThemeContext";
// Removed import of GenericErrorBoundary as we will use a simpler inline component for now.
// import GenericErrorBoundary from "../components/GenericErrorBoundary";

// Simple component to display error information
const SimpleErrorBoundary = ({ error }) => {
  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'red' }}>
          An unexpected error occurred:
        </Text>
        <Text style={{ fontSize: 16, color: 'gray', textAlign: 'center', marginVertical: 10 }}>
          {error.message}
        </Text>
        {/* Optionally display stack trace for debugging */}
        {/* <Text style={{ fontSize: 12, color: 'darkgray', textAlign: 'center' }}>
          {error.stack}
        </Text> */}
      </View>
    </SafeAreaProvider>
  );
};

export default function RootLayout() {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        {/* Use errorElement to provide a custom error boundary for routes */}
        <Stack screenOptions={{ headerShown: false }} errorElement={<SimpleErrorBoundary />} />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
