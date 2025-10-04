import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Linking,
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
import { faqData, tutorials } from "../../utils/data";

export default function HelpScreen() {
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [activeTab, setActiveTab] = useState("faq");

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const filteredFAQs = faqData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleEmailSupport = () => {
    const supportEmail = "support@natioid.gov.ng";
    const url = `mailto:${supportEmail}?subject=Support Request&body=Hello, I need assistance with...`;
    Linking.openURL(url).catch(() => {
      Alert.alert("Error", "No email app found or unable to open email client.");
    });
  };

  const handlePhoneSupport = () => {
    const supportPhoneNumber = "+234-800-NATIOID";
    Alert.alert(
      "Call Support",
      `Do you want to call ${supportPhoneNumber}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Call",
          onPress: () => Linking.openURL(`tel:${supportPhoneNumber}`).catch(() => {
            Alert.alert("Error", "Unable to make a phone call.");
          }),
        },
      ],
      { cancelable: true }
    );
  };

  const handleLiveChat = () => {
    router.push('/live-chat');
  };

  const handleTutorialPress = (tutorial) => {
    router.push(`/tutorial-detail?id=${tutorial.id}`);
  };

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
              fontSize: 28,
              color: colors.text,
              marginBottom: 8,
            }}
          >
            Help Center
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 16,
              color: colors.textSecondary,
              lineHeight: 24,
            }}
          >
            Find answers to common questions and get support
          </Text>
        </View>

        {/* Tab Navigation */}
        <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: colors.surfaceSecondary,
              borderRadius: 12,
              padding: 4,
            }}
          >
            <TouchableOpacity
              onPress={() => setActiveTab("faq")}
              style={{
                flex: 1,
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 8,
                backgroundColor:
                  activeTab === "faq" ? colors.primary : "transparent",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 14,
                  color:
                    activeTab === "faq"
                      ? colors.primaryText
                      : colors.textSecondary,
                }}
              >
                FAQs
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActiveTab("tutorials")}
              style={{
                flex: 1,
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 8,
                backgroundColor:
                  activeTab === "tutorials" ? colors.primary : "transparent",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 14,
                  color:
                    activeTab === "tutorials"
                      ? colors.primaryText
                      : colors.textSecondary,
                }}
              >
                Tutorials
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActiveTab("contact")}
              style={{
                flex: 1,
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 8,
                backgroundColor:
                  activeTab === "contact" ? colors.primary : "transparent",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 14,
                  color:
                    activeTab === "contact"
                      ? colors.primaryText
                      : colors.textSecondary,
                }}
              >
                Contact
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* FAQ Tab */}
        {activeTab === "faq" && (
          <View style={{ paddingHorizontal: 20 }}>
            {/* Search Bar */}
            <View
              style={{
                backgroundColor: colors.cardBackground,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: colors.border,
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 16,
                marginBottom: 24,
              }}
            >
              <Ionicons name="search" size={20} color={colors.textSecondary} />
              <TextInput
                style={{
                  flex: 1,
                  paddingVertical: 16,
                  paddingHorizontal: 12,
                  fontFamily: "Inter_400Regular",
                  fontSize: 16,
                  color: colors.text,
                }}
                placeholder="Search FAQs..."
                placeholderTextColor={colors.textSecondary}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            {/* FAQ List */}
            {filteredFAQs.map((faq) => (
              <TouchableOpacity
                key={faq.id}
                onPress={() =>
                  setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)
                }
                style={{
                  backgroundColor: colors.cardBackground,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: colors.border,
                  marginBottom: 12,
                  overflow: "hidden",
                }}
              >
                <View
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 16,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <View
                      style={{
                        backgroundColor: colors.surfaceSecondary,
                        borderRadius: 6,
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        alignSelf: "flex-start",
                        marginBottom: 8,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Inter_500Medium",
                          fontSize: 12,
                          color: colors.textSecondary,
                        }}
                      >
                        {faq.category}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontFamily: "Inter_500Medium",
                        fontSize: 16,
                        color: colors.text,
                        lineHeight: 24,
                      }}
                    >
                      {faq.question}
                    </Text>
                  </View>
                  <Ionicons
                    name={
                      expandedFAQ === faq.id ? "chevron-up" : "chevron-down"
                    }
                    size={20}
                    color={colors.textSecondary}
                  />
                </View>

                {expandedFAQ === faq.id && (
                  <View
                    style={{
                      paddingHorizontal: 20,
                      paddingBottom: 16,
                      borderTopWidth: 1,
                      borderTopColor: colors.border,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Inter_400Regular",
                        fontSize: 14,
                        color: colors.textSecondary,
                        lineHeight: 20,
                        marginTop: 12,
                      }}
                    >
                      {faq.answer}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Tutorials Tab */}
        {activeTab === "tutorials" && (
          <View style={{ paddingHorizontal: 20 }}>
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 18,
                color: colors.text,
                marginBottom: 16,
              }}
            >
              Video Tutorials
            </Text>

            {tutorials.map((tutorial) => (
              <TouchableOpacity
                key={tutorial.id}
                onPress={() => handleTutorialPress(tutorial)}
                style={{
                  backgroundColor: colors.cardBackground,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: colors.border,
                  padding: 16,
                  marginBottom: 12,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: tutorial.completed
                      ? colors.success
                      : colors.info,
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 16,
                  }}
                >
                  <Ionicons name={tutorial.icon} size={24} color="#FFFFFF" />
                </View>

                <View style={{ flex: 1 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 4,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Inter_500Medium",
                        fontSize: 16,
                        color: colors.text,
                        flex: 1,
                      }}
                    >
                      {tutorial.title}
                    </Text>
                    {tutorial.completed && (
                      <Ionicons
                        name="checkmark-circle"
                        size={20}
                        color={colors.success}
                      />
                    )}
                  </View>
                  <Text
                    style={{
                      fontFamily: "Inter_400Regular",
                      fontSize: 14,
                      color: colors.textSecondary,
                      marginBottom: 4,
                    }}
                  >
                    {tutorial.description}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Inter_400Regular",
                      fontSize: 12,
                      color: colors.textSecondary,
                    }}
                  >
                    Duration: {tutorial.duration}
                  </Text>
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Contact Tab */}
        {activeTab === "contact" && (
          <View style={{ paddingHorizontal: 20 }}>
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 18,
                color: colors.text,
                marginBottom: 16,
              }}
            >
              Get in Touch
            </Text>

            {/* Live Chat */}
            <TouchableOpacity
              onPress={handleLiveChat}
              style={{
                backgroundColor: colors.cardBackground,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: colors.border,
                padding: 20,
                marginBottom: 16,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: colors.success,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 16,
                }}
              >
                <Ionicons
                  name="chatbubble-ellipses"
                  size={24}
                  color="#FFFFFF"
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: "Inter_600SemiBold",
                    fontSize: 16,
                    color: colors.text,
                    marginBottom: 4,
                  }}
                >
                  Live Chat
                </Text>
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 14,
                    color: colors.textSecondary,
                  }}
                >
                  Chat with our support team • Mon-Fri, 9AM-5PM
                </Text>
              </View>
              <View
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: colors.success,
                }}
              />
            </TouchableOpacity>

            {/* Email Support */}
            <TouchableOpacity
              onPress={handleEmailSupport}
              style={{
                backgroundColor: colors.cardBackground,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: colors.border,
                padding: 20,
                marginBottom: 16,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: colors.info,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 16,
                }}
              >
                <Ionicons name="mail" size={24} color="#FFFFFF" />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: "Inter_600SemiBold",
                    fontSize: 16,
                    color: colors.text,
                    marginBottom: 4,
                  }}
                >
                  Email Support
                </Text>
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 14,
                    color: colors.textSecondary,
                  }}
                >
                  support@natioid.gov.ng • Response within 24 hours
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.textSecondary}
              />
            </TouchableOpacity>

            {/* Phone Support */}
            <TouchableOpacity
              onPress={handlePhoneSupport}
              style={{
                backgroundColor: colors.cardBackground,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: colors.border,
                padding: 20,
                marginBottom: 16,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: colors.info,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 16,
                }}
              >
                <Ionicons name="call" size={24} color="#FFFFFF" />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: "Inter_600SemiBold",
                    fontSize: 16,
                    color: colors.text,
                    marginBottom: 4,
                  }}
                >
                  Phone Support
                </Text>
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 14,
                    color: colors.textSecondary,
                  }}
                >
                  +234-800-NATIOID • Available 24/7
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.textSecondary}
              />
            </TouchableOpacity>

            {/* Emergency Contact */}
            <TouchableOpacity
              style={{
                backgroundColor: colors.emergency,
                borderRadius: 12,
                padding: 20,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: "rgba(255,255,255,0.2)",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 16,
                }}
              >
                <Ionicons name="call" size={24} color="#FFFFFF" />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: "Inter_600SemiBold",
                    fontSize: 16,
                    color: "#FFFFFF",
                    marginBottom: 4,
                  }}
                >
                  Emergency Hotline
                </Text>
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 14,
                    color: "#FFFFFF",
                    opacity: 0.9,
                  }}
                >
                  +234-800-EMERGENCY • Available 24/7
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
