import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from "@/context/ThemeContext";

const profileSections = [
  {
    title: 'Account',
    items: [
      { name: 'Profile Settings', icon: 'person-outline', screen: '/profile-settings' },
      { name: 'Linked Documents', icon: 'document-text-outline', screen: '/linked-documents' },
      { name: 'Activity Log', icon: 'time-outline', screen: '/activity-log' },
      { name: 'Notification Center', icon: 'notifications-outline', screen: '/notifications' }
    ]
  },
  {
    title: 'Security',
    items: [
      { name: 'Security Center', icon: 'shield-checkmark-outline', screen: '/security' },
      { name: 'Change PIN', icon: 'keypad-outline', screen: '/change-pin' },
      { name: 'Biometric Settings', icon: 'finger-print-outline', screen: '/biometric' }
    ]
  },
  {
    title: 'Preferences',
    items: [
      { name: 'Theme Settings', icon: 'color-palette-outline', screen: '/theme' },
      { name: 'Language', icon: 'language-outline', screen: '/language' },
      { name: 'Notification Settings', icon: 'settings-outline', screen: '/notification-settings' }
    ]
  },
  {
    title: 'Support',
    items: [
      { name: 'Help Center', icon: 'help-circle-outline', screen: '/help' },
      { name: 'About', icon: 'information-circle-outline', screen: '/about' },
      { name: 'Privacy & Consent', icon: 'document-outline', screen: '/privacy' },
      { name: 'Account Recovery', icon: 'key-outline', screen: '/recovery' }
    ]
  }
];

export default function ProfileScreen() {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleItemPress = (screen) => {
    router.push(screen);
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Yes", 
          style: "destructive",
          onPress: () => router.replace('/login')
        }
      ]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDark ? "light" : "dark"} />
      
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom + 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={{ 
          paddingHorizontal: 20, 
          paddingVertical: 32,
          backgroundColor: colors.primary,
          marginBottom: 24
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: colors.primaryText,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 16
            }}>
              <Text style={{
                fontFamily: 'Inter_700Bold',
                fontSize: 32,
                color: colors.primary
              }}>
                JC
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{
                fontFamily: 'Inter_700Bold',
                fontSize: 24,
                color: colors.primaryText,
                marginBottom: 4
              }}>
                John Doe
              </Text>
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 16,
                color: colors.primaryText,
                opacity: 0.9,
                marginBottom: 8
              }}>
                NIN: 1234567890
              </Text>
              <View style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 4,
                alignSelf: 'flex-start'
              }}>
                <Text style={{
                  fontFamily: 'Inter_500Medium',
                  fontSize: 12,
                  color: colors.primaryText
                }}>
                  Verified Account
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Profile Sections */}
        {profileSections.map((section) => (
          <View key={section.title} style={{ paddingHorizontal: 20, marginBottom: 32 }}>
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 18,
              color: colors.text,
              marginBottom: 16
            }}>
              {section.title}
            </Text>
            
            <View style={{
              backgroundColor: colors.cardBackground,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: colors.border,
              overflow: 'hidden'
            }}>
              {section.items.map((item, index) => (
                <TouchableOpacity
                  key={item.name}
                  onPress={() => handleItemPress(item.screen)}
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 16,
                    borderBottomWidth: index < section.items.length - 1 ? 1 : 0,
                    borderBottomColor: colors.border,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <Ionicons 
                      name={item.icon} 
                      size={24} 
                      color={colors.textSecondary}
                      style={{ marginRight: 16 }}
                    />
                    <Text style={{
                      fontFamily: 'Inter_500Medium',
                      fontSize: 16,
                      color: colors.text
                    }}>
                      {item.name}
                    </Text>
                  </View>
                  <Ionicons 
                    name="chevron-forward" 
                    size={20} 
                    color={colors.textSecondary} 
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Logout Button */}
        <View style={{ paddingHorizontal: 20, marginBottom: 32 }}>
          <TouchableOpacity
            onPress={handleLogout}
            style={{
              backgroundColor: colors.error,
              paddingVertical: 16,
              borderRadius: 12,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center'
            }}
          >
            <Ionicons name="log-out-outline" size={24} color="#FFFFFF" style={{ marginRight: 8 }} />
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 16,
              color: '#FFFFFF'
            }}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>

        {/* App Version */}
        <View style={{ paddingHorizontal: 20, alignItems: 'center' }}>
          <Text style={{
            fontFamily: 'Inter_400Regular',
            fontSize: 14,
            color: colors.textSecondary,
            textAlign: 'center'
          }}>
            NatioID Version 1.0.0
          </Text>
          <Text style={{
            fontFamily: 'Inter_400Regular',
            fontSize: 12,
            color: colors.textSecondary,
            textAlign: 'center',
            marginTop: 4
          }}>
            © 2025 Government of Country
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}