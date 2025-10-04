import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from "@/context/ThemeContext";

export default function VoteConfirmationScreen() {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const { candidateId, candidateName, candidateCountry, electionId, electionType } = params;
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const handleBiometricAuth = () => {
    router.push({
      pathname: "/voting/vote-verification",
      params: { candidateId, candidateName, candidateCountry, electionId, electionType },
    });
  };

  const handleConfirmVote = async () => {
    setIsSubmitting(true);

    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock successful response
      const result = {
        success: true,
        voteId: "VOTE-" + Date.now(),
        confirmationCode: Math.random()
          .toString(36)
          .substring(2, 8)
          .toUpperCase(),
      };

      if (result.success) {
        router.replace({
          pathname: "/voting/vote-result",
          params: {
            success: "true",
            candidateName,
            candidateCountry,
            voteId: result.voteId,
            confirmationCode: result.confirmationCode,
            electionType,
          },
        });
      } else {
        throw new Error("Vote submission failed");
      }
    } catch (error) {
      console.error("Vote submission error:", error);
      router.replace({
        pathname: "/voting/vote-result",
        params: {
          success: "false",
          error: "Failed to submit vote. Please try again.",
          candidateName,
          candidateCountry,
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateMaskedVoterId = () => {
    return '****-****-901'; // Masked version of voter ID for privacy
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: insets.top + 20,
          paddingHorizontal: 20,
          paddingBottom: insets.bottom + 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 40,
        }}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>

          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 18,
            color: colors.text,
          }}>
            Confirm Your Vote
          </Text>

          <View style={{ width: 24 }} />
        </View>

        {/* Warning Banner */}
        <View style={{
          backgroundColor: '#FEF3C7',
          borderRadius: 16,
          padding: 20,
          marginBottom: 32,
          borderLeftWidth: 4,
          borderLeftColor: '#F59E0B',
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
          }}>
            <Ionicons name="warning" size={24} color="#D97706" style={{ marginRight: 12 }} />
            <View style={{ flex: 1 }}>
              <Text style={{
                fontFamily: 'Inter_600SemiBold',
                fontSize: 16,
                color: '#92400E',
                marginBottom: 8,
              }}>
                Important Notice
              </Text>
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 14,
                color: '#92400E',
                lineHeight: 20,
              }}>
                Once you confirm your vote, it cannot be changed. Please review your selection carefully before proceeding.
              </Text>
            </View>
          </View>
        </View>

        {/* Vote Summary Card */}
        <View style={{
          backgroundColor: colors.cardBackground,
          borderRadius: 20,
          padding: 24,
          marginBottom: 32,
          borderWidth: 2,
          borderColor: colors.primary,
        }}>
          <View style={{
            alignItems: 'center',
            marginBottom: 24,
          }}>
            <View style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: colors.primary + '20',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
            }}>
              <Ionicons name="person" size={40} color={colors.primary} />
            </View>
            
            <Text style={{
              fontFamily: 'Inter_700Bold',
              fontSize: 24,
              color: colors.text,
              textAlign: 'center',
              marginBottom: 8,
            }}>
              {candidateName}
            </Text>
            
            <View style={{
              backgroundColor: colors.primary,
              borderRadius: 16,
              paddingHorizontal: 16,
              paddingVertical: 8,
            }}>
              <Text style={{
                fontFamily: 'Inter_600SemiBold',
                fontSize: 16,
                color: colors.primaryText,
              }}>
                {candidateCountry}
              </Text>
            </View>
          </View>

          {/* Election Details */}
          <View style={{
            backgroundColor: colors.surfaceSecondary,
            borderRadius: 12,
            padding: 16,
          }}>
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 16,
              color: colors.text,
              marginBottom: 12,
            }}>
              Election Details
            </Text>
            
            <View style={{ gap: 8 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{
                  fontFamily: 'Inter_400Regular',
                  fontSize: 14,
                  color: colors.textSecondary,
                }}>
                  Election Type:
                </Text>
                <Text style={{
                  fontFamily: 'Inter_500Medium',
                  fontSize: 14,
                  color: colors.text,
                }}>
                  {electionType}
                </Text>
              </View>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{
                  fontFamily: 'Inter_400Regular',
                  fontSize: 14,
                  color: colors.textSecondary,
                }}>
                  Voter ID:
                </Text>
                <Text style={{
                  fontFamily: 'Inter_500Medium',
                  fontSize: 14,
                  color: colors.text,
                  fontFamily: 'monospace',
                }}>
                  {generateMaskedVoterId()}
                </Text>
              </View>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{
                  fontFamily: 'Inter_400Regular',
                  fontSize: 14,
                  color: colors.textSecondary,
                }}>
                  Date & Time:
                </Text>
                <Text style={{
                  fontFamily: 'Inter_500Medium',
                  fontSize: 14,
                  color: colors.text,
                }}>
                  {new Date().toLocaleDateString()} • {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Security Notice */}
        <View style={{
          backgroundColor: colors.primary + '10',
          borderRadius: 16,
          padding: 20,
          marginBottom: 32,
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 12,
          }}>
            <Ionicons name="shield-checkmark" size={24} color={colors.primary} />
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 16,
              color: colors.primary,
              marginLeft: 8,
            }}>
              Secure Voting Process
            </Text>
          </View>
          
          <Text style={{
            fontFamily: 'Inter_400Regular',
            fontSize: 14,
            color: colors.text,
            lineHeight: 20,
          }}>
            Your vote will be encrypted and stored securely. We require biometric verification to ensure the integrity of your vote and prevent fraud.
          </Text>
        </View>

      </ScrollView>

      {/* Fixed Bottom Buttons */}
      <View style={{
        backgroundColor: colors.background,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: insets.bottom + 20,
      }}>
        <View style={{ gap: 12 }}>
          <TouchableOpacity
            onPress={handleBiometricAuth}
            disabled={isSubmitting}
            style={{
              backgroundColor: isSubmitting ? colors.border : colors.primary,
              borderRadius: 16,
              paddingVertical: 16,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            {isSubmitting ? (
              <>
                <View style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: colors.primaryText,
                  borderTopColor: 'transparent',
                  marginRight: 12,
                }} />
                <Text style={{
                  fontFamily: 'Inter_600SemiBold',
                  fontSize: 16,
                  color: colors.primaryText,
                }}>
                  Submitting Vote...
                </Text>
              </>
            ) : (
              <Text style={{
                fontFamily: 'Inter_600SemiBold',
                fontSize: 16,
                color: colors.primaryText,
              }}>
                Confirm Vote
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.back()}
            disabled={isSubmitting}
            style={{
              backgroundColor: colors.surfaceSecondary,
              borderRadius: 16,
              paddingVertical: 16,
              alignItems: 'center',
              opacity: isSubmitting ? 0.5 : 1,
            }}
          >
            <Text style={{
              fontFamily: 'Inter_500Medium',
              fontSize: 16,
              color: colors.text,
            }}>
              Go Back & Change Selection
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
