import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from "@/context/ThemeContext";

export default function ChangePinScreen() {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState('current'); // 'current', 'new', 'confirm'
  const [currentPin, setCurrentPin] = useState('');
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
      case 'current':
        return currentPin;
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
      case 'current':
        return 'Enter Current PIN';
      case 'new':
        return 'Create New PIN';
      case 'confirm':
        return 'Confirm New PIN';
      default:
        return 'Change PIN';
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case 'current':
        return 'Enter your current 6-digit security PIN to continue';
      case 'new':
        return 'Create a new 6-digit PIN that you\'ll remember';
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
        case 'current':
          setCurrentPin(newValue);
          break;
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
      case 'current':
        setCurrentPin(prev => prev.slice(0, -1));
        break;
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
      case 'current':
        // Simulate PIN verification
        if (pin === '123456') { // Mock current PIN
          setStep('new');
        } else {
          Alert.alert('Incorrect PIN', 'The PIN you entered is incorrect. Please try again.');
          setCurrentPin('');
        }
        break;
        
      case 'new':
        if (pin.length === 6) {
          setStep('confirm');
        }
        break;
        
      case 'confirm':
        if (pin === newPin) {
          handleChangePinSuccess();
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

  const handleChangePinSuccess = () => {
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      Alert.alert(
        'PIN Changed Successfully',
        'Your security PIN has been updated. Please remember your new PIN.',
        [
          { 
            text: 'OK', 
            onPress: () => router.replace('/login') 
          },
        ]
      );
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

  const renderStepIndicator = () => {
    const steps = ['current', 'new', 'confirm'];
    const currentStepIndex = steps.indexOf(step);
    
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 40 }}>
        {steps.map((stepName, index) => (
          <View key={stepName} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: index <= currentStepIndex ? colors.primary : colors.border,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {index < currentStepIndex ? (
                <Ionicons name="checkmark" size={16} color={colors.primaryText} />
              ) : (
                <Text style={{
                  fontFamily: 'Inter_600SemiBold',
                  fontSize: 14,
                  color: index === currentStepIndex ? colors.primaryText : colors.textSecondary
                }}>
                  {index + 1}
                </Text>
              )}
            </View>
            
            {index < steps.length - 1 && (
              <View style={{
                width: 40,
                height: 2,
                backgroundColor: index < currentStepIndex ? colors.primary : colors.border,
                marginHorizontal: 8
              }} />
            )}
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
          Updating Your PIN
        </Text>
        
        <Text style={{
          fontFamily: 'Inter_400Regular',
          fontSize: 16,
          color: colors.textSecondary,
          textAlign: 'center'
        }}>
          Please wait while we securely update your PIN...
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
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 40
        }}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          
          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 18,
            color: colors.text
          }}>
            Change PIN
          </Text>
          
          <View style={{ width: 24 }} />
        </View>

        {/* Step Indicator */}
        {renderStepIndicator()}

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