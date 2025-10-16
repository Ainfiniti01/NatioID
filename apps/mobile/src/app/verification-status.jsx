import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from "@/context/ThemeContext";

export default function VerificationStatusScreen() {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const [verificationStatus, setVerificationStatus] = useState('pending'); // pending, verified, rejected
  const [estimatedTime, setEstimatedTime] = useState('2-3 business days');

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    // Simulate verification process
    const timer = setTimeout(() => {
      setVerificationStatus('verified');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  const getStatusConfig = () => {
    switch (verificationStatus) {
      case 'pending':
        return {
          icon: 'time-outline',
          iconColor: colors.warning,
          backgroundColor: '#FFF7ED',
          borderColor: '#FDBA74',
          title: 'Verification Pending',
          subtitle: 'Your application is being reviewed',
          description: 'We are currently verifying your information with our national database. This process typically takes 2-3 business days.',
          actionText: 'Contact Support',
          actionIcon: 'help-circle-outline'
        };
      case 'verified':
        return {
          icon: 'checkmark-circle',
          iconColor: colors.success,
          backgroundColor: '#F0FDF4',
          borderColor: '#86EFAC',
          title: 'Verification Complete',
          subtitle: 'Your identity has been verified',
          description: 'Congratulations! Your NatioID account has been successfully verified. You can now access all features and services.',
          actionText: 'Continue to Dashboard',
          actionIcon: 'arrow-forward'
        };
      case 'rejected':
        return {
          icon: 'close-circle',
          iconColor: colors.error,
          backgroundColor: '#FEF2F2',
          borderColor: '#FCA5A5',
          title: 'Verification Failed',
          subtitle: 'Additional information required',
          description: 'We were unable to verify your information. Please check the details below and resubmit your application.',
          actionText: 'Resubmit Application',
          actionIcon: 'refresh'
        };
      default:
        return getStatusConfig.pending;
    }
  };

  const statusConfig = getStatusConfig();

  const handlePrimaryAction = () => {
    switch (verificationStatus) {
      case 'verified':
        router.replace('/(tabs)/dashboard');
        break;
      case 'rejected':
        router.push('/registration');
        break;
      case 'pending':
      default:
        // Contact support action
        break;
    }
  };

  const progressSteps = [
    { title: 'Account Created', completed: true },
    { title: 'Information Submitted', completed: true },
    { title: 'Document Verification', completed: verificationStatus !== 'pending' },
    { title: 'Identity Confirmed', completed: verificationStatus === 'verified' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
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
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: statusConfig.backgroundColor,
            borderWidth: 2,
            borderColor: statusConfig.borderColor,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 24
          }}>
            <Ionicons 
              name={statusConfig.icon} 
              size={50} 
              color={statusConfig.iconColor} 
            />
          </View>
          
          <Text style={{
            fontFamily: 'Inter_700Bold',
            fontSize: 28,
            color: colors.text,
            textAlign: 'center',
            marginBottom: 8
          }}>
            {statusConfig.title}
          </Text>
          
          <Text style={{
            fontFamily: 'Inter_500Medium',
            fontSize: 16,
            color: colors.textSecondary,
            textAlign: 'center'
          }}>
            {statusConfig.subtitle}
          </Text>
        </View>

        {/* Progress Bar */}
        <View style={{
          backgroundColor: colors.cardBackground,
          borderRadius: 16,
          padding: 20,
          borderWidth: 1,
          borderColor: colors.border,
          marginBottom: 24
        }}>
          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 16,
            color: colors.text,
            marginBottom: 16
          }}>
            Verification Progress
          </Text>
          
          {progressSteps.map((step, index) => (
            <View key={index} style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: index < progressSteps.length - 1 ? 16 : 0
            }}>
              <View style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                backgroundColor: step.completed ? colors.success : colors.border,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12
              }}>
                {step.completed && (
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                )}
              </View>
              <Text style={{
                fontFamily: step.completed ? 'Inter_500Medium' : 'Inter_400Regular',
                fontSize: 14,
                color: step.completed ? colors.text : colors.textSecondary,
                flex: 1
              }}>
                {step.title}
              </Text>
            </View>
          ))}
        </View>

        {/* Status Description */}
        <View style={{
          backgroundColor: colors.cardBackground,
          borderRadius: 16,
          padding: 20,
          borderWidth: 1,
          borderColor: colors.border,
          marginBottom: 24
        }}>
          <Text style={{
            fontFamily: 'Inter_400Regular',
            fontSize: 14,
            color: colors.text,
            lineHeight: 20,
            marginBottom: 16
          }}>
            {statusConfig.description}
          </Text>

          {verificationStatus === 'pending' && (
            <View style={{
              backgroundColor: colors.surfaceSecondary,
              borderRadius: 8,
              padding: 12
            }}>
              <Text style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 12,
                color: colors.text,
                marginBottom: 4
              }}>
                Estimated completion time: {estimatedTime}
              </Text>
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 11,
                color: colors.textSecondary
              }}>
                You'll receive a notification once verification is complete
              </Text>
            </View>
          )}

          {verificationStatus === 'rejected' && (
            <View style={{
              backgroundColor: '#FEF2F2',
              borderRadius: 8,
              padding: 12
            }}>
              <Text style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 12,
                color: colors.error,
                marginBottom: 8
              }}>
                Common reasons for rejection:
              </Text>
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 11,
                color: colors.error,
                lineHeight: 16
              }}>
                • NIN not found in national database{'\n'}
                • Mismatched personal information{'\n'}
                • Invalid phone number or email{'\n'}
                • Incomplete application
              </Text>
            </View>
          )}
        </View>

        {/* Action Button */}
        <TouchableOpacity
          onPress={handlePrimaryAction}
          style={{
            backgroundColor: colors.primary,
            borderRadius: 16,
            paddingVertical: 18,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 16
          }}
        >
          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 16,
            color: colors.primaryText,
            marginRight: 8
          }}>
            {statusConfig.actionText}
          </Text>
          <Ionicons 
            name={statusConfig.actionIcon} 
            size={20} 
            color={colors.primaryText} 
          />
        </TouchableOpacity>

        {/* Secondary Actions */}
        {verificationStatus === 'pending' && (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity
              onPress={() => router.push('/help')}
              style={{
                flex: 1,
                backgroundColor: colors.surface,
                borderRadius: 12,
                paddingVertical: 12,
                alignItems: 'center',
                marginRight: 8,
                borderWidth: 1,
                borderColor: colors.border
              }}
            >
              <Text style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 14,
                color: colors.text
              }}>
                Get Help
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => router.replace('/(tabs)/dashboard')}
              style={{
                flex: 1,
                backgroundColor: colors.surface,
                borderRadius: 12,
                paddingVertical: 12,
                alignItems: 'center',
                marginLeft: 8,
                borderWidth: 1,
                borderColor: colors.border
              }}
            >
              <Text style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 14,
                color: colors.text
              }}>
                Continue Anyway
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {verificationStatus === 'rejected' && (
          <TouchableOpacity
            onPress={() => router.push('/help')}
            style={{
              backgroundColor: colors.surface,
              borderRadius: 12,
              paddingVertical: 16,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: colors.border
            }}
          >
            <Text style={{
              fontFamily: 'Inter_500Medium',
              fontSize: 14,
              color: colors.text
            }}>
              Contact Support for Help
            </Text>
          </TouchableOpacity>
        )}

        {/* FAQ Link */}
        <View style={{ alignItems: 'center', marginTop: 24 }}>
          <TouchableOpacity
            onPress={() => router.push('/help')}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <Ionicons 
              name="help-circle-outline" 
              size={16} 
              color={colors.primary} 
              style={{ marginRight: 4 }}
            />
            <Text style={{
              fontFamily: 'Inter_400Regular',
              fontSize: 14,
              color: colors.primary
            }}>
              Common verification questions
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}