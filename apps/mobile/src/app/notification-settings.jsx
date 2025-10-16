import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, Switch } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from "@/context/ThemeContext";

export default function NotificationSettingsScreen() {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(false);
  
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    applicationUpdates: true,
    complaintResponses: true,
    emergencyAlerts: true,
    governmentNews: true,
    systemMaintenance: false,
    securityAlerts: true,
    socialUpdates: false,
    marketingMessages: false,
    weeklyDigest: true,
    soundEnabled: true,
    vibrationEnabled: true,
    ledEnabled: false,
    doNotDisturbStart: '22:00',
    doNotDisturbEnd: '08:00',
    doNotDisturbEnabled: true,
    priorityContacts: true,
    emergencyBypass: true
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

  const handleSave = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Success', 'Notification settings updated successfully!');
    }, 1500);
  };

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const notificationSections = [
    {
      title: 'Delivery Methods',
      icon: 'send-outline',
      items: [
        { key: 'pushNotifications', label: 'Push Notifications', description: 'Receive notifications on this device', type: 'toggle' },
        { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive notifications via email', type: 'toggle' },
        { key: 'smsNotifications', label: 'SMS Notifications', description: 'Receive notifications via text message', type: 'toggle' }
      ]
    },
    {
      title: 'Government Services',
      icon: 'shield-outline',
      items: [
        { key: 'applicationUpdates', label: 'Application Updates', description: 'Status changes for your applications', type: 'toggle' },
        { key: 'complaintResponses', label: 'Complaint Responses', description: 'Responses to your submitted complaints', type: 'toggle' },
        { key: 'emergencyAlerts', label: 'Emergency Alerts', description: 'Critical safety and security alerts', type: 'toggle' },
        { key: 'governmentNews', label: 'Government News', description: 'Important announcements and updates', type: 'toggle' }
      ]
    },
    {
      title: 'System & Security',
      icon: 'lock-closed-outline',
      items: [
        { key: 'systemMaintenance', label: 'System Maintenance', description: 'Planned system downtime notifications', type: 'toggle' },
        { key: 'securityAlerts', label: 'Security Alerts', description: 'Account security and login notifications', type: 'toggle' }
      ]
    },
    {
      title: 'Social & Marketing',
      icon: 'people-outline',
      items: [
        { key: 'socialUpdates', label: 'Social Updates', description: 'Community and social feature updates', type: 'toggle' },
        { key: 'marketingMessages', label: 'Marketing Messages', description: 'Promotional content and offers', type: 'toggle' },
        { key: 'weeklyDigest', label: 'Weekly Digest', description: 'Summary of your weekly activity', type: 'toggle' }
      ]
    },
    {
      title: 'Sound & Alerts',
      icon: 'volume-high-outline',
      items: [
        { key: 'soundEnabled', label: 'Sound', description: 'Play notification sounds', type: 'toggle' },
        { key: 'vibrationEnabled', label: 'Vibration', description: 'Vibrate for notifications', type: 'toggle' },
        { key: 'ledEnabled', label: 'LED Indicator', description: 'Flash LED for notifications', type: 'toggle' }
      ]
    },
    {
      title: 'Do Not Disturb',
      icon: 'moon-outline',
      items: [
        { key: 'doNotDisturbEnabled', label: 'Enable Do Not Disturb', description: 'Silence notifications during set hours', type: 'toggle' },
        { key: 'priorityContacts', label: 'Priority Contacts', description: 'Allow calls from important contacts', type: 'toggle' },
        { key: 'emergencyBypass', label: 'Emergency Bypass', description: 'Always allow emergency notifications', type: 'toggle' }
      ]
    }
  ];

  const renderNotificationItem = (item) => {
    return (
      <View
        key={item.key}
        style={{
          backgroundColor: colors.cardBackground,
          borderRadius: 12,
          padding: 16,
          marginBottom: 12,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{
            fontFamily: 'Inter_500Medium',
            fontSize: 16,
            color: colors.text,
            marginBottom: 4
          }}>
            {item.label}
          </Text>
          <Text style={{
            fontFamily: 'Inter_400Regular',
            fontSize: 14,
            color: colors.textSecondary,
            lineHeight: 20
          }}>
            {item.description}
          </Text>
        </View>
        
        <Switch
          value={settings[item.key]}
          onValueChange={() => toggleSetting(item.key)}
          trackColor={{ false: colors.border, true: colors.primary + '40' }}
          thumbColor={settings[item.key] ? colors.primary : colors.surfaceSecondary}
          style={{ marginLeft: 16 }}
        />
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
            Notification Settings
          </Text>
          
          <TouchableOpacity onPress={handleSave} disabled={isLoading}>
            {isLoading ? (
              <View style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: colors.primary,
                borderTopColor: 'transparent'
              }} />
            ) : (
              <Ionicons name="checkmark" size={24} color={colors.primary} />
            )}
          </TouchableOpacity>
        </View>

        {/* Overview Card */}
        <View style={{
          backgroundColor: colors.primary,
          borderRadius: 16,
          padding: 20,
          marginBottom: 24
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <Ionicons name="notifications" size={24} color={colors.primaryText} />
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 18,
              color: colors.primaryText,
              marginLeft: 12
            }}>
              Stay Connected
            </Text>
          </View>
          
          <Text style={{
            fontFamily: 'Inter_400Regular',
            fontSize: 14,
            color: colors.primaryText,
            opacity: 0.9,
            lineHeight: 20
          }}>
            Customize how you receive notifications about government services, applications, and important updates. You can always change these settings later.
          </Text>
        </View>

        {/* Quick Actions */}
        <View style={{
          flexDirection: 'row',
          gap: 12,
          marginBottom: 24
        }}>
          <TouchableOpacity
            onPress={() => {
              // Enable all important notifications
              setSettings(prev => ({
                ...prev,
                pushNotifications: true,
                emailNotifications: true,
                applicationUpdates: true,
                complaintResponses: true,
                emergencyAlerts: true,
                securityAlerts: true
              }));
            }}
            style={{
              flex: 1,
              backgroundColor: colors.cardBackground,
              borderRadius: 12,
              padding: 16,
              alignItems: 'center'
            }}
          >
            <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
            <Text style={{
              fontFamily: 'Inter_500Medium',
              fontSize: 14,
              color: colors.text,
              marginTop: 8,
              textAlign: 'center'
            }}>
              Enable Essential
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              // Disable all non-essential notifications
              setSettings(prev => ({
                ...prev,
                governmentNews: false,
                socialUpdates: false,
                marketingMessages: false,
                weeklyDigest: false,
                systemMaintenance: false
              }));
            }}
            style={{
              flex: 1,
              backgroundColor: colors.cardBackground,
              borderRadius: 12,
              padding: 16,
              alignItems: 'center'
            }}
          >
            <Ionicons name="remove-circle" size={24} color={colors.warning} />
            <Text style={{
              fontFamily: 'Inter_500Medium',
              fontSize: 14,
              color: colors.text,
              marginTop: 8,
              textAlign: 'center'
            }}>
              Disable Optional
            </Text>
          </TouchableOpacity>
        </View>

        {/* Notification Sections */}
        {notificationSections.map((section) => (
          <View key={section.title} style={{ marginBottom: 24 }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 16
            }}>
              <Ionicons name={section.icon} size={20} color={colors.primary} />
              <Text style={{
                fontFamily: 'Inter_600SemiBold',
                fontSize: 18,
                color: colors.text,
                marginLeft: 8
              }}>
                {section.title}
              </Text>
            </View>
            
            {section.items.map((item) => renderNotificationItem(item))}
          </View>
        ))}

        {/* Do Not Disturb Schedule */}
        {settings.doNotDisturbEnabled && (
          <View style={{
            backgroundColor: colors.cardBackground,
            borderRadius: 16,
            padding: 20,
            marginBottom: 24
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
              <Ionicons name="time-outline" size={20} color={colors.primary} />
              <Text style={{
                fontFamily: 'Inter_600SemiBold',
                fontSize: 16,
                color: colors.text,
                marginLeft: 8
              }}>
                Do Not Disturb Schedule
              </Text>
            </View>

            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 16
            }}>
              <View style={{ flex: 1 }}>
                <Text style={{
                  fontFamily: 'Inter_500Medium',
                  fontSize: 14,
                  color: colors.textSecondary,
                  marginBottom: 4
                }}>
                  Start Time
                </Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: colors.surfaceSecondary,
                    borderRadius: 8,
                    padding: 12,
                    alignItems: 'center'
                  }}
                >
                  <Text style={{
                    fontFamily: 'Inter_600SemiBold',
                    fontSize: 16,
                    color: colors.text
                  }}>
                    {settings.doNotDisturbStart}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={{
                width: 20,
                height: 2,
                backgroundColor: colors.border,
                marginHorizontal: 16
              }} />

              <View style={{ flex: 1 }}>
                <Text style={{
                  fontFamily: 'Inter_500Medium',
                  fontSize: 14,
                  color: colors.textSecondary,
                  marginBottom: 4
                }}>
                  End Time
                </Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: colors.surfaceSecondary,
                    borderRadius: 8,
                    padding: 12,
                    alignItems: 'center'
                  }}
                >
                  <Text style={{
                    fontFamily: 'Inter_600SemiBold',
                    fontSize: 16,
                    color: colors.text
                  }}>
                    {settings.doNotDisturbEnd}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <Text style={{
              fontFamily: 'Inter_400Regular',
              fontSize: 12,
              color: colors.textSecondary,
              textAlign: 'center'
            }}>
              Notifications will be silenced during these hours, except for emergency alerts and priority contacts.
            </Text>
          </View>
        )}

        {/* Notification Test */}
        <View style={{
          backgroundColor: colors.cardBackground,
          borderRadius: 16,
          padding: 20,
          marginBottom: 24
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <Ionicons name="flask-outline" size={20} color={colors.primary} />
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 16,
              color: colors.text,
              marginLeft: 8
            }}>
              Test Notifications
            </Text>
          </View>

          <Text style={{
            fontFamily: 'Inter_400Regular',
            fontSize: 14,
            color: colors.textSecondary,
            marginBottom: 16,
            lineHeight: 20
          }}>
            Send a test notification to verify your settings are working correctly.
          </Text>

          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                'Test Notification Sent',
                'A test notification has been sent. Please check if you received it according to your settings.',
                [{ text: 'OK' }]
              );
            }}
            style={{
              backgroundColor: colors.primary,
              borderRadius: 12,
              paddingVertical: 12,
              alignItems: 'center'
            }}
          >
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 14,
              color: colors.primaryText
            }}>
              Send Test Notification
            </Text>
          </TouchableOpacity>
        </View>

        {/* Important Notice */}
        <View style={{
          backgroundColor: '#FEF2F2',
          borderLeftWidth: 4,
          borderLeftColor: '#DC2626',
          borderRadius: 12,
          padding: 16,
          marginBottom: 24
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Ionicons name="warning" size={16} color="#DC2626" />
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 14,
              color: '#DC2626',
              marginLeft: 8
            }}>
              Important Notice
            </Text>
          </View>
          
          <Text style={{
            fontFamily: 'Inter_400Regular',
            fontSize: 12,
            color: '#7F1D1D',
            lineHeight: 18
          }}>
            Emergency alerts and critical security notifications cannot be disabled as they are required for your safety and account security.
          </Text>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          onPress={handleSave}
          disabled={isLoading}
          style={{
            backgroundColor: colors.primary,
            borderRadius: 16,
            paddingVertical: 16,
            alignItems: 'center',
            opacity: isLoading ? 0.7 : 1
          }}
        >
          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 16,
            color: colors.primaryText
          }}>
            {isLoading ? 'Saving Settings...' : 'Save Notification Settings'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}