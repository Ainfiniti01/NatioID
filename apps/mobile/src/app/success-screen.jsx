import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from "@/context/ThemeContext";

export default function SuccessScreen() {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleGoToDashboard = () => {
    router.replace('/dashboard'); // Navigate to the dashboard
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
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: colors.success, // Assuming a success color in theme
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 24
          }}>
            <Ionicons name="checkmark" size={60} color={colors.primaryText} />
          </View>
          
          <Text style={{
            fontFamily: 'Inter_700Bold',
            fontSize: 28,
            color: colors.text,
            textAlign: 'center',
            marginBottom: 12
          }}>
            You’re all set!
          </Text>
          
          <Text style={{
            fontFamily: 'Inter_400Regular',
            fontSize: 18,
            color: colors.textSecondary,
            textAlign: 'center',
            lineHeight: 28,
            paddingHorizontal: 20
          }}>
            Welcome to your Digital ID.
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleGoToDashboard}
          style={{
            backgroundColor: colors.primary,
            paddingVertical: 16,
            borderRadius: 12,
            alignItems: 'center',
            width: '100%',
            maxWidth: 300,
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
            Go to Dashboard
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
