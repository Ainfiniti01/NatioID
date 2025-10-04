import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from "@/context/ThemeContext";

export default function BenefitsScreen() {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('available');
  
  const availableBenefits = [
    {
      id: 1,
      title: 'Youth Employment Support',
      description: 'Monthly stipend and job training for youth aged 18-35',
      amount: '$25,000/month',
      category: 'Employment',
      deadline: '2024-03-15',
      eligible: true,
      requirements: ['Age 18-35', 'Unemployed', 'Country Citizen'],
      icon: 'briefcase-outline'
    },
    {
      id: 2,
      title: 'Student Loan Scheme',
      description: 'Interest-free loans for higher education',
      amount: 'Up to $500,000',
      category: 'Education',
      deadline: '2024-04-30',
      eligible: true,
      requirements: ['Enrolled Student', 'Good Academic Standing', 'Income < $300k'],
      icon: 'school-outline'
    },
    {
      id: 3,
      title: 'Small Business Grant',
      description: 'One-time grant for micro and small enterprises',
      amount: '$100,000 - $1M',
      category: 'Business',
      deadline: '2024-02-28',
      eligible: false,
      requirements: ['Business Registration', 'Min 1yr Operation', 'Annual Revenue < $10M'],
      icon: 'storefront-outline'
    }
  ];

  const appliedBenefits = [
    {
      id: 2,
      title: 'Student Loan Scheme',
      appliedDate: '2024-01-15',
      status: 'under_review',
      amount: '$350,000',
      nextUpdate: '2024-02-15'
    }
  ];

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
      case 'approved':
        return { color: colors.success, bg: '#F0FDF4', text: 'Approved', icon: 'checkmark-circle' };
      case 'under_review':
        return { color: colors.warning, bg: '#FFF7ED', text: 'Under Review', icon: 'time-outline' };
      default:
        return { color: colors.textSecondary, bg: colors.surfaceSecondary, text: 'Unknown', icon: 'help-circle' };
    }
  };

  const getCategoryColor = (category) => {
    const colors_map = {
      'Employment': '#3B82F6',
      'Education': '#10B981',
      'Business': '#F59E0B'
    };
    return colors_map[category] || '#6B7280';
  };

  const handleApplyBenefit = (benefit) => {
    if (!benefit.eligible) {
      Alert.alert('Not Eligible', 'You do not meet the requirements for this benefit.');
      return;
    }
    Alert.alert('Application Submitted', 'Your application has been submitted successfully.');
  };

  const renderAvailableBenefits = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      {availableBenefits.map((benefit) => (
        <View
          key={benefit.id}
          style={{
            backgroundColor: colors.cardBackground,
            borderRadius: 16,
            padding: 20,
            marginBottom: 16,
            borderWidth: 1,
            borderColor: colors.border
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 }}>
            <View style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: benefit.eligible ? colors.primary : colors.surfaceSecondary,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 16
            }}>
              <Ionicons 
                name={benefit.icon} 
                size={24} 
                color={benefit.eligible ? colors.primaryText : colors.textSecondary} 
              />
            </View>
            
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                <Text style={{
                  fontFamily: 'Inter_600SemiBold',
                  fontSize: 16,
                  color: colors.text,
                  flex: 1
                }}>
                  {benefit.title}
                </Text>
                <View style={{
                  backgroundColor: getCategoryColor(benefit.category),
                  borderRadius: 12,
                  paddingHorizontal: 8,
                  paddingVertical: 2
                }}>
                  <Text style={{
                    fontFamily: 'Inter_500Medium',
                    fontSize: 10,
                    color: '#FFFFFF'
                  }}>
                    {benefit.category}
                  </Text>
                </View>
              </View>
              
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 14,
                color: colors.textSecondary,
                lineHeight: 20,
                marginBottom: 8
              }}>
                {benefit.description}
              </Text>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{
                  fontFamily: 'Inter_600SemiBold',
                  fontSize: 14,
                  color: colors.primary
                }}>
                  {benefit.amount}
                </Text>
                <Text style={{
                  fontFamily: 'Inter_400Regular',
                  fontSize: 12,
                  color: colors.textSecondary
                }}>
                  Deadline: {benefit.deadline}
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => handleApplyBenefit(benefit)}
            disabled={!benefit.eligible}
            style={{
              backgroundColor: benefit.eligible ? colors.primary : colors.surfaceSecondary,
              borderRadius: 12,
              paddingVertical: 12,
              alignItems: 'center'
            }}
          >
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 14,
              color: benefit.eligible ? colors.primaryText : colors.textSecondary
            }}>
              {benefit.eligible ? 'Apply Now' : 'Not Eligible'}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );

  const renderAppliedBenefits = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      {appliedBenefits.map((application) => {
        const statusConfig = getStatusConfig(application.status);
        
        return (
          <View
            key={application.id}
            style={{
              backgroundColor: colors.cardBackground,
              borderRadius: 16,
              padding: 20,
              marginBottom: 16,
              borderWidth: 1,
              borderColor: colors.border
            }}
          >
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 16,
              color: colors.text,
              marginBottom: 8
            }}>
              {application.title}
            </Text>
            
            <View style={{
              backgroundColor: statusConfig.bg,
              borderRadius: 12,
              paddingHorizontal: 8,
              paddingVertical: 4,
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'flex-start',
              marginBottom: 12
            }}>
              <Ionicons name={statusConfig.icon} size={12} color={statusConfig.color} style={{ marginRight: 4 }} />
              <Text style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 10,
                color: statusConfig.color
              }}>
                {statusConfig.text}
              </Text>
            </View>

            <Text style={{
              fontFamily: 'Inter_400Regular',
              fontSize: 12,
              color: colors.textSecondary
            }}>
              Applied: {application.appliedDate} • Amount: {application.amount}
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDark ? "light" : "dark"} />
      
      <View style={{
        paddingTop: insets.top + 20,
        paddingHorizontal: 20,
        paddingBottom: insets.bottom + 20,
        flex: 1
      }}>
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
            Benefits Center
          </Text>
          
          <View style={{ width: 24 }} />
        </View>

        <View style={{
          flexDirection: 'row',
          backgroundColor: colors.surfaceSecondary,
          borderRadius: 12,
          padding: 4,
          marginBottom: 20
        }}>
          <TouchableOpacity
            onPress={() => setActiveTab('available')}
            style={{
              flex: 1,
              backgroundColor: activeTab === 'available' ? colors.primary : 'transparent',
              borderRadius: 8,
              paddingVertical: 12,
              alignItems: 'center'
            }}
          >
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 14,
              color: activeTab === 'available' ? colors.primaryText : colors.textSecondary
            }}>
              Available
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab('applied')}
            style={{
              flex: 1,
              backgroundColor: activeTab === 'applied' ? colors.primary : 'transparent',
              borderRadius: 8,
              paddingVertical: 12,
              alignItems: 'center'
            }}
          >
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 14,
              color: activeTab === 'applied' ? colors.primaryText : colors.textSecondary
            }}>
              Applied
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1 }}>
          {activeTab === 'available' ? renderAvailableBenefits() : renderAppliedBenefits()}
        </View>
      </View>
    </View>
  );
}
