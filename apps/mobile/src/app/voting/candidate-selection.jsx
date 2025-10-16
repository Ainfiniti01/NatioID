import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { router, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "@/context/ThemeContext";

export default function CandidateSelectionScreen() {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const { electionId, electionType } = params;

  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [election, setElection] = useState(null);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    // Dummy API call
    setTimeout(() => {
      setElection({
        id: electionId,
        type: electionType,
        title: "Presidential Election",
        description: "Choose the next President",
      });

      setCandidates([
        {
          id: 1,
          name: "Joe Biden",
          party: "United States", // Using country name as party
          partyLogo: "https://via.placeholder.com/40x40?text=US",
          photo: "https://via.placeholder.com/80x80?text=JB",
          age: 81,
          experience: "President of United States (2021-Present)",
          manifesto: "Building a Better America",
          votes: 15420000,
          percentage: 38.5,
        },
        {
          id: 2,
          name: "Donald Trump",
          party: "United States", // Using country name as party
          partyLogo: "https://via.placeholder.com/40x40?text=US",
          photo: "https://via.placeholder.com/80x80?text=DT",
          age: 78,
          experience: "President of United States (2017-2021)",
          manifesto: "Make America Great Again",
          votes: 11526000,
          percentage: 28.8,
        },
        {
          id: 3,
          name: "Emmanuel Macron",
          party: "France", // Using country name as party
          partyLogo: "https://via.placeholder.com/40x40?text=FR",
          photo: "https://via.placeholder.com/80x80?text=EM",
          age: 46,
          experience: "President of France (2017-Present)",
          manifesto: "France 2030",
          votes: 8500000,
          percentage: 21.2,
        },
        {
          id: 4,
          name: "Bola Ahmed Tinubu",
          party: "Nigeria", // Using country name as party
          partyLogo: "https://via.placeholder.com/40x40?text=NG",
          photo: "https://via.placeholder.com/80x80?text=BAT",
          age: 72,
          experience: "President of Nigeria (2023-Present)",
          manifesto: "Renewed Hope",
          votes: 4500000,
          percentage: 11.5,
        },
        {
          id: 5,
          name: "Rishi Sunak",
          party: "United Kingdom", // Using country name as party
          partyLogo: "https://via.placeholder.com/40x40?text=UK",
          photo: "https://via.placeholder.com/80x80?text=RS",
          age: 44,
          experience: "Prime Minister of United Kingdom (2022-Present)",
          manifesto: "Build a Better Britain",
          votes: 3000000,
          percentage: 7.5,
        },
      ]);
      setLoading(false);
    }, 1000);
  };

  const handleCandidateSelect = (candidate) => {
    if (selectedCandidate && selectedCandidate.id !== candidate.id) {
      Alert.alert(
        "Change Selection",
        `You previously selected ${selectedCandidate.name}. Do you want to change your selection to ${candidate.name}?`,
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Yes, Change",
            onPress: () => setSelectedCandidate(candidate),
          },
        ],
      );
    } else {
      setSelectedCandidate(candidate);
    }
  };

  const handleViewCampaign = (candidate) => {
    router.push({
      pathname: "/voting/candidate-details",
      params: {
        candidateId: candidate.id,
        electionId,
        electionType,
        returnTo: "candidate-selection",
      },
    });
  };

  const handleProceedToVote = () => {
    if (!selectedCandidate) {
      Alert.alert(
        "No Selection",
        "Please select a candidate before proceeding.",
      );
      return;
    }

    router.push({
      pathname: "/voting/vote-confirmation",
      params: {
        candidateId: selectedCandidate.id,
        candidateName: selectedCandidate.name,
        candidateCountry: "Our Country", // Using a generic country name
        electionId,
        electionType,
      },
    });
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDark ? "light" : "dark"} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: insets.top + 20,
          paddingHorizontal: 20,
          paddingBottom: insets.bottom + 120,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>

          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 18,
              color: colors.text,
            }}
          >
            Select a Candidate
          </Text>

          <TouchableOpacity onPress={() => router.push("/voting/live-results")}>
            <Ionicons
              name="bar-chart-outline"
              size={24}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>

        {/* Election Info */}
        {election && (
          <View
            style={{
              backgroundColor: colors.primary,
              borderRadius: 16,
              padding: 20,
              marginBottom: 24,
            }}
          >
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 18,
                color: colors.primaryText,
                marginBottom: 4,
              }}
            >
              {election.title}
            </Text>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 14,
                color: colors.primaryText,
                opacity: 0.9,
              }}
            >
              {election.description}
            </Text>
          </View>
        )}

        {/* Instructions */}
        <View
          style={{
            backgroundColor: "#FEF3C7",
            borderRadius: 12,
            padding: 16,
            marginBottom: 24,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons name="information-circle" size={24} color="#D97706" />
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 14,
              color: "#92400E",
              marginLeft: 12,
              flex: 1,
            }}
          >
            Select only one candidate. You can view their campaign details
            before making your choice.
          </Text>
        </View>

        {/* Candidates List */}
        <View style={{ marginBottom: 24 }}>
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 20,
              color: colors.text,
              marginBottom: 16,
            }}
          >
            Candidates ({candidates.length})
          </Text>

          {loading ? (
            <View
              style={{
                backgroundColor: colors.cardBackground,
                borderRadius: 16,
                padding: 20,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 14,
                  color: colors.textSecondary,
                }}
              >
                Loading candidates...
              </Text>
            </View>
          ) : (
            <View style={{ gap: 16 }}>
              {candidates.map((candidate) => {
                const isSelected = selectedCandidate?.id === candidate.id;

                return (
                  <View
                    key={candidate.id}
                    style={{
                      backgroundColor: colors.cardBackground,
                      borderRadius: 16,
                      padding: 20,
                      borderWidth: 2,
                      borderColor: isSelected ? colors.primary : colors.border,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "flex-start",
                        marginBottom: 16,
                      }}
                    >
                      {/* Candidate Photo */}
                      <View
                        style={{
                          width: 80,
                          height: 80,
                          borderRadius: 40,
                          backgroundColor: colors.surfaceSecondary,
                          alignItems: "center",
                          justifyContent: "center",
                          marginRight: 16,
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "Inter_600SemiBold",
                            fontSize: 24,
                            color: colors.textSecondary,
                          }}
                        >
                          {candidate.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </Text>
                      </View>

                      {/* Candidate Info */}
                      <View style={{ flex: 1 }}>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: 8,
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: "Inter_600SemiBold",
                              fontSize: 18,
                              color: colors.text,
                              flex: 1,
                            }}
                          >
                            {candidate.name}
                          </Text>

                          <TouchableOpacity
                            onPress={() => handleCandidateSelect(candidate)}
                            style={{
                              width: 28,
                              height: 28,
                              borderRadius: 14,
                              borderWidth: 2,
                              borderColor: isSelected
                                ? colors.primary
                                : colors.border,
                              backgroundColor: isSelected
                                ? colors.primary
                                : "transparent",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {isSelected && (
                              <Ionicons
                                name="checkmark"
                                size={16}
                                color={colors.primaryText}
                              />
                            )}
                          </TouchableOpacity>
                        </View>

                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: 8,
                          }}
                        >
                          <View
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: 16,
                              backgroundColor: colors.surfaceSecondary,
                              alignItems: "center",
                              justifyContent: "center",
                              marginRight: 8,
                            }}
                          >
                            <Text
                              style={{
                                fontFamily: "Inter_600SemiBold",
                                fontSize: 10,
                                color: colors.textSecondary,
                              }}
                            >
                              {candidate.party}
                            </Text>
                          </View>
                          <Text
                            style={{
                              fontFamily: "Inter_500Medium",
                              fontSize: 16,
                              color: colors.primary,
                            }}
                          >
                            {candidate.party}
                          </Text>
                        </View>

                        <Text
                          style={{
                            fontFamily: "Inter_400Regular",
                            fontSize: 14,
                            color: colors.textSecondary,
                            marginBottom: 8,
                          }}
                        >
                          {candidate.experience}
                        </Text>

                        <Text
                          style={{
                            fontFamily: "Inter_500Medium",
                            fontSize: 14,
                            color: colors.text,
                            fontStyle: "italic",
                          }}
                        >
                          "{candidate.manifesto}"
                        </Text>
                      </View>
                    </View>

                    {/* Action Buttons */}
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 12,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => handleViewCampaign(candidate)}
                        style={{
                          flex: 1,
                          backgroundColor: colors.surfaceSecondary,
                          borderRadius: 12,
                          paddingVertical: 12,
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "Inter_500Medium",
                            fontSize: 14,
                            color: colors.text,
                          }}
                        >
                          View Campaign
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => handleCandidateSelect(candidate)}
                        style={{
                          flex: 1,
                          backgroundColor: isSelected
                            ? colors.primary
                            : colors.border,
                          borderRadius: 12,
                          paddingVertical: 12,
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "Inter_500Medium",
                            fontSize: 14,
                            color: isSelected
                              ? colors.primaryText
                              : colors.text,
                          }}
                        >
                          {isSelected ? "Selected" : "Select"}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Fixed Bottom Button */}
      {selectedCandidate && (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: colors.background,
            borderTopWidth: 1,
            borderTopColor: colors.border,
            paddingHorizontal: 20,
            paddingTop: 16,
            paddingBottom: insets.bottom + 16,
          }}
        >
          <View
            style={{
              backgroundColor: colors.primary + "10",
              borderRadius: 12,
              padding: 16,
              marginBottom: 16,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons name="person" size={20} color={colors.primary} />
            <Text
              style={{
                fontFamily: "Inter_500Medium",
                fontSize: 14,
                color: colors.primary,
                marginLeft: 8,
              }}
            >
              Selected: {selectedCandidate.name} ({selectedCandidate.party})
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleProceedToVote}
            style={{
              backgroundColor: colors.primary,
              borderRadius: 16,
              paddingVertical: 16,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 16,
                color: colors.primaryText,
              }}
            >
              Proceed to Vote
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
