import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from "@/context/ThemeContext";

export default function DigitalConsentScreen() {
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

  const handleAgreeAndContinue = () => {
    router.replace('/success-screen');
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDark ? "light" : "dark"} />
      
      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom + 20,
          paddingHorizontal: 20
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{ alignItems: 'center', marginBottom: 30 }}>
          <View style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20
          }}>
            <Ionicons name="document-text-outline" size={32} color={colors.primaryText} />
          </View>
          <Text style={{
            fontFamily: 'Inter_700Bold',
            fontSize: 28,
            color: colors.text,
            textAlign: 'center',
            marginBottom: 8
          }}>
            Digital Consent
          </Text>
          <Text style={{
            fontFamily: 'Inter_400Regular',
            fontSize: 16,
            color: colors.textSecondary,
            textAlign: 'center',
            lineHeight: 24
          }}>
            Please review and agree to our terms and policies to continue.
          </Text>
        </View>

        {/* Terms & Conditions */}
        <View style={{ marginBottom: 30 }}>
          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 18,
            color: colors.text,
            marginBottom: 10
          }}>
            Terms & Conditions
          </Text>
          <Text style={{
            fontFamily: 'Inter_400Regular',
            fontSize: 14,
            color: colors.textSecondary,
            lineHeight: 22
          }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            {'\n\n'}
            Curabitur pretium tincidunt lacus, vel euismod odio. Proin in felis nec libero consectetur efficitur. Sed at justo eget nulla facilisis efficitur.
          </Text>
        </View>

        {/* Privacy Policy */}
        <View style={{ marginBottom: 30 }}>
          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 18,
            color: colors.text,
            marginBottom: 10
          }}>
            Privacy Policy
          </Text>
          <Text style={{
            fontFamily: 'Inter_400Regular',
            fontSize: 14,
            color: colors.textSecondary,
            lineHeight: 22
          }}>
            Our privacy policy outlines how we collect, use, and protect your personal data. We are committed to ensuring the security and confidentiality of your information. By agreeing, you acknowledge that you have read and understood our practices.
            {'\n\n'}
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.
          </Text>
        </View>
      </ScrollView>

      {/* Agree & Continue Button */}
      <View style={{
        paddingHorizontal: 20,
        paddingBottom: insets.bottom + 20,
        paddingTop: 20,
        backgroundColor: colors.background,
        borderTopWidth: 1,
        borderTopColor: colors.border
      }}>
        <TouchableOpacity
          onPress={handleAgreeAndContinue}
          style={{
            backgroundColor: colors.primary,
            paddingVertical: 16,
            borderRadius: 12,
            alignItems: 'center',
            shadowColor: colors.primary,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 4
          }}
        >
          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 16,
            color: colors.primaryText
          }}>
            Agree & Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
