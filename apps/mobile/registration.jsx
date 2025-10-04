import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

import { useTheme } from "@/context/ThemeContext";
import KeyboardAvoidingAnimatedView from './KeyboardAvoidingAnimatedView'; // Assuming this path

export default function RegistrationScreen() {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const [formData, setFormData] = useState({
    nin: '',
    phone: '',
    email: '',
    firstName: '',
    lastName: '',
    dateOfBirth: ''
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const validateNIN = (nin) => {
    return nin.length === 11 && /^\d+$/.test(nin);
  };

  const validatePhone = (phone) => {
    return phone.length >= 11 && /^\d+$/.test(phone.replace(/[^\d]/g, ''));
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleInputChange = (field, value) => {
    if (field === 'nin') {
      value = value.replace(/[^\d]/g, '').slice(0, 11);
    } else if (field === 'phone') {
      value = value.replace(/[^\d+]/g, '').slice(0, 14);
    }
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleContinue = async () => {
    if (!validateNIN(formData.nin)) {
      Alert.alert('Invalid NIN', 'Please enter a valid 11-digit National Identification Number');
      return;
    }

    if (!validatePhone(formData.phone)) {
      Alert.alert('Invalid Phone', 'Please enter a valid phone number');
      return;
    }

    if (!validateEmail(formData.email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return;
    }

    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      Alert.alert('Missing Information', 'Please enter your first and last name');
      return;
    }

    if (!termsAccepted) {
      Alert.alert('Terms Required', 'Please accept the Terms & Conditions to continue');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      router.push('/otp-verification');
    }, 2000);
  };

  return (
    <KeyboardAvoidingAnimatedView style={{ flex: 1, backgroundColor: colors.background }}>
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
        <View style={{ alignItems: 'center', marginBottom: 32 }}>
          <View style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 16
          }}>
            <Text style={{
              fontFamily: 'Inter_700Bold',
              fontSize: 32,
              color: colors.primaryText
            }}>
              N
            </Text>
          </View>
          <Text style={{
            fontFamily: 'Inter_700Bold',
            fontSize: 28,
            color: colors.text,
            textAlign: 'center',
            marginBottom: 8
          }}>
            Create Your Account
          </Text>
          <Text style={{
            fontFamily: 'Inter_400Regular',
            fontSize: 16,
            color: colors.textSecondary,
            textAlign: 'center',
            lineHeight: 24
          }}>
            Enter your information to get started with NatioID
          </Text>
        </View>

        {/* Registration Form */}
        <View style={{
          backgroundColor: colors.cardBackground,
          borderRadius: 16,
          padding: 24,
          borderWidth: 1,
          borderColor: colors.border,
          marginBottom: 24
        }}>
          {/* NIN Input */}
          <View style={{ marginBottom: 20 }}>
            <Text style={{
              fontFamily: 'Inter_500Medium',
              fontSize: 14,
              color: colors.text,
              marginBottom: 8
            }}>
              National Identification Number (NIN) *
            </Text>
            <TextInput
              style={{
                backgroundColor: colors.surface,
                borderRadius: 12,
                paddingHorizontal: 16,
                paddingVertical: 14,
                borderWidth: 1,
                borderColor: colors.border,
                fontFamily: 'Inter_400Regular',
                fontSize: 16,
                color: colors.text
              }}
              placeholder="Enter your 11-digit NIN"
              placeholderTextColor={colors.textSecondary}
              value={formData.nin}
              onChangeText={(value) => handleInputChange('nin', value)}
              keyboardType="numeric"
              maxLength={11}
            />
          </View>

          {/* Name Inputs */}
          <View style={{ flexDirection: 'row', marginBottom: 20 }}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Text style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 14,
                color: colors.text,
                marginBottom: 8
              }}>
                First Name *
              </Text>
              <TextInput
                style={{
                  backgroundColor: colors.surface,
                  borderRadius: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 14,
                  borderWidth: 1,
                  borderColor: colors.border,
                  fontFamily: 'Inter_400Regular',
                  fontSize: 16,
                  color: colors.text
                }}
                placeholder="First name"
                placeholderTextColor={colors.textSecondary}
                value={formData.firstName}
                onChangeText={(value) => handleInputChange('firstName', value)}
              />
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 14,
                color: colors.text,
                marginBottom: 8
              }}>
                Last Name *
              </Text>
              <TextInput
                style={{
                  backgroundColor: colors.surface,
                  borderRadius: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 14,
                  borderWidth: 1,
                  borderColor: colors.border,
                  fontFamily: 'Inter_400Regular',
                  fontSize: 16,
                  color: colors.text
                }}
                placeholder="Last name"
                placeholderTextColor={colors.textSecondary}
                value={formData.lastName}
                onChangeText={(value) => handleInputChange('lastName', value)}
              />
            </View>
          </View>

          {/* Phone Input */}
          <View style={{ marginBottom: 20 }}>
            <Text style={{
              fontFamily: 'Inter_500Medium',
              fontSize: 14,
              color: colors.text,
              marginBottom: 8
            }}>
              Phone Number *
            </Text>
            <TextInput
              style={{
                backgroundColor: colors.surface,
                borderRadius: 12,
                paddingHorizontal: 16,
                paddingVertical: 14,
                borderWidth: 1,
                borderColor: colors.border,
                fontFamily: 'Inter_400Regular',
                fontSize: 16,
                color: colors.text
              }}
              placeholder="+234 xxx xxx xxxx"
              placeholderTextColor={colors.textSecondary}
              value={formData.phone}
              onChangeText={(value) => handleInputChange('phone', value)}
              keyboardType="phone-pad"
            />
          </View>

          {/* Email Input */}
          <View style={{ marginBottom: 20 }}>
            <Text style={{
              fontFamily: 'Inter_500Medium',
              fontSize: 14,
              color: colors.text,
              marginBottom: 8
            }}>
              Email Address *
            </Text>
            <TextInput
              style={{
                backgroundColor: colors.surface,
                borderRadius: 12,
                paddingHorizontal: 16,
                paddingVertical: 14,
                borderWidth: 1,
                borderColor: colors.border,
                fontFamily: 'Inter_400Regular',
                fontSize: 16,
                color: colors.text
              }}
              placeholder="your.email@example.com"
              placeholderTextColor={colors.textSecondary}
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Terms Checkbox */}
          <TouchableOpacity
            onPress={() => setTermsAccepted(!termsAccepted)}
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              marginBottom: 24
            }}
          >
            <View style={{
              width: 20,
              height: 20,
              borderRadius: 4,
              borderWidth: 2,
              borderColor: termsAccepted ? colors.primary : colors.border,
              backgroundColor: termsAccepted ? colors.primary : 'transparent',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12,
              marginTop: 2
            }}>
              {termsAccepted && (
                <Ionicons name="checkmark" size={14} color={colors.primaryText} />
              )}
            </View>
            <Text style={{
              fontFamily: 'Inter_400Regular',
              fontSize: 14,
              color: colors.text,
              lineHeight: 20,
              flex: 1
            }}>
              I agree to the <Text style={{ color: colors.primary, fontFamily: 'Inter_500Medium' }}>Terms & Conditions</Text> and <Text style={{ color: colors.primary, fontFamily: 'Inter_500Medium' }}>Privacy Policy</Text>
            </Text>
          </TouchableOpacity>

          {/* Continue Button */}
          <TouchableOpacity
            onPress={handleContinue}
            disabled={loading}
            style={{
              backgroundColor: colors.primary,
              borderRadius: 12,
              paddingVertical: 16,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading && (
              <View style={{ marginRight: 8 }}>
                <Ionicons name="sync" size={20} color={colors.primaryText} />
              </View>
            )}
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 16,
              color: colors.primaryText
            }}>
              {loading ? 'Creating Account...' : 'Continue'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Back Button */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            alignItems: 'center',
            paddingVertical: 16
          }}
        >
          <Text style={{
            fontFamily: 'Inter_500Medium',
            fontSize: 16,
            color: colors.textSecondary
          }}>
            Back to Language Selection
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingAnimatedView>
  );
}
