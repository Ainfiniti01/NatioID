import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from "@/context/ThemeContext";

export default function ElectionTypesScreen() {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    fetchElections();
  }, []);

  const fetchElections = async () => {
    // Dummy API call
    setTimeout(() => {
      setElections([
        {
          id: 1,
          type: 'Presidential',
          title: '2024 National Presidential Election',
          date: '2024-12-15T09:00:00Z',
          endDate: '2024-12-15T17:00:00Z',
          status: 'active',
          icon: 'flag-outline',
          description: 'Choose the next President of Our Country'
        },
        {
          id: 2,
          type: 'Governmental',
          title: 'Provincial Governmental Election',
          date: '2024-11-20T08:00:00Z',
          endDate: '2024-11-20T16:00:00Z',
          status: 'upcoming',
          icon: 'business-outline',
          description: 'Choose the next Governor of A Province'
        },
        {
          id: 3,
          type: 'Regional Government',
          title: 'Regional Chairman Election',
          date: '2024-10-10T08:00:00Z',
          endDate: '2024-10-10T16:00:00Z',
          status: 'closed',
          icon: 'home-outline',
          description: 'Choose your Regional Government Chairman'
        },
        {
          id: 4,
          type: 'Party Primaries',
          title: 'National Party Primaries',
          date: '2024-09-25T10:00:00Z',
          endDate: '2024-09-25T15:00:00Z',
          status: 'closed',
          icon: 'people-outline',
          description: 'Generic Party Presidential Primary Election'
        }
      ]);
      setLoading(false);
    }, 1000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return { bg: '#EFF6FF', text: '#1D4ED8', border: '#3B82F6' };
      case 'upcoming': return { bg: '#FEF3C7', text: '#D97706', border: '#F59E0B' };
      case 'closed': return { bg: '#F3F4F6', text: '#6B7280', border: '#9CA3AF' };
      default: return { bg: '#F3F4F6', text: '#6B7280', border: '#9CA3AF' };
    }
  };

  const getCountdown = (date) => {
    const now = new Date();
    const electionDate = new Date(date);
    const diff = electionDate - now;
    
    if (diff <= 0) return null;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const handleElectionSelect = (election) => {
    if (election.status === 'closed') {
      Alert.alert('Election Closed', 'This election has ended. You can view the results from the Live Results page.');
      return;
    }
    
    if (election.status === 'upcoming') {
      Alert.alert('Election Not Active', 'This election is not yet active. Please wait for the election to start.');
      return;
    }

    router.push({
      pathname: '/voting/candidate-selection',
      params: { electionId: election.id, electionType: election.type }
    });
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
          marginBottom: 24,
        }}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>

          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 18,
            color: colors.text,
          }}>
            Choose Election Type
          </Text>

          <TouchableOpacity onPress={() => router.push('/voting/live-results')}>
            <Ionicons name="bar-chart-outline" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Election Notice */}
        <View style={{
          backgroundColor: colors.primary,
          borderRadius: 16,
          padding: 20,
          marginBottom: 24,
          alignItems: 'center',
        }}>
          <Ionicons name="shield-checkmark" size={48} color={colors.primaryText} />
          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 18,
            color: colors.primaryText,
            textAlign: 'center',
            marginTop: 12,
            marginBottom: 8,
          }}>
            Secure Digital Voting
          </Text>
          <Text style={{
            fontFamily: 'Inter_400Regular',
            fontSize: 14,
            color: colors.primaryText,
            textAlign: 'center',
            opacity: 0.9,
          }}>
            Your vote is encrypted and anonymous. Each citizen can vote only once per election.
          </Text>
        </View>

        {/* Elections List */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 20,
            color: colors.text,
            marginBottom: 16,
          }}>
            Available Elections
          </Text>

          {loading ? (
            <View style={{
              backgroundColor: colors.cardBackground,
              borderRadius: 16,
              padding: 20,
              alignItems: 'center',
            }}>
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 16,
                color: colors.textSecondary,
              }}>
                Loading elections...
              </Text>
            </View>
          ) : (
            <View style={{ gap: 16 }}>
              {elections.map((election) => {
                const statusStyle = getStatusColor(election.status);
                const countdown = getCountdown(election.date);
                const isActive = election.status === 'active';
                const isUpcoming = election.status === 'upcoming';
                const isClosed = election.status === 'closed';

                return (
                  <TouchableOpacity
                    key={election.id}
                    onPress={() => handleElectionSelect(election)}
                    style={{
                      backgroundColor: colors.cardBackground,
                      borderRadius: 16,
                      padding: 20,
                      borderWidth: 2,
                      borderColor: isActive ? colors.primary : colors.border,
                      opacity: isClosed ? 0.6 : 1,
                    }}
                  >
                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      marginBottom: 12,
                    }}>
                      <View style={{
                        width: 48,
                        height: 48,
                        borderRadius: 24,
                        backgroundColor: isActive ? colors.primary + '20' : colors.surfaceSecondary,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 16,
                      }}>
                        <Ionicons 
                          name={election.icon} 
                          size={24} 
                          color={isActive ? colors.primary : colors.textSecondary} 
                        />
                      </View>

                      <View style={{ flex: 1 }}>
                        <View style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginBottom: 4,
                        }}>
                          <Text style={{
                            fontFamily: 'Inter_600SemiBold',
                            fontSize: 16,
                            color: colors.text,
                            flex: 1,
                          }}>
                            {election.title}
                          </Text>

                          <View style={{
                            backgroundColor: statusStyle.bg,
                            borderWidth: 1,
                            borderColor: statusStyle.border,
                            borderRadius: 12,
                            paddingHorizontal: 8,
                            paddingVertical: 4,
                          }}>
                            <Text style={{
                              fontFamily: 'Inter_500Medium',
                              fontSize: 12,
                              color: statusStyle.text,
                            }}>
                              {election.status.toUpperCase()}
                            </Text>
                          </View>
                        </View>

                        <Text style={{
                          fontFamily: 'Inter_400Regular',
                          fontSize: 14,
                          color: colors.textSecondary,
                          marginBottom: 8,
                        }}>
                          {election.description}
                        </Text>

                        <View style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                          <Text style={{
                            fontFamily: 'Inter_400Regular',
                            fontSize: 12,
                            color: colors.textSecondary,
                          }}>
                            {new Date(election.date).toLocaleDateString()} • {new Date(election.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </Text>

                          {isUpcoming && countdown && (
                            <Text style={{
                              fontFamily: 'Inter_500Medium',
                              fontSize: 12,
                              color: '#D97706',
                            }}>
                              Starts in {countdown}
                            </Text>
                          )}

                          {isActive && (
                            <Text style={{
                              fontFamily: 'Inter_500Medium',
                              fontSize: 12,
                              color: colors.primary,
                            }}>
                              VOTE NOW
                            </Text>
                          )}
                        </View>
                      </View>
                    </View>

                    {isActive && (
                      <View style={{
                        backgroundColor: colors.primary + '10',
                        borderRadius: 8,
                        padding: 12,
                        marginTop: 8,
                      }}>
                        <Text style={{
                          fontFamily: 'Inter_500Medium',
                          fontSize: 14,
                          color: colors.primary,
                          textAlign: 'center',
                        }}>
                          Tap to participate in this election
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>

        {/* Quick Stats */}
        <View style={{
          backgroundColor: colors.cardBackground,
          borderRadius: 16,
          padding: 20,
        }}>
          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 16,
            color: colors.text,
            marginBottom: 16,
          }}>
            Your Voting History
          </Text>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{
                fontFamily: 'Inter_700Bold',
                fontSize: 24,
                color: colors.primary,
              }}>
                3
              </Text>
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 12,
                color: colors.textSecondary,
                textAlign: 'center',
              }}>
                Elections{'\n'}Participated
              </Text>
            </View>

            <View style={{ alignItems: 'center' }}>
              <Text style={{
                fontFamily: 'Inter_700Bold',
                fontSize: 24,
                color: '#10B981',
              }}>
                1
              </Text>
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 12,
                color: colors.textSecondary,
                textAlign: 'center',
              }}>
                Active{'\n'}Elections
              </Text>
            </View>

            <View style={{ alignItems: 'center' }}>
              <Text style={{
                fontFamily: 'Inter_700Bold',
                fontSize: 24,
                color: '#F59E0B',
              }}>
              1
              </Text>
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 12,
                color: colors.textSecondary,
                textAlign: 'center',
              }}>
                Upcoming{'\n'}Elections
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
