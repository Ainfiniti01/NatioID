import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { useTheme } from "@/context/ThemeContext";

const NewComplaintReviewScreen = () => {
  const router = useRouter();
  const { selectedCategory, isPublic, details, location } = useLocalSearchParams();
  const { colors } = useTheme();

  const getCategoryName = (id) => {
    const categories = [
      { id: "1", name: "Infrastructure" },
      { id: "2", name: "Healthcare" },
      { id: "3", name: "Education" },
      { id: "4", name: "Security" },
      { id: "5", name: "Environment" },
      { id: "6", name: "Governance" },
      { id: "7", name: "Utilities" },
      { id: "8", name: "Other" },
    ];
    const category = categories.find((cat) => cat.id === id);
    return category ? category.name : "N/A";
  };

  const handleSubmitComplaint = () => {
    console.log("Submitting Complaint:", { selectedCategory, isPublic, details, location });
    router.push("/complaint-success");
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Review Complaint",
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.text,
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={{ color: colors.text, fontSize: 24 }}>←</Text>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push("/complaints")}>
              <Text style={{ color: colors.primary, fontSize: 16 }}>View All</Text>
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
        {/* Progress */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 30, marginTop: 10 }}>
          {["Category", "Details", "Location", "Review"].map((step, index) => (
            <View key={step} style={{ alignItems: "center" }}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  backgroundColor: index === 3 ? colors.primary : colors.surfaceSecondary,
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 5,
                }}
              >
                <Text style={{ color: colors.primaryText, fontWeight: "bold" }}>{index + 1}</Text>
              </View>
              <Text
                style={{
                  color: index === 3 ? colors.primary : colors.textSecondary,
                  fontWeight: index === 3 ? "bold" : "normal",
                  fontSize: 12,
                }}
              >
                {step}
              </Text>
            </View>
          ))}
        </View>

        <Text style={{ fontSize: 22, fontWeight: "bold", color: colors.text, marginBottom: 10 }}>
          Review your complaint
        </Text>
        <Text style={{ fontSize: 14, color: colors.textSecondary, marginBottom: 30 }}>
          Please review all the details below before submitting your complaint.
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
            <Text style={{ fontSize: 16, fontWeight: "bold", color: colors.text }}>Category:</Text>
            <Text style={{ fontSize: 16, color: colors.textSecondary }}>{getCategoryName(selectedCategory)}</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", color: colors.text }}>Public:</Text>
            <Text style={{ fontSize: 16, color: colors.textSecondary }}>{isPublic === "true" ? "Yes" : "No"}</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", color: colors.text }}>Details:</Text>
            <Text style={{ fontSize: 16, color: colors.textSecondary, flexShrink: 1, textAlign: "right" }}>{details}</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", color: colors.text }}>Location:</Text>
            <Text style={{ fontSize: 16, color: colors.textSecondary, flexShrink: 1, textAlign: "right" }}>{location}</Text>
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
        onPress={handleSubmitComplaint}
      >
        <Text style={{ color: colors.primaryText, fontSize: 18, fontWeight: "bold" }}>Submit Complaint</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewComplaintReviewScreen;
