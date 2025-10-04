import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { useTheme } from "@/context/ThemeContext";

const NewComplaintLocationScreen = () => {
  const router = useRouter();
  const { selectedCategory, isPublic, details } = useLocalSearchParams();
  const [location, setLocation] = useState("");
  const { colors } = useTheme();

  const handleContinue = () => {
    if (location.trim()) {
      router.push({
        pathname: "/new-complaint-review",
        params: { selectedCategory, isPublic, details, location },
      });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Complaint Location",
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
        {/* Progress bar */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 30, marginTop: 10 }}>
          {["Category", "Details", "Location", "Review"].map((step, index) => (
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
          Where is the issue located?
        </Text>
        <Text style={{ fontSize: 14, color: colors.textSecondary, marginBottom: 30 }}>
          Provide the location relevant to your complaint. This could be an address, a landmark, or a general area.
        </Text>

        <TextInput
          style={{
            backgroundColor: colors.surface,
            borderRadius: 10,
            padding: 15,
            color: colors.text,
            fontSize: 16,
            borderWidth: 1,
            borderColor: colors.border,
          }}
          placeholder="Enter location (e.g., Street Name, City, Landmark)"
          placeholderTextColor={colors.textSecondary}
          value={location}
          onChangeText={setLocation}
        />
      </ScrollView>

      <TouchableOpacity
        style={{
          backgroundColor: location.trim() ? colors.primary : colors.textSecondary,
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
        disabled={!location.trim()}
      >
        <Text style={{ color: colors.primaryText, fontSize: 18, fontWeight: "bold" }}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewComplaintLocationScreen;
