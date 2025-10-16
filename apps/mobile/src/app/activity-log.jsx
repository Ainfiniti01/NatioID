import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from "@/context/ThemeContext";

const activityCategories = [
  { id: 'all', label: 'All Activity', color: '#059669' },
  { id: 'authentication', label: 'Authentication', color: '#DC2626' },
  { id: 'documents', label: 'Documents', color: '#D97706' },
  { id: 'services', label: 'Services', color: '#7C3AED' },
  { id: 'profile', label: 'Profile', color: '#059669' },
  { id: 'security', label: 'Security', color: '#DC2626' }
];

const activityLogs = [
  {
    id: 1,
    action: 'Account Login',
    category: 'authentication',
    description: 'Successful login using biometric authentication',
    timestamp: '2025-09-11T09:30:00Z',
    device: 'iPhone 15 Pro',
    location: 'Lagos, Country',
    ipAddress: '197.210.xxx.xxx',
    status: 'success',
    details: 'Biometric verification successful'
  },
  {
    id: 2,
    action: 'Digital ID Access',
    category: 'documents',
    description: 'Viewed digital ID card',
    timestamp: '2025-09-11T09:25:00Z',
    device: 'iPhone 15 Pro',
    location: 'Lagos, Country',
    ipAddress: '197.210.xxx.xxx',
    status: 'success',
    details: 'ID card displayed for verification'
  },
  {
    id: 3,
    action: 'Complaint Submitted',
    category: 'services',
    description: 'Filed complaint about poor road conditions',
    timestamp: '2025-09-10T16:45:00Z',
    device: 'iPhone 15 Pro',
    location: 'Lagos, Country',
    ipAddress: '197.210.xxx.xxx',
    status: 'success',
    details: 'Complaint ID: CMP003 generated'
  },
  {
    id: 4,
    action: 'Profile Update',
    category: 'profile',
    description: 'Updated contact phone number',
    timestamp: '2025-09-10T14:20:00Z',
    device: 'iPhone 15 Pro',
    location: 'Lagos, Country',
    ipAddress: '197.210.xxx.xxx',
    status: 'success',
    details: 'Phone number verification completed'
  },
  {
    id: 5,
    action: 'Security Settings',
    category: 'security',
    description: 'Changed security PIN',
    timestamp: '2025-09-10T11:15:00Z',
    device: 'iPhone 15 Pro',
    location: 'Lagos, Country',
    ipAddress: '197.210.xxx.xxx',
    status: 'success',
    details: 'PIN changed successfully'
  },
  {
    id: 6,
    action: 'Failed Login Attempt',
    category: 'authentication',
    description: 'Incorrect PIN entered',
    timestamp: '2025-09-09T22:30:00Z',
    device: 'Unknown Device',
    location: 'Abuja, Country',
    ipAddress: '102.89.xxx.xxx',
    status: 'failed',
    details: 'Incorrect PIN after 2 attempts'
  },
  {
    id: 7,
    action: 'Document Download',
    category: 'documents',
    description: 'Downloaded passport copy',
    timestamp: '2025-09-09T15:45:00Z',
    device: 'iPhone 15 Pro',
    location: 'Lagos, Country',
    ipAddress: '197.210.xxx.xxx',
    status: 'success',
    details: 'PDF generated and downloaded'
  },
  {
    id: 8,
    action: 'Service Application',
    category: 'services',
    description: 'Applied for business registration',
    timestamp: '2025-09-08T13:20:00Z',
    device: 'iPhone 15 Pro',
    location: 'Lagos, Country',
    ipAddress: '197.210.xxx.xxx',
    status: 'success',
    details: 'Application ID: APP2025091023 created'
  }
];

export default function ActivityLogScreen() {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');
  
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-NG', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'success':
        return { color: '#059669', bg: '#ECFDF5', icon: 'checkmark-circle' };
      case 'failed':
        return { color: '#DC2626', bg: '#FEF2F2', icon: 'close-circle' };
      case 'warning':
        return { color: '#D97706', bg: '#FFFBEB', icon: 'warning' };
      default:
        return { color: colors.textSecondary, bg: colors.surfaceSecondary, icon: 'information-circle' };
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'authentication':
        return 'log-in-outline';
      case 'documents':
        return 'document-text-outline';
      case 'services':
        return 'briefcase-outline';
      case 'profile':
        return 'person-outline';
      case 'security':
        return 'shield-checkmark-outline';
      default:
        return 'ellipse-outline';
    }
  };

  const filteredLogs = activityLogs.filter(log => {
    if (selectedCategory === 'all') return true;
    return log.category === selectedCategory;
  }).filter(log => {
    const logDate = new Date(log.timestamp);
    const now = new Date();
    const diffDays = Math.floor((now - logDate) / (1000 * 60 * 60 * 24));
    
    switch (selectedTimeframe) {
      case '1d':
        return diffDays === 0;
      case '7d':
        return diffDays <= 7;
      case '30d':
        return diffDays <= 30;
      case '90d':
        return diffDays <= 90;
      default:
        return true;
    }
  });

  const handleActivityPress = (activity) => {
    Alert.alert(
      activity.action,
      `Device: ${activity.device}\nLocation: ${activity.location}\nIP Address: ${activity.ipAddress}\nTime: ${formatDateTime(activity.timestamp)}\n\nDetails: ${activity.details}`,
      [
        { text: 'Close', style: 'cancel' },
        { text: 'Report Issue', onPress: () => Alert.alert('Report', 'Redirecting to security center...') }
      ]
    );
  };

  const handleExportLogs = () => {
    Alert.alert(
      'Export Activity Logs',
      'Choose export format:',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Export as PDF', onPress: () => Alert.alert('Export', 'Generating PDF...') },
        { text: 'Export as CSV', onPress: () => Alert.alert('Export', 'Generating CSV...') }
      ]
    );
  };

  const getActivitySummary = () => {
    const today = filteredLogs.filter(log => {
      const logDate = new Date(log.timestamp);
      const now = new Date();
      return logDate.toDateString() === now.toDateString();
    }).length;

    const successful = filteredLogs.filter(log => log.status === 'success').length;
    const failed = filteredLogs.filter(log => log.status === 'failed').length;

    return { today, successful, failed, total: filteredLogs.length };
  };

  const summary = getActivitySummary();

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
            Activity Log
          </Text>
          
          <TouchableOpacity onPress={handleExportLogs}>
            <Ionicons name="download-outline" size={24} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Activity Summary */}
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
            Activity Summary
          </Text>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{
                fontFamily: 'Inter_700Bold',
                fontSize: 24,
                color: colors.primaryText
              }}>
                {summary.today}
              </Text>
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 12,
                color: colors.primaryText,
                opacity: 0.9
              }}>
                Today
              </Text>
            </View>
            
            <View style={{ alignItems: 'center' }}>
              <Text style={{
                fontFamily: 'Inter_700Bold',
                fontSize: 24,
                color: colors.primaryText
              }}>
                {summary.successful}
              </Text>
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 12,
                color: colors.primaryText,
                opacity: 0.9
              }}>
                Successful
              </Text>
            </View>
            
            <View style={{ alignItems: 'center' }}>
              <Text style={{
                fontFamily: 'Inter_700Bold',
                fontSize: 24,
                color: colors.primaryText
              }}>
                {summary.failed}
              </Text>
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 12,
                color: colors.primaryText,
                opacity: 0.9
              }}>
                Failed
              </Text>
            </View>
            
            <View style={{ alignItems: 'center' }}>
              <Text style={{
                fontFamily: 'Inter_700Bold',
                fontSize: 24,
                color: colors.primaryText
              }}>
                {summary.total}
              </Text>
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 12,
                color: colors.primaryText,
                opacity: 0.9
              }}>
                Total
              </Text>
            </View>
          </View>
        </View>

        {/* Filters */}
        <View style={{ marginBottom: 24 }}>
          {/* Timeframe Filter */}
          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 16,
            color: colors.text,
            marginBottom: 12
          }}>
            Timeframe
          </Text>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 20 }}
            contentContainerStyle={{ paddingRight: 20 }}
          >
            {[
              { id: '1d', label: 'Today' },
              { id: '7d', label: 'Last 7 days' },
              { id: '30d', label: 'Last 30 days' },
              { id: '90d', label: 'Last 90 days' }
            ].map((timeframe) => (
              <TouchableOpacity
                key={timeframe.id}
                onPress={() => setSelectedTimeframe(timeframe.id)}
                style={{
                  backgroundColor: selectedTimeframe === timeframe.id ? colors.primary : colors.surfaceSecondary,
                  borderRadius: 20,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  marginRight: 12
                }}
              >
                <Text style={{
                  fontFamily: 'Inter_500Medium',
                  fontSize: 14,
                  color: selectedTimeframe === timeframe.id ? colors.primaryText : colors.text
                }}>
                  {timeframe.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Category Filter */}
          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 16,
            color: colors.text,
            marginBottom: 12
          }}>
            Category
          </Text>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 20 }}
          >
            {activityCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                onPress={() => setSelectedCategory(category.id)}
                style={{
                  backgroundColor: selectedCategory === category.id ? category.color : colors.surfaceSecondary,
                  borderRadius: 20,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  marginRight: 12
                }}
              >
                <Text style={{
                  fontFamily: 'Inter_500Medium',
                  fontSize: 14,
                  color: selectedCategory === category.id ? '#FFFFFF' : colors.text
                }}>
                  {category.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Activity List */}
        <Text style={{
          fontFamily: 'Inter_600SemiBold',
          fontSize: 18,
          color: colors.text,
          marginBottom: 16
        }}>
          Recent Activity ({filteredLogs.length})
        </Text>

        {filteredLogs.map((activity) => {
          const statusConfig = getStatusConfig(activity.status);
          const categoryIcon = getCategoryIcon(activity.category);
          
          return (
            <TouchableOpacity
              key={activity.id}
              onPress={() => handleActivityPress(activity)}
              style={{
                backgroundColor: colors.cardBackground,
                borderRadius: 16,
                padding: 20,
                marginBottom: 12,
                borderWidth: 1,
                borderColor: colors.border
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                {/* Icon and Status */}
                <View style={{ marginRight: 16, alignItems: 'center' }}>
                  <View style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: statusConfig.bg,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 4
                  }}>
                    <Ionicons name={categoryIcon} size={20} color={statusConfig.color} />
                  </View>
                  
                  <View style={{
                    backgroundColor: statusConfig.bg,
                    borderRadius: 12,
                    paddingHorizontal: 6,
                    paddingVertical: 2
                  }}>
                    <Ionicons name={statusConfig.icon} size={12} color={statusConfig.color} />
                  </View>
                </View>

                {/* Content */}
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                    <Text style={{
                      fontFamily: 'Inter_600SemiBold',
                      fontSize: 16,
                      color: colors.text,
                      flex: 1,
                      marginRight: 8
                    }}>
                      {activity.action}
                    </Text>
                    
                    <Text style={{
                      fontFamily: 'Inter_400Regular',
                      fontSize: 12,
                      color: colors.textSecondary
                    }}>
                      {formatTimeAgo(activity.timestamp)}
                    </Text>
                  </View>

                  <Text style={{
                    fontFamily: 'Inter_400Regular',
                    fontSize: 14,
                    color: colors.textSecondary,
                    marginBottom: 8,
                    lineHeight: 20
                  }}>
                    {activity.description}
                  </Text>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Ionicons name="location-outline" size={12} color={colors.textSecondary} />
                      <Text style={{
                        fontFamily: 'Inter_400Regular',
                        fontSize: 12,
                        color: colors.textSecondary,
                        marginLeft: 4,
                        marginRight: 12
                      }}>
                        {activity.location}
                      </Text>
                      
                      <Ionicons name="phone-portrait-outline" size={12} color={colors.textSecondary} />
                      <Text style={{
                        fontFamily: 'Inter_400Regular',
                        fontSize: 12,
                        color: colors.textSecondary,
                        marginLeft: 4
                      }}>
                        {activity.device}
                      </Text>
                    </View>
                    
                    <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}

        {/* Empty State */}
        {filteredLogs.length === 0 && (
          <View style={{
            backgroundColor: colors.surfaceSecondary,
            borderRadius: 16,
            padding: 40,
            alignItems: 'center'
          }}>
            <Ionicons name="document-text-outline" size={48} color={colors.textSecondary} />
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 16,
              color: colors.text,
              marginTop: 16,
              marginBottom: 8
            }}>
              No Activity Found
            </Text>
            <Text style={{
              fontFamily: 'Inter_400Regular',
              fontSize: 14,
              color: colors.textSecondary,
              textAlign: 'center'
            }}>
              No activity matches your current filters. Try adjusting the timeframe or category.
            </Text>
          </View>
        )}

        {/* Security Notice */}
        <View style={{
          backgroundColor: colors.surfaceSecondary,
          borderRadius: 16,
          padding: 20,
          marginTop: 24,
          borderLeftWidth: 4,
          borderLeftColor: colors.primary
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <Ionicons name="shield-checkmark" size={20} color={colors.primary} />
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 16,
              color: colors.text,
              marginLeft: 8
            }}>
              Security Notice
            </Text>
          </View>
          <Text style={{
            fontFamily: 'Inter_400Regular',
            fontSize: 14,
            color: colors.textSecondary,
            lineHeight: 20
          }}>
            We monitor all account activity for security purposes. If you notice any suspicious activity, please report it immediately through the Security Center.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}