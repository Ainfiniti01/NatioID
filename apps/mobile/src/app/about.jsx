import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, Linking } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from "@/context/ThemeContext";

export default function AboutScreen() {
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

  const appInfo = {
    version: '2.1.0',
    buildNumber: '2024.09.18',
    lastUpdated: 'September 18, 2024',
    developer: 'Country Government IT Division',
    license: 'Government Use License'
  };

  const features = [
    {
      icon: 'id-card-outline',
      title: 'Digital Identity',
      description: 'Secure digital ID for all Country citizens'
    },
    {
      icon: 'document-text-outline',
      title: 'Government Services',
      description: 'Access essential government services online'
    },
    {
      icon: 'shield-checkmark-outline',
      title: 'Biometric Security',
      description: 'Advanced security with fingerprint authentication'
    },
    {
      icon: 'chatbubble-outline',
      title: 'Complaint System',
      description: 'Report issues and track resolution progress'
    },
    {
      icon: 'notifications-outline',
      title: 'Real-time Updates',
      description: 'Stay informed with instant notifications'
    },
    {
      icon: 'globe-outline',
      title: 'Multi-language',
      description: 'Support for Country languages and English'
    }
  ];

  const teamMembers = [
    {
      name: 'Dr. Adebayo Ogundimu',
      role: 'Project Director',
      department: 'Ministry of Communications and Digital Economy'
    },
    {
      name: 'Eng. Fatima Mohammed',
      role: 'Technical Lead',
      department: 'National Information Technology Development Agency'
    },
    {
      name: 'Mr. Chukwuma Okafor',
      role: 'Security Architect',
      department: 'Country Computer Emergency Response Team'
    }
  ];

  const partnerOrganizations = [
    'Ministry of Communications and Digital Economy',
    'National Information Technology Development Agency (NITDA)',
    'National Identity Authority',
    'National Identity Authority(NIA)',
    'Country Computer Emergency Response Team (ngCERT)',
    'Central Bank of Country (CBN)',
    'Federal Ministry of Interior'
  ];

  const handleContactSupport = () => {
    Alert.alert(
      'Contact Support',
      'How would you like to contact our support team?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Email', 
          onPress: () => Linking.openURL('mailto:support@natioid.gov.ng?subject=NatioID App Support')
        },
        { 
          text: 'Phone', 
          onPress: () => Linking.openURL('tel:+234700NATIOID')
        }
      ]
    );
  };

  const handleViewLicense = () => {
    Alert.alert(
      'Software License',
      'This application is licensed for use by the Country Government and its citizens. All rights reserved. Unauthorized distribution or modification is prohibited.',
      [{ text: 'OK' }]
    );
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
            About NatioID
          </Text>
          
          <View style={{ width: 24 }} />
        </View>

        {/* App Logo & Header */}
        <View style={{
          backgroundColor: colors.primary,
          borderRadius: 20,
          padding: 24,
          alignItems: 'center',
          marginBottom: 24
        }}>
          <View style={{
            width: 80,
            height: 80,
            borderRadius: 20,
            backgroundColor: 'rgba(255,255,255,0.2)',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 16
          }}>
            <Ionicons name="id-card" size={40} color={colors.primaryText} />
          </View>
          
          <Text style={{
            fontFamily: 'Inter_700Bold',
            fontSize: 24,
            color: colors.primaryText,
            marginBottom: 8
          }}>
            NatioID
          </Text>
          
          <Text style={{
            fontFamily: 'Inter_500Medium',
            fontSize: 16,
            color: colors.primaryText,
            opacity: 0.9,
            textAlign: 'center',
            marginBottom: 12
          }}>
            Digital Identity for Country
          </Text>
          
          <View style={{
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingVertical: 8
          }}>
            <Text style={{
              fontFamily: 'Inter_500Medium',
              fontSize: 14,
              color: colors.primaryText
            }}>
              Version {appInfo.version}
            </Text>
          </View>
        </View>

        {/* Mission Statement */}
        <View style={{
          backgroundColor: colors.cardBackground,
          borderRadius: 16,
          padding: 20,
          marginBottom: 24
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <Ionicons name="flag-outline" size={20} color={colors.primary} />
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 18,
              color: colors.text,
              marginLeft: 8
            }}>
              Our Mission
            </Text>
          </View>
          
          <Text style={{
            fontFamily: 'Inter_400Regular',
            fontSize: 16,
            color: colors.text,
            lineHeight: 24,
            textAlign: 'justify'
          }}>
            To provide secure, accessible, and efficient digital identity solutions for all Country citizens, 
            enabling seamless access to government services while protecting personal data and maintaining 
            the highest standards of security and privacy.
          </Text>
        </View>

        {/* Key Features */}
        <View style={{ marginBottom: 24 }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 16
          }}>
            <Ionicons name="star-outline" size={20} color={colors.primary} />
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 18,
              color: colors.text,
              marginLeft: 8
            }}>
              Key Features
            </Text>
          </View>
          
          <View style={{ gap: 12 }}>
            {features.map((feature, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: colors.cardBackground,
                  borderRadius: 12,
                  padding: 16,
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <View style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: colors.primary + '20',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 16
                }}>
                  <Ionicons name={feature.icon} size={20} color={colors.primary} />
                </View>
                
                <View style={{ flex: 1 }}>
                  <Text style={{
                    fontFamily: 'Inter_600SemiBold',
                    fontSize: 16,
                    color: colors.text,
                    marginBottom: 4
                  }}>
                    {feature.title}
                  </Text>
                  <Text style={{
                    fontFamily: 'Inter_400Regular',
                    fontSize: 14,
                    color: colors.textSecondary,
                    lineHeight: 20
                  }}>
                    {feature.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Development Team */}
        <View style={{ marginBottom: 24 }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 16
          }}>
            <Ionicons name="people-outline" size={20} color={colors.primary} />
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 18,
              color: colors.text,
              marginLeft: 8
            }}>
              Development Team
            </Text>
          </View>
          
          <View style={{ gap: 12 }}>
            {teamMembers.map((member, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: colors.cardBackground,
                  borderRadius: 12,
                  padding: 16
                }}
              >
                <Text style={{
                  fontFamily: 'Inter_600SemiBold',
                  fontSize: 16,
                  color: colors.text,
                  marginBottom: 4
                }}>
                  {member.name}
                </Text>
                <Text style={{
                  fontFamily: 'Inter_500Medium',
                  fontSize: 14,
                  color: colors.primary,
                  marginBottom: 4
                }}>
                  {member.role}
                </Text>
                <Text style={{
                  fontFamily: 'Inter_400Regular',
                  fontSize: 14,
                  color: colors.textSecondary
                }}>
                  {member.department}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Partner Organizations */}
        <View style={{ marginBottom: 24 }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 16
          }}>
            <Ionicons name="business-outline" size={20} color={colors.primary} />
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 18,
              color: colors.text,
              marginLeft: 8
            }}>
              Partner Organizations
            </Text>
          </View>
          
          <View style={{ gap: 8 }}>
            {partnerOrganizations.map((org, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: colors.cardBackground,
                  borderRadius: 8,
                  padding: 12,
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <View style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: colors.primary,
                  marginRight: 12
                }} />
                <Text style={{
                  fontFamily: 'Inter_400Regular',
                  fontSize: 14,
                  color: colors.text,
                  flex: 1
                }}>
                  {org}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* App Information */}
        <View style={{
          backgroundColor: colors.cardBackground,
          borderRadius: 16,
          padding: 20,
          marginBottom: 24
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 16
          }}>
            <Ionicons name="information-circle-outline" size={20} color={colors.primary} />
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 18,
              color: colors.text,
              marginLeft: 8
            }}>
              App Information
            </Text>
          </View>
          
          <View style={{ gap: 12 }}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: 8
            }}>
              <Text style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 14,
                color: colors.textSecondary
              }}>
                Version
              </Text>
              <Text style={{
                fontFamily: 'Inter_600SemiBold',
                fontSize: 14,
                color: colors.text
              }}>
                {appInfo.version}
              </Text>
            </View>
            
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: 8
            }}>
              <Text style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 14,
                color: colors.textSecondary
              }}>
                Build Number
              </Text>
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 14,
                color: colors.text
              }}>
                {appInfo.buildNumber}
              </Text>
            </View>
            
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: 8
            }}>
              <Text style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 14,
                color: colors.textSecondary
              }}>
                Last Updated
              </Text>
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 14,
                color: colors.text
              }}>
                {appInfo.lastUpdated}
              </Text>
            </View>
            
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: 8
            }}>
              <Text style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 14,
                color: colors.textSecondary
              }}>
                Developer
              </Text>
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 14,
                color: colors.text,
                textAlign: 'right',
                flex: 1,
                marginLeft: 16
              }}>
                {appInfo.developer}
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={{ gap: 12, marginBottom: 24 }}>
          <TouchableOpacity
            onPress={handleContactSupport}
            style={{
              backgroundColor: colors.primary,
              borderRadius: 12,
              padding: 16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Ionicons name="help-circle-outline" size={20} color={colors.primaryText} />
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 16,
              color: colors.primaryText,
              marginLeft: 8
            }}>
              Contact Support
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/privacy')}
            style={{
              backgroundColor: colors.cardBackground,
              borderRadius: 12,
              padding: 16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="shield-outline" size={20} color={colors.primary} />
              <Text style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 16,
                color: colors.text,
                marginLeft: 12
              }}>
                Privacy Policy
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleViewLicense}
            style={{
              backgroundColor: colors.cardBackground,
              borderRadius: 12,
              padding: 16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="document-text-outline" size={20} color={colors.primary} />
              <Text style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 16,
                color: colors.text,
                marginLeft: 12
              }}>
                Software License
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => Linking.openURL('https://www.natioid.gov.ng')}
            style={{
              backgroundColor: colors.cardBackground,
              borderRadius: 12,
              padding: 16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="globe-outline" size={20} color={colors.primary} />
              <Text style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 16,
                color: colors.text,
                marginLeft: 12
              }}>
                Official Website
              </Text>
            </View>
            <Ionicons name="open-outline" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Copyright */}
        <View style={{
          alignItems: 'center',
          paddingTop: 20,
          borderTopWidth: 1,
          borderTopColor: colors.border
        }}>
          <Text style={{
            fontFamily: 'Inter_400Regular',
            fontSize: 12,
            color: colors.textSecondary,
            textAlign: 'center',
            lineHeight: 18
          }}>
            © 2024 Federal Republic of Country{'\n'}
            All rights reserved
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
