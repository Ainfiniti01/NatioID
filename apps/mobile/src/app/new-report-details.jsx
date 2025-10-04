import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { useTheme } from "@/context/ThemeContext";

const NewReportDetailsScreen = () => {
  const router = useRouter();
  const { selectedReportType } = useLocalSearchParams();
  const [details, setDetails] = useState("");

  const { colors } = useTheme();

  const handleContinue = () => {
    if (details.trim()) {
      router.push({
        pathname: "/new-report-confirmation",
        params: { selectedReportType, details },
      });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Report Details",
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
        {/* Progress Bar */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 30, marginTop: 10 }}>
          {["Type", "Details", "Confirmation"].map((step, index) => (
            <View key={step} style={{ alignItems: "center" }}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  backgroundColor: index === 1 ? colors.primary : colors.surfaceSecondary,
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 5,
                }}
              >
                <Text style={{ color: colors.primaryText, fontWeight: "bold" }}>{index + 1}</Text>
              </View>
              <Text
                style={{
                  color: index === 1 ? colors.primary : colors.textSecondary,
                  fontWeight: index === 1 ? "bold" : "normal",
                  fontSize: 12,
                }}
              >
                {step}
              </Text>
            </View>
          ))}
        </View>

        {/* Question + Description */}
        <Text style={{ fontSize: 22, fontWeight: "bold", color: colors.text, marginBottom: 10 }}>
          Provide details about your report
        </Text>
        <Text style={{ fontSize: 14, color: colors.textSecondary, marginBottom: 30 }}>
          Describe your issue in detail. Be as specific as possible to help us understand and address it effectively.
        </Text>

        {/* Input */}
        <TextInput
          style={{
            backgroundColor: colors.surface,
            borderRadius: 10,
            padding: 15,
            color: colors.text,
            fontSize: 16,
            height: 150,
            textAlignVertical: "top",
            borderWidth: 1,
            borderColor: colors.border,
          }}
          placeholder="Enter your report details here..."
          placeholderTextColor={colors.textSecondary}
          multiline
          numberOfLines={10}
          value={details}
          onChangeText={setDetails}
        />
      </ScrollView>

      {/* Continue Button */}
      <TouchableOpacity
        style={{
          backgroundColor: details.trim() ? colors.primary : colors.textSecondary,
          padding: 18,
          borderRadius: 10,
          alignItems: "center",
          margin: 20,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        }}
        onPress={handleContinue}
        disabled={!details.trim()}
      >
        <Text style={{ color: colors.primaryText, fontSize: 18, fontWeight: "bold" }}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewReportDetailsScreen;
