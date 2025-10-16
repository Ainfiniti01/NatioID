import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from "@/context/ThemeContext";

const languages = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', default: true },
  { code: 'yo', name: 'Yoruba', nativeName: 'Yoruba', flag: '🇳🇬' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', flag: '🇰🇪' },
  { code: 'other', name: 'Other Languages', nativeName: 'More other language', flag: '🌍' },
];

export default function LanguageSelectionScreen() {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  
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
    // Save language preference (in a real app, this would be stored in async storage)
    router.replace('/registration');
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
        <View style={{ marginBottom: 40 }}>
          <Text style={{
            fontFamily: 'Inter_700Bold',
            fontSize: 28,
            color: colors.text,
            textAlign: 'center',
            marginBottom: 12
          }}>
            Choose Language
          </Text>
          <Text style={{
            fontFamily: 'Inter_400Regular',
            fontSize: 16,
            color: colors.textSecondary,
            textAlign: 'center',
            lineHeight: 24
          }}>
            Select your preferred language for the app
          </Text>
        </View>

        {/* Language Options */}
        <View style={{ marginBottom: 40 }}>
          {languages.map((language) => (
            <TouchableOpacity
              key={language.code}
              onPress={() => setSelectedLanguage(language.code)}
              style={{
                backgroundColor: colors.cardBackground,
                borderRadius: 16,
                padding: 20,
                marginBottom: 16,
                borderWidth: 2,
                borderColor: selectedLanguage === language.code ? colors.primary : colors.border,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 2
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <Text style={{
                  fontSize: 32,
                  marginRight: 16
                }}>
                  {language.flag}
                </Text>
                <View>
                  <Text style={{
                    fontFamily: 'Inter_600SemiBold',
                    fontSize: 18,
                    color: colors.text,
                    marginBottom: 4
                  }}>
                    {language.name}
                  </Text>
                  <Text style={{
                    fontFamily: 'Inter_400Regular',
                    fontSize: 14,
                    color: colors.textSecondary
                  }}>
                    {language.nativeName}
                  </Text>
                </View>
              </View>
              
              <View style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: selectedLanguage === language.code ? colors.primary : colors.border,
                backgroundColor: selectedLanguage === language.code ? colors.primary : 'transparent',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {selectedLanguage === language.code && (
                  <Ionicons name="checkmark" size={16} color={colors.primaryText} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Preview Text */}
        <View style={{
          backgroundColor: colors.surfaceSecondary,
          borderRadius: 12,
          padding: 16,
          marginBottom: 40
        }}>
          <Text style={{
            fontFamily: 'Inter_500Medium',
            fontSize: 14,
            color: colors.textSecondary,
            marginBottom: 8
          }}>
            Preview:
          </Text>
          <Text style={{
            fontFamily: 'Inter_400Regular',
            fontSize: 16,
            color: colors.text,
            lineHeight: 24
          }}>
            {selectedLanguage === 'en' && "Welcome to NatioID - Your secure digital identity platform"}
            {selectedLanguage === 'yo' && "Káàbọ̀ sí NatioID - Pẹpẹ ìdámọ̀ dijítà tí ó ní ààbò"}
            {selectedLanguage === 'fr' && "Bienvenue sur NatioID - Votre plateforme d'identité numérique sécurisée"}
            {selectedLanguage === 'ar' && "مرحباً بك في NatioID - منصة هويتك الرقمية الآمنة"}
            {selectedLanguage === 'es' && "Bienvenido a NatioID - Su plataforma de identidad digital segura"}
            {selectedLanguage === 'sw' && "Karibu NatioID - Jukwaa lako salama la kitambulisho cha kidijitali"}         
            {selectedLanguage === 'other' && "Welcome to NatioID - Your secure digital identity platform (Other Language)"}
          </Text>
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
      </View>
    </View>
  );
}
