import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from "@/context/ThemeContext";

const serviceCategories = [
  {
    id: 1,
    name: 'Identity & Documents',
    icon: 'card-outline',
    color: '#059669',
    services: [
      { name: 'National ID Registration', department: 'NIA', phone: '+234-800-123-4567', hours: '8AM - 5PM' },
      { name: 'Passport Services', department: 'Immigration', phone: '+234-800-234-5678', hours: '8AM - 4PM' },
      { name: 'Birth Certificate', department: 'NPC', phone: '+234-800-345-6789', hours: '9AM - 4PM' },
      { name: 'Marriage Certificate', department: 'Federal Registry', phone: '+234-800-456-7890', hours: '9AM - 3PM' }
    ]
  },
  {
    id: 2,
    name: 'Education & Training',
    icon: 'school-outline',
    color: '#DC2626',
    services: [
      { name: 'JAMB Registration', department: 'JAMB', phone: '+234-800-567-8901', hours: '8AM - 6PM' },
      { name: 'NYSC Mobilization', department: 'NYSC', phone: '+234-800-678-9012', hours: '8AM - 4PM' },
      { name: 'Certificate Verification', department: 'Federal Ministry of Education', phone: '+234-800-789-0123', hours: '9AM - 5PM' },
      { name: 'Scholarship Applications', department: 'TEF', phone: '+234-800-890-1234', hours: '8AM - 5PM' }
    ]
  },
  {
    id: 3,
    name: 'Healthcare Services',
    icon: 'medical-outline',
    color: '#D97706',
    services: [
      { name: 'NHIS Registration', department: 'NHIS', phone: '+234-800-901-2345', hours: '8AM - 5PM' },
      { name: 'Medical Fitness Certificate', department: 'Federal Medical Centre', phone: '+234-800-012-3456', hours: '7AM - 3PM' },
      { name: 'Drug Registration', department: 'NAFDAC', phone: '+234-800-123-4567', hours: '9AM - 4PM' },
      { name: 'Yellow Fever Vaccination', department: 'Port Health Services', phone: '+234-800-234-5678', hours: '8AM - 4PM' }
    ]
  },
  {
    id: 4,
    name: 'Business & Commerce',
    icon: 'business-outline',
    color: '#7C3AED',
    services: [
      { name: 'CAC Registration', department: 'Corporate Affairs Commission', phone: '+234-800-345-6789', hours: '8AM - 5PM' },
      { name: 'Tax Services', department: 'FIRS', phone: '+234-800-456-7890', hours: '8AM - 4PM' },
      { name: 'Export/Import License', department: 'Country Customs', phone: '+234-800-567-8901', hours: '8AM - 5PM' },
      { name: 'Standards Certification', department: 'SON', phone: '+234-800-678-9012', hours: '9AM - 4PM' }
    ]
  },
  {
    id: 5,
    name: 'Transportation',
    icon: 'car-outline',
    color: '#059669',
    services: [
      { name: "Driver's License", department: 'FRSC', phone: '+234-800-789-0123', hours: '8AM - 4PM' },
      { name: 'Vehicle Registration', department: 'FRSC', phone: '+234-800-890-1234', hours: '8AM - 4PM' },
      { name: 'Road Worthiness Certificate', department: 'VIO', phone: '+234-800-901-2345', hours: '8AM - 5PM' },
      { name: 'International Driving Permit', department: 'FRSC', phone: '+234-800-012-3456', hours: '9AM - 3PM' }
    ]
  },
  {
    id: 6,
    name: 'Finance & Banking',
    icon: 'cash-outline',
    color: '#DC2626',
    services: [
      { name: 'BVN Services', department: 'NIBSS', phone: '+234-800-123-4567', hours: '24/7' },
      { name: 'Credit Bureau Report', department: 'CRC Credit Bureau', phone: '+234-800-234-5678', hours: '8AM - 6PM' },
      { name: 'Mortgage Application', department: 'FMBN', phone: '+234-800-345-6789', hours: '8AM - 5PM' },
      { name: 'Pension Verification', department: 'PENCOM', phone: '+234-800-456-7890', hours: '8AM - 4PM' }
    ]
  }
];

const emergencyContacts = [
  { name: 'Police Emergency', number: '199', icon: 'shield-outline' },
  { name: 'Fire Service', number: '199', icon: 'flame-outline' },
  { name: 'Ambulance', number: '199', icon: 'medical-outline' },
  { name: 'NEMA', number: '0800-NEMA-CALL', icon: 'warning-outline' }
];

export default function ServiceDirectoryScreen() {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const filteredCategories = serviceCategories.filter(category => {
    if (!searchQuery) return true;
    
    const matchesCategory = category.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesService = category.services.some(service => 
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.department.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    return matchesCategory || matchesService;
  });

  const handleServicePress = (service) => {
    Alert.alert(
      service.name,
      `Department: ${service.department}\nPhone: ${service.phone}\nHours: ${service.hours}\n\nWould you like to call this service?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call Now', onPress: () => Alert.alert('Calling', `Calling ${service.phone}...`) },
        { text: 'Get Directions', onPress: () => Alert.alert('Directions', 'Opening map directions...') }
      ]
    );
  };

  const handleEmergencyCall = (contact) => {
    Alert.alert(
      `Emergency Call - ${contact.name}`,
      `Are you sure you want to call ${contact.number}?\n\nThis is for emergencies only.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call Emergency', style: 'destructive', onPress: () => Alert.alert('Calling', `Calling ${contact.number}...`) }
      ]
    );
  };

  const handleCategoryPress = (category) => {
    setSelectedCategory(selectedCategory === category.id ? null : category.id);
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
            Service Directory
          </Text>
          
          <TouchableOpacity>
            <Ionicons name="bookmark-outline" size={24} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={{
          backgroundColor: colors.surfaceSecondary,
          borderRadius: 12,
          paddingHorizontal: 16,
          paddingVertical: 12,
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 24
        }}>
          <Ionicons name="search-outline" size={20} color={colors.textSecondary} />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search services, departments..."
            placeholderTextColor={colors.textSecondary}
            style={{
              flex: 1,
              marginLeft: 12,
              fontFamily: 'Inter_400Regular',
              fontSize: 16,
              color: colors.text
            }}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Emergency Contacts */}
        <View style={{
          backgroundColor: '#FEF2F2',
          borderRadius: 16,
          padding: 20,
          marginBottom: 24,
          borderLeftWidth: 4,
          borderLeftColor: '#DC2626'
        }}>
          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 16,
            color: '#DC2626',
            marginBottom: 16
          }}>
            Emergency Services
          </Text>
          
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {emergencyContacts.map((contact, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleEmergencyCall(contact)}
                style={{
                  width: '48%',
                  backgroundColor: 'rgba(220, 38, 38, 0.1)',
                  borderRadius: 12,
                  padding: 12,
                  marginBottom: 8,
                  alignItems: 'center'
                }}
              >
                <Ionicons name={contact.icon} size={24} color="#DC2626" />
                <Text style={{
                  fontFamily: 'Inter_500Medium',
                  fontSize: 12,
                  color: '#DC2626',
                  textAlign: 'center',
                  marginTop: 4
                }}>
                  {contact.name}
                </Text>
                <Text style={{
                  fontFamily: 'Inter_600SemiBold',
                  fontSize: 14,
                  color: '#DC2626',
                  marginTop: 2
                }}>
                  {contact.number}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Service Categories */}
        <Text style={{
          fontFamily: 'Inter_600SemiBold',
          fontSize: 18,
          color: colors.text,
          marginBottom: 16
        }}>
          Government Services
        </Text>

        {filteredCategories.map((category) => (
          <View key={category.id} style={{ marginBottom: 16 }}>
            <TouchableOpacity
              onPress={() => handleCategoryPress(category)}
              style={{
                backgroundColor: colors.cardBackground,
                borderRadius: 16,
                padding: 20,
                borderWidth: 1,
                borderColor: colors.border,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <View style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: category.color + '20',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 16
                }}>
                  <Ionicons name={category.icon} size={24} color={category.color} />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={{
                    fontFamily: 'Inter_600SemiBold',
                    fontSize: 16,
                    color: colors.text,
                    marginBottom: 4
                  }}>
                    {category.name}
                  </Text>
                  <Text style={{
                    fontFamily: 'Inter_400Regular',
                    fontSize: 12,
                    color: colors.textSecondary
                  }}>
                    {category.services.length} services available
                  </Text>
                </View>
              </View>

              <Ionicons 
                name={selectedCategory === category.id ? "chevron-up" : "chevron-down"} 
                size={20} 
                color={colors.textSecondary} 
              />
            </TouchableOpacity>

            {/* Expanded Services */}
            {selectedCategory === category.id && (
              <View style={{
                backgroundColor: colors.surfaceSecondary,
                borderRadius: 12,
                marginTop: 8,
                overflow: 'hidden'
              }}>
                {category.services.map((service, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleServicePress(service)}
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
                        fontSize: 15,
                        color: colors.text,
                        marginBottom: 4
                      }}>
                        {service.name}
                      </Text>
                      
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
                        <Ionicons name="business-outline" size={12} color={colors.textSecondary} />
                        <Text style={{
                          fontFamily: 'Inter_400Regular',
                          fontSize: 12,
                          color: colors.textSecondary,
                          marginLeft: 4
                        }}>
                          {service.department}
                        </Text>
                      </View>
                      
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
                        <Ionicons name="call-outline" size={12} color={colors.textSecondary} />
                        <Text style={{
                          fontFamily: 'Inter_400Regular',
                          fontSize: 12,
                          color: colors.textSecondary,
                          marginLeft: 4
                        }}>
                          {service.phone}
                        </Text>
                      </View>
                      
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="time-outline" size={12} color={colors.textSecondary} />
                        <Text style={{
                          fontFamily: 'Inter_400Regular',
                          fontSize: 12,
                          color: colors.textSecondary,
                          marginLeft: 4
                        }}>
                          {service.hours}
                        </Text>
                      </View>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                      <TouchableOpacity
                        onPress={() => Alert.alert('Calling', `Calling ${service.phone}...`)}
                        style={{
                          backgroundColor: colors.primary,
                          borderRadius: 8,
                          paddingVertical: 8,
                          paddingHorizontal: 12,
                          marginRight: 8
                        }}
                      >
                        <Ionicons name="call" size={16} color={colors.primaryText} />
                      </TouchableOpacity>
                      
                      <TouchableOpacity
                        onPress={() => Alert.alert('Directions', 'Opening map directions...')}
                        style={{
                          backgroundColor: colors.surface,
                          borderRadius: 8,
                          paddingVertical: 8,
                          paddingHorizontal: 12,
                          borderWidth: 1,
                          borderColor: colors.border
                        }}
                      >
                        <Ionicons name="location" size={16} color={colors.text} />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        ))}

        {/* Help Section */}
        <View style={{
          backgroundColor: colors.surfaceSecondary,
          borderRadius: 16,
          padding: 20,
          alignItems: 'center',
          marginTop: 16
        }}>
          <Ionicons name="help-circle-outline" size={32} color={colors.primary} />
          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 16,
            color: colors.text,
            marginTop: 8,
            marginBottom: 4
          }}>
            Can't Find a Service?
          </Text>
          <Text style={{
            fontFamily: 'Inter_400Regular',
            fontSize: 14,
            color: colors.textSecondary,
            textAlign: 'center',
            marginBottom: 16
          }}>
            Contact our support team to help you find the right government service
          </Text>
          
          <TouchableOpacity
            style={{
              backgroundColor: colors.primary,
              borderRadius: 12,
              paddingVertical: 12,
              paddingHorizontal: 24
            }}
          >
            <Text style={{
              fontFamily: 'Inter_500Medium',
              fontSize: 14,
              color: colors.primaryText
            }}>
              Contact Support
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}