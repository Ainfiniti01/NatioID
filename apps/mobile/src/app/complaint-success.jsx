import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { useTheme } from "@/context/ThemeContext";

const ComplaintSuccessScreen = () => {
  const router = useRouter();
  const { status = "success" } = useLocalSearchParams();
  const { colors } = useTheme();

  const statusConfig = {
    success: {
      icon: "✅",
      title: "Complaint Submitted!",
      message: "Your complaint has been successfully submitted. We will review it shortly.",
      color: colors.success || "#00C853",
    },
    pending: {
      icon: "⏳",
      title: "Complaint Pending",
      message: "Your complaint is being processed. Please wait for confirmation.",
      color: colors.warning || "#FFA500",
    },
    failed: {
      icon: "❌",
      title: "Complaint Failed",
      message: "Something went wrong while submitting your complaint. Please try again.",
      color: colors.error || "#FF3B30",
    },
  };

  const current = statusConfig[status] || statusConfig.success;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.content}>
        {/* Status Badge */}
        <View style={[styles.badge, { backgroundColor: current.color }]}>
          <Text style={styles.badgeText}>{status.toUpperCase()}</Text>
        </View>

        {/* Icon */}
        <Text style={[styles.icon, { color: current.color }]}>{current.icon}</Text>

        {/* Title & Message */}
        <Text style={[styles.title, { color: colors.text }]}>{current.title}</Text>
        <Text style={[styles.message, { color: colors.textSecondary }]}>{current.message}</Text>

        {/* Actions */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: current.color }]}
          onPress={() => router.push("/complaints")}
        >
          <Text style={styles.buttonText}>View All Complaints</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.buttonSecondary, { borderColor: current.color }]}
          onPress={() => router.push("/dashboard")}
        >
          <Text style={[styles.buttonSecondaryText, { color: current.color }]}>
            Go to Dashboard
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    padding: 20,
    width: "90%",
  },
  badge: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginBottom: 15,
  },
  badgeText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  icon: {
    fontSize: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 22,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 15,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonSecondary: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    borderWidth: 1,
    width: "100%",
    alignItems: "center",
  },
  buttonSecondaryText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ComplaintSuccessScreen;
