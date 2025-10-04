import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from "@/context/ThemeContext";

export default function CreatePinScreen() {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState('new'); // Start directly with 'new'
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const getStepPin = () => {
    switch (step) {
      case 'new':
        return newPin;
      case 'confirm':
        return confirmPin;
      default:
        return '';
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 'new':
        return 'Create Your PIN';
      case 'confirm':
        return 'Confirm Your PIN';
      default:
        return 'Create PIN';
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case 'new':
        return 'Create a 6-digit PIN that you\'ll use to secure your account';
      case 'confirm':
        return 'Re-enter your new PIN to confirm';
      default:
        return '';
    }
  };

  const handleNumberPress = (number) => {
    const currentStepPin = getStepPin();
    if (currentStepPin.length < 6) {
      const newValue = currentStepPin + number;
      
      switch (step) {
        case 'new':
          setNewPin(newValue);
          break;
        case 'confirm':
          setConfirmPin(newValue);
          break;
      }

      // Auto-proceed when PIN is complete
      if (newValue.length === 6) {
        setTimeout(() => handleStepComplete(newValue), 200);
      }
    }
  };

  const handleBackspace = () => {
    switch (step) {
      case 'new':
        setNewPin(prev => prev.slice(0, -1));
        break;
      case 'confirm':
        setConfirmPin(prev => prev.slice(0, -1));
        break;
    }
  };

  const handleStepComplete = (pin) => {
    switch (step) {
      case 'new':
        if (pin.length === 6) {
          setStep('confirm');
        }
        break;
        
      case 'confirm':
        if (pin === newPin) {
          handleCreatePinSuccess();
        } else {
          Alert.alert(
            'PIN Mismatch', 
            'The PINs you entered do not match. Please try again.',
            [{ text: 'OK', onPress: () => {
              setStep('new');
              setNewPin('');
              setConfirmPin('');
            }}]
          );
        }
        break;
    }
  };

  const handleCreatePinSuccess = () => {
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      // Navigate to Biometric Setup
      router.replace('/biometric-setup'); 
    }, 2000);
  };

  const renderPinDots = () => {
    const pin = getStepPin();
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 40 }}>
        {[...Array(6)].map((_, index) => (
          <View
            key={index}
            style={{
              width: 16,
              height: 16,
              borderRadius: 8,
              backgroundColor: index < pin.length ? colors.primary : colors.border,
              marginHorizontal: 8
            }}
          />
        ))}
      </View>
    );
  };

  const renderNumberPad = () => {
    const numbers = [
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
      ['', '0', 'backspace']
    ];

    return (
      <View style={{ paddingHorizontal: 40 }}>
        {numbers.map((row, rowIndex) => (
          <View key={rowIndex} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
            {row.map((item, itemIndex) => {
              if (item === '') {
                return <View key={itemIndex} style={{ width: 70, height: 70 }} />;
              }
              
              if (item === 'backspace') {
                return (
                  <TouchableOpacity
                    key={itemIndex}
                    onPress={handleBackspace}
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: 35,
                      backgroundColor: colors.surfaceSecondary,
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Ionicons name="backspace-outline" size={24} color={colors.text} />
                  </TouchableOpacity>
                );
              }
              
              return (
                <TouchableOpacity
                  key={itemIndex}
                  onPress={() => handleNumberPress(item)}
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 35,
                    backgroundColor: colors.surfaceSecondary,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Text style={{
                    fontFamily: 'Inter_600SemiBold',
                    fontSize: 24,
                    color: colors.text
                  }}>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
    );
  };

  if (isProcessing) {
    return (
      <View style={{ 
        flex: 1, 
        backgroundColor: colors.background,
        paddingTop: insets.top + 20,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <StatusBar style={isDark ? "light" : "dark"} />
        
        <View style={{
          backgroundColor: colors.primary,
          width: 80,
          height: 80,
          borderRadius: 40,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 24
        }}>
          <Ionicons name="key" size={40} color={colors.primaryText} />
        </View>
        
        <Text style={{
          fontFamily: 'Inter_600SemiBold',
          fontSize: 20,
          color: colors.text,
          marginBottom: 8,
          textAlign: 'center'
        }}>
          Creating Your PIN
        </Text>
        
        <Text style={{
          fontFamily: 'Inter_400Regular',
          fontSize: 16,
          color: colors.textSecondary,
          textAlign: 'center'
        }}>
          Please wait while we securely create your PIN...
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDark ? "light" : "dark"} />
      
      <View style={{
        flex: 1,
        paddingTop: insets.top + 20,
        paddingHorizontal: 20,
        paddingBottom: insets.bottom + 20
      }}>
        {/* Header */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center', // Center the title
          alignItems: 'center',
          marginBottom: 40
        }}>
          {/* Removed back button */}
          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 18,
            color: colors.text
          }}>
            Create PIN
          </Text>
          {/* Placeholder for spacing if needed, or remove if not */}
          <View style={{ width: 24 }} /> 
        </View>

        {/* Removed Step Indicator */}

        {/* Title and Description */}
        <View style={{ alignItems: 'center', marginBottom: 60 }}>
          <Text style={{
            fontFamily: 'Inter_700Bold',
            fontSize: 24,
            color: colors.text,
            marginBottom: 12,
            textAlign: 'center'
          }}>
            {getStepTitle()}
          </Text>
          
          <Text style={{
            fontFamily: 'Inter_400Regular',
            fontSize: 16,
            color: colors.textSecondary,
            textAlign: 'center',
            lineHeight: 24,
            paddingHorizontal: 20
          }}>
            {getStepDescription()}
          </Text>
        </View>

        {/* PIN Dots */}
        {renderPinDots()}

        {/* Number Pad */}
        <View style={{ flex: 1, justifyContent: 'center' }}>
          {renderNumberPad()}
        </View>

        {/* Security Notice */}
        <View style={{
          backgroundColor: colors.surfaceSecondary,
          borderRadius: 12,
          padding: 16,
          marginTop: 20,
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <Ionicons name="shield-checkmark" size={20} color={colors.primary} />
          <Text style={{
            fontFamily: 'Inter_400Regular',
            fontSize: 14,
            color: colors.textSecondary,
            marginLeft: 12,
            flex: 1,
            lineHeight: 20
          }}>
            Your PIN is encrypted and stored securely. Choose a PIN that's easy for you to remember but hard for others to guess.
          </Text>
        </View>
      </View>
    </View>
  );
}
