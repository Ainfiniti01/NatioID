import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from "@/context/ThemeContext";

export default function RecoveryScreen() {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const [activeOption, setActiveOption] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [recoveryData, setRecoveryData] = useState({
    email: '',
    phone: '',
    nin: '',
    securityAnswer: '',
    backupCode: ''
  });
  
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const recoveryOptions = [
    {
      id: 'email',
      title: 'Email Recovery',
      icon: 'mail-outline',
      description: 'Reset your account using your registered email address',
      color: '#2563EB',
      steps: [
        'Enter your registered email address',
        'Check your email for a recovery link',
        'Click the link to reset your password',
        'Create a new secure password'
      ]
    },
    {
      id: 'phone',
      title: 'SMS Recovery',
      icon: 'chatbubble-outline',
      description: 'Recover your account using your registered phone number',
      color: '#059669',
      steps: [
        'Enter your registered phone number',
        'Receive an SMS with a verification code',
        'Enter the code to verify your identity',
        'Set up a new password or PIN'
      ]
    },
    {
      id: 'nin',
      title: 'NIN Verification',
      icon: 'id-card-outline',
      description: 'Use your National Identification Number for account recovery',
      color: '#DC2626',
      steps: [
        'Enter your National Identification Number',
        'Provide additional verification details',
        'Wait for manual verification (24-48 hours)',
        'Receive recovery instructions via registered contacts'
      ]
    },
    {
      id: 'security',
      title: 'Security Questions',
      icon: 'help-circle-outline',
      description: 'Answer your pre-configured security questions',
      color: '#7C3AED',
      steps: [
        'Answer your security questions correctly',
        'Provide additional identity verification',
        'Reset your password or PIN',
        'Update your security settings if needed'
      ]
    },
    {
      id: 'backup',
      title: 'Backup Codes',
      icon: 'key-outline',
      description: 'Use one of your saved backup recovery codes',
      color: '#D97706',
      steps: [
        'Enter one of your backup codes',
        'Verify your identity',
        'Access your account',
        'Generate new backup codes for future use'
      ]
    },
    {
      id: 'biometric',
      title: 'Biometric Recovery',
      icon: 'finger-print-outline',
      description: 'Use your registered biometric data for recovery',
      color: '#059669',
      steps: [
        'Visit a certified government office',
        'Provide biometric verification',
        'Complete identity confirmation process',
        'Receive new account access credentials'
      ]
    }
  ];

  const handleRecoveryStart = async () => {
    if (!activeOption) {
      Alert.alert('Selection Required', 'Please select a recovery method to continue.');
      return;
    }

    setIsLoading(true);

    // Simulate recovery process
    setTimeout(() => {
      setIsLoading(false);
      
      switch (activeOption) {
        case 'email':
          if (!recoveryData.email) {
            Alert.alert('Email Required', 'Please enter your registered email address.');
            return;
          }
          Alert.alert(
            'Recovery Email Sent',
            'A recovery link has been sent to your email address. Please check your inbox and spam folder.',
            [{ text: 'OK', onPress: () => router.back() }]
          );
          break;
          
        case 'phone':
          if (!recoveryData.phone) {
            Alert.alert('Phone Required', 'Please enter your registered phone number.');
            return;
          }
          Alert.alert(
            'SMS Sent',
            'A verification code has been sent to your phone number. Please enter the code when you receive it.',
            [{ text: 'OK' }]
          );
          break;
          
        case 'nin':
          if (!recoveryData.nin) {
            Alert.alert('NIN Required', 'Please enter your National Identification Number.');
            return;
          }
          Alert.alert(
            'Verification Submitted',
            'Your NIN verification request has been submitted. You will receive further instructions within 24-48 hours.',
            [{ text: 'OK', onPress: () => router.back() }]
          );
          break;
          
        case 'backup':
          if (!recoveryData.backupCode) {
            Alert.alert('Backup Code Required', 'Please enter your backup recovery code.');
            return;
          }
          Alert.alert(
            'Access Restored',
            'Your account access has been restored. Please update your security settings.',
            [{ text: 'OK', onPress: () => router.back() }]
          );
          break;
          
        default:
          Alert.alert(
            'Recovery Initiated',
            'Your account recovery process has been started. Please follow the instructions provided.',
            [{ text: 'OK' }]
          );
      }
    }, 2000);
  };

  const handleEmergencySupport = () => {
    Alert.alert(
      'Emergency Support',
      'For immediate assistance with account recovery, please contact our emergency support team.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Call Support', 
          onPress: () => {
            // In a real app, this would open the phone dialer
            Alert.alert('Calling Support', 'Dialing +234 700 RECOVERY...');
          }
        },
        { 
          text: 'Email Support', 
          onPress: () => {
            // In a real app, this would open the email client
            Alert.alert('Email Sent', 'Opening email client to contact recovery@natioid.gov.ng');
          }
        }
      ]
    );
  };

  const renderRecoveryForm = () => {
    if (!activeOption) return null;

    const option = recoveryOptions.find(opt => opt.id === activeOption);
    
    return (
      <View style={{
        backgroundColor: colors.cardBackground,
        borderRadius: 16,
        padding: 20,
        marginTop: 20
      }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 16
        }}>
          <View style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: option.color + '20',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 12
          }}>
            <Ionicons name={option.icon} size={20} color={option.color} />
          </View>
          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 18,
            color: colors.text
          }}>
            {option.title}
          </Text>
        </View>

        {activeOption === 'email' && (
          <View>
            <Text style={{
              fontFamily: 'Inter_500Medium',
              fontSize: 14,
              color: colors.text,
              marginBottom: 8
            }}>
              Registered Email Address
            </Text>
            <TextInput
              value={recoveryData.email}
              onChangeText={(text) => setRecoveryData(prev => ({ ...prev, email: text }))}
              placeholder="Enter your email address"
              placeholderTextColor={colors.textSecondary}
              keyboardType="email-address"
              autoCapitalize="none"
              style={{
                backgroundColor: colors.surfaceSecondary,
                borderRadius: 12,
                paddingHorizontal: 16,
                paddingVertical: 12,
                fontFamily: 'Inter_400Regular',
                fontSize: 16,
                color: colors.text,
                marginBottom: 16
              }}
            />
          </View>
        )}

        {activeOption === 'phone' && (
          <View>
            <Text style={{
              fontFamily: 'Inter_500Medium',
              fontSize: 14,
              color: colors.text,
              marginBottom: 8
            }}>
              Registered Phone Number
            </Text>
            <TextInput
              value={recoveryData.phone}
              onChangeText={(text) => setRecoveryData(prev => ({ ...prev, phone: text }))}
              placeholder="+234 XXX XXX XXXX"
              placeholderTextColor={colors.textSecondary}
              keyboardType="phone-pad"
              style={{
                backgroundColor: colors.surfaceSecondary,
                borderRadius: 12,
                paddingHorizontal: 16,
                paddingVertical: 12,
                fontFamily: 'Inter_400Regular',
                fontSize: 16,
                color: colors.text,
                marginBottom: 16
              }}
            />
          </View>
        )}

        {activeOption === 'nin' && (
          <View>
            <Text style={{
              fontFamily: 'Inter_500Medium',
              fontSize: 14,
              color: colors.text,
              marginBottom: 8
            }}>
              National Identification Number
            </Text>
            <TextInput
              value={recoveryData.nin}
              onChangeText={(text) => setRecoveryData(prev => ({ ...prev, nin: text }))}
              placeholder="Enter your 11-digit NIN"
              placeholderTextColor={colors.textSecondary}
              keyboardType="numeric"
              maxLength={11}
              style={{
                backgroundColor: colors.surfaceSecondary,
                borderRadius: 12,
                paddingHorizontal: 16,
                paddingVertical: 12,
                fontFamily: 'Inter_400Regular',
                fontSize: 16,
                color: colors.text,
                marginBottom: 16
              }}
            />
          </View>
        )}

        {activeOption === 'backup' && (
          <View>
            <Text style={{
              fontFamily: 'Inter_500Medium',
              fontSize: 14,
              color: colors.text,
              marginBottom: 8
            }}>
              Backup Recovery Code
            </Text>
            <TextInput
              value={recoveryData.backupCode}
              onChangeText={(text) => setRecoveryData(prev => ({ ...prev, backupCode: text }))}
              placeholder="Enter your backup code"
              placeholderTextColor={colors.textSecondary}
              autoCapitalize="characters"
              style={{
                backgroundColor: colors.surfaceSecondary,
                borderRadius: 12,
                paddingHorizontal: 16,
                paddingVertical: 12,
                fontFamily: 'Inter_400Regular',
                fontSize: 16,
                color: colors.text,
                marginBottom: 16
              }}
            />
          </View>
        )}

        <Text style={{
          fontFamily: 'Inter_400Regular',
          fontSize: 14,
          color: colors.textSecondary,
          marginBottom: 16,
          lineHeight: 20
        }}>
          Recovery Steps:
        </Text>

        <View style={{ gap: 8, marginBottom: 20 }}>
          {option.steps.map((step, index) => (
            <View key={index} style={{
              flexDirection: 'row',
              alignItems: 'flex-start'
            }}>
              <View style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                backgroundColor: option.color + '20',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12,
                marginTop: 2
              }}>
                <Text style={{
                  fontFamily: 'Inter_600SemiBold',
                  fontSize: 12,
                  color: option.color
                }}>
                  {index + 1}
                </Text>
              </View>
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 14,
                color: colors.text,
                lineHeight: 20,
                flex: 1
              }}>
                {step}
              </Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          onPress={handleRecoveryStart}
          disabled={isLoading}
          style={{
            backgroundColor: option.color,
            borderRadius: 12,
            paddingVertical: 16,
            alignItems: 'center',
            opacity: isLoading ? 0.7 : 1
          }}
        >
          {isLoading ? (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: 'white',
                borderTopColor: 'transparent',
                marginRight: 8
              }} />
              <Text style={{
                fontFamily: 'Inter_600SemiBold',
                fontSize: 16,
                color: 'white'
              }}>
                Processing...
              </Text>
            </View>
          ) : (
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 16,
              color: 'white'
            }}>
              Start Recovery Process
            </Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };

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
            Account Recovery
          </Text>
          
          <TouchableOpacity onPress={handleEmergencySupport}>
            <Ionicons name="help-circle-outline" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Recovery Header */}
        <View style={{
          backgroundColor: colors.primary,
          borderRadius: 20,
          padding: 24,
          alignItems: 'center',
          marginBottom: 24
        }}>
          <View style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: 'rgba(255,255,255,0.2)',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 16
          }}>
            <Ionicons name="refresh" size={40} color={colors.primaryText} />
          </View>
          
          <Text style={{
            fontFamily: 'Inter_700Bold',
            fontSize: 24,
            color: colors.primaryText,
            marginBottom: 8,
            textAlign: 'center'
          }}>
            Recover Your Account
          </Text>
          
          <Text style={{
            fontFamily: 'Inter_400Regular',
            fontSize: 16,
            color: colors.primaryText,
            opacity: 0.9,
            textAlign: 'center',
            lineHeight: 24
          }}>
            Choose a recovery method to regain access to your NatioID account safely and securely.
          </Text>
        </View>

        {/* Recovery Methods */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 18,
            color: colors.text,
            marginBottom: 16
          }}>
            Select Recovery Method
          </Text>
          
          <View style={{ gap: 12 }}>
            {recoveryOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                onPress={() => setActiveOption(activeOption === option.id ? null : option.id)}
                style={{
                  backgroundColor: activeOption === option.id ? option.color + '15' : colors.cardBackground,
                  borderWidth: 2,
                  borderColor: activeOption === option.id ? option.color : colors.border,
                  borderRadius: 16,
                  padding: 20
                }}
              >
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 12
                }}>
                  <View style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: option.color + '20',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 16
                  }}>
                    <Ionicons name={option.icon} size={20} color={option.color} />
                  </View>
                  
                  <View style={{ flex: 1 }}>
                    <Text style={{
                      fontFamily: 'Inter_600SemiBold',
                      fontSize: 16,
                      color: colors.text,
                      marginBottom: 4
                    }}>
                      {option.title}
                    </Text>
                    <Text style={{
                      fontFamily: 'Inter_400Regular',
                      fontSize: 14,
                      color: colors.textSecondary,
                      lineHeight: 20
                    }}>
                      {option.description}
                    </Text>
                  </View>

                  <Ionicons 
                    name={activeOption === option.id ? "checkmark-circle" : "chevron-down"} 
                    size={24} 
                    color={activeOption === option.id ? option.color : colors.textSecondary} 
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recovery Form */}
        {renderRecoveryForm()}

        {/* Emergency Support */}
        <View style={{
          backgroundColor: '#FEF2F2',
          borderLeftWidth: 4,
          borderLeftColor: '#DC2626',
          borderRadius: 12,
          padding: 16,
          marginTop: 24
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <Ionicons name="warning" size={20} color="#DC2626" />
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 16,
              color: '#DC2626',
              marginLeft: 8
            }}>
              Need Immediate Help?
            </Text>
          </View>
          
          <Text style={{
            fontFamily: 'Inter_400Regular',
            fontSize: 14,
            color: '#7F1D1D',
            lineHeight: 20,
            marginBottom: 16
          }}>
            If you're unable to recover your account using the methods above, our emergency support team is available 24/7 to assist you.
          </Text>
          
          <TouchableOpacity
            onPress={handleEmergencySupport}
            style={{
              backgroundColor: '#DC2626',
              borderRadius: 12,
              paddingVertical: 12,
              paddingHorizontal: 16,
              alignItems: 'center'
            }}
          >
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 14,
              color: 'white'
            }}>
              Contact Emergency Support
            </Text>
          </TouchableOpacity>
        </View>

        {/* Security Notice */}
        <View style={{
          backgroundColor: colors.cardBackground,
          borderRadius: 16,
          padding: 20,
          marginTop: 24
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 16
          }}>
            <Ionicons name="shield-checkmark-outline" size={20} color={colors.primary} />
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 16,
              color: colors.text,
              marginLeft: 8
            }}>
              Security Notice
            </Text>
          </View>
          
          <View style={{ gap: 8 }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <View style={{
                width: 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: colors.primary,
                marginTop: 8,
                marginRight: 12
              }} />
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 14,
                color: colors.text,
                lineHeight: 20,
                flex: 1
              }}>
                All recovery attempts are logged for security purposes
              </Text>
            </View>
            
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <View style={{
                width: 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: colors.primary,
                marginTop: 8,
                marginRight: 12
              }} />
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 14,
                color: colors.text,
                lineHeight: 20,
                flex: 1
              }}>
                You will receive notifications about any recovery attempts
              </Text>
            </View>
            
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <View style={{
                width: 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: colors.primary,
                marginTop: 8,
                marginRight: 12
              }} />
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 14,
                color: colors.text,
                lineHeight: 20,
                flex: 1
              }}>
                Please update your security settings after successful recovery
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}