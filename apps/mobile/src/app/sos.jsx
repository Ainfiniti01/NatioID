import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Haptics from "expo-haptics";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { useColorScheme } from 'react-native';

export default function SOSScreen() {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const colors = {
    light: {
      background: '#FFFFFF',
      text: '#070728',
      textSecondary: '#8E8E99',
      emergency: '#DC2626',
      emergencyText: '#FFFFFF',
      emergencyBg: '#FEE2E2',
      cardBackground: '#FFFFFF',
      border: '#E5E7EB',
      surfaceSecondary: '#F5F5F5'
    },
    dark: {
      background: '#121212',
      text: 'rgba(255, 255, 255, 0.87)',
      textSecondary: 'rgba(255, 255, 255, 0.6)',
      emergency: '#EF4444',
      emergencyText: '#FFFFFF',
      emergencyBg: '#7F1D1D',
      cardBackground: '#2A2A2A',
      border: '#333333',
      surfaceSecondary: '#262626'
    }
  };

  const currentColors = colors[colorScheme] || colors.light;

  if (!fontsLoaded) {
    return null;
  }

  const handleSOSPress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    
    Alert.alert(
      "Emergency Alert",
      "Are you sure you want to send an emergency alert? This will notify authorities and your emergency contacts.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Send Alert",
          style: "destructive",
          onPress: () => {
            setIsEmergencyActive(true);
            // Mock emergency alert
            setTimeout(() => {
              setIsEmergencyActive(false);
              Alert.alert(
                "Emergency Alert Sent",
                "Your emergency alert has been sent to authorities and your emergency contacts. Help is on the way.",
                [
                  {
                    text: "View History",
                    onPress: () => router.push('/sos-history')
                  },
                  {
                    text: "OK",
                    style: "default"
                  }
                ]
              );
            }, 2000);
          }
        }
      ]
    );
  };

  const handleCallPolice = () => {
    Alert.alert(
      "Call Police",
      "This will call emergency services (911). Continue?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Call", style: "destructive", onPress: () => {
          // In a real app, this would initiate a phone call
          Alert.alert("Calling 911...", "Emergency services have been contacted.");
        }}
      ]
    );
  };

  const handleViewHistory = () => {
    router.push('/sos-history');
  };

  return (
    <View style={{ 
      flex: 1, 
      backgroundColor: isEmergencyActive ? currentColors.emergencyBg : currentColors.background 
    }}>
      <StatusBar style="light" backgroundColor={currentColors.emergency} />
      
      {/* Header */}
      <View style={{ 
        paddingTop: insets.top + 20,
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: currentColors.emergency
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: 'rgba(255,255,255,0.2)',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Ionicons name="chevron-back" size={20} color="#FFFFFF" />
          </TouchableOpacity>
          
          <Text style={{
            fontFamily: 'Inter_700Bold',
            fontSize: 20,
            color: '#FFFFFF'
          }}>
            Emergency
          </Text>
          
          <TouchableOpacity
            onPress={handleViewHistory}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: 'rgba(255,255,255,0.2)',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Ionicons name="time" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <View style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        paddingHorizontal: 40 
      }}>
        {isEmergencyActive ? (
          <View style={{ alignItems: 'center' }}>
            <View style={{
              width: 200,
              height: 200,
              borderRadius: 100,
              backgroundColor: currentColors.emergency,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 32
            }}>
              <Ionicons name="warning" size={80} color="#FFFFFF" />
            </View>
            
            <Text style={{
              fontFamily: 'Inter_700Bold',
              fontSize: 28,
              color: currentColors.emergency,
              textAlign: 'center',
              marginBottom: 16
            }}>
              Emergency Alert Sent
            </Text>
            
            <Text style={{
              fontFamily: 'Inter_400Regular',
              fontSize: 16,
              color: currentColors.textSecondary,
              textAlign: 'center'
            }}>
              Authorities and emergency contacts have been notified. Help is on the way.
            </Text>
          </View>
        ) : (
          <View style={{ alignItems: 'center' }}>
            <Text style={{
              fontFamily: 'Inter_700Bold',
              fontSize: 28,
              color: currentColors.text,
              textAlign: 'center',
              marginBottom: 16
            }}>
              Emergency Assistance
            </Text>
            
            <Text style={{
              fontFamily: 'Inter_400Regular',
              fontSize: 16,
              color: currentColors.textSecondary,
              textAlign: 'center',
              marginBottom: 48
            }}>
              Press the SOS button to send an emergency alert with your location to authorities and emergency contacts.
            </Text>
            
            {/* Main SOS Button */}
            <TouchableOpacity
              onPress={handleSOSPress}
              style={{
                width: 200,
                height: 200,
                borderRadius: 100,
                backgroundColor: currentColors.emergency,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 48,
                shadowColor: currentColors.emergency,
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.3,
                shadowRadius: 16,
                elevation: 8
              }}
            >
              <Text style={{
                fontFamily: 'Inter_700Bold',
                fontSize: 32,
                color: '#FFFFFF',
                marginBottom: 8
              }}>
                SOS
              </Text>
              <Text style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 14,
                color: '#FFFFFF',
                opacity: 0.9
              }}>
                EMERGENCY
              </Text>
            </TouchableOpacity>

            {/* Quick Actions */}
            <View style={{ width: '100%' }}>
              <TouchableOpacity
                onPress={handleCallPolice}
                style={{
                  backgroundColor: currentColors.cardBackground,
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 12,
                  borderWidth: 2,
                  borderColor: currentColors.emergency,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Ionicons name="call" size={20} color={currentColors.emergency} style={{ marginRight: 8 }} />
                <Text style={{
                  fontFamily: 'Inter_600SemiBold',
                  fontSize: 16,
                  color: currentColors.emergency
                }}>
                  Call Police (911)
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={handleViewHistory}
                style={{
                  backgroundColor: currentColors.surfaceSecondary,
                  borderRadius: 12,
                  padding: 16,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Ionicons name="document-text" size={20} color={currentColors.textSecondary} style={{ marginRight: 8 }} />
                <Text style={{
                  fontFamily: 'Inter_500Medium',
                  fontSize: 16,
                  color: currentColors.textSecondary
                }}>
                  View Emergency History
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}