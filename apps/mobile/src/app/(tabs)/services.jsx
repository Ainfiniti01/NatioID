import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from "@/context/ThemeContext";

const serviceCategories = [
  {
    id: 'identity',
    title: 'Identity Services',
    subtitle: 'ID cards and verification',
    icon: 'card-outline',
    color: '#004040',
    services: [
      { name: 'Digital ID', description: 'View your digital identity card', screen: '/digital-id' },
      { name: 'Scan & Verify', description: 'Verify another person\'s ID', screen: '/scan-verify' },
      { name: 'Report Lost ID', description: 'Report lost or stolen documents', screen: '/report-lost' },
      { name: 'Linked Documents', description: 'Manage linked documents', screen: '/linked-documents' },
      { name: 'ID Application', description: 'Apply for a new, renewed, updated, or replacement ID. ', screen: '/id-application/id-type-selection' }
    ]
  },
  {
    id: 'benefits',
    title: 'Benefits & Subsidies',
    subtitle: 'Government support programs',
    icon: 'gift-outline',
    color: '#10B981',
    services: [
      { name: 'Benefits Center', description: 'View available benefits', screen: '/benefits' },
      { name: 'Application Tracking', description: 'Track your applications', screen: '/applications' },
      { name: 'Economic Dashboard', description: 'Market data and trends', screen: '/news/economic' }
    ]
  },
  {
    id: 'civic',
    title: 'Civic Services',
    subtitle: 'Voting and community',
    icon: 'people-outline',
    color: '#3B82F6',
    services: [
      { name: 'Voting', description: 'Election information and results', screen: '/voting' },
      { name: 'Service Directory', description: 'Find local services', screen: '/service-directory' },
      { name: 'News & Updates', description: 'Government announcements', screen: '/news' }
    ]
  },
  {
    id: 'support',
    title: 'Support & Emergency',
    subtitle: 'Help and emergency services',
    icon: 'medical-outline',
    color: '#FF4444',
    services: [
      { name: 'Emergency SOS', description: 'Send emergency alert', screen: '/sos' },
      { name: 'Complaints', description: 'Submit feedback or complaints', screen: '/complaints' },
      { name: 'Help Center', description: 'FAQs and tutorials', screen: '/help' }
    ]
  }
];

export default function ServicesScreen() {
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

  const handleServicePress = (screen) => {
    router.push(screen);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDark ? "light" : "dark"} />
      
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom + 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
          <Text style={{
            fontFamily: 'Inter_700Bold',
            fontSize: 28,
            color: colors.text,
            marginBottom: 8
          }}>
            Services
          </Text>
          <Text style={{
            fontFamily: 'Inter_400Regular',
            fontSize: 16,
            color: colors.textSecondary,
            lineHeight: 24
          }}>
            Access all government services in one place
          </Text>
        </View>

        {/* Service Categories */}
        {serviceCategories.map((category) => (
          <View key={category.id} style={{ paddingHorizontal: 20, marginBottom: 32 }}>
            {/* Category Header */}
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 16
            }}>
              <View style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: category.color,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 16
              }}>
                <Ionicons name={category.icon} size={24} color="#FFFFFF" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{
                  fontFamily: 'Inter_600SemiBold',
                  fontSize: 18,
                  color: colors.text,
                  marginBottom: 4
                }}>
                  {category.title}
                </Text>
                <Text style={{
                  fontFamily: 'Inter_400Regular',
                  fontSize: 14,
                  color: colors.textSecondary
                }}>
                  {category.subtitle}
                </Text>
              </View>
            </View>

            {/* Services List */}
            <View style={{
              backgroundColor: colors.cardBackground,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: colors.border,
              overflow: 'hidden'
            }}>
              {category.services.map((service, index) => (
                <TouchableOpacity
                  key={service.name}
                  onPress={() => handleServicePress(service.screen)}
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 16,
                    borderBottomWidth: index < category.services.length - 1 ? 1 : 0,
                    borderBottomColor: colors.border,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={{
                      fontFamily: 'Inter_500Medium',
                      fontSize: 16,
                      color: colors.text,
                      marginBottom: 4
                    }}>
                      {service.name}
                    </Text>
                    <Text style={{
                      fontFamily: 'Inter_400Regular',
                      fontSize: 14,
                      color: colors.textSecondary,
                      lineHeight: 20
                    }}>
                      {service.description}
                    </Text>
                  </View>
                  <Ionicons 
                    name="chevron-forward" 
                    size={20} 
                    color={colors.textSecondary} 
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Quick Actions */}
        <View style={{ paddingHorizontal: 20, marginBottom: 32 }}>
          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 18,
            color: colors.text,
            marginBottom: 16
          }}>
            Quick Actions
          </Text>
          
          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between'
          }}>
            <TouchableOpacity
              onPress={() => router.push('/sos')}
              style={{
                width: '48%',
                backgroundColor: colors.emergency,
                borderRadius: 12,
                padding: 20,
                marginBottom: 12,
                alignItems: 'center'
              }}
            >
              <Ionicons name="warning" size={32} color="#FFFFFF" style={{ marginBottom: 8 }} />
              <Text style={{
                fontFamily: 'Inter_600SemiBold',
                fontSize: 14,
                color: '#FFFFFF',
                textAlign: 'center'
              }}>
                Emergency SOS
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push('/digital-id')}
              style={{
                width: '48%',
                backgroundColor: colors.primary,
                borderRadius: 12,
                padding: 20,
                marginBottom: 12,
                alignItems: 'center'
              }}
            >
              <Ionicons name="card" size={32} color="#FFFFFF" style={{ marginBottom: 8 }} />
              <Text style={{
                fontFamily: 'Inter_600SemiBold',
                fontSize: 14,
                color: '#FFFFFF',
                textAlign: 'center'
              }}>
                Digital ID
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push('/id-application/id-type-selection')}
              style={{
                width: '48%',
                backgroundColor: colors.primary,
                borderRadius: 12,
                padding: 20,
                marginBottom: 12,
                alignItems: 'center'
              }}
            >
              <Ionicons name="card" size={32} color="#FFFFFF" style={{ marginBottom: 8 }} />
              <Text style={{
                fontFamily: 'Inter_600SemiBold',
                fontSize: 14,
                color: '#FFFFFF',
                textAlign: 'center'
              }}>
                ID Application
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
