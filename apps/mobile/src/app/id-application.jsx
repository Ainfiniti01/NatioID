import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from "@/context/ThemeContext";

export default function IDApplicationScreen() {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedAction, setSelectedAction] = useState(null);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const applicationActions = [
    {
      id: 'new_application',
      title: 'New ID Application',
      description: 'Apply for a new government-issued identification document',
      icon: 'add-circle-outline',
      color: '#10B981',
      features: ['First-time applicants', 'All ID types available', 'Complete verification process'],
      estimatedTime: '14-42 days',
      route: '/id-application/id-type-selection',
      params: { applicationType: 'new' }
    },
    {
      id: 'renewal',
      title: 'Renew Existing ID',
      description: 'Renew your expired or soon-to-expire identification',
      icon: 'refresh-outline',
      color: '#3B82F6',
      features: ['Faster processing', 'Existing records used', 'Document updates'],
      estimatedTime: '7-21 days',
      route: '/id-application/id-type-selection',
      params: { applicationType: 'renewal' }
    },
    {
      id: 'replacement',
      title: 'Replace Lost/Stolen ID',
      description: 'Report and request replacement for lost or stolen documents',
      icon: 'shield-outline',
      color: '#F59E0B',
      features: ['Security verification', 'Previous ID blocked', 'Enhanced authentication'],
      estimatedTime: '10-21 days',
      route: '/id-application/id-type-selection',
      params: { applicationType: 'replace_lost_stolen' }
    },
    {
      id: 'update',
      title: 'Update Information',
      description: 'Update personal details on existing identification',
      icon: 'create-outline',
      color: '#8B5CF6',
      features: ['Address changes', 'Name corrections', 'Status updates'],
      estimatedTime: '5-14 days',
      route: '/id-application/id-type-selection',
      params: { applicationType: 'update_info' }
    }
  ];

  const recentApplications = [
    {
      id: 'APP-12345',
      type: 'NIN Application',
      status: 'Under Review',
      progress: 65,
      submittedDate: '2025-01-15',
      estimatedCompletion: '2025-02-05'
    },
    {
      id: 'APP-67890',
      type: "Driver's License Renewal",
      status: 'Approved',
      progress: 100,
      submittedDate: '2025-01-10',
      estimatedCompletion: 'Completed'
    }
  ];

  const handleActionSelection = (action) => {
    setSelectedAction(action);
    router.push({
      pathname: action.route,
      params: action.params
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Under Review': return '#F59E0B';
      case 'Approved': return '#10B981';
      case 'Rejected': return '#EF4444';
      case 'Pending': return '#6B7280';
      default: return '#6B7280';
    }
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
            ID Applications
          </Text>

          <TouchableOpacity onPress={() => router.push('/id-application/application-status')}>
            <Ionicons name="list-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Welcome Section */}
        <View style={{
          backgroundColor: colors.primary,
          borderRadius: 20,
          padding: 24,
          marginBottom: 24,
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 12,
          }}>
            <View style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: 'rgba(255,255,255,0.2)',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 16,
            }}>
              <Ionicons name="card-outline" size={24} color="white" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{
                fontFamily: 'Inter_700Bold',
                fontSize: 20,
                color: 'white',
                marginBottom: 4,
              }}>
                Government ID Services
              </Text>
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 14,
                color: 'rgba(255,255,255,0.9)',
              }}>
                Apply, renew, or update your official documents
              </Text>
            </View>
          </View>

          <View style={{
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderRadius: 12,
            padding: 16,
          }}>
            <Text style={{
              fontFamily: 'Inter_500Medium',
              fontSize: 14,
              color: 'white',
              lineHeight: 20,
            }}>
              📋 All applications are processed digitally through secure government systems.
              {'\n'}🔒 Your data is protected with end-to-end encryption.
              {'\n'}⚡ Track your application status in real-time.
            </Text>
          </View>
        </View>

        {/* Application Actions */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 20,
            color: colors.text,
            marginBottom: 16,
          }}>
            What would you like to do?
          </Text>

          <View style={{ gap: 16 }}>
            {applicationActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                onPress={() => handleActionSelection(action)}
                style={{
                  backgroundColor: colors.cardBackground,
                  borderRadius: 16,
                  padding: 20,
                  borderWidth: 1,
                  borderColor: colors.border,
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
                    backgroundColor: action.color + '20',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 16,
                  }}>
                    <Ionicons name={action.icon} size={24} color={action.color} />
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text style={{
                      fontFamily: 'Inter_600SemiBold',
                      fontSize: 16,
                      color: colors.text,
                      marginBottom: 4,
                    }}>
                      {action.title}
                    </Text>
                    <Text style={{
                      fontFamily: 'Inter_400Regular',
                      fontSize: 14,
                      color: colors.textSecondary,
                      lineHeight: 20,
                      marginBottom: 12,
                    }}>
                      {action.description}
                    </Text>

                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 8,
                    }}>
                      <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                        <Ionicons name="time-outline" size={16} color={colors.textSecondary} />
                        <Text style={{
                          fontFamily: 'Inter_400Regular',
                          fontSize: 12,
                          color: colors.textSecondary,
                          marginLeft: 4,
                        }}>
                          {action.estimatedTime}
                        </Text>
                      </View>

                      <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
                    </View>
                  </View>
                </View>

                <View style={{
                  backgroundColor: colors.background,
                  borderRadius: 12,
                  padding: 12,
                }}>
                  <Text style={{
                    fontFamily: 'Inter_500Medium',
                    fontSize: 12,
                    color: colors.text,
                    marginBottom: 8,
                  }}>
                    Key Features:
                  </Text>
                  {action.features.map((feature, index) => (
                    <View key={index} style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 4,
                    }}>
                      <View style={{
                        width: 4,
                        height: 4,
                        borderRadius: 2,
                        backgroundColor: action.color,
                        marginRight: 8,
                      }} />
                      <Text style={{
                        fontFamily: 'Inter_400Regular',
                        fontSize: 11,
                        color: colors.textSecondary,
                      }}>
                        {feature}
                      </Text>
                    </View>
                  ))}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Applications */}
        {recentApplications.length > 0 && (
          <View style={{ marginBottom: 24 }}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 16,
            }}>
              <Text style={{
                fontFamily: 'Inter_600SemiBold',
                fontSize: 18,
                color: colors.text,
              }}>
                Recent Applications
              </Text>
              <TouchableOpacity onPress={() => router.push('/id-application/application-status')}>
                <Text style={{
                  fontFamily: 'Inter_500Medium',
                  fontSize: 14,
                  color: colors.primary,
                }}>
                  View All
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ gap: 12 }}>
              {recentApplications.map((app) => (
                <TouchableOpacity
                  key={app.id}
                  onPress={() => router.push('/id-application/application-status')}
                  style={{
                    backgroundColor: colors.cardBackground,
                    borderRadius: 12,
                    padding: 16,
                    borderWidth: 1,
                    borderColor: colors.border,
                  }}
                >
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: 12,
                  }}>
                    <View style={{ flex: 1 }}>
                      <Text style={{
                        fontFamily: 'Inter_600SemiBold',
                        fontSize: 14,
                        color: colors.text,
                        marginBottom: 4,
                      }}>
                        {app.type}
                      </Text>
                      <Text style={{
                        fontFamily: 'Inter_400Regular',
                        fontSize: 12,
                        color: colors.textSecondary,
                      }}>
                        {app.id} • Submitted {app.submittedDate}
                      </Text>
                    </View>

                    <View style={{
                      backgroundColor: getStatusColor(app.status) + '20',
                      borderRadius: 8,
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                    }}>
                      <Text style={{
                        fontFamily: 'Inter_500Medium',
                        fontSize: 11,
                        color: getStatusColor(app.status),
                      }}>
                        {app.status}
                      </Text>
                    </View>
                  </View>

                  {/* Progress Bar */}
                  <View style={{
                    backgroundColor: colors.surfaceSecondary,
                    borderRadius: 4,
                    height: 6,
                    marginBottom: 8,
                  }}>
                    <View style={{
                      backgroundColor: getStatusColor(app.status),
                      borderRadius: 4,
                      height: 6,
                      width: `${app.progress}%`,
                    }} />
                  </View>

                  <Text style={{
                    fontFamily: 'Inter_400Regular',
                    fontSize: 11,
                    color: colors.textSecondary,
                  }}>
                    Expected completion: {app.estimatedCompletion}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Help & Support */}
        <View style={{
          backgroundColor: colors.cardBackground,
          borderRadius: 16,
          padding: 20,
          borderWidth: 1,
          borderColor: colors.border,
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 12,
          }}>
            <Ionicons name="help-circle-outline" size={20} color={colors.primary} />
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 16,
              color: colors.text,
              marginLeft: 8,
            }}>
              Need Help?
            </Text>
          </View>

          <Text style={{
            fontFamily: 'Inter_400Regular',
            fontSize: 14,
            color: colors.textSecondary,
            lineHeight: 20,
            marginBottom: 16,
          }}>
            Our support team is available to assist you with your application process.
          </Text>

          <View style={{ gap: 12 }}>
            <TouchableOpacity
              onPress={() => router.push('/help')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: colors.background,
                borderRadius: 12,
                padding: 12,
              }}
            >
              <Ionicons name="book-outline" size={16} color={colors.primary} />
              <Text style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 14,
                color: colors.primary,
                marginLeft: 8,
                flex: 1,
              }}>
                Application Guidelines
              </Text>
              <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push('/new-complaint')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: colors.background,
                borderRadius: 12,
                padding: 12,
              }}
            >
              <Ionicons name="chatbubble-outline" size={16} color={colors.primary} />
              <Text style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 14,
                color: colors.primary,
                marginLeft: 8,
                flex: 1,
              }}>
                Contact Support
              </Text>
              <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
