import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, Switch } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from "@/context/ThemeContext";

const biometricFeatures = [
  {
    id: 'fingerprint',
    title: 'Fingerprint Authentication',
    description: 'Use your fingerprint to unlock NatioID',
    icon: 'finger-print-outline',
    available: true,
    enabled: true,
    enrolledCount: 3
  },
  {
    id: 'face-id',
    title: 'Face ID Authentication', 
    description: 'Use Face ID for secure and convenient access',
    icon: 'scan-outline',
    available: true,
    enabled: false,
    enrolledCount: 0
  },
  {
    id: 'voice',
    title: 'Voice Recognition',
    description: 'Authenticate using your unique voice pattern',
    icon: 'mic-outline',
    available: false,
    enabled: false,
    enrolledCount: 0
  }
];

const biometricSettings = [
  {
    id: 'auto-biometric',
    title: 'Auto Biometric Login',
    description: 'Skip PIN entry when biometric is successful',
    enabled: true
  },
  {
    id: 'biometric-timeout',
    title: 'Require Biometric Every',
    description: 'Force biometric verification after inactivity',
    value: '5 minutes',
    options: ['Immediately', '1 minute', '5 minutes', '15 minutes', '1 hour']
  },
  {
    id: 'fallback-pin',
    title: 'PIN Fallback',
    description: 'Allow PIN entry if biometric fails',
    enabled: true
  },
  {
    id: 'secure-transactions',
    title: 'Secure Transactions',
    description: 'Require biometric for sensitive operations',
    enabled: true
  }
];

export default function BiometricScreen() {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const [features, setFeatures] = useState(biometricFeatures);
  const [settings, setSettings] = useState(
    biometricSettings.reduce((acc, setting) => {
      acc[setting.id] = setting.enabled || false;
      return acc;
    }, {})
  );
  
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleToggleFeature = (featureId) => {
    const feature = features.find(f => f.id === featureId);
    
    if (!feature.available) {
      Alert.alert('Not Available', 'This biometric method is not available on your device.');
      return;
    }

    if (feature.enabled) {
      // Disable biometric
      Alert.alert(
        'Disable Biometric',
        `Are you sure you want to disable ${feature.title}?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Disable', 
            style: 'destructive',
            onPress: () => {
              setFeatures(prev => prev.map(f => 
                f.id === featureId ? { ...f, enabled: false } : f
              ));
              Alert.alert('Disabled', `${feature.title} has been disabled.`);
            }
          }
        ]
      );
    } else {
      // Enable biometric
      handleEnableBiometric(feature);
    }
  };

  const handleEnableBiometric = (feature) => {
    Alert.alert(
      'Enable Biometric',
      `Set up ${feature.title} for secure access to your NatioID account.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Set Up', 
          onPress: () => simulateBiometricSetup(feature)
        }
      ]
    );
  };

  const simulateBiometricSetup = (feature) => {
    Alert.alert(
      'Biometric Setup',
      'Please follow the on-screen instructions to set up your biometric authentication.',
      [
        { 
          text: 'Complete Setup', 
          onPress: () => {
            setFeatures(prev => prev.map(f => 
              f.id === feature.id 
                ? { ...f, enabled: true, enrolledCount: feature.id === 'fingerprint' ? 3 : 1 }
                : f
            ));
            Alert.alert('Success', `${feature.title} has been set up successfully!`);
          }
        }
      ]
    );
  };

  const handleToggleSetting = (settingId) => {
    setSettings(prev => ({ ...prev, [settingId]: !prev[settingId] }));
    
    const setting = biometricSettings.find(s => s.id === settingId);
    Alert.alert(
      'Setting Updated',
      `${setting.title} has been ${!settings[settingId] ? 'enabled' : 'disabled'}.`
    );
  };

  const handleTestBiometric = (feature) => {
    if (!feature.enabled) {
      Alert.alert('Not Enabled', 'Please enable this biometric method first.');
      return;
    }

    Alert.alert(
      'Test Biometric',
      `Testing ${feature.title}...`,
      [
        { 
          text: 'Simulate Success', 
          onPress: () => Alert.alert('Test Successful', 'Biometric authentication test passed!')
        },
        { 
          text: 'Simulate Failure', 
          style: 'destructive',
          onPress: () => Alert.alert('Test Failed', 'Biometric authentication test failed. Please try again.')
        }
      ]
    );
  };

  const getFeatureStatusConfig = (feature) => {
    if (!feature.available) {
      return { color: colors.textSecondary, bg: colors.surfaceSecondary, text: 'Not Available' };
    }
    if (feature.enabled) {
      return { color: '#059669', bg: '#ECFDF5', text: 'Active' };
    }
    return { color: '#D97706', bg: '#FFFBEB', text: 'Inactive' };
  };

  const enabledBiometrics = features.filter(f => f.enabled).length;
  const availableBiometrics = features.filter(f => f.available).length;

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
            Biometric Settings
          </Text>
          
          <View style={{ width: 24 }} />
        </View>

        {/* Biometric Status Overview */}
        <View style={{
          backgroundColor: colors.primary,
          borderRadius: 16,
          padding: 20,
          marginBottom: 24
        }}>
          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 16,
            color: colors.primaryText,
            marginBottom: 16
          }}>
            Biometric Security Status
          </Text>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{
                fontFamily: 'Inter_700Bold',
                fontSize: 24,
                color: colors.primaryText
              }}>
                {enabledBiometrics}
              </Text>
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 12,
                color: colors.primaryText,
                opacity: 0.9
              }}>
                Active Methods
              </Text>
            </View>
            
            <View style={{ alignItems: 'center' }}>
              <Text style={{
                fontFamily: 'Inter_700Bold',
                fontSize: 24,
                color: colors.primaryText
              }}>
                {availableBiometrics}
              </Text>
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 12,
                color: colors.primaryText,
                opacity: 0.9
              }}>
                Available Methods
              </Text>
            </View>
            
            <View style={{ alignItems: 'center' }}>
              <Ionicons 
                name={enabledBiometrics > 0 ? "shield-checkmark" : "shield-outline"} 
                size={24} 
                color={colors.primaryText} 
              />
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 12,
                color: colors.primaryText,
                opacity: 0.9
              }}>
                {enabledBiometrics > 0 ? 'Secured' : 'Basic'}
              </Text>
            </View>
          </View>

          <View style={{
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: 12,
            padding: 12
          }}>
            <Text style={{
              fontFamily: 'Inter_500Medium',
              fontSize: 14,
              color: colors.primaryText,
              textAlign: 'center'
            }}>
              {enabledBiometrics > 0 
                ? 'Your account is protected with biometric authentication'
                : 'Enable biometric authentication for enhanced security'
              }
            </Text>
          </View>
        </View>

        {/* Biometric Methods */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 18,
            color: colors.text,
            marginBottom: 16
          }}>
            Biometric Methods
          </Text>
          
          {features.map((feature) => {
            const statusConfig = getFeatureStatusConfig(feature);
            
            return (
              <View
                key={feature.id}
                style={{
                  backgroundColor: colors.cardBackground,
                  borderRadius: 16,
                  padding: 20,
                  marginBottom: 12,
                  borderWidth: 1,
                  borderColor: colors.border
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                  <View style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: feature.available ? colors.primary + '20' : colors.surfaceSecondary,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 16
                  }}>
                    <Ionicons 
                      name={feature.icon} 
                      size={24} 
                      color={feature.available ? colors.primary : colors.textSecondary} 
                    />
                  </View>

                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                      <Text style={{
                        fontFamily: 'Inter_600SemiBold',
                        fontSize: 16,
                        color: colors.text,
                        flex: 1
                      }}>
                        {feature.title}
                      </Text>
                      
                      <View style={{
                        backgroundColor: statusConfig.bg,
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        borderRadius: 8
                      }}>
                        <Text style={{
                          fontFamily: 'Inter_500Medium',
                          fontSize: 10,
                          color: statusConfig.color
                        }}>
                          {statusConfig.text.toUpperCase()}
                        </Text>
                      </View>
                    </View>
                    
                    <Text style={{
                      fontFamily: 'Inter_400Regular',
                      fontSize: 14,
                      color: colors.textSecondary,
                      lineHeight: 20
                    }}>
                      {feature.description}
                    </Text>
                    
                    {feature.enabled && feature.enrolledCount > 0 && (
                      <Text style={{
                        fontFamily: 'Inter_500Medium',
                        fontSize: 12,
                        color: colors.primary,
                        marginTop: 4
                      }}>
                        {feature.enrolledCount} {feature.id === 'fingerprint' ? 'fingerprints' : 'enrollment'} registered
                      </Text>
                    )}
                  </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Switch
                    value={feature.enabled}
                    onValueChange={() => handleToggleFeature(feature.id)}
                    disabled={!feature.available}
                    trackColor={{ false: colors.border, true: colors.primary + '40' }}
                    thumbColor={feature.enabled ? colors.primary : colors.surfaceSecondary}
                  />
                  
                  {feature.available && (
                    <View style={{ flexDirection: 'row' }}>
                      {feature.enabled && (
                        <TouchableOpacity
                          onPress={() => handleTestBiometric(feature)}
                          style={{
                            backgroundColor: colors.surfaceSecondary,
                            paddingHorizontal: 16,
                            paddingVertical: 8,
                            borderRadius: 8,
                            marginRight: 8
                          }}
                        >
                          <Text style={{
                            fontFamily: 'Inter_500Medium',
                            fontSize: 14,
                            color: colors.text
                          }}>
                            Test
                          </Text>
                        </TouchableOpacity>
                      )}
                      
                      <TouchableOpacity
                        onPress={() => feature.enabled ? handleToggleFeature(feature.id) : handleEnableBiometric(feature)}
                        style={{
                          backgroundColor: feature.enabled ? '#FEF2F2' : colors.primary,
                          paddingHorizontal: 16,
                          paddingVertical: 8,
                          borderRadius: 8
                        }}
                      >
                        <Text style={{
                          fontFamily: 'Inter_500Medium',
                          fontSize: 14,
                          color: feature.enabled ? '#DC2626' : colors.primaryText
                        }}>
                          {feature.enabled ? 'Remove' : 'Set Up'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            );
          })}
        </View>

        {/* Biometric Settings */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 18,
            color: colors.text,
            marginBottom: 16
          }}>
            Biometric Preferences
          </Text>
          
          <View style={{
            backgroundColor: colors.cardBackground,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: colors.border,
            overflow: 'hidden'
          }}>
            {biometricSettings.map((setting, index) => (
              <View
                key={setting.id}
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 16,
                  borderBottomWidth: index < biometricSettings.length - 1 ? 1 : 0,
                  borderBottomColor: colors.border,
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={{
                    fontFamily: 'Inter_500Medium',
                    fontSize: 16,
                    color: colors.text,
                    marginBottom: 4
                  }}>
                    {setting.title}
                  </Text>
                  <Text style={{
                    fontFamily: 'Inter_400Regular',
                    fontSize: 14,
                    color: colors.textSecondary,
                    lineHeight: 20
                  }}>
                    {setting.description}
                  </Text>
                  {setting.value && (
                    <Text style={{
                      fontFamily: 'Inter_500Medium',
                      fontSize: 12,
                      color: colors.primary,
                      marginTop: 4
                    }}>
                      Current: {setting.value}
                    </Text>
                  )}
                </View>

                {setting.options ? (
                  <TouchableOpacity
                    onPress={() => Alert.alert('Coming Soon', 'Time interval settings will be available in a future update.')}
                    style={{
                      backgroundColor: colors.surfaceSecondary,
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      borderRadius: 8
                    }}
                  >
                    <Text style={{
                      fontFamily: 'Inter_500Medium',
                      fontSize: 14,
                      color: colors.text
                    }}>
                      Change
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <Switch
                    value={settings[setting.id]}
                    onValueChange={() => handleToggleSetting(setting.id)}
                    trackColor={{ false: colors.border, true: colors.primary + '40' }}
                    thumbColor={settings[setting.id] ? colors.primary : colors.surfaceSecondary}
                  />
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Security Tips */}
        <View style={{
          backgroundColor: colors.surfaceSecondary,
          borderRadius: 16,
          padding: 20,
          borderLeftWidth: 4,
          borderLeftColor: colors.primary
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <Ionicons name="shield-checkmark" size={20} color={colors.primary} />
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 16,
              color: colors.text,
              marginLeft: 8
            }}>
              Biometric Security Tips
            </Text>
          </View>
          <Text style={{
            fontFamily: 'Inter_400Regular',
            fontSize: 14,
            color: colors.textSecondary,
            lineHeight: 20
          }}>
            • Enable multiple biometric methods for redundancy{'\n'}
            • Regularly test your biometric authentication{'\n'}
            • Keep your device updated for latest security features{'\n'}
            • Use PIN fallback for emergency access{'\n'}
            • Report any authentication issues immediately
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}