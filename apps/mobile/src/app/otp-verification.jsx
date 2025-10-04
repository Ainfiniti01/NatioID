import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from "@/context/ThemeContext";

export default function OTPVerificationScreen() {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(120); // 2 minutes
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  if (!fontsLoaded) {
    return null;
  }

  const handleOTPChange = (index, value) => {
    if (value.length > 1) return; // Prevent multiple characters
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (index, key) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      Alert.alert('Incomplete OTP', 'Please enter the complete 6-digit verification code');
      return;
    }

    setLoading(true);

    // Simulate API verification
    setTimeout(() => {
      setLoading(false);
      if (otpString === '123456') {
        router.push('/create-pin'); // Navigate to Create PIN page
      } else {
        Alert.alert('Invalid OTP', 'The verification code you entered is incorrect. Please try again.');
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0].focus();
      }
    }, 2000);
  };

  const handleResend = () => {
    setTimer(120);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
    Alert.alert('OTP Sent', 'A new verification code has been sent to your phone and email');
    inputRefs.current[0].focus();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDark ? "light" : "dark"} />
      
      <View style={{
        flex: 1,
        paddingTop: insets.top + 40,
        paddingHorizontal: 20,
        paddingBottom: insets.bottom + 20,
      }}>
        {/* Header */}
        <View style={{ alignItems: 'center', marginBottom: 48 }}>
          <View style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 24
          }}>
            <Ionicons name="mail-outline" size={40} color={colors.primaryText} />
          </View>
          
          <Text style={{
            fontFamily: 'Inter_700Bold',
            fontSize: 28,
            color: colors.text,
            textAlign: 'center',
            marginBottom: 8
          }}>
            Verify Your Identity
          </Text>
          
          <Text style={{
            fontFamily: 'Inter_400Regular',
            fontSize: 16,
            color: colors.textSecondary,
            textAlign: 'center',
            lineHeight: 24,
            paddingHorizontal: 20
          }}>
            We've sent a 6-digit verification code to your phone and email address
          </Text>
        </View>

        {/* OTP Input */}
        <View style={{ marginBottom: 32 }}>
          <Text style={{
            fontFamily: 'Inter_500Medium',
            fontSize: 16,
            color: colors.text,
            textAlign: 'center',
            marginBottom: 24
          }}>
            Enter Verification Code
          </Text>
          
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            marginBottom: 24
          }}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => inputRefs.current[index] = ref}
                style={{
                  width: 48,
                  height: 56,
                  borderRadius: 12,
                  borderWidth: 2,
                  borderColor: digit ? colors.primary : colors.border,
                  backgroundColor: colors.surface,
                  textAlign: 'center',
                  fontFamily: 'Inter_600SemiBold',
                  fontSize: 24,
                  color: colors.text
                }}
                value={digit}
                onChangeText={(value) => handleOTPChange(index, value)}
                onKeyPress={({ nativeEvent }) => handleKeyPress(index, nativeEvent.key)}
                keyboardType="numeric"
                maxLength={1}
                selectTextOnFocus
              />
            ))}
          </View>

          {/* Timer and Resend */}
          <View style={{ alignItems: 'center' }}>
            {!canResend ? (
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 14,
                color: colors.textSecondary
              }}>
                Resend code in {formatTime(timer)}
              </Text>
            ) : (
              <TouchableOpacity onPress={handleResend}>
                <Text style={{
                  fontFamily: 'Inter_500Medium',
                  fontSize: 14,
                  color: colors.primary
                }}>
                  Resend Verification Code
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Verify Button */}
        <TouchableOpacity
          onPress={handleVerify}
          disabled={loading || otp.join('').length !== 6}
          style={{
            backgroundColor: colors.primary,
            borderRadius: 16,
            paddingVertical: 18,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 24,
            opacity: (loading || otp.join('').length !== 6) ? 0.5 : 1
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
            {loading ? 'Verifying...' : 'Verify & Continue'}
          </Text>
        </TouchableOpacity>

        {/* Help Section */}
        <View style={{
          backgroundColor: colors.surfaceSecondary,
          borderRadius: 12,
          padding: 16,
          marginBottom: 24
        }}>
          <Text style={{
            fontFamily: 'Inter_500Medium',
            fontSize: 14,
            color: colors.text,
            marginBottom: 8
          }}>
            Didn't receive the code?
          </Text>
          <Text style={{
            fontFamily: 'Inter_400Regular',
            fontSize: 12,
            color: colors.textSecondary,
            lineHeight: 18
          }}>
            • Check your SMS messages and email inbox{'\n'}
            • Make sure you entered the correct phone number{'\n'}
            • Wait for the timer to expire, then tap "Resend"
          </Text>
        </View>

        {/* Demo Notice */}
        <View style={{
          backgroundColor: colors.warning,
          borderRadius: 12,
          padding: 16,
          marginBottom: 24
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Ionicons name="information-circle" size={20} color="#000" style={{ marginRight: 8 }} />
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 14,
              color: '#000'
            }}>
              Demo Mode
            </Text>
          </View>
          <Text style={{
            fontFamily: 'Inter_400Regular',
            fontSize: 12,
            color: '#000',
            lineHeight: 16
          }}>
            For demo purposes, use verification code: 123456
          </Text>
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
            Back to Registration
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
