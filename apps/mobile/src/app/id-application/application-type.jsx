import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from "@/context/ThemeContext";

export default function ApplicationTypeScreen() {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const { idType, idName } = useLocalSearchParams();
  const [selectedType, setSelectedType] = useState(null);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const applicationTypes = [
    {
      id: 'new',
      name: 'New Application',
      description: 'Apply for a brand new ID document',
      icon: 'add-circle-outline',
      subtext: 'First-time application for this document type',
      color: '#10B981',
      requirements: 'All standard requirements apply',
      estimatedTime: 'Standard processing time'
    },
    {
      id: 'renewal',
      name: 'Renewal',
      description: 'Renew an existing ID document',
      icon: 'refresh-outline',
      subtext: 'Update or extend validity of current document',
      color: '#3B82F6',
      requirements: 'Previous document + updated photos',
      estimatedTime: 'Faster processing (7-14 days)'
    },
    {
      id: 'replace_lost_stolen',
      name: 'Replace Lost/Stolen',
      description: 'Replace a lost or stolen ID document',
      icon: 'alert-circle-outline',
      subtext: 'Mandatory reason required; previous document will be blocked',
      color: '#EF4444',
      requirements: 'Police report (for stolen) / Affidavit (for lost)',
      estimatedTime: 'Standard processing time'
    },
    {
      id: 'update_info',
      name: 'Update Information',
      description: 'Update personal details on an existing ID document',
      icon: 'create-outline',
      subtext: 'Select specific fields to update and provide reason',
      color: '#F59E0B',
      requirements: 'Proof of new information (e.g., marriage certificate, utility bill)',
      estimatedTime: 'Standard processing time'
    }
  ];

  const handleTypeSelection = (type) => {
    setSelectedType(type);
  };

  const handleProceed = () => {
    if (!selectedType) {
      Alert.alert('Selection Required', 'Please select an application type to continue.');
      return;
    }

    if (selectedType.id === 'new') {
      router.push({
        pathname: '/id-application/application-form',
        params: { 
          idType,
          idName,
          applicationType: selectedType.id
        }
      });
    } else {
      // For Renewal, Lost/Stolen, Update Info, go to reason selection
      router.push({
        pathname: '/id-application/reason-selection',
        params: { 
          idType,
          idName,
          applicationType: selectedType.id
        }
      });
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
            Application Type
          </Text>

          <View style={{ width: 24 }} />
        </View>

        {/* Selected ID Type */}
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
            <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 16,
              color: colors.primary,
              marginLeft: 8,
            }}>
              Selected ID Type
            </Text>
          </View>
          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 18,
            color: colors.text,
          }}>
            {idName}
          </Text>
        </View>

        {/* Application Types */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 20,
            color: colors.text,
            marginBottom: 16,
          }}>
            Choose Application Type
          </Text>

          <View style={{ gap: 16 }}>
            {applicationTypes.map((type) => {
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
                  }}>
                    <View style={{
                      width: 48,
                      height: 48,
                      borderRadius: 24,
                      backgroundColor: type.color + '20',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 16,
                    }}>
                      <Ionicons 
                        name={type.icon} 
                        size={24} 
                        color={type.color} 
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
                          fontSize: 18,
                          color: colors.text,
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
                        marginBottom: 8,
                        lineHeight: 20,
                      }}>
                        {type.description}
                      </Text>

                      <Text style={{
                        fontFamily: 'Inter_500Medium',
                        fontSize: 12,
                        color: type.color,
                        marginBottom: 12,
                      }}>
                        {type.subtext}
                      </Text>

                      {/* Details */}
                      <View style={{ gap: 8 }}>
                        <View style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                          <Ionicons name="document-text-outline" size={16} color={colors.textSecondary} />
                          <Text style={{
                            fontFamily: 'Inter_400Regular',
                            fontSize: 12,
                            color: colors.textSecondary,
                            marginLeft: 4,
                            flex: 1,
                          }}>
                            {type.requirements}
                          </Text>
                        </View>

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
                            flex: 1,
                          }}>
                            {type.estimatedTime}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  {/* Additional Info for Renewal */}
                  {isSelected && (type.id === 'renewal' || type.id === 'replace_lost_stolen' || type.id === 'update_info') && (
                    <View style={{
                      backgroundColor: colors.background,
                      borderRadius: 12,
                      padding: 16,
                      marginTop: 16,
                    }}>
                      <Text style={{
                        fontFamily: 'Inter_600SemiBold',
                        fontSize: 14,
                        color: colors.text,
                        marginBottom: 8,
                      }}>
                        Important: Reason Required
                      </Text>
                      <Text style={{
                        fontFamily: 'Inter_400Regular',
                        fontSize: 12,
                        color: colors.textSecondary,
                        lineHeight: 16,
                      }}>
                        You will be asked to provide a reason for this application type on the next screen.
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Important Notes */}
        <View style={{
          backgroundColor: '#FEF3C7',
          borderRadius: 16,
          padding: 20,
          borderLeftWidth: 4,
          borderLeftColor: '#F59E0B',
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 12,
          }}>
            <Ionicons name="warning" size={20} color="#D97706" />
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 16,
              color: '#D97706',
              marginLeft: 8,
            }}>
              Important Notes
            </Text>
          </View>

          <View style={{ gap: 8 }}>
            <Text style={{
              fontFamily: 'Inter_400Regular',
              fontSize: 14,
              color: '#92400E',
              lineHeight: 20,
            }}>
              • Ensure all information provided is accurate and matches your existing records
            </Text>
            <Text style={{
              fontFamily: 'Inter_400Regular',
              fontSize: 14,
              color: '#92400E',
              lineHeight: 20,
            }}>
              • Lost or stolen documents will be permanently blocked from the system
            </Text>
            <Text style={{
              fontFamily: 'Inter_400Regular',
              fontSize: 14,
              color: '#92400E',
              lineHeight: 20,
            }}>
              • Processing times may vary during peak periods
            </Text>
            <Text style={{
              fontFamily: 'Inter_400Regular',
              fontSize: 14,
              color: '#92400E',
              lineHeight: 20,
            }}>
              • Application fees are non-refundable once processing begins
            </Text>
          </View>
        </View>

        {/* Quick Tips */}
        <View style={{
          backgroundColor: colors.cardBackground,
          borderRadius: 16,
          padding: 20,
          marginTop: 16,
        }}>
          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 16,
            color: colors.text,
            marginBottom: 12,
          }}>
            Application Tips
          </Text>

          <View style={{ gap: 8 }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <Ionicons name="checkmark-circle" size={16} color="#10B981" />
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 14,
                color: colors.textSecondary,
                marginLeft: 8,
                flex: 1,
              }}>
                Have all required documents ready before starting
              </Text>
            </View>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <Ionicons name="checkmark-circle" size={16} color="#10B981" />
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 14,
                color: colors.textSecondary,
                marginLeft: 8,
                flex: 1,
              }}>
                Use high-quality photos with good lighting
              </Text>
            </View>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <Ionicons name="checkmark-circle" size={16} color="#10B981" />
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 14,
                color: colors.textSecondary,
                marginLeft: 8,
                flex: 1,
              }}>
                Double-check all personal information for accuracy
              </Text>
            </View>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <Ionicons name="checkmark-circle" size={16} color="#10B981" />
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 14,
                color: colors.textSecondary,
                marginLeft: 8,
                flex: 1,
              }}>
                Save your application reference number for tracking
              </Text>
            </View>
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
            {selectedType ? 
              `Continue with ${selectedType.name}` : 
              'Select Application Type'
            }
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
