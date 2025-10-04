import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from "@/context/ThemeContext";

export default function LiveResultsScreen() {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  
  const [results, setResults] = useState([]);
  const [electionStats, setElectionStats] = useState({});
  const [selectedElection, setSelectedElection] = useState('presidential');
  const [selectedRegion, setSelectedRegion] = useState('national');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const elections = [
    { id: 'presidential', name: 'Presidential', icon: 'flag-outline' },
    { id: 'governmental', name: 'Governmental', icon: 'business-outline' },
    { id: 'local', name: 'Local Government', icon: 'home-outline' },
  ];

  const regions = [
    { id: 'national', name: 'National' },
    { id: 'region1', name: 'Region 1' },
    { id: 'region2', name: 'Region 2' },
    { id: 'region3', name: 'Region 3' },
    { id: 'region4', name: 'Region 4' },
  ];

  useEffect(() => {
    fetchResults();
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      fetchResults(true);
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [selectedElection, selectedRegion]);

  const fetchResults = async (isBackground = false) => {
    if (!isBackground) setLoading(true);
    
    // Dummy API call
    setTimeout(() => {
      const mockResults = {
        presidential: [
          {
            id: 1,
            name: 'Candidate Alpha',
            party: 'Party A',
            votes: 15420000,
            percentage: 38.5,
            color: '#3B82F6'
          },
          {
            id: 2,
            name: 'Candidate Beta',
            party: 'Party B',
            votes: 11526000,
            percentage: 28.8,
            color: '#10B981'
          },
          {
            id: 3,
            name: 'Candidate Gamma',
            party: 'Party C',
            votes: 8500000,
            percentage: 21.2,
            color: '#F59E0B'
          },
          {
            id: 4,
            name: 'Candidate Delta',
            party: 'Party D',
            votes: 4554000,
            percentage: 11.5,
            color: '#8B5CF6'
          }
        ],
        governmental: [
          {
            id: 1,
            name: 'Candidate Epsilon',
            party: 'Party A',
            votes: 2100000,
            percentage: 62.1,
            color: '#3B82F6'
          },
          {
            id: 2,
            name: 'Candidate Zeta',
            party: 'Party B',
            votes: 800000,
            percentage: 23.7,
            color: '#10B981'
          },
          {
            id: 3,
            name: 'Candidate Eta',
            party: 'Party C',
            votes: 480000,
            percentage: 14.2,
            color: '#F59E0B'
          }
        ]
      };

      const stats = {
        totalVotes: selectedElection === 'presidential' ? 40000000 : 3380000,
        voterTurnout: selectedElection === 'presidential' ? '72.3%' : '68.9%',
        reportingUnits: selectedElection === 'presidential' ? '99.2%' : '97.8%',
        totalRegistered: selectedElection === 'presidential' ? 55300000 : 4900000
      };

      setResults(mockResults[selectedElection] || []);
      setElectionStats(stats);
      setLastUpdate(new Date());
      setLoading(false);
      setRefreshing(false);
    }, isBackground ? 500 : 1000);
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchResults();
  };

  const getMaxVotes = () => {
    return Math.max(...results.map(r => r.votes));
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
            Live Election Results
          </Text>

          <TouchableOpacity onPress={onRefresh}>
            <Ionicons name="refresh" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Live Status Indicator */}
        <View style={{
          backgroundColor: '#DCFCE7',
          borderRadius: 12,
          padding: 16,
          marginBottom: 24,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <View style={{
            width: 12,
            height: 12,
            borderRadius: 6,
            backgroundColor: '#16A34A',
            marginRight: 12,
          }} />
          <View style={{ flex: 1 }}>
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 16,
              color: '#15803D',
              marginBottom: 2,
            }}>
              Live Results
            </Text>
            <Text style={{
              fontFamily: 'Inter_400Regular',
              fontSize: 14,
              color: '#15803D',
            }}>
              Last updated: {lastUpdate.toLocaleTimeString()}
            </Text>
          </View>
        </View>

        {/* Election Type Selector */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 16,
            color: colors.text,
            marginBottom: 12,
          }}>
            Election Type
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              {elections.map((election) => (
                <TouchableOpacity
                  key={election.id}
                  onPress={() => setSelectedElection(election.id)}
                  style={{
                    backgroundColor: selectedElection === election.id ? colors.primary : colors.cardBackground,
                    borderRadius: 12,
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Ionicons 
                    name={election.icon} 
                    size={20} 
                    color={selectedElection === election.id ? colors.primaryText : colors.text} 
                  />
                  <Text style={{
                    fontFamily: 'Inter_500Medium',
                    fontSize: 14,
                    color: selectedElection === election.id ? colors.primaryText : colors.text,
                    marginLeft: 8,
                  }}>
                    {election.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Region Selector */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 16,
            color: colors.text,
            marginBottom: 12,
          }}>
            Region
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              {regions.map((region) => (
                <TouchableOpacity
                  key={region.id}
                  onPress={() => setSelectedRegion(region.id)}
                  style={{
                    backgroundColor: selectedRegion === region.id ? colors.primary : colors.cardBackground,
                    borderRadius: 12,
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                  }}
                >
                  <Text style={{
                    fontFamily: 'Inter_500Medium',
                    fontSize: 14,
                    color: selectedRegion === region.id ? colors.primaryText : colors.text,
                  }}>
                    {region.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Election Stats */}
        <View style={{
          backgroundColor: colors.cardBackground,
          borderRadius: 16,
          padding: 20,
          marginBottom: 24,
        }}>
          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 18,
            color: colors.text,
            marginBottom: 16,
          }}>
            Election Overview
          </Text>
          
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
          }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{
                fontFamily: 'Inter_700Bold',
                fontSize: 24,
                color: colors.primary,
              }}>
                {electionStats.totalVotes?.toLocaleString() || '0'}
              </Text>
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 12,
                color: colors.textSecondary,
                textAlign: 'center',
              }}>
                Total Votes{'\n'}Cast
              </Text>
            </View>

            <View style={{ alignItems: 'center' }}>
              <Text style={{
                fontFamily: 'Inter_700Bold',
                fontSize: 24,
                color: '#10B981',
              }}>
                {electionStats.voterTurnout || '0%'}
              </Text>
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 12,
                color: colors.textSecondary,
                textAlign: 'center',
              }}>
                Voter{'\n'}Turnout
              </Text>
            </View>

            <View style={{ alignItems: 'center' }}>
              <Text style={{
                fontFamily: 'Inter_700Bold',
                fontSize: 24,
                color: '#F59E0B',
              }}>
                {electionStats.reportingUnits || '0%'}
              </Text>
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 12,
                color: colors.textSecondary,
                textAlign: 'center',
              }}>
                Reporting{'\n'}Units
              </Text>
            </View>

            <View style={{ alignItems: 'center' }}>
              <Text style={{
                fontFamily: 'Inter_700Bold',
                fontSize: 24,
                color: '#8B5CF6',
              }}>
                {electionStats.totalRegistered?.toLocaleString() || '0'}
              </Text>
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 12,
                color: colors.textSecondary,
                textAlign: 'center',
              }}>
                Registered{'\n'}Voters
              </Text>
            </View>
          </View>
        </View>

        {/* Results */}
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
              Loading results...
            </Text>
          </View>
        ) : (
          <View>
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 20,
              color: colors.text,
              marginBottom: 16,
            }}>
              Candidate Results
            </Text>

            <View style={{ gap: 16 }}>
              {results.map((candidate, index) => {
                const maxVotes = getMaxVotes();
                const barWidth = (candidate.votes / maxVotes) * 100;
                const isLeading = candidate.votes === maxVotes;

                return (
                  <View
                    key={candidate.id}
                    style={{
                      backgroundColor: colors.cardBackground,
                      borderRadius: 16,
                      padding: 20,
                      borderWidth: isLeading ? 2 : 1,
                      borderColor: isLeading ? '#10B981' : colors.border,
                    }}
                  >
                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 12,
                    }}>
                      <View style={{
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: candidate.color,
                        marginRight: 12,
                      }} />
                      
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
                            {candidate.name}
                          </Text>
                          
                          {isLeading && (
                            <View style={{
                              backgroundColor: '#DCFCE7',
                              borderRadius: 8,
                              paddingHorizontal: 8,
                              paddingVertical: 4,
                            }}>
                              <Text style={{
                                fontFamily: 'Inter_600SemiBold',
                                fontSize: 12,
                                color: '#15803D',
                              }}>
                                LEADING
                              </Text>
                            </View>
                          )}
                        </View>
                        
                        <Text style={{
                          fontFamily: 'Inter_500Medium',
                          fontSize: 14,
                          color: colors.primary,
                        }}>
                          {candidate.party}
                        </Text>
                      </View>
                    </View>

                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 12,
                    }}>
                      <Text style={{
                        fontFamily: 'Inter_700Bold',
                        fontSize: 20,
                        color: colors.text,
                      }}>
                        {candidate.votes.toLocaleString()}
                      </Text>
                      
                      <Text style={{
                        fontFamily: 'Inter_600SemiBold',
                        fontSize: 18,
                        color: candidate.color,
                      }}>
                        {candidate.percentage}%
                      </Text>
                    </View>

                    {/* Progress Bar */}
                    <View style={{
                      height: 8,
                      backgroundColor: colors.surfaceSecondary,
                      borderRadius: 4,
                      overflow: 'hidden',
                    }}>
                      <View style={{
                        height: '100%',
                        width: `${barWidth}%`,
                        backgroundColor: candidate.color,
                        borderRadius: 4,
                      }} />
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {/* Chart Toggle */}
        <View style={{
          backgroundColor: colors.cardBackground,
          borderRadius: 16,
          padding: 20,
          marginTop: 24,
        }}>
          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 16,
            color: colors.text,
            marginBottom: 16,
          }}>
            View Options
          </Text>
          
          <View style={{ gap: 12 }}>
            <TouchableOpacity
              style={{
                backgroundColor: colors.surfaceSecondary,
                borderRadius: 12,
                padding: 16,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="pie-chart-outline" size={20} color={colors.primary} />
                <Text style={{
                  fontFamily: 'Inter_500Medium',
                  fontSize: 16,
                  color: colors.text,
                  marginLeft: 12,
                }}>
                  Pie Chart View
                </Text>
              </View>
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 14,
                color: colors.textSecondary,
              }}>
                Coming Soon
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: colors.surfaceSecondary,
                borderRadius: 12,
                padding: 16,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="map-outline" size={20} color={colors.primary} />
                <Text style={{
                  fontFamily: 'Inter_500Medium',
                  fontSize: 16,
                  color: colors.text,
                  marginLeft: 12,
                }}>
                  Map View
                </Text>
              </View>
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 14,
                color: colors.textSecondary,
              }}>
                Coming Soon
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Disclaimer */}
        <View style={{
          backgroundColor: '#FEF3C7',
          borderRadius: 12,
          padding: 16,
          marginTop: 24,
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
          }}>
            <Ionicons name="information-circle" size={20} color="#D97706" style={{ marginRight: 8, marginTop: 2 }} />
            <Text style={{
              fontFamily: 'Inter_400Regular',
              fontSize: 14,
              color: '#92400E',
              flex: 1,
              lineHeight: 20,
            }}>
              Results are preliminary and subject to change. Official results will be announced by the Election Commission.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
