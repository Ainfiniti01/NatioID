import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from "@/context/ThemeContext";

export default function IDTypeSelectionScreen() {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedType, setSelectedType] = useState(null);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const idTypes = [
    {
      id: 'citizen_id',
      name: 'National ID or Citizen ID',
      description: 'Primary national identity document for all citizens',
      icon: 'card-outline',
      estimatedTime: '14-21 days',
      requirements: ['Birth Certificate', 'Passport Photo', 'Local Government Letter'],
      fee: '$3,000'
    },
    {
      id: 'voters_card',
      name: "Voter's Card (PVC)",
      description: 'Permanent Voter Card for electoral participation',
      icon: 'id-card-outline',
      estimatedTime: '7-14 days',
      requirements: ['Valid National ID', 'Passport Photo', 'Proof of Address'],
      fee: 'Free'
    },
    {
      id: 'drivers_license',
      name: "Driver's License",
      description: 'Official driving permit and identification document',
      icon: 'car-outline',
      estimatedTime: '10-14 days',
      requirements: ['Valid National ID', 'Driving School Certificate', 'Medical Certificate', 'Passport Photo'],
      fee: '$6,500'
    },
    {
      id: 'passport',
      name: 'International Passport',
      description: 'Travel document for international identification',
      icon: 'airplane-outline',
      estimatedTime: '21-42 days',
      requirements: ['Valid National ID', 'Birth Certificate', 'Passport Photo', 'Guarantor Form'],
      fee: '$25,000 (32 pages) / $35,000 (64 pages)'
    },
    {
      id: 'health_insurance',
      name: 'Health Insurance Card (NHIS)',
      description: 'National Health Insurance Scheme identification',
      icon: 'medical-outline',
      estimatedTime: '7-10 days',
      requirements: ['Valid National ID', 'Employment Letter', 'Passport Photo'],
      fee: '$2,000'
    }
  ];

  const handleTypeSelection = (type) => {
    setSelectedType(type);
  };

  const handleProceed = () => {
    if (!selectedType) {
      Alert.alert('Selection Required', 'Please select an ID type to continue.');
      return;
    }

    router.push({
      pathname: '/id-application/application-type',
      params: { 
        idType: selectedType.id,
        idName: selectedType.name
      }
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
          paddingBottom: insets.bottom + 100,
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
            Select ID Type
          </Text>

          <View style={{ width: 24 }} />
        </View>

        {/* Application Notice */}
        <View style={{
          backgroundColor: colors.primary + '10',
          borderRadius: 16,
          padding: 20,
          marginBottom: 24,
          borderLeftWidth: 4,
          borderLeftColor: colors.primary,
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 8,
          }}>
            <Ionicons name="information-circle" size={20} color={colors.primary} />
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 16,
              color: colors.primary,
              marginLeft: 8,
            }}>
              Important Notice
            </Text>
          </View>
          <Text style={{
            fontFamily: 'Inter_400Regular',
            fontSize: 14,
            color: colors.text,
            lineHeight: 20,
          }}>
            All ID applications are processed digitally through secure government systems. Ensure all information provided is accurate and documents are clear and valid.
          </Text>
        </View>

        {/* ID Types List */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 20,
            color: colors.text,
            marginBottom: 16,
          }}>
            Choose Your ID Type
          </Text>

          <View style={{ gap: 16 }}>
            {idTypes.map((type) => {
              const isSelected = selectedType?.id === type.id;
              
              return (
                <TouchableOpacity
                  key={type.id}
                  onPress={() => handleTypeSelection(type)}
                  style={{
                    backgroundColor: isSelected ? colors.primary + '10' : colors.cardBackground,
                    borderRadius: 16,
                    padding: 20,
                    borderWidth: 2,
                    borderColor: isSelected ? colors.primary : colors.border,
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
                      backgroundColor: isSelected ? colors.primary + '20' : colors.surfaceSecondary,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 16,
                    }}>
                      <Ionicons 
                        name={type.icon} 
                        size={24} 
                        color={isSelected ? colors.primary : colors.textSecondary} 
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
                          {type.name}
                        </Text>

                        {isSelected && (
                          <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
                        )}
                      </View>

                      <Text style={{
                        fontFamily: 'Inter_400Regular',
                        fontSize: 14,
                        color: colors.textSecondary,
                        marginBottom: 12,
                        lineHeight: 20,
                      }}>
                        {type.description}
                      </Text>

                      {/* Details */}
                      <View style={{ gap: 8 }}>
                        <View style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
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
                              {type.estimatedTime}
                            </Text>
                          </View>

                          <View style={{
                            backgroundColor: type.fee === 'Free' ? '#10B981' : colors.primary,
                            borderRadius: 8,
                            paddingHorizontal: 8,
                            paddingVertical: 4,
                          }}>
                            <Text style={{
                              fontFamily: 'Inter_500Medium',
                              fontSize: 12,
                              color: 'white',
                            }}>
                              {type.fee}
                            </Text>
                          </View>
                        </View>

                        <View style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                          <Ionicons name="document-outline" size={16} color={colors.textSecondary} />
                          <Text style={{
                            fontFamily: 'Inter_400Regular',
                            fontSize: 12,
                            color: colors.textSecondary,
                            marginLeft: 4,
                            flex: 1,
                          }}>
                            {type.requirements.length} documents required
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  {/* Requirements Preview */}
                  {isSelected && (
                    <View style={{
                      backgroundColor: colors.background,
                      borderRadius: 12,
                      padding: 16,
                      marginTop: 12,
                    }}>
                      <Text style={{
                        fontFamily: 'Inter_600SemiBold',
                        fontSize: 14,
                        color: colors.text,
                        marginBottom: 8,
                      }}>
                        Required Documents:
                      </Text>
                      {type.requirements.map((req, index) => (
                        <View key={index} style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginBottom: 4,
                        }}>
                          <View style={{
                            width: 4,
                            height: 4,
                            borderRadius: 2,
                            backgroundColor: colors.primary,
                            marginRight: 8,
                          }} />
                          <Text style={{
                            fontFamily: 'Inter_400Regular',
                            fontSize: 12,
                            color: colors.textSecondary,
                          }}>
                            {req}
                          </Text>
                        </View>
                      ))}
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Quick Info */}
        <View style={{
          backgroundColor: colors.cardBackground,
          borderRadius: 16,
          padding: 20,
        }}>
          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 16,
            color: colors.text,
            marginBottom: 12,
          }}>
            Application Process
          </Text>

          <View style={{ gap: 12 }}>
            {[
              { step: '1', text: 'Select ID type and application category' },
              { step: '2', text: 'Fill out application form with personal details' },
              { step: '3', text: 'Upload required documents and photos' },
              { step: '4', text: 'Submit application and receive tracking ID' },
              { step: '5', text: 'Track status and collect when ready' }
            ].map((item) => (
              <View key={item.step} style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
                <View style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  backgroundColor: colors.primary,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 12,
                }}>
                  <Text style={{
                    fontFamily: 'Inter_600SemiBold',
                    fontSize: 12,
                    color: 'white',
                  }}>
                    {item.step}
                  </Text>
                </View>
                <Text style={{
                  fontFamily: 'Inter_400Regular',
                  fontSize: 14,
                  color: colors.textSecondary,
                  flex: 1,
                }}>
                  {item.text}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Fixed Bottom Button */}
      <View style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.background,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: insets.bottom + 16,
      }}>
        <TouchableOpacity
          onPress={handleProceed}
          disabled={!selectedType}
          style={{
            backgroundColor: selectedType ? colors.primary : colors.surfaceSecondary,
            borderRadius: 16,
            paddingVertical: 16,
            alignItems: 'center',
          }}
        >
          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 16,
            color: selectedType ? colors.primaryText : colors.textSecondary,
          }}>
            Continue with {selectedType ? selectedType.name : 'Selected ID'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
