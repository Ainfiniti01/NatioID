import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
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

export default function ReportsScreen() {
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useTheme();

  const [activeTab, setActiveTab] = useState("complaints");
  const [complaintsData, setComplaintsData] = useState([]);
  const [reportsData, setReportsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      if (activeTab === "complaints") {
        setComplaintsData([
          {
            id: "C001",
            title: "Incorrect Charge",
            status: "resolved",
            date: "2024-01-15",
            category: "Billing",
            description: "I was charged twice for my subscription this month.",
          },
          {
            id: "C002",
            title: "Service Outage",
            status: "in_progress",
            date: "2024-01-16",
            category: "Technical",
            description: "The service has been down for the last 3 hours.",
          },
        ]);
      } else {
        setReportsData([
          {
            id: "R001",
            title: "Lost Digital ID",
            status: "resolved",
            date: "2024-01-12",
            type: "Lost ID",
            description: "Reported lost digital ID card - need replacement",
          },
          {
            id: "R002",
            title: "Stolen Documents",
            status: "pending",
            date: "2024-01-14",
            type: "Stolen",
            description:
              "Physical documents stolen, need to update security status",
          },
        ]);
      }
    } catch (err) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (!fontsLoaded) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return { bg: colors.pendingBg, text: colors.pendingText };
      case "resolved":
        return { bg: colors.successBg, text: colors.successText };
      case "in_progress":
        return { bg: colors.warningBg, text: colors.warningText };
      default:
        return {
          bg: colors.surfaceSecondary,
          text: colors.textSecondary,
        };
    }
  };

  const handleComplaintPress = (complaint) => {
    router.push(`/(tabs)/complaints/${complaint.id}`);
  };

  const handleNewComplaint = () => {
    router.push("/new-complaint");
  };

  const handleNewReport = () => {
    router.push("/new-report");
  };

  const renderComplaints = () => {
    if (loading) {
      return (
        <View style={{ padding: 20, alignItems: "center" }}>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 16,
              color: colors.textSecondary,
            }}
          >
            Loading complaints...
          </Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={{ padding: 20, alignItems: "center" }}>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 16,
              color: colors.warningText,
              marginBottom: 16,
            }}
          >
            {error}
          </Text>
          <TouchableOpacity
            onPress={fetchData}
            style={{
              backgroundColor: colors.primary,
              borderRadius: 8,
              paddingHorizontal: 16,
              paddingVertical: 8,
            }}
          >
            <Text
              style={{
                fontFamily: "Inter_500Medium",
                fontSize: 14,
                color: colors.primaryText,
              }}
            >
              Retry
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (complaintsData.length === 0) {
      return (
        <View style={{ padding: 20, alignItems: "center" }}>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 16,
              color: colors.textSecondary,
              marginBottom: 16,
            }}
          >
            No complaints found
          </Text>
          <TouchableOpacity
            onPress={handleNewComplaint}
            style={{
              backgroundColor: colors.primary,
              borderRadius: 12,
              padding: 16,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons
              name="add"
              size={20}
              color={colors.primaryText}
              style={{ marginRight: 8 }}
            />
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 16,
                color: colors.primaryText,
              }}
            >
              Submit Your First Complaint
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View>
        {complaintsData.map((complaint) => {
          const statusColors = getStatusColor(complaint.status);
          return (
            <TouchableOpacity
              key={complaint.id}
              onPress={() => handleComplaintPress(complaint)}
              style={{
                backgroundColor: colors.cardBackground,
                borderRadius: 12,
                padding: 16,
                marginBottom: 12,
                borderWidth: 1,
                borderColor: colors.border,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontFamily: "Inter_600SemiBold",
                      fontSize: 16,
                      color: colors.text,
                      marginBottom: 4,
                    }}
                  >
                    {complaint.title}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Inter_400Regular",
                      fontSize: 12,
                      color: colors.textSecondary,
                    }}
                  >
                    {complaint.id} • {complaint.category} • {complaint.date}
                  </Text>
                </View>

                <View
                  style={{
                    backgroundColor: statusColors.bg,
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Inter_500Medium",
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
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: colors.textSecondary,
                  lineHeight: 20,
                }}
              >
                {complaint.description}
              </Text>
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity
          onPress={handleNewComplaint}
          style={{
            backgroundColor: colors.primary,
            borderRadius: 12,
            padding: 16,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 16,
          }}
        >
          <Ionicons
            name="add"
            size={20}
            color={colors.primaryText}
            style={{ marginRight: 8 }}
          />
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 16,
              color: colors.primaryText,
            }}
          >
            Submit New Complaint
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderReports = () => (
    <View>
      {reportsData.map((report) => {
        const statusColors = getStatusColor(report.status);
        return (
          <TouchableOpacity
            key={report.id}
            style={{
              backgroundColor: colors.cardBackground,
              borderRadius: 12,
              padding: 16,
              marginBottom: 12,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: "Inter_600SemiBold",
                    fontSize: 16,
                    color: colors.text,
                    marginBottom: 4,
                  }}
                >
                  {report.title}
                </Text>
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 12,
                    color: colors.textSecondary,
                  }}
                >
                  {report.id} • {report.type} • {report.date}
                </Text>
              </View>

              <View
                style={{
                  backgroundColor: statusColors.bg,
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 8,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Inter_500Medium",
                    fontSize: 12,
                    color: statusColors.text,
                    textTransform: "uppercase",
                  }}
                >
                  {report.status}
                </Text>
              </View>
            </View>

            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 14,
                color: colors.textSecondary,
                lineHeight: 20,
              }}
            >
              {report.description}
            </Text>
          </TouchableOpacity>
        );
      })}

      <TouchableOpacity
        onPress={handleNewReport}
        style={{
          backgroundColor: colors.primary,
          borderRadius: 12,
          padding: 16,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 16,
        }}
      >
        <Ionicons
          name="add"
          size={20}
          color={colors.primaryText}
          style={{ marginRight: 8 }}
        />
        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 16,
            color: colors.primaryText,
          }}
        >
          Submit New Report
        </Text>
      </TouchableOpacity>
    </View>
  );

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
          <Text
            style={{
              fontFamily: "Inter_700Bold",
              fontSize: 32,
              color: colors.text,
              marginBottom: 8,
            }}
          >
            Reports & Complaints
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 16,
              color: colors.textSecondary,
            }}
          >
            Track your submissions and get help
          </Text>
        </View>

        {/* Tab Navigation */}
        <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
          <View
            style={{
              backgroundColor: colors.surfaceSecondary,
              borderRadius: 12,
              padding: 4,
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              onPress={() => setActiveTab("complaints")}
              style={{
                flex: 1,
                backgroundColor:
                  activeTab === "complaints" ? colors.primary : "transparent",
                borderRadius: 8,
                paddingVertical: 12,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 14,
                  color:
                    activeTab === "complaints"
                      ? colors.primaryText
                      : colors.textSecondary,
                }}
              >
                Complaints
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveTab("reports")}
              style={{
                flex: 1,
                backgroundColor:
                  activeTab === "reports" ? colors.primary : "transparent",
                borderRadius: 8,
                paddingVertical: 12,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 14,
                  color:
                    activeTab === "reports"
                      ? colors.primaryText
                      : colors.textSecondary,
                }}
              >
                Reports
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Content */}
        <View style={{ paddingHorizontal: 20 }}>
          {activeTab === "complaints" ? renderComplaints() : renderReports()}
        </View>
      </ScrollView>
    </View>
  );
}
