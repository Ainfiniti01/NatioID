import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from "@/context/ThemeContext";

export default function ReasonSelectionScreen() {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const { idType, idName, applicationType } = useLocalSearchParams();
  const [selectedReason, setSelectedReason] = useState(null);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const getApplicationReasons = (type) => {
    switch (type) {
      case 'renewal':
        return [
          {
            id: 'expired',
            name: 'Expired Document',
            description: 'My document has expired or is about to expire (within 6 months)',
            icon: 'calendar-outline',
            urgent: false,
            color: '#10B981',
            additionalInfo: 'Standard renewal process with original document verification',
            processingTime: '7-14 days',
            specialAction: false
          },
          {
            id: 'damaged',
            name: 'Damaged Document',
            description: 'My document is damaged and unreadable/unusable',
            icon: 'construct-outline',
            urgent: false,
            color: '#3B82F6',
            additionalInfo: 'Original damaged document must be submitted for verification',
            processingTime: '7-14 days',
            specialAction: false
          },
          {
            id: 'update_info_renewal',
            name: 'Update Information (Renewal)',
            description: 'I need to update personal details during renewal',
            icon: 'create-outline',
            urgent: false,
            color: '#F59E0B',
            additionalInfo: 'Proof of new information required (e.g., marriage certificate, utility bill)',
            processingTime: '7-14 days',
            specialAction: false
          }
        ];
      case 'replace_lost_stolen':
        return [
          {
            id: 'lost',
            name: 'Lost Document',
            description: 'I have lost my document and need a replacement',
            icon: 'help-outline',
            urgent: true,
            color: '#F59E0B',
            additionalInfo: 'Previous document will be blocked for security purposes',
            processingTime: '10-21 days',
            specialAction: true,
            warning: 'This action will permanently invalidate your previous document'
          },
          {
            id: 'stolen',
            name: 'Stolen Document',
            description: 'My document was stolen and I need a replacement',
            icon: 'warning-outline',
            urgent: true,
            color: '#EF4444',
            additionalInfo: 'Previous document will be blocked and flagged for fraud prevention',
            processingTime: '10-21 days',
            specialAction: true,
            warning: 'Police report may be required for verification'
          }
        ];
      case 'update_info':
        return [
          {
            id: 'address_change',
            name: 'Address Change',
            description: 'Update my residential address',
            icon: 'home-outline',
            urgent: false,
            color: '#10B981',
            additionalInfo: 'Proof of new address required (e.g., utility bill, tenancy agreement)',
            processingTime: '5-10 days',
            specialAction: false
          },
          {
            id: 'marital_status_change',
            name: 'Marital Status Change',
            description: 'Update my marital status',
            icon: 'heart-outline',
            urgent: false,
            color: '#3B82F6',
            additionalInfo: 'Marriage certificate or divorce decree required',
            processingTime: '5-10 days',
            specialAction: false
          },
          {
            id: 'name_change',
            name: 'Name Change',
            description: 'Update my name (e.g., after marriage)',
            icon: 'person-outline',
            urgent: false,
            color: '#F59E0B',
            additionalInfo: 'Affidavit and gazette publication required',
            processingTime: '7-14 days',
            specialAction: false
          },
          {
            id: 'other_info_change',
            name: 'Other Information Change',
            description: 'Update other personal details not listed',
            icon: 'ellipsis-horizontal-circle-outline',
            urgent: false,
            color: '#6B7280',
            additionalInfo: 'Specify details in the application form; supporting documents may be required',
            processingTime: '7-14 days',
            specialAction: false
          }
        ];
      default:
        return [];
    }
  };

  const applicationReasons = getApplicationReasons(applicationType);

  const handleReasonSelection = (reason) => {
    setSelectedReason(reason);
  };

  const handleProceed = () => {
    if (!selectedReason) {
      Alert.alert('Selection Required', `Please select a reason for ${applicationType.replace(/_/g, ' ')} to continue.`);
      return;
    }

    if (selectedReason.specialAction) {
      Alert.alert(
        'Security Action Required',
        `This action will trigger special security measures:\n\n• Previous ${idName} will be permanently blocked\n• Additional verification may be required\n• Processing time may be extended\n\nDo you want to continue?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Continue', 
            onPress: () => {
              router.push({
                pathname: '/id-application/application-form',
                params: { 
                  idType,
                  idName,
                  applicationType,
                  reason: selectedReason.id
                }
              });
            }
          }
        ]
      );
    } else {
      router.push({
        pathname: '/id-application/application-form',
        params: { 
          idType,
          idName,
          applicationType,
          reason: selectedReason.id
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
            {applicationType === 'renewal' ? 'Renewal Reason' : 
             applicationType === 'replace_lost_stolen' ? 'Lost/Stolen Reason' : 
             applicationType === 'update_info' ? 'Update Information Reason' : 'Select Reason'}
          </Text>

          <View style={{ width: 24 }} />
        </View>

        {/* Application Summary */}
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
            marginBottom: 8,
          }}>
            {applicationType === 'renewal' ? 'Renewal Application for:' : 
             applicationType === 'replace_lost_stolen' ? 'Replacement Application for:' : 
             applicationType === 'update_info' ? 'Update Application for:' : 'Application for:'}
          </Text>
          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 18,
            color: colors.primary,
          }}>
            {idName}
          </Text>
        </View>

        {/* Renewal Reasons */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 20,
            color: colors.text,
            marginBottom: 16,
          }}>
            Select {applicationType === 'renewal' ? 'Renewal Reason' : 
                    applicationType === 'replace_lost_stolen' ? 'Lost/Stolen Reason' : 
                    applicationType === 'update_info' ? 'Update Reason' : 'Reason'}
          </Text>

          <View style={{ gap: 16 }}>
            {applicationReasons.map((reason) => {
              const isSelected = selectedReason?.id === reason.id;
              
              return (
                <TouchableOpacity
                  key={reason.id}
                  onPress={() => handleReasonSelection(reason)}
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
                      backgroundColor: reason.color + '20',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 16,
                    }}>
                      <Ionicons 
                        name={reason.icon} 
                        size={24} 
                        color={reason.color} 
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
                          {reason.name}
                        </Text>

                        <View style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 8,
                        }}>
                          {reason.urgent && (
                            <View style={{
                              backgroundColor: '#FEF3C7',
                              borderRadius: 8,
                              paddingHorizontal: 6,
                              paddingVertical: 2,
                            }}>
                              <Text style={{
                                fontFamily: 'Inter_500Medium',
                                fontSize: 10,
                                color: '#D97706',
                              }}>
                                URGENT
                              </Text>
                            </View>
                          )}

                          {isSelected && (
                            <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
                          )}
                        </View>
                      </View>

                      <Text style={{
                        fontFamily: 'Inter_400Regular',
                        fontSize: 14,
                        color: colors.textSecondary,
                        marginBottom: 12,
                        lineHeight: 20,
                      }}>
                        {reason.description}
                      </Text>

                      {/* Details */}
                      <View style={{ gap: 8 }}>
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
                            Processing: {reason.processingTime}
                          </Text>
                        </View>

                        <View style={{
                          flexDirection: 'row',
                          alignItems: 'flex-start',
                        }}>
                          <Ionicons name="information-circle-outline" size={16} color={colors.textSecondary} style={{ marginTop: 1 }} />
                          <Text style={{
                            fontFamily: 'Inter_400Regular',
                            fontSize: 12,
                            color: colors.textSecondary,
                            marginLeft: 4,
                            flex: 1,
                            lineHeight: 16,
                          }}>
                            {reason.additionalInfo}
                          </Text>
                        </View>
                      </View>

                      {/* Warning for special actions */}
                      {reason.warning && isSelected && (
                        <View style={{
                          backgroundColor: '#FEF2F2',
                          borderRadius: 8,
                          padding: 12,
                          marginTop: 12,
                          borderLeftWidth: 3,
                          borderLeftColor: '#EF4444',
                        }}>
                          <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: 4,
                          }}>
                            <Ionicons name="warning" size={16} color="#EF4444" />
                            <Text style={{
                              fontFamily: 'Inter_600SemiBold',
                              fontSize: 12,
                              color: '#EF4444',
                              marginLeft: 4,
                            }}>
                              Important Warning
                            </Text>
                          </View>
                          <Text style={{
                            fontFamily: 'Inter_400Regular',
                            fontSize: 11,
                            color: '#DC2626',
                            lineHeight: 16,
                          }}>
                            {reason.warning}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Security Notice */}
        <View style={{
          backgroundColor: '#EFF6FF',
          borderRadius: 16,
          padding: 20,
          borderLeftWidth: 4,
          borderLeftColor: '#3B82F6',
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 12,
          }}>
            <Ionicons name="shield-checkmark" size={20} color="#3B82F6" />
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 16,
              color: '#1E40AF',
              marginLeft: 8,
            }}>
              Security & Fraud Prevention
            </Text>
          </View>

          <Text style={{
            fontFamily: 'Inter_400Regular',
            fontSize: 14,
            color: '#1E3A8A',
            lineHeight: 20,
            marginBottom: 12,
          }}>
            Our system automatically implements security measures to prevent fraud and protect your identity:
          </Text>

          <View style={{ gap: 8 }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <View style={{
                width: 4,
                height: 4,
                borderRadius: 2,
                backgroundColor: '#3B82F6',
                marginRight: 8,
              }} />
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 12,
                color: '#1E3A8A',
                flex: 1,
              }}>
                Lost/stolen documents are immediately blocked system-wide
              </Text>
            </View>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <View style={{
                width: 4,
                height: 4,
                borderRadius: 2,
                backgroundColor: '#3B82F6',
                marginRight: 8,
              }} />
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 12,
                color: '#1E3A8A',
                flex: 1,
              }}>
                All applications are verified against national databases
              </Text>
            </View>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <View style={{
                width: 4,
                height: 4,
                borderRadius: 2,
                backgroundColor: '#3B82F6',
                marginRight: 8,
              }} />
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 12,
                color: '#1E3A8A',
                flex: 1,
              }}>
                Admin approval required for all renewal applications
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
          disabled={!selectedReason}
          style={{
            backgroundColor: selectedReason ? colors.primary : colors.surfaceSecondary,
            borderRadius: 16,
            paddingVertical: 16,
            alignItems: 'center',
          }}
        >
          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 16,
            color: selectedReason ? colors.primaryText : colors.textSecondary,
          }}>
            {selectedReason ? 
              `Continue with ${selectedReason.name}` : 
              `Select ${applicationType === 'renewal' ? 'Renewal Reason' : 
                        applicationType === 'replace_lost_stolen' ? 'Lost/Stolen Reason' : 
                        applicationType === 'update_info' ? 'Update Reason' : 'Reason'}`
            }
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
