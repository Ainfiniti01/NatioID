import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, Switch } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from "@/context/ThemeContext";

const securityFeatures = [
  {
    id: 'biometric',
    title: 'Biometric Authentication',
    description: 'Use fingerprint or Face ID to unlock your account',
    icon: 'finger-print-outline',
    enabled: true,
    type: 'toggle',
    screen: '/biometric'
  },
  {
    id: 'auto-lock',
    title: 'Auto-Lock',
    description: 'Automatically lock app after 5 minutes of inactivity',
    icon: 'lock-closed-outline',
    enabled: true,
    type: 'toggle',
    screen: null
  },
  {
    id: 'screenshot-protection',
    title: 'Screenshot Protection',
    description: 'Prevent screenshots of sensitive screens',
    icon: 'camera-outline',
    enabled: true,
    type: 'toggle',
    screen: null
  },
  {
    id: 'privacy-mode',
    title: 'Privacy Mode',
    description: 'Blur sensitive information when app is in background',
    icon: 'eye-off-outline',
    enabled: false,
    type: 'toggle',
    screen: null
  }
];

const securityActions = [
  {
    id: 'change-pin',
    title: 'Change Security PIN',
    description: 'Update your 6-digit security PIN',
    icon: 'keypad-outline',
    type: 'action',
    screen: '/change-pin',
    status: 'normal'
  },
  {
    id: 'recovery-setup',
    title: 'Account Recovery',
    description: 'Set up account recovery options',
    icon: 'key-outline',
    type: 'action',
    screen: '/recovery',
    status: 'normal'
  },
  {
    id: 'trusted-devices',
    title: 'Trusted Devices',
    description: 'Manage devices that can access your account',
    icon: 'phone-portrait-outline',
    type: 'action',
    screen: null,
    status: 'normal'
  },
  {
    id: 'login-alerts',
    title: 'Login Alerts',
    description: 'Get notified of new login attempts',
    icon: 'notifications-outline',
    type: 'action',
    screen: null,
    status: 'enabled'
  }
];

const securityStatus = {
  lastPasswordChange: '2025-09-10T11:15:00Z',
  lastSecurityCheck: '2025-09-11T09:30:00Z',
  trustedDevices: 2,
  activeLocation: 'Lagos, Country',
  riskLevel: 'low',
  securityScore: 95
};

const recentSecurityEvents = [
  {
    id: 1,
    event: 'PIN Changed Successfully',
    timestamp: '2025-09-10T11:15:00Z',
    device: 'iPhone 15 Pro',
    location: 'Lagos, Country',
    status: 'success'
  },
  {
    id: 2,
    event: 'Biometric Authentication Enabled',
    timestamp: '2025-09-09T14:30:00Z',
    device: 'iPhone 15 Pro',
    location: 'Lagos, Country',
    status: 'success'
  },
  {
    id: 3,
    event: 'Failed Login Attempt',
    timestamp: '2025-09-09T22:30:00Z',
    device: 'Unknown Device',
    location: 'Abuja, Country',
    status: 'warning'
  }
];

export default function SecurityScreen() {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const [securitySettings, setSecuritySettings] = useState(
    securityFeatures.reduce((acc, feature) => {
      acc[feature.id] = feature.enabled;
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

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  const getSecurityScoreColor = (score) => {
    if (score >= 90) return { color: '#059669', bg: '#ECFDF5', text: 'Excellent' };
    if (score >= 75) return { color: '#D97706', bg: '#FFFBEB', text: 'Good' };
    if (score >= 50) return { color: '#DC2626', bg: '#FEF2F2', text: 'Fair' };
    return { color: '#DC2626', bg: '#FEF2F2', text: 'Poor' };
  };

  const getRiskLevelConfig = (level) => {
    switch (level) {
      case 'low':
        return { color: '#059669', bg: '#ECFDF5', text: 'Low Risk', icon: 'shield-checkmark' };
      case 'medium':
        return { color: '#D97706', bg: '#FFFBEB', text: 'Medium Risk', icon: 'shield' };
      case 'high':
        return { color: '#DC2626', bg: '#FEF2F2', text: 'High Risk', icon: 'warning' };
      default:
        return { color: colors.textSecondary, bg: colors.surfaceSecondary, text: 'Unknown', icon: 'help-circle' };
    }
  };

  const getEventStatusConfig = (status) => {
    switch (status) {
      case 'success':
        return { color: '#059669', bg: '#ECFDF5', icon: 'checkmark-circle' };
      case 'warning':
        return { color: '#D97706', bg: '#FFFBEB', icon: 'warning' };
      case 'error':
        return { color: '#DC2626', bg: '#FEF2F2', icon: 'close-circle' };
      default:
        return { color: colors.textSecondary, bg: colors.surfaceSecondary, icon: 'information-circle' };
    }
  };

  const handleToggleFeature = (featureId) => {
    const newValue = !securitySettings[featureId];
    setSecuritySettings(prev => ({ ...prev, [featureId]: newValue }));
    
    const feature = securityFeatures.find(f => f.id === featureId);
    Alert.alert(
      'Security Setting Updated',
      `${feature.title} has been ${newValue ? 'enabled' : 'disabled'}.`,
      [{ text: 'OK' }]
    );
  };

  const handleSecurityAction = (action) => {
    if (action.screen) {
      router.push(action.screen);
    } else {
      Alert.alert(
        action.title,
        `Opening ${action.title.toLowerCase()} settings...`,
        [{ text: 'OK' }]
      );
    }
  };

  const handleEmergencyLockdown = () => {
    Alert.alert(
      'Emergency Lockdown',
      'This will immediately lock your account and require verification to unlock. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Lock Account', 
          style: 'destructive',
          onPress: () => Alert.alert('Account Locked', 'Your account has been locked. Contact support to unlock.')
        }
      ]
    );
  };

  const handleSecurityScan = () => {
    Alert.alert('Security Scan', 'Running comprehensive security scan...', [
      { text: 'OK', onPress: () => setTimeout(() => Alert.alert('Scan Complete', 'No security issues found.'), 2000) }
    ]);
  };

  const securityScoreConfig = getSecurityScoreColor(securityStatus.securityScore);
  const riskLevelConfig = getRiskLevelConfig(securityStatus.riskLevel);

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
            Security Center
          </Text>
          
          <TouchableOpacity onPress={handleSecurityScan}>
            <Ionicons name="scan-outline" size={24} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Security Dashboard */}
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
            Security Dashboard
          </Text>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{
                fontFamily: 'Inter_700Bold',
                fontSize: 24,
                color: colors.primaryText
              }}>
                {securityStatus.securityScore}%
              </Text>
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 12,
                color: colors.primaryText,
                opacity: 0.9
              }}>
                Security Score
              </Text>
            </View>
            
            <View style={{ alignItems: 'center' }}>
              <Text style={{
                fontFamily: 'Inter_700Bold',
                fontSize: 24,
                color: colors.primaryText
              }}>
                {securityStatus.trustedDevices}
              </Text>
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 12,
                color: colors.primaryText,
                opacity: 0.9
              }}>
                Trusted Devices
              </Text>
            </View>
            
            <View style={{ alignItems: 'center' }}>
              <Ionicons name={riskLevelConfig.icon} size={24} color={colors.primaryText} />
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 12,
                color: colors.primaryText,
                opacity: 0.9
              }}>
                {riskLevelConfig.text}
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
              marginBottom: 4
            }}>
              Last Security Check: {formatTimeAgo(securityStatus.lastSecurityCheck)}
            </Text>
            <Text style={{
              fontFamily: 'Inter_400Regular',
              fontSize: 12,
              color: colors.primaryText,
              opacity: 0.9
            }}>
              Active Location: {securityStatus.activeLocation}
            </Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 18,
            color: colors.text,
            marginBottom: 16
          }}>
            Quick Actions
          </Text>
          
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={handleSecurityScan}
              style={{
                flex: 1,
                backgroundColor: colors.surfaceSecondary,
                borderRadius: 12,
                paddingVertical: 16,
                paddingHorizontal: 12,
                marginRight: 8,
                alignItems: 'center'
              }}
            >
              <Ionicons name="scan-outline" size={24} color={colors.primary} />
              <Text style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 12,
                color: colors.text,
                marginTop: 8,
                textAlign: 'center'
              }}>
                Security Scan
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => router.push('/activity-log')}
              style={{
                flex: 1,
                backgroundColor: colors.surfaceSecondary,
                borderRadius: 12,
                paddingVertical: 16,
                paddingHorizontal: 12,
                marginHorizontal: 4,
                alignItems: 'center'
              }}
            >
              <Ionicons name="time-outline" size={24} color={colors.primary} />
              <Text style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 12,
                color: colors.text,
                marginTop: 8,
                textAlign: 'center'
              }}>
                Activity Log
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={handleEmergencyLockdown}
              style={{
                flex: 1,
                backgroundColor: '#FEF2F2',
                borderRadius: 12,
                paddingVertical: 16,
                paddingHorizontal: 12,
                marginLeft: 8,
                alignItems: 'center'
              }}
            >
              <Ionicons name="lock-closed" size={24} color="#DC2626" />
              <Text style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 12,
                color: '#DC2626',
                marginTop: 8,
                textAlign: 'center'
              }}>
                Emergency Lock
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Security Features */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 18,
            color: colors.text,
            marginBottom: 16
          }}>
            Security Features
          </Text>
          
          <View style={{
            backgroundColor: colors.cardBackground,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: colors.border,
            overflow: 'hidden'
          }}>
            {securityFeatures.map((feature, index) => (
              <View
                key={feature.id}
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 16,
                  borderBottomWidth: index < securityFeatures.length - 1 ? 1 : 0,
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
                  <Ionicons name={feature.icon} size={20} color={colors.primary} />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={{
                    fontFamily: 'Inter_500Medium',
                    fontSize: 16,
                    color: colors.text,
                    marginBottom: 4
                  }}>
                    {feature.title}
                  </Text>
                  <Text style={{
                    fontFamily: 'Inter_400Regular',
                    fontSize: 14,
                    color: colors.textSecondary,
                    lineHeight: 20
                  }}>
                    {feature.description}
                  </Text>
                </View>

                {feature.type === 'toggle' ? (
                  <Switch
                    value={securitySettings[feature.id]}
                    onValueChange={() => handleToggleFeature(feature.id)}
                    trackColor={{ false: colors.border, true: colors.primary + '40' }}
                    thumbColor={securitySettings[feature.id] ? colors.primary : colors.surfaceSecondary}
                  />
                ) : (
                  <TouchableOpacity onPress={() => feature.screen && router.push(feature.screen)}>
                    <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Security Actions */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 18,
            color: colors.text,
            marginBottom: 16
          }}>
            Account Security
          </Text>
          
          <View style={{
            backgroundColor: colors.cardBackground,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: colors.border,
            overflow: 'hidden'
          }}>
            {securityActions.map((action, index) => (
              <TouchableOpacity
                key={action.id}
                onPress={() => handleSecurityAction(action)}
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 16,
                  borderBottomWidth: index < securityActions.length - 1 ? 1 : 0,
                  borderBottomColor: colors.border,
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <View style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: colors.surfaceSecondary,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 16
                }}>
                  <Ionicons name={action.icon} size={20} color={colors.text} />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={{
                    fontFamily: 'Inter_500Medium',
                    fontSize: 16,
                    color: colors.text,
                    marginBottom: 4
                  }}>
                    {action.title}
                  </Text>
                  <Text style={{
                    fontFamily: 'Inter_400Regular',
                    fontSize: 14,
                    color: colors.textSecondary,
                    lineHeight: 20
                  }}>
                    {action.description}
                  </Text>
                </View>

                {action.status === 'enabled' && (
                  <View style={{
                    backgroundColor: '#ECFDF5',
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 8,
                    marginRight: 8
                  }}>
                    <Text style={{
                      fontFamily: 'Inter_500Medium',
                      fontSize: 10,
                      color: '#059669'
                    }}>
                      ENABLED
                    </Text>
                  </View>
                )}

                <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Security Events */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 18,
            color: colors.text,
            marginBottom: 16
          }}>
            Recent Security Activity
          </Text>
          
          {recentSecurityEvents.map((event) => {
            const statusConfig = getEventStatusConfig(event.status);
            
            return (
              <View
                key={event.id}
                style={{
                  backgroundColor: colors.cardBackground,
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 12,
                  borderWidth: 1,
                  borderColor: colors.border,
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <View style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: statusConfig.bg,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 12
                }}>
                  <Ionicons name={statusConfig.icon} size={16} color={statusConfig.color} />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={{
                    fontFamily: 'Inter_500Medium',
                    fontSize: 14,
                    color: colors.text,
                    marginBottom: 2
                  }}>
                    {event.event}
                  </Text>
                  <Text style={{
                    fontFamily: 'Inter_400Regular',
                    fontSize: 12,
                    color: colors.textSecondary
                  }}>
                    {event.device} • {event.location} • {formatTimeAgo(event.timestamp)}
                  </Text>
                </View>
              </View>
            );
          })}
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
              Security Tips
            </Text>
          </View>
          <Text style={{
            fontFamily: 'Inter_400Regular',
            fontSize: 14,
            color: colors.textSecondary,
            lineHeight: 20,
            marginBottom: 12
          }}>
            • Enable biometric authentication for enhanced security{'\n'}
            • Regularly change your security PIN{'\n'}
            • Keep your app updated to the latest version{'\n'}
            • Report suspicious activity immediately{'\n'}
            • Never share your PIN or biometric access
          </Text>
          
          <TouchableOpacity
            style={{
              backgroundColor: colors.primary,
              borderRadius: 12,
              paddingVertical: 12,
              paddingHorizontal: 16,
              alignSelf: 'flex-start'
            }}
          >
            <Text style={{
              fontFamily: 'Inter_500Medium',
              fontSize: 14,
              color: colors.primaryText
            }}>
              Learn More
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}