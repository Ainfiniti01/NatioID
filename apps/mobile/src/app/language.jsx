import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from "@/context/ThemeContext";

const supportedLanguages = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    enabled: true,
    isDefault: true,
    coverage: 100
  },
  {
    code: 'yo',
    name: 'Yoruba',
    nativeName: 'Yorùbá',
    flag: '🏳️',
    enabled: true,
    isDefault: false,
    coverage: 92
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🏳️',
    enabled: true,
    isDefault: false,
    coverage: 90
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    flag: '🇸🇦',
    enabled: true,
    isDefault: false,
    coverage: 85
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    enabled: true,
    isDefault: false,
    coverage: 88
  },
  {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    flag: '🇵🇹',
    enabled: true,
    isDefault: false,
    coverage: 70
  },
  {
    code: 'sw',
    name: 'Swahili',
    nativeName: 'Kiswahili',
    flag: '🇰🇪',
    enabled: false,
    isDefault: false,
    coverage: 60
  },
  {
    code: 'other',
    name: 'other Languages',
    nativeName: 'More other language',
    flag: '🌍',
    enabled: false,
    isDefault: false,
    coverage: 0
  }
];

const regionalSettings = [
  {
    id: 'dateFormat',
    title: 'Date Format',
    description: 'Choose your preferred date display format',
    options: ['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD'],
    current: 'DD/MM/YYYY'
  },
  {
    id: 'timeFormat',
    title: 'Time Format',
    description: 'Choose 12-hour or 24-hour time format',
    options: ['12-hour (AM/PM)', '24-hour'],
    current: '12-hour (AM/PM)'
  },
  {
    id: 'numberFormat',
    title: 'Number Format',
    description: 'Choose number and currency display format',
    options: ['1,234.56', '1.234,56', '1 234,56'],
    current: '1,234.56'
  },
  {
    id: 'currency',
    title: 'Currency',
    description: 'Primary currency for financial displays',
    options: ['Currency ($)', 'USD ($)', 'EUR (€)', 'GBP (£)'],
    current: 'Currency ($)'
  }
];

export default function LanguageScreen() {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isChangingLanguage, setIsChangingLanguage] = useState(false);
  
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleLanguageSelect = (languageCode) => {
    if (!supportedLanguages.find(lang => lang.code === languageCode)?.enabled) {
      Alert.alert(
        'Language Not Available',
        'This language is coming soon. We\'re working hard to add more language support.',
        [{ text: 'OK' }]
      );
      return;
    }

    if (languageCode === selectedLanguage) return;

    Alert.alert(
      'Change Language',
      `Switch to ${supportedLanguages.find(lang => lang.code === languageCode)?.name}? The app will restart to apply the new language.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Change Language', 
          onPress: () => handleLanguageChange(languageCode)
        }
      ]
    );
  };

  const handleLanguageChange = (languageCode) => {
    setIsChangingLanguage(true);
    setSelectedLanguage(languageCode);
    
    // Simulate language change
    setTimeout(() => {
      setIsChangingLanguage(false);
      Alert.alert(
        'Language Changed',
        'Language has been changed successfully. Some text may require an app restart to fully update.',
        [
          { text: 'OK', onPress: () => router.back() }
        ]
      );
    }, 2000);
  };

  const handleRegionalSetting = (settingId) => {
    const setting = regionalSettings.find(s => s.id === settingId);
    Alert.alert(
      setting.title,
      'Regional settings will be available in a future update.',
      [{ text: 'OK' }]
    );
  };

  const getCoverageColor = (coverage) => {
    if (coverage >= 95) return { color: '#059669', bg: '#ECFDF5' };
    if (coverage >= 85) return { color: '#D97706', bg: '#FFFBEB' };
    return { color: '#DC2626', bg: '#FEF2F2' };
  };

  const enabledLanguages = supportedLanguages.filter(lang => lang.enabled);
  const comingSoonLanguages = supportedLanguages.filter(lang => !lang.enabled);

  if (isChangingLanguage) {
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
          <Ionicons name="language" size={40} color={colors.primaryText} />
        </View>
        
        <Text style={{
          fontFamily: 'Inter_600SemiBold',
          fontSize: 20,
          color: colors.text,
          marginBottom: 8,
          textAlign: 'center'
        }}>
          Changing Language
        </Text>
        
        <Text style={{
          fontFamily: 'Inter_400Regular',
          fontSize: 16,
          color: colors.textSecondary,
          textAlign: 'center'
        }}>
          Please wait while we apply your language settings...
        </Text>
      </View>
    );
  }

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
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24
        }}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          
          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 18,
            color: colors.text
          }}>
            Language & Region
          </Text>
          
          <View style={{ width: 24 }} />
        </View>

        {/* Current Language Info */}
        <View style={{
          backgroundColor: colors.primary,
          borderRadius: 16,
          padding: 20,
          marginBottom: 24
        }}>
          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 16,
            color: colors.primaryText,
            marginBottom: 16
          }}>
            Current Language
          </Text>
          
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 32, marginRight: 16 }}>
              {supportedLanguages.find(lang => lang.code === selectedLanguage)?.flag}
            </Text>
            
            <View style={{ flex: 1 }}>
              <Text style={{
                fontFamily: 'Inter_700Bold',
                fontSize: 20,
                color: colors.primaryText,
                marginBottom: 4
              }}>
                {supportedLanguages.find(lang => lang.code === selectedLanguage)?.name}
              </Text>
              
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 14,
                color: colors.primaryText,
                opacity: 0.9
              }}>
                {supportedLanguages.find(lang => lang.code === selectedLanguage)?.nativeName}
              </Text>
            </View>
            
            <View style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              borderRadius: 8,
              paddingHorizontal: 12,
              paddingVertical: 6
            }}>
              <Text style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 12,
                color: colors.primaryText
              }}>
                {supportedLanguages.find(lang => lang.code === selectedLanguage)?.coverage}% Complete
              </Text>
            </View>
          </View>
        </View>

        {/* Available Languages */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 18,
            color: colors.text,
            marginBottom: 16
          }}>
            Available Languages
          </Text>
          
          <View style={{
            backgroundColor: colors.cardBackground,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: colors.border,
            overflow: 'hidden'
          }}>
            {enabledLanguages.map((language, index) => {
              const coverageConfig = getCoverageColor(language.coverage);
              const isSelected = language.code === selectedLanguage;
              
              return (
                <TouchableOpacity
                  key={language.code}
                  onPress={() => handleLanguageSelect(language.code)}
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 16,
                    borderBottomWidth: index < enabledLanguages.length - 1 ? 1 : 0,
                    borderBottomColor: colors.border,
                    backgroundColor: isSelected ? colors.primary + '10' : 'transparent'
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 28, marginRight: 16 }}>
                      {language.flag}
                    </Text>

                    <View style={{ flex: 1 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                        <Text style={{
                          fontFamily: 'Inter_600SemiBold',
                          fontSize: 16,
                          color: colors.text,
                          flex: 1
                        }}>
                          {language.name}
                        </Text>
                        
                        {language.isDefault && (
                          <View style={{
                            backgroundColor: colors.primary,
                            paddingHorizontal: 8,
                            paddingVertical: 4,
                            borderRadius: 8,
                            marginRight: 8
                          }}>
                            <Text style={{
                              fontFamily: 'Inter_500Medium',
                              fontSize: 10,
                              color: colors.primaryText
                            }}>
                              DEFAULT
                            </Text>
                          </View>
                        )}
                        
                        {isSelected && (
                          <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
                        )}
                      </View>
                      
                      <Text style={{
                        fontFamily: 'Inter_400Regular',
                        fontSize: 14,
                        color: colors.textSecondary,
                        marginBottom: 8
                      }}>
                        {language.nativeName}
                      </Text>
                      
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{
                          backgroundColor: coverageConfig.bg,
                          paddingHorizontal: 8,
                          paddingVertical: 4,
                          borderRadius: 8
                        }}>
                          <Text style={{
                            fontFamily: 'Inter_500Medium',
                            fontSize: 10,
                            color: coverageConfig.color
                          }}>
                            {language.coverage}% COMPLETE
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Coming Soon Languages */}
        {comingSoonLanguages.length > 0 && (
          <View style={{ marginBottom: 24 }}>
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 18,
              color: colors.text,
              marginBottom: 16
            }}>
              Coming Soon
            </Text>
            
            <View style={{
              backgroundColor: colors.cardBackground,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: colors.border,
              overflow: 'hidden'
            }}>
              {comingSoonLanguages.map((language, index) => (
                <TouchableOpacity
                  key={language.code}
                  onPress={() => handleLanguageSelect(language.code)}
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 16,
                    borderBottomWidth: index < comingSoonLanguages.length - 1 ? 1 : 0,
                    borderBottomColor: colors.border,
                    opacity: 0.6
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 28, marginRight: 16 }}>
                      {language.flag}
                    </Text>

                    <View style={{ flex: 1 }}>
                      <Text style={{
                        fontFamily: 'Inter_600SemiBold',
                        fontSize: 16,
                        color: colors.text,
                        marginBottom: 4
                      }}>
                        {language.name}
                      </Text>
                      
                      <Text style={{
                        fontFamily: 'Inter_400Regular',
                        fontSize: 14,
                        color: colors.textSecondary,
                        marginBottom: 8
                      }}>
                        {language.nativeName}
                      </Text>
                      
                      <View style={{
                        backgroundColor: colors.surfaceSecondary,
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        borderRadius: 8,
                        alignSelf: 'flex-start'
                      }}>
                        <Text style={{
                          fontFamily: 'Inter_500Medium',
                          fontSize: 10,
                          color: colors.textSecondary
                        }}>
                          {language.coverage}% IN PROGRESS
                        </Text>
                      </View>
                    </View>
                    
                    <Ionicons name="time-outline" size={20} color={colors.textSecondary} />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Regional Settings */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 18,
            color: colors.text,
            marginBottom: 16
          }}>
            Regional Settings
          </Text>
          
          <View style={{
            backgroundColor: colors.cardBackground,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: colors.border,
            overflow: 'hidden'
          }}>
            {regionalSettings.map((setting, index) => (
              <TouchableOpacity
                key={setting.id}
                onPress={() => handleRegionalSetting(setting.id)}
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 16,
                  borderBottomWidth: index < regionalSettings.length - 1 ? 1 : 0,
                  borderBottomColor: colors.border,
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={{
                    fontFamily: 'Inter_500Medium',
                    fontSize: 16,
                    color: colors.text,
                    marginBottom: 4
                  }}>
                    {setting.title}
                  </Text>
                  <Text style={{
                    fontFamily: 'Inter_400Regular',
                    fontSize: 14,
                    color: colors.textSecondary,
                    marginBottom: 8
                  }}>
                    {setting.description}
                  </Text>
                  <Text style={{
                    fontFamily: 'Inter_500Medium',
                    fontSize: 12,
                    color: colors.primary
                  }}>
                    Current: {setting.current}
                  </Text>
                </View>
                
                <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Language Support Info */}
        <View style={{
          backgroundColor: colors.surfaceSecondary,
          borderRadius: 16,
          padding: 20,
          borderLeftWidth: 4,
          borderLeftColor: colors.primary
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <Ionicons name="information-circle" size={20} color={colors.primary} />
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 16,
              color: colors.text,
              marginLeft: 8
            }}>
              Language Support
            </Text>
          </View>
          <Text style={{
            fontFamily: 'Inter_400Regular',
            fontSize: 14,
            color: colors.textSecondary,
            lineHeight: 20,
            marginBottom: 16
          }}>
            We're continuously working to improve language coverage and add support for more Country languages. Translation quality may vary for some features.
          </Text>
          
          <TouchableOpacity
            style={{
              backgroundColor: colors.primary,
              borderRadius: 12,
              paddingVertical: 12,
              paddingHorizontal: 16,
              alignSelf: 'flex-start'
            }}
          >
            <Text style={{
              fontFamily: 'Inter_500Medium',
              fontSize: 14,
              color: colors.primaryText
            }}>
              Request Language
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
