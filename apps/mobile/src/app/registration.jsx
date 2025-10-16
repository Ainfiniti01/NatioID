import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from "@/context/ThemeContext";
import DropdownPicker from '@/components/DropdownPicker';

const countryCodes = {
  US: '+1',
  GB: '+44',
  CA: '+1',
  FR: '+33',
  DE: '+49',
  ES: '+34',
  MX: '+52',
  BR: '+55',
  NG: '+234',
  KE: '+254',
  EG: '+20',
  SA: '+966',
  OTHER: '', // No specific country code for 'Other'
};

export default function RegistrationScreen() {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const [citizenId, setCitizenId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState(null); // New state for country
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // Validation error states
  const [citizenIdError, setCitizenIdError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [countryError, setCountryError] = useState(''); // New state for country validation
  
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleContinue = () => {
    // Reset errors
    setCitizenIdError('');
    setFirstNameError('');
    setLastNameError('');
    setPhoneNumberError('');
    setEmailError('');
    setCountryError(''); // Reset country error

    let isValid = true;

    // Citizen ID validation
    if (!/^\d{1,11}$/.test(citizenId)) {
      setCitizenIdError('Citizen ID must be up to 11 digits and numeric only.');
      isValid = false;
    }

    // First Name validation
    if (!/^[a-zA-Z]+$/.test(firstName)) {
      setFirstNameError('First Name must contain only letters.');
      isValid = false;
    }

    // Last Name validation
    if (!/^[a-zA-Z]+$/.test(lastName)) {
      setLastNameError('Last Name must contain only letters.');
      isValid = false;
    }

    // Phone Number validation
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, ''); // Remove non-digits
    const selectedCountryCode = countryCodes[country];

    if (!cleanedPhoneNumber || cleanedPhoneNumber.length > 11) {
      setPhoneNumberError('Phone Number must be up to 11 digits.');
      isValid = false;
    } else if (selectedCountryCode && !phoneNumber.startsWith(selectedCountryCode)) {
      setPhoneNumberError(`Phone Number must start with ${selectedCountryCode} for the selected country.`);
      isValid = false;
    }

    // Email validation
    if (!email.includes('@')) {
      setEmailError('Email Address must include "@" symbol.');
      isValid = false;
    }

    // Country validation
    if (!country) {
      setCountryError('Please select your country.');
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    // Handle registration logic here
    console.log({ citizenId, firstName, lastName, phoneNumber, email, agreeToTerms });
    // For now, navigate to a success screen or dashboard
    router.replace('/otp-verification');
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
            <Text style={{
              fontFamily: 'Inter_700Bold',
              fontSize: 32,
              color: colors.primaryText
            }}>ID</Text>
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
            Enter your information to get started with Digital Citizen ID
          </Text>
        </View>

        {/* Form Fields */}
        <View style={{ marginBottom: 30 }}>
          {/* Citizen ID */}
          <Text style={{ fontFamily: 'Inter_600SemiBold', fontSize: 14, color: colors.text, marginBottom: 8 }}>
            Citizen ID *
          </Text>
          <TextInput
            style={{
              backgroundColor: colors.cardBackground,
              borderRadius: 12,
              paddingHorizontal: 16,
              paddingVertical: 14,
              fontSize: 16,
              color: colors.text,
              fontFamily: 'Inter_400Regular',
              marginBottom: 20
            }}
            placeholder="Enter your Citizen ID"
            placeholderTextColor={colors.textSecondary}
            keyboardType="numeric"
            maxLength={11}
            value={citizenId}
            onChangeText={setCitizenId}
          />
          {citizenIdError ? <Text style={{ color: 'red', fontSize: 12, marginTop: 4 }}>{citizenIdError}</Text> : null}

          {/* First Name & Last Name */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Text style={{ fontFamily: 'Inter_600SemiBold', fontSize: 14, color: colors.text, marginBottom: 8 }}>
                First Name *
              </Text>
              <TextInput
                style={{
                  backgroundColor: colors.cardBackground,
                  borderRadius: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 14,
                  fontSize: 16,
                  color: colors.text,
                  fontFamily: 'Inter_400Regular',
                }}
                placeholder="First name"
                placeholderTextColor={colors.textSecondary}
                keyboardType="default"
                value={firstName}
                onChangeText={(text) => setFirstName(text.replace(/[^a-zA-Z]/g, ''))}
              />
              {firstNameError ? <Text style={{ color: 'red', fontSize: 12, marginTop: 4 }}>{firstNameError}</Text> : null}
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={{ fontFamily: 'Inter_600SemiBold', fontSize: 14, color: colors.text, marginBottom: 8 }}>
                Last Name *
              </Text>
              <TextInput
                style={{
                  backgroundColor: colors.cardBackground,
                  borderRadius: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 14,
                  fontSize: 16,
                  color: colors.text,
                  fontFamily: 'Inter_400Regular',
                }}
                placeholder="Last name"
                placeholderTextColor={colors.textSecondary}
                keyboardType="default"
                value={lastName}
                onChangeText={(text) => setLastName(text.replace(/[^a-zA-Z]/g, ''))}
              />
              {lastNameError ? <Text style={{ color: 'red', fontSize: 12, marginTop: 4 }}>{lastNameError}</Text> : null}
            </View>
          </View>

          {/* Country */}
          <Text style={{ fontFamily: 'Inter_600SemiBold', fontSize: 14, color: colors.text, marginBottom: 8 }}>
            Country *
          </Text>
          <DropdownPicker
            label="Country" // Added label prop
            items={[
              { label: 'United States', value: 'US', flag: '🇺🇸' },
              { label: 'United Kingdom', value: 'GB', flag: '🇬🇧' },
              { label: 'Canada', value: 'CA', flag: '🇨🇦' },
              { label: 'Nigeria', value: 'NG', flag: '🇳🇬' },
              { label: 'France', value: 'FR', flag: '🇫🇷' },
              { label: 'Germany', value: 'DE', flag: '🇩🇪' },
              { label: 'Spain', value: 'ES', flag: '🇪🇸' },
              { label: 'Mexico', value: 'MX', flag: '🇲🇽' },
              { label: 'Brazil', value: 'BR', flag: '🇧🇷' },
              { label: 'Kenya', value: 'KE', flag: '🇰🇪' },
              { label: 'Egypt', value: 'EG', flag: '🇪🇬' },
              { label: 'Saudi Arabia', value: 'SA', flag: '🇸🇦' },
              { label: 'Other', value: 'OTHER', flag: '🌍' },
            ]}
            selectedValue={country} // Changed defaultValue to selectedValue
            onValueChange={(value) => {
              setCountry(value);
              const newCountryCode = countryCodes[value];
              setPhoneNumber(newCountryCode || ''); // Set phone number to country code or empty
            }}
            style={{ marginBottom: 40 }}
          />
          {countryError ? <Text style={{ color: 'red', fontSize: 12, marginTop: 4 }}>{countryError}</Text> : null}

          {/* Phone Number */}
          <Text style={{ fontFamily: 'Inter_600SemiBold', fontSize: 14, color: colors.text, marginBottom: 8 }}>
            Phone Number *
          </Text>
          <TextInput
            style={{
              backgroundColor: colors.cardBackground,
              borderRadius: 12,
              paddingHorizontal: 16,
              paddingVertical: 14,
              fontSize: 16,
              color: colors.text,
              fontFamily: 'Inter_400Regular',
              marginBottom: 20
            }}
            placeholder="e.g., +1 (555) 123-4567"
              placeholderTextColor={colors.textSecondary}
              keyboardType="phone-pad"
              maxLength={11 + (countryCodes[country] ? countryCodes[country].length : 0)} // Max 11 digits + country code length
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
            {phoneNumberError ? <Text style={{ color: 'red', fontSize: 12, marginTop: 4 }}>{phoneNumberError}</Text> : null}

          {/* Email Address */}
          <Text style={{ fontFamily: 'Inter_600SemiBold', fontSize: 14, color: colors.text, marginBottom: 8 }}>
            Email Address *
          </Text>
          <TextInput
            style={{
              backgroundColor: colors.cardBackground,
              borderRadius: 12,
              paddingHorizontal: 16,
              paddingVertical: 14,
              fontSize: 16,
              color: colors.text,
              fontFamily: 'Inter_400Regular',
              marginBottom: 20
            }}
            placeholder="your.email@example.com"
            placeholderTextColor={colors.textSecondary}
            keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            {emailError ? <Text style={{ color: 'red', fontSize: 12, marginTop: 4 }}>{emailError}</Text> : null}

            {/* Terms Checkbox */}
          <TouchableOpacity
            onPress={() => setAgreeToTerms(!agreeToTerms)}
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              marginBottom: 30 // Adjusted margin to match previous Switch layout
            }}
          >
            <View style={{
              width: 20,
              height: 20,
              borderRadius: 4,
              borderWidth: 2,
              borderColor: agreeToTerms ? colors.primary : colors.border,
              backgroundColor: agreeToTerms ? colors.primary : 'transparent',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12,
              marginTop: 5
            }}>
              {agreeToTerms && (
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
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View style={{
        paddingHorizontal: 20,
        paddingBottom: insets.bottom + 20,
        paddingTop: 20,
        backgroundColor: colors.background,
        borderTopWidth: 1,
        borderTopColor: colors.border
      }}>
        <TouchableOpacity
          onPress={handleContinue}
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
            Continue
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.replace('/language-selection')}
          style={{
            marginTop: 15,
            alignItems: 'center'
          }}
        >
          <Text style={{
            fontFamily: 'Inter_500Medium',
            fontSize: 14,
            color: colors.textSecondary
          }}>
            Back to Language Selection
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
