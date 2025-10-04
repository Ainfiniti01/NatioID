import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from "@/context/ThemeContext";

export default function VoteResultScreen() {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const { 
    voteStatus, // Can be 'success', 'failed', 'pending'
    candidateName, 
    candidateParty, 
    voteId, 
    confirmationCode, 
    electionType, 
    error 
  } = params;
  
  const isSuccess = voteStatus === 'success';
  const isPending = voteStatus === 'pending';
  const isFailed = voteStatus === 'failed';

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const handleViewResults = () => {
    router.push('/voting/live-results');
  };

  const handleBackToDashboard = () => {
    router.navigate('/(tabs)/dashboard');
  };

  const handleRetry = () => {
    router.back();
  };

  const handleContactSupport = () => {
    // Navigate to support or help page
    router.push('/help');
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
          paddingTop: insets.top + 40,
          paddingHorizontal: 20,
          paddingBottom: insets.bottom + 40,
          alignItems: 'center',
        }}
        showsVerticalScrollIndicator={false}
      >
        {isSuccess && (
          <>
            {/* Success State */}
            <View style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: '#DCFCE7',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 32,
            }}>
              <Ionicons name="checkmark-circle" size={80} color="#16A34A" />
            </View>

            <Text style={{
              fontFamily: 'Inter_700Bold',
              fontSize: 28,
              color: colors.text,
              textAlign: 'center',
              marginBottom: 12,
            }}>
              Vote Successfully Recorded!
            </Text>

            <Text style={{
              fontFamily: 'Inter_400Regular',
              fontSize: 16,
              color: colors.textSecondary,
              textAlign: 'center',
              marginBottom: 32,
              lineHeight: 24,
            }}>
              Your vote has been securely submitted and recorded in the blockchain ledger.
            </Text>

            {/* Vote Summary */}
            <View style={{
              width: '100%',
              backgroundColor: colors.cardBackground,
              borderRadius: 20,
              padding: 24,
              marginBottom: 32,
              borderWidth: 2,
              borderColor: '#16A34A',
            }}>
              <Text style={{
                fontFamily: 'Inter_600SemiBold',
                fontSize: 18,
                color: colors.text,
                textAlign: 'center',
                marginBottom: 20,
              }}>
                Vote Summary
              </Text>

              <View style={{
                alignItems: 'center',
                marginBottom: 20,
              }}>
                <View style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: colors.primary + '20',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 12,
                }}>
                  <Ionicons name="person" size={30} color={colors.primary} />
                </View>
                
                <Text style={{
                  fontFamily: 'Inter_600SemiBold',
                  fontSize: 20,
                  color: colors.text,
                  textAlign: 'center',
                  marginBottom: 4,
                }}>
                  {candidateName}
                </Text>
                
                <View style={{
                  backgroundColor: colors.primary,
                  borderRadius: 12,
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                }}>
                  <Text style={{
                    fontFamily: 'Inter_500Medium',
                    fontSize: 14,
                    color: colors.primaryText,
                  }}>
                    {candidateParty}
                  </Text>
                </View>
              </View>

              <View style={{
                backgroundColor: colors.surfaceSecondary,
                borderRadius: 12,
                padding: 16,
              }}>
                <View style={{ gap: 12 }}>
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
                      Vote ID:
                    </Text>
                    <Text style={{
                      fontFamily: 'Inter_500Medium',
                      fontSize: 14,
                      color: colors.text,
                      fontFamily: 'monospace',
                    }}>
                      {voteId}
                    </Text>
                  </View>
                  
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{
                      fontFamily: 'Inter_400Regular',
                      fontSize: 14,
                      color: colors.textSecondary,
                    }}>
                      Confirmation:
                    </Text>
                    <Text style={{
                      fontFamily: 'Inter_600SemiBold',
                      fontSize: 14,
                      color: '#16A34A',
                      fontFamily: 'monospace',
                    }}>
                      {confirmationCode}
                    </Text>
                  </View>
                  
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{
                      fontFamily: 'Inter_400Regular',
                      fontSize: 14,
                      color: colors.textSecondary,
                    }}>
                      Timestamp:
                    </Text>
                    <Text style={{
                      fontFamily: 'Inter_500Medium',
                      fontSize: 14,
                      color: colors.text,
                    }}>
                      {new Date().toLocaleString()}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Security Badge */}
            <View style={{
              backgroundColor: '#EFF6FF',
              borderRadius: 16,
              padding: 20,
              marginBottom: 32,
              width: '100%',
            }}>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 12,
              }}>
                <Ionicons name="shield-checkmark" size={24} color="#2563EB" />
                <Text style={{
                  fontFamily: 'Inter_600SemiBold',
                  fontSize: 16,
                  color: '#2563EB',
                  marginLeft: 8,
                }}>
                  Your Vote is Secure
                </Text>
              </View>
              
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 14,
                color: '#1E40AF',
                lineHeight: 20,
              }}>
                Your vote has been encrypted and added to the immutable blockchain ledger. It is now anonymous and cannot be traced back to your identity.
              </Text>
            </View>

            {/* Action Buttons */}
            <View style={{ width: '100%', gap: 12 }}>
              <TouchableOpacity
                onPress={handleViewResults}
                style={{
                  backgroundColor: colors.primary,
                  borderRadius: 16,
                  paddingVertical: 16,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}
              >
                <Ionicons name="bar-chart" size={24} color={colors.primaryText} />
                <Text style={{
                  fontFamily: 'Inter_600SemiBold',
                  fontSize: 16,
                  color: colors.primaryText,
                  marginLeft: 8,
                }}>
                  View Live Results
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleBackToDashboard}
                style={{
                  backgroundColor: colors.surfaceSecondary,
                  borderRadius: 16,
                  paddingVertical: 16,
                  alignItems: 'center',
                }}
              >
                <Text style={{
                  fontFamily: 'Inter_500Medium',
                  fontSize: 16,
                  color: colors.text,
                }}>
                  Back to Dashboard
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {isPending && (
          <>
            {/* Pending State */}
            <View style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: '#FFFBEB',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 32,
            }}>
              <Ionicons name="time" size={80} color="#D97706" />
            </View>

            <Text style={{
              fontFamily: 'Inter_700Bold',
              fontSize: 28,
              color: colors.text,
              textAlign: 'center',
              marginBottom: 12,
            }}>
              Vote Pending
            </Text>

            <Text style={{
              fontFamily: 'Inter_400Regular',
              fontSize: 16,
              color: colors.textSecondary,
              textAlign: 'center',
              marginBottom: 32,
              lineHeight: 24,
            }}>
              Your vote is currently being processed. This may take a few moments.
            </Text>

            {/* Vote Summary (Optional, can be simplified for pending) */}
            <View style={{
              width: '100%',
              backgroundColor: colors.cardBackground,
              borderRadius: 20,
              padding: 24,
              marginBottom: 32,
              borderWidth: 2,
              borderColor: '#D97706',
            }}>
              <Text style={{
                fontFamily: 'Inter_600SemiBold',
                fontSize: 18,
                color: colors.text,
                textAlign: 'center',
                marginBottom: 20,
              }}>
                Vote Details
              </Text>

              <View style={{
                alignItems: 'center',
                marginBottom: 20,
              }}>
                <View style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: colors.primary + '20',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 12,
                }}>
                  <Ionicons name="person" size={30} color={colors.primary} />
                </View>
                
                <Text style={{
                  fontFamily: 'Inter_600SemiBold',
                  fontSize: 20,
                  color: colors.text,
                  textAlign: 'center',
                  marginBottom: 4,
                }}>
                  {candidateName}
                </Text>
                
                <View style={{
                  backgroundColor: colors.primary,
                  borderRadius: 12,
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                }}>
                  <Text style={{
                    fontFamily: 'Inter_500Medium',
                    fontSize: 14,
                    color: colors.primaryText,
                  }}>
                    {candidateParty}
                  </Text>
                </View>
              </View>

              <View style={{
                backgroundColor: colors.surfaceSecondary,
                borderRadius: 12,
                padding: 16,
              }}>
                <View style={{ gap: 12 }}>
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
                      Timestamp:
                    </Text>
                    <Text style={{
                      fontFamily: 'Inter_500Medium',
                      fontSize: 14,
                      color: colors.text,
                    }}>
                      {new Date().toLocaleString()}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={{ width: '100%', gap: 12 }}>
              <TouchableOpacity
                onPress={handleRetry}
                style={{
                  backgroundColor: colors.primary,
                  borderRadius: 16,
                  paddingVertical: 16,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}
              >
                <Ionicons name="refresh" size={24} color={colors.primaryText} />
                <Text style={{
                  fontFamily: 'Inter_600SemiBold',
                  fontSize: 16,
                  color: colors.primaryText,
                  marginLeft: 8,
                }}>
                  Try Again
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleContactSupport}
                style={{
                  backgroundColor: colors.surfaceSecondary,
                  borderRadius: 16,
                  paddingVertical: 16,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}
              >
                <Ionicons name="help-circle" size={24} color={colors.text} />
                <Text style={{
                  fontFamily: 'Inter_500Medium',
                  fontSize: 16,
                  color: colors.text,
                  marginLeft: 8,
                }}>
                  Contact Support
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleBackToDashboard}
                style={{
                  backgroundColor: 'transparent',
                  borderRadius: 16,
                  paddingVertical: 16,
                  alignItems: 'center',
                }}
              >
                <Text style={{
                  fontFamily: 'Inter_500Medium',
                  fontSize: 16,
                  color: colors.textSecondary,
                }}>
                  Back to Dashboard
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {isFailed && (
          <>
            {/* Error State */}
            <View style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: '#FEE2E2',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 32,
            }}>
              <Ionicons name="close-circle" size={80} color="#DC2626" />
            </View>

            <Text style={{
              fontFamily: 'Inter_700Bold',
              fontSize: 28,
              color: colors.text,
              textAlign: 'center',
              marginBottom: 12,
            }}>
              Vote Submission Failed
            </Text>

            <Text style={{
              fontFamily: 'Inter_400Regular',
              fontSize: 16,
              color: colors.textSecondary,
              textAlign: 'center',
              marginBottom: 32,
              lineHeight: 24,
            }}>
              We encountered an issue while submitting your vote. Please try again or contact support.
            </Text>

            {/* Error Details */}
            <View style={{
              width: '100%',
              backgroundColor: '#FEE2E2',
              borderRadius: 16,
              padding: 20,
              marginBottom: 32,
              borderLeftWidth: 4,
              borderLeftColor: '#DC2626',
            }}>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 12,
              }}>
                <Ionicons name="warning" size={24} color="#DC2626" />
                <Text style={{
                  fontFamily: 'Inter_600SemiBold',
                  fontSize: 16,
                  color: '#DC2626',
                  marginLeft: 8,
                }}>
                  Error Details
                </Text>
              </View>
              
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 14,
                color: '#991B1B',
                lineHeight: 20,
              }}>
                {error || 'Network connection error. Please check your internet connection and try again.'}
              </Text>
            </View>

            {/* Troubleshooting */}
            <View style={{
              width: '100%',
              backgroundColor: colors.cardBackground,
              borderRadius: 16,
              padding: 20,
              marginBottom: 32,
            }}>
              <Text style={{
                fontFamily: 'Inter_600SemiBold',
                fontSize: 16,
                color: colors.text,
                marginBottom: 12,
              }}>
                Troubleshooting Steps
              </Text>
              
              <View style={{ gap: 8 }}>
                <Text style={{
                  fontFamily: 'Inter_400Regular',
                  fontSize: 14,
                  color: colors.text,
                }}>
                  • Check your internet connection
                </Text>
                <Text style={{
                  fontFamily: 'Inter_400Regular',
                  fontSize: 14,
                  color: colors.text,
                }}>
                  • Ensure you haven't already voted in this election
                </Text>
                <Text style={{
                  fontFamily: 'Inter_400Regular',
                  fontSize: 14,
                  color: colors.text,
                }}>
                  • Try again after a few minutes
                </Text>
                <Text style={{
                  fontFamily: 'Inter_400Regular',
                  fontSize: 14,
                  color: colors.text,
                }}>
                  • Contact support if the issue persists
                </Text>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={{ width: '100%', gap: 12 }}>
              <TouchableOpacity
                onPress={handleRetry}
                style={{
                  backgroundColor: colors.primary,
                  borderRadius: 16,
                  paddingVertical: 16,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}
              >
                <Ionicons name="refresh" size={24} color={colors.primaryText} />
                <Text style={{
                  fontFamily: 'Inter_600SemiBold',
                  fontSize: 16,
                  color: colors.primaryText,
                  marginLeft: 8,
                }}>
                  Try Again
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleContactSupport}
                style={{
                  backgroundColor: colors.surfaceSecondary,
                  borderRadius: 16,
                  paddingVertical: 16,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}
              >
                <Ionicons name="help-circle" size={24} color={colors.text} />
                <Text style={{
                  fontFamily: 'Inter_500Medium',
                  fontSize: 16,
                  color: colors.text,
                  marginLeft: 8,
                }}>
                  Contact Support
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleBackToDashboard}
                style={{
                  backgroundColor: 'transparent',
                  borderRadius: 16,
                  paddingVertical: 16,
                  alignItems: 'center',
                }}
              >
                <Text style={{
                  fontFamily: 'Inter_500Medium',
                  fontSize: 16,
                  color: colors.textSecondary,
                }}>
                  Back to Dashboard
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}
