import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from "@/context/ThemeContext";

export default function ThemeScreen() {
  const { colors, isDark, theme, changeTheme } = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedTheme, setSelectedTheme] = useState(theme);
  useEffect(() => setSelectedTheme(theme), [theme]);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const themeOptions = [
    {
      id: 'light',
      name: 'Light Mode',
      description: 'Clean white background with dark text',
      icon: 'sunny-outline',
      preview: {
        background: '#FFFFFF',
        surface: '#F3F4F6',
        text: '#111827',
        primary: '#004040'
      }
    },
    {
      id: 'dark',
      name: 'Dark Mode',
      description: 'Dark background with light text',
      icon: 'moon-outline',
      preview: {
        background: '#111827',
        surface: '#1F2937',
        text: '#F9FAFB',
        primary: '#004040'
      }
    },
    {
      id: 'system',
      name: 'System Default',
      description: 'Follows your device theme settings',
      icon: 'phone-portrait-outline',
      preview: {
        background: isDark ? '#111827' : '#FFFFFF',
        surface: isDark ? '#1F2937' : '#F3F4F6',
        text: isDark ? '#F9FAFB' : '#111827',
        primary: '#004040'
      }
    }
  ];

  const handleThemeSelect = (themeId) => {
    changeTheme(themeId);  // saves + updates globally
  };

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
            Theme Settings
          </Text>
          
          <View style={{ width: 24 }} />
        </View>

        {/* Current Theme Info */}
        <View style={{
          backgroundColor: colors.cardBackground,
          borderRadius: 16,
          padding: 20,
          marginBottom: 24,
          borderWidth: 1,
          borderColor: colors.border
        }}>
          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 16,
            color: colors.text,
            marginBottom: 8
          }}>
            Current Theme
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: colors.primary,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12
            }}>
              <Ionicons 
                name={isDark ? 'moon' : 'sunny'} 
                size={20} 
                color={colors.primaryText} 
              />
            </View>
            <View>
              <Text style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 14,
                color: colors.text
              }}>
                {isDark ? 'Dark Mode' : 'Light Mode'}
              </Text>
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 12,
                color: colors.textSecondary
              }}>
                Currently active
              </Text>
            </View>
          </View>
        </View>

        {/* Theme Options */}
    <View style={{
      backgroundColor: colors.cardBackground,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: 'hidden',
      marginBottom: 24
    }}>
      <View style={{
        backgroundColor: colors.surfaceSecondary,
        paddingHorizontal: 20,
        paddingVertical: 16
      }}>
        <Text style={{
          fontFamily: 'Inter_600SemiBold',
          fontSize: 16,
          color: colors.text
        }}>
          Choose Theme
        </Text>
      </View>

      {themeOptions.map((theme, index) => (
        <TouchableOpacity
          key={theme.id}
          onPress={() => handleThemeSelect(theme.id)}
          style={{
            paddingHorizontal: 20,
            paddingVertical: 20,
            borderBottomWidth: index < themeOptions.length - 1 ? 1 : 0,
            borderBottomColor: colors.border,
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
      {/* Theme Preview */}
      <View style={{
        width: 60,
        height: 40,
        borderRadius: 8,
        marginRight: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: colors.border
      }}>
        <View style={{
          flex: 1,
          backgroundColor: theme.preview.background,
          flexDirection: 'row'
        }}>
          <View style={{
            flex: 1,
            backgroundColor: theme.preview.surface,
            margin: 4,
            borderRadius: 4
          }} />
          <View style={{
            width: 8,
            backgroundColor: theme.preview.primary,
            margin: 4,
            borderRadius: 2
          }} />
        </View>
      </View>

      {/* Theme Info */}
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
          <Ionicons 
            name={theme.icon} 
            size={16} 
            color={colors.textSecondary} 
            style={{ marginRight: 8 }}
          />
          <Text style={{
            fontFamily: 'Inter_500Medium',
            fontSize: 14,
            color: colors.text,
            flex: 1
          }}>
            {theme.name}
          </Text>
          {selectedTheme === theme.id && (
            <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
          )}
        </View>
        <Text style={{
          fontFamily: 'Inter_400Regular',
          fontSize: 12,
          color: colors.textSecondary,
          lineHeight: 16
        }}>
          {theme.description}
        </Text>
      </View>
    </TouchableOpacity>
  ))}
</View>

    {/* Additional Settings */}
    <View style={{
      backgroundColor: colors.cardBackground,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: 'hidden',
      marginBottom: 24
    }}>
      <View style={{
        backgroundColor: colors.surfaceSecondary,
        paddingHorizontal: 20,
        paddingVertical: 16
      }}>
        <Text style={{
          fontFamily: 'Inter_600SemiBold',
          fontSize: 16,
          color: colors.text
        }}>
          Additional Options
        </Text>
      </View>

      <TouchableOpacity
        style={{
          paddingHorizontal: 20,
          paddingVertical: 16,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          <Ionicons name="contrast-outline" size={20} color={colors.textSecondary} />
          <View style={{ marginLeft: 12, flex: 1 }}>
            <Text style={{
              fontFamily: 'Inter_500Medium',
              fontSize: 14,
              color: colors.text,
              marginBottom: 2
            }}>
              High Contrast
            </Text>
            <Text style={{
              fontFamily: 'Inter_400Regular',
              fontSize: 12,
              color: colors.textSecondary
            }}>
              Increase text and element contrast
            </Text>
          </View>
        </View>
        <View style={{
          width: 44,
          height: 24,
          borderRadius: 12,
          backgroundColor: colors.surfaceSecondary,
          padding: 2
        }}>
          <View style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: colors.border
          }} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          paddingHorizontal: 20,
          paddingVertical: 16,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          <Ionicons name="text-outline" size={20} color={colors.textSecondary} />
          <View style={{ marginLeft: 12, flex: 1 }}>
            <Text style={{
              fontFamily: 'Inter_500Medium',
              fontSize: 14,
              color: colors.text,
              marginBottom: 2
            }}>
              Large Text
            </Text>
            <Text style={{
              fontFamily: 'Inter_400Regular',
              fontSize: 12,
              color: colors.textSecondary
            }}>
              Increase text size for better readability
            </Text>
          </View>
        </View>
        <View style={{
          width: 44,
          height: 24,
          borderRadius: 12,
          backgroundColor: colors.surfaceSecondary,
          padding: 2
        }}>
          <View style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: colors.border
          }} />
        </View>
      </TouchableOpacity>
    </View>

    {/* Theme Info */}
    <View style={{
      backgroundColor: colors.surfaceSecondary,
      borderRadius: 12,
      padding: 16
    }}>
      <Text style={{
        fontFamily: 'Inter_500Medium',
        fontSize: 14,
        color: colors.text,
        marginBottom: 8
      }}>
        About Themes
      </Text>
      <Text style={{
        fontFamily: 'Inter_400Regular',
        fontSize: 12,
        color: colors.textSecondary,
        lineHeight: 18
      }}>
        Your theme preference is saved and will be applied across all parts of the NatioID app. System default automatically switches between light and dark based on your device settings.
      </Text>
    </View>
      </ScrollView>
    </View>
  );
}
