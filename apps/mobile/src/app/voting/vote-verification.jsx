import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Vibration, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { Ionicons } from '@expo/vector-icons';
import * as LocalAuthentication from 'expo-local-authentication';
import * as Haptics from 'expo-haptics';
import { useTheme } from "@/context/ThemeContext";

export default function VoteVerificationScreen() {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const { candidateId, candidateName, candidateCountry, electionId, electionType } = params;

  const [pin, setPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const [biometricType, setBiometricType] = useState(null);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    checkBiometrics();
  }, []);

  useEffect(() => {
    if (pin.length === 6 && !isLoading) {
      handlePinSubmit();
    }
  }, [pin, isLoading]);

  const checkBiometrics = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    setBiometricAvailable(compatible);

    if (compatible) {
      const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
      if (types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
        setBiometricType('Face ID');
      } else if (types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
        setBiometricType('Fingerprint');
      } else if (types.includes(LocalAuthentication.AuthenticationType.IRIS)) {
        setBiometricType('Iris');
      }
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  const handlePinPress = (digit) => {
    if (pin.length < 6) {
      setPin(prev => prev + digit);
    }
  };

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
  };

  const handleVoteSubmission = async () => {
    setIsLoading(true);

    try {
      // Simulate pending state
      router.replace({
        pathname: "/voting/vote-result",
        params: {
          voteStatus: "pending",
          candidateName,
          candidateCountry,
          electionType,
        },
      });

      // Simulate network delay for actual vote submission
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Mock successful response
      const result = {
        success: true,
        voteId: "VOTE-" + Date.now(),
        confirmationCode: Math.random()
          .toString(36)
          .substring(2, 8)
          .toUpperCase(),
      };

      if (result.success) {
        router.replace({
          pathname: "/voting/vote-result",
          params: {
            voteStatus: "success",
            candidateName,
            candidateCountry,
            voteId: result.voteId,
            confirmationCode: result.confirmationCode,
            electionType,
          },
        });
      } else {
        throw new Error("Vote submission failed");
      }
    } catch (error) {
      console.error("Vote submission error:", error);
      router.replace({
        pathname: "/voting/vote-result",
        params: {
          voteStatus: "failed",
          error: "Failed to submit vote. Please try again.",
          candidateName,
          candidateCountry,
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePinSubmit = async () => {
    if (pin.length !== 6) {
      return;
    }

    setIsLoading(true);

    // Simulate PIN verification
    setTimeout(async () => {
      if (pin === '123456') { // Dummy PIN for verification
        await handleVoteSubmission();
      } else {
        Vibration.vibrate(); // Add vibration for incorrect PIN
        const newAttempts = attemptsLeft - 1;
        setAttemptsLeft(newAttempts);
        setPin('');
        
        if (newAttempts === 0) {
          Alert.alert(
            'Verification Failed',
            'Too many failed attempts. Please go back and try again.',
            [
              { text: 'Go Back', onPress: () => router.back() },
              { text: 'OK' }
            ]
          );
        } else {
          Alert.alert(
            'Incorrect PIN',
            `Invalid PIN. ${newAttempts} attempt${newAttempts === 1 ? '' : 's'} remaining.`
          );
        }
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleBiometricVerification = async () => {
    if (!biometricAvailable) {
      Alert.alert('Biometric Not Available', 'Your device does not support biometric authentication.');
      return;
    }

    setIsLoading(true);
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: `Authenticate with your ${biometricType || 'biometrics'} to confirm your vote`,
        cancelLabel: 'Cancel',
        disableDeviceFallback: true,
      });

      if (result.success) {
        await handleVoteSubmission();
      } else {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        Alert.alert('Authentication Failed', 'Please try again or go back.', [
          { text: 'Try Again', onPress: handleBiometricVerification },
          { text: 'Go Back', onPress: () => router.back() },
        ]);
      }
    } catch (error) {
      console.error("Biometric authentication error:", error);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert('Authentication Error', 'Could not start biometric authentication. Please try again.', [
        { text: 'Try Again', onPress: handleBiometricVerification },
        { text: 'Go Back', onPress: () => router.back() },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderPinDots = () => {
    return (
      <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 40
      }}>
        {[...Array(6)].map((_, index) => (
          <View
            key={index}
            style={{
              width: 16,
              height: 16,
              borderRadius: 8,
              backgroundColor: index < pin.length ? colors.primary : colors.surfaceSecondary,
              marginHorizontal: 8,
              borderWidth: 2,
              borderColor: index < pin.length ? colors.primary : colors.border
            }}
          />
        ))}
      </View>
    );
  };

  const renderKeypad = () => {
    const keys = [
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
      ['biometric', '0', 'backspace']
    ];

    return (
      <View style={{ alignItems: 'center' }}>
        {keys.map((row, rowIndex) => (
          <View key={rowIndex} style={{
            flexDirection: 'row',
            marginBottom: 20
          }}>
            {row.map((key) => {
              if (key === 'biometric') {
                return (
                  <TouchableOpacity
                    key={key}
                    onPress={handleBiometricVerification}
                    disabled={!biometricAvailable || isLoading}
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 32,
                      backgroundColor: biometricAvailable && !isLoading ? colors.surfaceSecondary : 'transparent',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginHorizontal: 24
                    }}
                  >
                    {biometricAvailable && (
                      <Ionicons name="finger-print" size={28} color={colors.primary} />
                    )}
                  </TouchableOpacity>
                );
              }
              
              if (key === 'backspace') {
                return (
                  <TouchableOpacity
                    key={key}
                    onPress={handleBackspace}
                    disabled={isLoading}
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 32,
                      backgroundColor: colors.surfaceSecondary,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginHorizontal: 24
                    }}
                  >
                    <Ionicons name="backspace-outline" size={24} color={colors.text} />
                  </TouchableOpacity>
                );
              }

              return (
                <TouchableOpacity
                  key={key}
                  onPress={() => handlePinPress(key)}
                  disabled={isLoading}
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 32,
                    backgroundColor: colors.surfaceSecondary,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginHorizontal: 24
                  }}
                >
                  <Text style={{
                    fontFamily: 'Inter_600SemiBold',
                    fontSize: 20,
                    color: colors.text
                  }}>
                    {key}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View style={{
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: insets.top,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        paddingBottom: 20
      }}>
        <StatusBar style={isDark ? "light" : "dark"} />

        {/* Header */}
        <View style={{
          alignItems: 'center',
          marginTop: 40,
          marginBottom: 60
        }}>
          <View style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20
          }}>
            <Text style={{
              fontFamily: 'Inter_700Bold',
              fontSize: 32,
              color: colors.primaryText
            }}>
              V
            </Text>
          </View>
          
          <Text style={{
            fontFamily: 'Inter_700Bold',
            fontSize: 24,
            color: colors.text,
            marginBottom: 8
          }}>
            Verify Your Vote
          </Text>
          
          <Text style={{
            fontFamily: 'Inter_400Regular',
            fontSize: 16,
            color: colors.textSecondary,
            textAlign: 'center'
          }}>
            Enter your PIN or use biometrics to confirm your vote for {candidateName}.
          </Text>
        </View>

        {/* PIN Input */}
        <View style={{ marginBottom: 60 }}>
          {renderPinDots()}
          
          {attemptsLeft < 3 && (
            <View style={{
              backgroundColor: colors.error + '20',
              borderRadius: 8,
              padding: 12,
              marginBottom: 20,
              alignItems: 'center'
            }}>
              <Text style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 12,
                color: colors.error,
                textAlign: 'center'
              }}>
                {attemptsLeft} attempt{attemptsLeft === 1 ? '' : 's'} remaining
              </Text>
            </View>
          )}
        </View>

        {/* Keypad */}
        <View style={{ flex: 1, justifyContent: 'center' }}>
          {renderKeypad()}
        </View>

        {/* Demo Info */}
        <View style={{
          backgroundColor: colors.surfaceSecondary,
          borderRadius: 12,
          padding: 12,
          marginTop: 20
        }}>
          <Text style={{
            fontFamily: 'Inter_500Medium',
            fontSize: 12,
            color: colors.text,
            textAlign: 'center',
            marginBottom: 4
          }}>
            Demo PIN: 123456
          </Text>
          <Text style={{
            fontFamily: 'Inter_400Regular',
            fontSize: 10,
            color: colors.textSecondary,
            textAlign: 'center'
          }}>
            Use fingerprint button for biometric verification
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
