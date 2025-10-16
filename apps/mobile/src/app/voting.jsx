import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from "@/context/ThemeContext";

const voterInfo = {
  pvc: 'PVC123456789',
  pollingUnit: 'PU 001 - Main School',
  ward: 'Ward 01',
  region: 'Central Region',
  province: 'Capital Province',
  registrationDate: '2023-02-15',
  status: 'verified'
};

export default function VotingScreen() {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('elections');
  
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
          title: 'National Presidential Election',
          country: 'Our Country',
          date: '2024-12-15T09:00:00Z',
          endDate: '2024-12-15T17:00:00Z',
          status: 'active',
          icon: 'flag-outline',
          description: 'Choose the next President of Our Country'
        },
        {
          id: 2,
          type: 'Parliamentary',
          title: 'National Parliamentary Election',
          country: 'Our Country',
          date: '2024-11-20T08:00:00Z',
          endDate: '2024-11-20T16:00:00Z',
          status: 'upcoming',
          icon: 'business-outline',
          description: 'Choose the next Parliament members of Our Country'
        },
        {
          id: 3,
          type: 'Presidential',
          title: 'State Presidential Election',
          country: 'Our Country',
          date: '2024-10-10T08:00:00Z',
          endDate: '2024-10-10T16:00:00Z',
          status: 'closed',
          icon: 'home-outline',
          description: 'Choose the next President of a State'
        },
        {
          id: 4,
          type: 'Presidential Primary',
          title: 'National Party Primaries',
          country: 'Our Country',
          date: '2024-09-25T10:00:00Z',
          endDate: '2024-09-25T15:00:00Z',
          status: 'closed',
          icon: 'people-outline',
          description: 'Primary Election for Presidential Candidates'
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

  const handleViewResultsPress = () => {
    Alert.alert('View Official Results', 'View official election results and statistics');
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
      <StatusBar style={isDark ? "light" : "dark"} />
      
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
          marginBottom: 24
        }}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          
          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 18,
            color: colors.text
          }}>
            Voting Services
          </Text>
          
          <TouchableOpacity onPress={() => router.push('/voting/live-results')}>
            <Ionicons name="bar-chart-outline" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Civic Engagement Stats (Replaced by Your Voting History) */}
        <View style={{
          backgroundColor: colors.cardBackground,
          borderRadius: 16,
          padding: 20,
          marginBottom: 24,
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

        {/* Tab Navigation */}
        <View style={{
          flexDirection: 'row',
          backgroundColor: colors.surfaceSecondary,
          borderRadius: 12,
          padding: 4,
          marginBottom: 24
        }}>
          {[
            { id: 'elections', label: 'Elections' },
            { id: 'registration', label: 'Registration' },
            { id: 'results', label: 'Results' }
          ].map((tab) => (
            <TouchableOpacity
              key={tab.id}
              onPress={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                paddingVertical: 8,
                borderRadius: 8,
                backgroundColor: activeTab === tab.id ? colors.primary : 'transparent'
              }}
            >
              <Text style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 14,
                color: activeTab === tab.id ? colors.primaryText : colors.text,
                textAlign: 'center'
              }}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Elections Tab (Replaced Content) */}
        {activeTab === 'elections' && (
          <>
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
          </>
        )}

        {/* Registration Tab */}
        {activeTab === 'registration' && (
          <>
            {/* Voter Information Card */}
            <View style={{
              backgroundColor: colors.cardBackground,
              borderRadius: 16,
              padding: 20,
              marginBottom: 24,
              borderWidth: 1,
              borderColor: colors.border
            }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <Text style={{
                  fontFamily: 'Inter_600SemiBold',
                  fontSize: 16,
                  color: colors.text
                }}>
                  Your Voter Information
                </Text>
                
                <View style={{
                  backgroundColor: '#ECFDF5',
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 8
                }}>
                  <Text style={{
                    fontFamily: 'Inter_500Medium',
                    fontSize: 10,
                    color: '#059669'
                  }}>
                    Verified
                  </Text>
                </View>
              </View>

              <View style={{ marginBottom: 12 }}>
                <Text style={{
                  fontFamily: 'Inter_400Regular',
                  fontSize: 12,
                  color: colors.textSecondary
                }}>
                  PVC Number
                </Text>
                <Text style={{
                  fontFamily: 'Inter_600SemiBold',
                  fontSize: 16,
                  color: colors.text
                }}>
                  {voterInfo.pvc}
                </Text>
              </View>

              <View style={{ marginBottom: 12 }}>
                <Text style={{
                  fontFamily: 'Inter_400Regular',
                  fontSize: 12,
                  color: colors.textSecondary
                }}>
                  Polling Unit
                </Text>
                <Text style={{
                  fontFamily: 'Inter_500Medium',
                  fontSize: 14,
                  color: colors.text
                }}>
                  {voterInfo.pollingUnit}
                </Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                  <Text style={{
                    fontFamily: 'Inter_400Regular',
                    fontSize: 12,
                    color: colors.textSecondary
                  }}>
                    Ward
                  </Text>
                  <Text style={{
                    fontFamily: 'Inter_500Medium',
                    fontSize: 14,
                    color: colors.text
                  }}>
                    {voterInfo.ward}
                  </Text>
                </View>
                
                <View>
                  <Text style={{
                    fontFamily: 'Inter_400Regular',
                    fontSize: 12,
                    color: colors.textSecondary
                  }}>
                    Region
                  </Text>
                  <Text style={{
                    fontFamily: 'Inter_500Medium',
                    fontSize: 14,
                    color: colors.text
                  }}>
                    {voterInfo.region}
                  </Text>
                </View>
                
                <View>
                  <Text style={{
                    fontFamily: 'Inter_400Regular',
                    fontSize: 12,
                    color: colors.textSecondary
                  }}>
                    Province
                  </Text>
                  <Text style={{
                    fontFamily: 'Inter_500Medium',
                    fontSize: 14,
                    color: colors.text
                  }}>
                    {voterInfo.province}
                  </Text>
                </View>
              </View>
            </View>

            {/* Registration Actions */}
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 18,
              color: colors.text,
              marginBottom: 16
            }}>
              Voter Registration Services
            </Text>

            <View style={{
              backgroundColor: colors.cardBackground,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: colors.border,
              overflow: 'hidden'
            }}>
              {[
                { name: 'Update Voter Information', icon: 'create-outline', action: 'update' },
                { name: 'Change Polling Unit', icon: 'location-outline', action: 'change-unit' },
                { name: 'Replace Lost PVC', icon: 'card-outline', action: 'replace-pvc' },
                { name: 'Voter Education', icon: 'school-outline', action: 'education' }
              ].map((service, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => Alert.alert(service.name, 'This service would redirect to the appropriate form or information.')}
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 16,
                    borderBottomWidth: index < 3 ? 1 : 0,
                    borderBottomColor: colors.border,
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}
                >
                  <View style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: colors.primary + '20',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 16
                  }}>
                    <Ionicons name={service.icon} size={20} color={colors.primary} />
                  </View>

                  <Text style={{
                    fontFamily: 'Inter_500Medium',
                    fontSize: 15,
                    color: colors.text,
                    flex: 1
                  }}>
                    {service.name}
                  </Text>
                  
                  <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        {/* Results Tab */}
        {activeTab === 'results' && (
          <>
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 18,
              color: colors.text,
              marginBottom: 16
            }}>
              Election Results
            </Text>
            
            <TouchableOpacity
              onPress={() => Alert.alert('View Official Results', 'View official election results and statistics')}
              style={{
                backgroundColor: colors.cardBackground,
                borderRadius: 16,
                padding: 20,
                marginBottom: 16,
                borderWidth: 1,
                borderColor: colors.border,
                alignItems: 'center'
              }}
            >
              <Ionicons name="bar-chart-outline" size={48} color={colors.primary} />
              <Text style={{
                fontFamily: 'Inter_600SemiBold',
                fontSize: 16,
                color: colors.text,
                marginTop: 12,
                marginBottom: 8
              }}>
                View Official Results
              </Text>
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 14,
                color: colors.textSecondary,
                textAlign: 'center'
              }}>
                Access verified election results and statistics from INEC
              </Text>
            </TouchableOpacity>

            <View style={{
              backgroundColor: colors.surfaceSecondary,
              borderRadius: 16,
              padding: 20,
              alignItems: 'center'
            }}>
              <Ionicons name="information-circle-outline" size={32} color={colors.primary} />
              <Text style={{
                fontFamily: 'Inter_600SemiBold',
                fontSize: 16,
                color: colors.text,
                marginTop: 8,
                marginBottom: 4
              }}>
                Real-time Results
              </Text>
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 14,
                color: colors.textSecondary,
                textAlign: 'center'
              }}>
                Election results are updated in real-time as they are verified and published by INEC
              </Text>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}
