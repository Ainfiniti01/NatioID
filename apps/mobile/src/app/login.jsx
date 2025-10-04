import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Vibration, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from "@/context/ThemeContext";

export default function LoginScreen() {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const [pin, setPin] = useState('');
  const [showBiometric, setShowBiometric] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [userName, setUserName] = useState('John'); // Simulate fetching user name

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (pin.length === 6 && !isLoading) {
      handlePinSubmit();
    }
  }, [pin, isLoading]);

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

  const handlePinSubmit = async () => {
    if (pin.length !== 6) {
      // This case should ideally not be hit with auto-submit, but kept for safety
      return;
    }

    setIsLoading(true);

    // Simulate PIN verification
    setTimeout(() => {
      setIsLoading(false);
      if (pin === '123456') {
        router.replace('/(tabs)/dashboard');
      } else {
        Vibration.vibrate(); // Add vibration for incorrect PIN
        const newAttempts = attemptsLeft - 1;
        setAttemptsLeft(newAttempts);
        setPin('');
        
        if (newAttempts === 0) {
          Alert.alert(
            'Account Locked',
            'Too many failed attempts. Please reset your PIN or try again later.',
            [
              { text: 'Reset PIN', onPress: () => router.push('/recovery') },
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
    }, 1500);
  };

  const handleBiometricLogin = () => {
    Alert.alert(
      'Biometric Authentication',
      'Use your fingerprint or face to sign in',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Authenticate',
          onPress: () => {
            // Simulate biometric success
            setTimeout(() => {
              router.replace('/(tabs)/dashboard');
            }, 1000);
          }
        }
      ]
    );
  };

  const handleForgotPin = () => {
    router.push('/recovery');
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
                    onPress={handleBiometricLogin}
                    disabled={!showBiometric}
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 32,
                      backgroundColor: showBiometric ? colors.surfaceSecondary : 'transparent',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginHorizontal: 24
                    }}
                  >
                    {showBiometric && (
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
        justifyContent: 'space-between', // Distribute content vertically
        paddingBottom: 20 // Add padding to the bottom to prevent overlap
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
              N
            </Text>
          </View>
          
          <Text style={{
            fontFamily: 'Inter_700Bold',
            fontSize: 24,
            color: colors.text,
            marginBottom: 8
          }}>
            Welcome Back, {userName || 'User'}
          </Text>
          
          <Text style={{
            fontFamily: 'Inter_400Regular',
            fontSize: 16,
            color: colors.textSecondary,
            textAlign: 'center'
          }}>
            Enter your PIN to access NatioID
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

        {/* Forgot PIN */}
        <TouchableOpacity
          onPress={handleForgotPin}
          style={{
            alignItems: 'center',
            paddingVertical: 16
          }}
        >
          <Text style={{
            fontFamily: 'Inter_500Medium',
            fontSize: 14,
            color: colors.primary
          }}>
            Forgot PIN?
          </Text>
        </TouchableOpacity>

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
            Use fingerprint button for biometric demo
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
