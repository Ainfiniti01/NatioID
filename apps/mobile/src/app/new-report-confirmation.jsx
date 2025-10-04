import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { useTheme } from "@/context/ThemeContext";

const NewReportConfirmationScreen = () => {
  const router = useRouter();
  const { selectedReportType, details } = useLocalSearchParams();
  const { colors } = useTheme();

  const getReportTypeName = (id) => {
    const reportTypes = [
      { id: "1", name: "General Inquiry" },
      { id: "2", name: "Technical Issue" },
      { id: "3", name: "Feature Request" },
      { id: "4", name: "Security Concern" },
      { id: "5", name: "Other" },
    ];
    const type = reportTypes.find((repType) => repType.id === id);
    return type ? type.name : "N/A";
  };

  const handleSubmitReport = () => {
    console.log("Submitting Report:", { selectedReportType, details });
    router.push("/report-success");
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Confirm Report",
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.text,
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={{ color: colors.text, fontSize: 24 }}>←</Text>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push("/reports")}>
              <Text style={{ color: colors.primary, fontSize: 16 }}>View All</Text>
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
        {/* Progress */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 30, marginTop: 10 }}>
          {["Type", "Details", "Confirmation"].map((step, index) => (
            <View key={step} style={{ alignItems: "center" }}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  backgroundColor: index === 2 ? colors.primary : colors.surfaceSecondary,
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 5,
                }}
              >
                <Text style={{ color: colors.primaryText, fontWeight: "bold" }}>{index + 1}</Text>
              </View>
              <Text
                style={{
                  color: index === 2 ? colors.primary : colors.textSecondary,
                  fontWeight: index === 2 ? "bold" : "normal",
                  fontSize: 12,
                }}
              >
                {step}
              </Text>
            </View>
          ))}
        </View>

        <Text style={{ fontSize: 22, fontWeight: "bold", color: colors.text, marginBottom: 10 }}>
          Review your report
        </Text>
        <Text style={{ fontSize: 14, color: colors.textSecondary, marginBottom: 30 }}>
          Please review all the details below before submitting your report.
        </Text>

        <View
          style={{
            backgroundColor: colors.surface,
            borderRadius: 10,
            padding: 15,
            marginBottom: 15,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", color: colors.text }}>Report Type:</Text>
            <Text style={{ fontSize: 16, color: colors.textSecondary, flexShrink: 1, textAlign: "right" }}>
              {getReportTypeName(selectedReportType)}
            </Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", color: colors.text }}>Details:</Text>
            <Text style={{ fontSize: 16, color: colors.textSecondary, flexShrink: 1, textAlign: "right" }}>
              {details}
            </Text>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={{
          backgroundColor: colors.primary,
          padding: 18,
          borderRadius: 10,
          alignItems: "center",
          margin: 20,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        }}
        onPress={handleSubmitReport}
      >
        <Text style={{ color: colors.primaryText, fontSize: 18, fontWeight: "bold" }}>Submit Report</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewReportConfirmationScreen;
