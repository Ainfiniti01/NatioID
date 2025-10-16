import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from "@/context/ThemeContext";

const economicServices = [
  {
    id: 1,
    category: 'Business Registration',
    services: [
      { name: 'Register New Business', icon: 'business-outline', status: 'available', fee: '$25,000' },
      { name: 'Business Name Search', icon: 'search-outline', status: 'available', fee: '$500' },
      { name: 'CAC Certificate', icon: 'document-text-outline', status: 'available', fee: '$10,000' },
      { name: 'Tax Identification Number', icon: 'card-outline', status: 'available', fee: 'Free' }
    ]
  },
  {
    id: 2,
    category: 'Banking & Finance',
    services: [
      { name: 'BVN Registration', icon: 'finger-print-outline', status: 'available', fee: 'Free' },
      { name: 'Account Opening Verification', icon: 'checkmark-circle-outline', status: 'available', fee: 'Free' },
      { name: 'Loan Application Support', icon: 'cash-outline', status: 'available', fee: '$2,000' },
      { name: 'Credit Score Check', icon: 'analytics-outline', status: 'coming-soon', fee: 'Free' }
    ]
  },
  {
    id: 3,
    category: 'Tax Services',
    services: [
      { name: 'Personal Income Tax', icon: 'receipt-outline', status: 'available', fee: 'Variable' },
      { name: 'Property Tax Assessment', icon: 'home-outline', status: 'available', fee: 'Variable' },
      { name: 'VAT Registration', icon: 'calculator-outline', status: 'available', fee: '$5,000' },
      { name: 'Tax Clearance Certificate', icon: 'shield-checkmark-outline', status: 'available', fee: '$15,000' }
    ]
  },
  {
    id: 4,
    category: 'Trade & Commerce',
    services: [
      { name: 'Import/Export License', icon: 'airplane-outline', status: 'available', fee: '$50,000' },
      { name: 'NAFDAC Registration', icon: 'medical-outline', status: 'available', fee: '$100,000' },
      { name: 'Standards Organization Cert.', icon: 'ribbon-outline', status: 'available', fee: '$75,000' },
      { name: 'Industrial Development Fund', icon: 'construct-outline', status: 'available', fee: 'Variable' }
    ]
  },
  {
    id: 5,
    category: 'Social Programs',
    services: [
      { name: 'Youth Empowerment Program', icon: 'people-outline', status: 'available', fee: 'Free' },
      { name: 'Small Business Grant Application', icon: 'storefront-outline', status: 'available', fee: 'Free' },
      { name: 'Family Support Program', icon: 'wallet-outline', status: 'available', fee: 'Free' },
      { name: 'Youth Employment Scheme', icon: 'school-outline', status: 'available', fee: 'Free' }
    ]
  }
];

const quickStats = [
  { label: 'Active Programs', value: '156', color: '#059669' },
  { label: 'Applications This Month', value: '2.4K', color: '#DC2626' },
  { label: 'Success Rate', value: '94%', color: '#D97706' },
  { label: 'Avg. Processing Time', value: '3 days', color: '#7C3AED' }
];

export default function EconomicServicesScreen() {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('all');
  
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const getStatusConfig = (status) => {
    switch (status) {
      case 'available':
        return { color: '#059669', bg: '#ECFDF5', text: 'Available' };
      case 'coming-soon':
        return { color: '#D97706', bg: '#FFFBEB', text: 'Coming Soon' };
      case 'maintenance':
        return { color: '#DC2626', bg: '#FEF2F2', text: 'Maintenance' };
      default:
        return { color: colors.textSecondary, bg: colors.surfaceSecondary, text: 'Unknown' };
    }
  };

  const handleServicePress = (service) => {
    if (service.status === 'available') {
      Alert.alert(
        service.name,
        `Service Fee: ${service.fee}\n\nWould you like to start the application process?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Start Application', onPress: () => Alert.alert('Success', 'Application started successfully!') }
        ]
      );
    } else {
      Alert.alert('Service Unavailable', 'This service is currently not available. Please check back later.');
    }
  };

  const filteredServices = economicServices.filter(category => {
    if (activeTab === 'all') return true;
    if (activeTab === 'business') return category.category.toLowerCase().includes('business') || category.category.toLowerCase().includes('trade');
    if (activeTab === 'finance') return category.category.toLowerCase().includes('banking') || category.category.toLowerCase().includes('tax');
    if (activeTab === 'social') return category.category.toLowerCase().includes('social');
    return true;
  });

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
            Economic Services
          </Text>
          
          <TouchableOpacity>
            <Ionicons name="help-circle-outline" size={24} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Quick Stats */}
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
            Economic Dashboard
          </Text>
          
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {quickStats.map((stat, index) => (
              <View key={index} style={{ width: '48%', marginBottom: 12 }}>
                <Text style={{
                  fontFamily: 'Inter_700Bold',
                  fontSize: 20,
                  color: colors.primaryText
                }}>
                  {stat.value}
                </Text>
                <Text style={{
                  fontFamily: 'Inter_400Regular',
                  fontSize: 12,
                  color: colors.primaryText,
                  opacity: 0.9
                }}>
                  {stat.label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Category Tabs */}
        <View style={{
          flexDirection: 'row',
          backgroundColor: colors.surfaceSecondary,
          borderRadius: 12,
          padding: 4,
          marginBottom: 24
        }}>
          {[
            { id: 'all', label: 'All' },
            { id: 'business', label: 'Business' },
            { id: 'finance', label: 'Finance' },
            { id: 'social', label: 'Social' }
          ].map((tab) => (
            <TouchableOpacity
              key={tab.id}
              onPress={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                paddingVertical: 8,
                borderRadius: 8,
                backgroundColor: activeTab === tab.id ? colors.primary : 'transparent'
              }}
            >
              <Text style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 14,
                color: activeTab === tab.id ? colors.primaryText : colors.text,
                textAlign: 'center'
              }}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Services by Category */}
        {filteredServices.map((category) => (
          <View key={category.id} style={{ marginBottom: 32 }}>
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 18,
              color: colors.text,
              marginBottom: 16
            }}>
              {category.category}
            </Text>
            
            <View style={{
              backgroundColor: colors.cardBackground,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: colors.border,
              overflow: 'hidden'
            }}>
              {category.services.map((service, index) => {
                const statusConfig = getStatusConfig(service.status);
                
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleServicePress(service)}
                    style={{
                      paddingHorizontal: 20,
                      paddingVertical: 16,
                      borderBottomWidth: index < category.services.length - 1 ? 1 : 0,
                      borderBottomColor: colors.border,
                      flexDirection: 'row',
                      alignItems: 'center'
                    }}
                  >
                    {/* Service Icon */}
                    <View style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: colors.primary + '20',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 16
                    }}>
                      <Ionicons name={service.icon} size={20} color={colors.primary} />
                    </View>

                    {/* Service Info */}
                    <View style={{ flex: 1 }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                        <Text style={{
                          fontFamily: 'Inter_500Medium',
                          fontSize: 15,
                          color: colors.text,
                          flex: 1,
                          marginRight: 8
                        }}>
                          {service.name}
                        </Text>
                        
                        <View style={{
                          backgroundColor: statusConfig.bg,
                          paddingHorizontal: 6,
                          paddingVertical: 2,
                          borderRadius: 8
                        }}>
                          <Text style={{
                            fontFamily: 'Inter_500Medium',
                            fontSize: 9,
                            color: statusConfig.color
                          }}>
                            {statusConfig.text}
                          </Text>
                        </View>
                      </View>

                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{
                          fontFamily: 'Inter_600SemiBold',
                          fontSize: 14,
                          color: service.fee === 'Free' ? '#059669' : colors.primary
                        }}>
                          {service.fee}
                        </Text>
                        
                        <Ionicons 
                          name="chevron-forward" 
                          size={16} 
                          color={colors.textSecondary} 
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}

        {/* Need Help Section */}
        <View style={{
          backgroundColor: colors.surfaceSecondary,
          borderRadius: 16,
          padding: 20,
          alignItems: 'center'
        }}>
          <Ionicons name="help-circle-outline" size={32} color={colors.primary} />
          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 16,
            color: colors.text,
            marginTop: 8,
            marginBottom: 4
          }}>
            Need Assistance?
          </Text>
          <Text style={{
            fontFamily: 'Inter_400Regular',
            fontSize: 14,
            color: colors.textSecondary,
            textAlign: 'center',
            marginBottom: 16
          }}>
            Contact our support team for help with economic services and applications
          </Text>
          
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={{
                backgroundColor: colors.primary,
                borderRadius: 12,
                paddingVertical: 12,
                paddingHorizontal: 20,
                marginRight: 12
              }}
            >
              <Text style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 14,
                color: colors.primaryText
              }}>
                Call Support
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={{
                backgroundColor: colors.surface,
                borderRadius: 12,
                paddingVertical: 12,
                paddingHorizontal: 20,
                borderWidth: 1,
                borderColor: colors.border
              }}
            >
              <Text style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 14,
                color: colors.text
              }}>
                Live Chat
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
