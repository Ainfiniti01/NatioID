import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from "@/context/ThemeContext";
// import * as LocalAuthentication from 'expo-local-authentication'; // Uncomment if using real biometric checks

export default function BiometricSetupScreen() {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const [hasFingerprint, setHasFingerprint] = useState(false);
  const [hasFaceID, setHasFaceID] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    // Simulate checking for biometric support
    const checkBiometrics = async () => {
      // In a real app, you'd use LocalAuthentication.hasHardwareAsync() and LocalAuthentication.supportedAuthenticationTypesAsync()
      // For now, we'll just mock it.
      setHasFingerprint(Platform.OS === 'android' || Platform.OS === 'ios'); // Assume support for demo
      setHasFaceID(true); // Always show FaceID for demo purposes
    };
    checkBiometrics();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  const handleBiometricSetup = async (type) => {
    setIsAuthenticating(true);
    // Simulate biometric authentication
    setTimeout(() => {
      setIsAuthenticating(false);
      Alert.alert('Success', `${type} setup successfully!`);
      router.replace('/digital-consent');
    }, 1500);
  };

  const handleSkip = () => {
    router.replace('/digital-consent');
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDark ? "light" : "dark"} />
      
      <View style={{
        flex: 1,
        paddingTop: insets.top + 20,
        paddingHorizontal: 20,
        paddingBottom: insets.bottom + 20,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <View style={{ alignItems: 'center', marginBottom: 60 }}>
          <View style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 24
          }}>
            <Ionicons name="finger-print-outline" size={40} color={colors.primaryText} />
          </View>
          
          <Text style={{
            fontFamily: 'Inter_700Bold',
            fontSize: 28,
            color: colors.text,
            textAlign: 'center',
            marginBottom: 12
          }}>
            Enable Quick Login
          </Text>
          
          <Text style={{
            fontFamily: 'Inter_400Regular',
            fontSize: 16,
            color: colors.textSecondary,
            textAlign: 'center',
            lineHeight: 24,
            paddingHorizontal: 20
          }}>
            For faster and more secure access, enable biometric authentication.
          </Text>
        </View>

        <View style={{ width: '100%', maxWidth: 300 }}>
          {hasFingerprint && (
            <TouchableOpacity
              onPress={() => handleBiometricSetup('Fingerprint')}
              disabled={isAuthenticating}
              style={{
                backgroundColor: colors.cardBackground,
                paddingVertical: 16,
                borderRadius: 12,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 15,
                borderWidth: 1,
                borderColor: colors.border,
                opacity: isAuthenticating ? 0.5 : 1
              }}
            >
              <Ionicons name="finger-print-outline" size={24} color={colors.text} style={{ marginRight: 10 }} />
              <Text style={{
                fontFamily: 'Inter_600SemiBold',
                fontSize: 16,
                color: colors.text
              }}>
                Setup Fingerprint
              </Text>
            </TouchableOpacity>
          )}

          {hasFaceID && (
            <TouchableOpacity
              onPress={() => handleBiometricSetup('FaceID')}
              disabled={isAuthenticating}
              style={{
                backgroundColor: colors.cardBackground,
                paddingVertical: 16,
                borderRadius: 12,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 25,
                borderWidth: 1,
                borderColor: colors.border,
                opacity: isAuthenticating ? 0.5 : 1
              }}
            >
              <Ionicons name="happy-outline" size={24} color={colors.text} style={{ marginRight: 10 }} />
              <Text style={{
                fontFamily: 'Inter_600SemiBold',
                fontSize: 16,
                color: colors.text
              }}>
                Setup FaceID
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={handleSkip}
            disabled={isAuthenticating}
            style={{
              paddingVertical: 16,
              alignItems: 'center',
              opacity: isAuthenticating ? 0.5 : 1
            }}
          >
            <Text style={{
              fontFamily: 'Inter_500Medium',
              fontSize: 16,
              color: colors.textSecondary
            }}>
              Skip for Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
