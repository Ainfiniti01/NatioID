import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { useTheme } from "@/context/ThemeContext";


export default function DashboardScreen() {
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useTheme();
  const [greeting, setGreeting] = useState('');
  
  useEffect(() => {
    const currentHour = new Date().getHours();
    let newGreeting;
    if (currentHour < 12) {
      newGreeting = "Good morning";
    } else if (currentHour < 18) {
      newGreeting = "Good afternoon";
    } else {
      newGreeting = "Good evening";
    }
    setGreeting(newGreeting);
  }, []);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const quickActions = [
    {
      id: "digitalId",
      title: "Digital ID",
      icon: "card-outline",
      color: "#004040",
      onPress: () => router.push("/digital-id"),
    },
    {
      id: "applications",
      title: "Applications",
      icon: "document-outline",
      color: "#0066CC",
      onPress: () => router.push("/applications"),
    },
    {
      id: "complaints",
      title: "Complaints",
      icon: "chatbubble-outline",
      color: "#FF8C00",
      onPress: () => router.push("/(tabs)/reports"),
    },
    {
      id: "sos",
      title: "Emergency",
      icon: "warning-outline",
      color: "#FF4444",
      onPress: () => router.push("/sos"),
    },
    {
      id: "voting",
      title: "Voting",
      icon: "people-outline",
      color: "#1E40AF", 
      onPress: () => router.push("/voting"),
    },
  ];

  const recentActivity = [
    {
      id: 1,
      title: "ID Verification Complete",
      date: "2 days ago",
      status: "completed",
      icon: "checkmark-circle-outline",
    },
    {
      id: 2,
      title: "Benefit Application Submitted",
      date: "1 week ago",
      status: "pending",
      icon: "time-outline",
    },
    {
      id: 3,
      title: "Document Updated",
      date: "2 weeks ago",
      status: "completed",
      icon: "document-text-outline",
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDark ? "light" : "dark"} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom + 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 16,
                  color: colors.textSecondary,
                }}
              >
                {greeting},
              </Text>
              <Text
                style={{
                  fontFamily: "Inter_700Bold",
                  fontSize: 28,
                  color: colors.text,
                  marginTop: 4,
                }}
              >
                John Doe
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => router.push("/(tabs)/profile")}
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: colors.surfaceSecondary,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="person" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Digital ID Card */}
        <View style={{ paddingHorizontal: 20, marginBottom: 32 }}>
          <TouchableOpacity
            onPress={() => router.push("/digital-id")}
            style={{
              backgroundColor: colors.primary,
              borderRadius: 16,
              padding: 24,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: "Inter_500Medium",
                    fontSize: 12,
                    color: colors.primaryText,
                    opacity: 0.8,
                    letterSpacing: 1,
                    marginBottom: 8,
                  }}
                >
                  NATIONAL ID
                </Text>
                <Text
                  style={{
                    fontFamily: "Inter_700Bold",
                    fontSize: 24,
                    color: colors.primaryText,
                    marginBottom: 16,
                  }}
                >
                  John Doe
                </Text>
                <Text
                  style={{
                    fontFamily: "Inter_600SemiBold",
                    fontSize: 16,
                    color: colors.primaryText,
                    opacity: 0.9,
                  }}
                >
                  ID: 1234567890
                </Text>
              </View>

              <TouchableOpacity
                style={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderRadius: 12,
                  padding: 12,
                }}
              >
                <Ionicons name="qr-code" size={24} color={colors.primaryText} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={{ paddingHorizontal: 20, marginBottom: 32 }}>
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 18,
              color: colors.text,
              marginBottom: 16,
            }}
          >
            Quick Actions
          </Text>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                onPress={action.onPress}
                style={{
                  width: "48%",
                  backgroundColor: colors.cardBackground,
                  borderRadius: 12,
                  padding: 20,
                  marginBottom: 12,
                  borderWidth: 1,
                  borderColor: colors.border,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: action.color,
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 12,
                  }}
                >
                  <Ionicons name={action.icon} size={24} color="#FFFFFF" />
                </View>
                <Text
                  style={{
                    fontFamily: "Inter_500Medium",
                    fontSize: 14,
                    color: colors.text,
                    textAlign: "center",
                  }}
                >
                  {action.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={{ paddingHorizontal: 20 }}>
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 18,
              color: colors.text,
              marginBottom: 16,
            }}
          >
            Recent Activity
          </Text>

          {recentActivity.map((activity) => (
            <View
              key={activity.id}
              style={{
                backgroundColor: colors.cardBackground,
                borderRadius: 12,
                padding: 16,
                marginBottom: 12,
                borderWidth: 1,
                borderColor: colors.border,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor:
                    activity.status === "completed"
                      ? colors.success
                      : colors.warning,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 12,
                }}
              >
                <Ionicons name={activity.icon} size={20} color="#FFFFFF" />
              </View>

              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: "Inter_500Medium",
                    fontSize: 14,
                    color: colors.text,
                    marginBottom: 4,
                  }}
                >
                  {activity.title}
                </Text>
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 12,
                    color: colors.textSecondary,
                  }}
                >
                  {activity.date}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
