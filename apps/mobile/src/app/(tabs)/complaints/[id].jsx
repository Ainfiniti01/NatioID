import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { useTheme } from "@/context/ThemeContext";

export default function ComplaintDetailScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();
  const [isClosing, setIsClosing] = useState(false);
  const { colors, isDark } = useTheme();

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) return null;

  // Mock complaint data
  const complaintDetails = {
    C001: {
      id: "C001",
      title: "ID Scanner Not Working",
      status: "pending",
      date: "2024-01-15",
      category: "Technical",
      description:
        "The ID scanner in the app fails to recognize my document. I have tried multiple times with different lighting conditions but the scanner consistently fails to detect my ID card.",
      timeline: [
        { date: "2024-01-15", event: "Complaint submitted", status: "submitted" },
        { date: "2024-01-16", event: "Under review", status: "in_progress" },
        { date: "", event: "Response provided", status: "pending" },
        { date: "", event: "Case closed", status: "pending" },
      ],
      response: null,
    },
    C002: {
      id: "C002",
      title: "Application Processing Delay",
      status: "resolved",
      date: "2024-01-10",
      category: "Process",
      description:
        "My benefit application has been pending for over 2 weeks without any updates or communication.",
      timeline: [
        { date: "2024-01-10", event: "Complaint submitted", status: "submitted" },
        { date: "2024-01-11", event: "Under review", status: "completed" },
        { date: "2024-01-13", event: "Response provided", status: "completed" },
        { date: "2024-01-13", event: "Case closed", status: "completed" },
      ],
      response:
        "Thank you for your patience. We have expedited your application review. Your benefit application has been approved and you should receive confirmation within 24 hours.",
    },
  };

  const complaint = complaintDetails[id] || complaintDetails.C001;

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return { bg: colors.pendingBg, text: colors.pendingText };
      case "resolved":
        return { bg: colors.successBg, text: colors.successText };
      case "in_progress":
        return { bg: colors.warningBg, text: colors.warningText };
      default:
        return { bg: colors.surfaceSecondary, text: colors.textSecondary };
    }
  };

  const getTimelineItemStatus = (status) => {
    switch (status) {
      case "completed":
        return { color: colors.successText, icon: "checkmark-circle" };
      case "in_progress":
        return { color: colors.warningText, icon: "time" };
      case "submitted":
        return { color: colors.pendingText, icon: "document-text" };
      default:
        return { color: colors.textSecondary, icon: "ellipse-outline" };
    }
  };

  const handleCloseComplaint = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      router.back();
    }, 1000);
  };

  const statusColors = getStatusColor(complaint.status);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDark ? "light" : "dark"} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom + 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: colors.surfaceSecondary,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="chevron-back" size={20} color={colors.text} />
          </TouchableOpacity>

          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 18,
              color: colors.text,
            }}
          >
            Complaint Details
          </Text>

          <View style={{ width: 40 }} />
        </View>

        {/* Complaint Info */}
        <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
          <View
            style={{
              backgroundColor: colors.cardBackground,
              borderRadius: 16,
              padding: 20,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <Text
                style={{
                  fontFamily: "Inter_700Bold",
                  fontSize: 20,
                  color: colors.text,
                  flex: 1,
                  marginRight: 12,
                }}
              >
                {complaint.title}
              </Text>

              <View
                style={{
                  backgroundColor: statusColors.bg,
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 8,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Inter_600SemiBold",
                    fontSize: 12,
                    color: statusColors.text,
                    textTransform: "uppercase",
                  }}
                >
                  {complaint.status.replace("_", " ")}
                </Text>
              </View>
            </View>

            <Text
              style={{
                fontFamily: "Inter_500Medium",
                fontSize: 14,
                color: colors.textSecondary,
                marginBottom: 16,
              }}
            >
              {complaint.id} • {complaint.category} • {complaint.date}
            </Text>

            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 16,
                color: colors.text,
                lineHeight: 24,
              }}
            >
              {complaint.description}
            </Text>
          </View>
        </View>

        {/* Timeline */}
        <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 18,
              color: colors.text,
              marginBottom: 16,
            }}
          >
            Timeline
          </Text>

          {complaint.timeline.map((item, index) => {
            const timelineStatus = getTimelineItemStatus(item.status);
            const isLast = index === complaint.timeline.length - 1;

            return (
              <View
                key={index}
                style={{ flexDirection: "row", marginBottom: isLast ? 0 : 16 }}
              >
                <View style={{ alignItems: "center", marginRight: 12 }}>
                  <View
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      backgroundColor: timelineStatus.color,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Ionicons
                      name={timelineStatus.icon}
                      size={16}
                      color="#FFFFFF"
                    />
                  </View>
                  {!isLast && (
                    <View
                      style={{
                        width: 2,
                        height: 32,
                        backgroundColor: colors.border,
                        marginTop: 4,
                      }}
                    />
                  )}
                </View>

                <View style={{ flex: 1, paddingTop: 4 }}>
                  <Text
                    style={{
                      fontFamily: "Inter_500Medium",
                      fontSize: 14,
                      color: colors.text,
                      marginBottom: 2,
                    }}
                  >
                    {item.event}
                  </Text>
                  {item.date && (
                    <Text
                      style={{
                        fontFamily: "Inter_400Regular",
                        fontSize: 12,
                        color: colors.textSecondary,
                      }}
                    >
                      {item.date}
                    </Text>
                  )}
                </View>
              </View>
            );
          })}
        </View>

        {/* Response */}
        {complaint.response && (
          <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 18,
                color: colors.text,
                marginBottom: 16,
              }}
            >
              Response
            </Text>

            <View
              style={{
                backgroundColor: colors.successBg,
                borderRadius: 12,
                padding: 16,
                borderWidth: 1,
                borderColor: colors.border,
              }}
            >
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: colors.text,
                  lineHeight: 20,
                }}
              >
                {complaint.response}
              </Text>
            </View>
          </View>
        )}

        {/* Actions */}
        {complaint.status !== "resolved" && (
          <View style={{ paddingHorizontal: 20 }}>
            <TouchableOpacity
              onPress={handleCloseComplaint}
              disabled={isClosing}
              style={{
                backgroundColor: colors.dangerButton,
                borderRadius: 12,
                padding: 16,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                opacity: isClosing ? 0.6 : 1,
              }}
            >
              {isClosing ? (
                <Text
                  style={{
                    fontFamily: "Inter_600SemiBold",
                    fontSize: 16,
                    color: colors.dangerButtonText,
                  }}
                >
                  Closing...
                </Text>
              ) : (
                <>
                  <Ionicons
                    name="close-circle"
                    size={20}
                    color={colors.dangerButtonText}
                    style={{ marginRight: 8 }}
                  />
                  <Text
                    style={{
                      fontFamily: "Inter_600SemiBold",
                      fontSize: 16,
                      color: colors.dangerButtonText,
                    }}
                  >
                    Close Complaint
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
