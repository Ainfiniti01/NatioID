import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { useTheme } from "@/context/ThemeContext";

const ReportSuccessScreen = () => {
  const router = useRouter();
  const {
    status = "success",
    reportType,
    selectedDocumentType,
    lastSeenLocation,
    dateTime,
    description,
    emergencyContact,
    referenceId,
  } = useLocalSearchParams();

  const { colors } = useTheme();

  const statusConfig = {
    success: {
      icon: "✅",
      title: "Report Submitted!",
      message: "Your report has been received and is under review.",
      color: colors.success || "#00C853",
    },
    pending: {
      icon: "⏳",
      title: "Report Pending",
      message: "Your report is still being processed. Please check back later.",
      color: colors.warning || "#FFA500",
    },
    failed: {
      icon: "❌",
      title: "Report Failed",
      message: "Something went wrong. Please try submitting again.",
      color: colors.error || "#FF3B30",
    },
  };

  const current = statusConfig[status] || statusConfig.success;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          {/* Badge */}
          <View style={[styles.badge, { backgroundColor: current.color }]}>
            <Text style={styles.badgeText}>{status.toUpperCase()}</Text>
          </View>

          {/* Icon */}
          <Text style={[styles.icon, { color: current.color }]}>{current.icon}</Text>

          {/* Title & Message */}
          <Text style={[styles.title, { color: colors.text }]}>{current.title}</Text>
          <Text style={[styles.message, { color: colors.textSecondary }]}>{current.message}</Text>

          {/* Reference ID */}
          {referenceId && (
            <View style={[styles.referenceCard, { borderColor: current.color }]}>
              <Text style={[styles.referenceLabel, { color: colors.textSecondary }]}>
                Reference ID
              </Text>
              <Text style={[styles.referenceValue, { color: current.color }]}>
                {referenceId}
              </Text>
            </View>
          )}

          {/* Review Card */}
          <View style={[styles.reviewCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            {reportType && (
              <View style={styles.reviewItem}>
                <Text style={[styles.reviewLabel, { color: colors.text }]}>Report Type:</Text>
                <Text style={[styles.reviewValue, { color: colors.textSecondary }]}>{reportType}</Text>
              </View>
            )}
            {selectedDocumentType && (
              <View style={styles.reviewItem}>
                <Text style={[styles.reviewLabel, { color: colors.text }]}>Document:</Text>
                <Text style={[styles.reviewValue, { color: colors.textSecondary }]}>
                  {selectedDocumentType}
                </Text>
              </View>
            )}
            {lastSeenLocation && (
              <View style={styles.reviewItem}>
                <Text style={[styles.reviewLabel, { color: colors.text }]}>Last Seen:</Text>
                <Text style={[styles.reviewValue, { color: colors.textSecondary }]}>
                  {lastSeenLocation}
                </Text>
              </View>
            )}
            {dateTime && (
              <View style={styles.reviewItem}>
                <Text style={[styles.reviewLabel, { color: colors.text }]}>Date & Time:</Text>
                <Text style={[styles.reviewValue, { color: colors.textSecondary }]}>{dateTime}</Text>
              </View>
            )}
            {description && (
              <View style={styles.reviewItem}>
                <Text style={[styles.reviewLabel, { color: colors.text }]}>Description:</Text>
                <Text style={[styles.reviewValue, { color: colors.textSecondary }]}>{description}</Text>
              </View>
            )}
            {emergencyContact && (
              <View style={styles.reviewItem}>
                <Text style={[styles.reviewLabel, { color: colors.text }]}>Emergency Contact:</Text>
                <Text style={[styles.reviewValue, { color: colors.textSecondary }]}>{emergencyContact}</Text>
              </View>
            )}
          </View>

          {/* Buttons */}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: current.color }]}
            onPress={() => router.push("/reports")}
          >
            <Text style={styles.buttonText}>View All Reports</Text>
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { flexGrow: 1, justifyContent: "center", alignItems: "center", paddingVertical: 20 },
  content: { alignItems: "center", padding: 20, width: "90%" },
  badge: { paddingVertical: 6, paddingHorizontal: 14, borderRadius: 20, marginBottom: 15 },
  badgeText: { color: "#fff", fontWeight: "600", fontSize: 14 },
  icon: { fontSize: 80, marginBottom: 20 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  message: { fontSize: 16, textAlign: "center", marginBottom: 20, lineHeight: 22 },
  referenceCard: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    alignItems: "center",
    width: "100%",
  },
  referenceLabel: { fontSize: 14, marginBottom: 5 },
  referenceValue: { fontSize: 20, fontWeight: "bold" },
  reviewCard: { borderWidth: 1, borderRadius: 10, padding: 15, marginBottom: 20, width: "100%" },
  reviewItem: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  reviewLabel: { fontSize: 16, fontWeight: "bold" },
  reviewValue: { fontSize: 16, flexShrink: 1, textAlign: "right" },
  button: { paddingVertical: 15, borderRadius: 10, marginBottom: 15, width: "100%", alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  buttonSecondary: { paddingVertical: 15, borderRadius: 10, borderWidth: 1, width: "100%", alignItems: "center" },
  buttonSecondaryText: { fontSize: 18, fontWeight: "bold" },
});

export default ReportSuccessScreen;
