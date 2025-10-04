import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from "@/context/ThemeContext";

const complaintCategories = [
  { id: 'corruption', label: 'Corruption', icon: 'warning-outline', color: '#DC2626' },
  { id: 'poor-service', label: 'Poor Service Delivery', icon: 'thumbs-down-outline', color: '#D97706' },
  { id: 'infrastructure', label: 'Infrastructure', icon: 'construct-outline', color: '#059669' },
  { id: 'security', label: 'Security Issues', icon: 'shield-outline', color: '#7C3AED' },
  { id: 'health', label: 'Healthcare', icon: 'medical-outline', color: '#DC2626' },
  { id: 'education', label: 'Education', icon: 'school-outline', color: '#059669' },
  { id: 'environment', label: 'Environmental', icon: 'leaf-outline', color: '#059669' },
  { id: 'others', label: 'Others', icon: 'ellipsis-horizontal-outline', color: '#6B7280' }
];

const myComplaints = [
  {
    id: 'CMP001',
    title: 'Delayed Passport Processing',
    category: 'poor-service',
    status: 'in_progress',
    priority: 'medium',
    submittedAt: '2025-09-08T10:30:00Z',
    lastUpdate: '2025-09-10T14:20:00Z',
    description: 'My passport application has been delayed for over 3 weeks beyond the promised processing time.',
    response: 'Your application is being reviewed. We will update you within 48 hours.'
  },
  {
    id: 'CMP002',
    title: 'Poor Road Conditions in Ikeja',
    category: 'infrastructure',
    status: 'resolved',
    priority: 'high',
    submittedAt: '2025-08-25T09:15:00Z',
    lastUpdate: '2025-09-05T16:45:00Z',
    description: 'Major potholes on Oba Akran Avenue causing traffic congestion and vehicle damage.',
    response: 'Road repairs have been completed. Thank you for bringing this to our attention.'
  },
  {
    id: 'CMP003',
    title: 'Inadequate Security at Bus Stop',
    category: 'security',
    status: 'pending',
    priority: 'high',
    submittedAt: '2025-09-10T18:00:00Z',
    lastUpdate: '2025-09-10T18:00:00Z',
    description: 'Frequent theft incidents at Mile 2 bus stop. Need increased security presence.',
    response: null
  }
];

export default function ComplaintsScreen() {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('my-complaints'); // Default to 'My Complaints'
  
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
      case 'pending':
        return { color: '#D97706', bg: '#FFFBEB', text: 'Pending Review' };
      case 'in_progress':
        return { color: '#059669', bg: '#ECFDF5', text: 'In Progress' };
      case 'resolved':
        return { color: '#059669', bg: '#ECFDF5', text: 'Resolved' };
      case 'closed':
        return { color: '#6B7280', bg: '#F9FAFB', text: 'Closed' };
      default:
        return { color: colors.textSecondary, bg: colors.surfaceSecondary, text: 'Unknown' };
    }
  };

  const getPriorityConfig = (priority) => {
    switch (priority) {
      case 'high':
        return { color: '#DC2626', bg: '#FEF2F2', text: 'High' };
      case 'medium':
        return { color: '#D97706', bg: '#FFFBEB', text: 'Medium' };
      case 'low':
        return { color: '#059669', bg: '#ECFDF5', text: 'Low' };
      default:
        return { color: colors.textSecondary, bg: colors.surfaceSecondary, text: 'Normal' };
    }
  };

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

  const handleComplaintPress = (complaint) => {
    Alert.alert(
      `Complaint #${complaint.id}`,
      `Status: ${getStatusConfig(complaint.status).text}\nPriority: ${getPriorityConfig(complaint.priority).text}\n\nDescription: ${complaint.description}\n\n${complaint.response ? 'Response: ' + complaint.response : 'No response yet.'}`,
      [
        { text: 'Close', style: 'cancel' },
        { text: 'View Details', onPress: () => Alert.alert('Details', 'Opening detailed view...') }
      ]
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
            Complaints & Feedback
          </Text>
          
          <TouchableOpacity>
            <Ionicons name="help-circle-outline" size={24} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Tab Navigation */}
        <View style={{
          flexDirection: 'row',
          backgroundColor: colors.surfaceSecondary,
          borderRadius: 12,
          padding: 4,
          marginBottom: 24
        }}>
          {[
            { id: 'submit', label: 'Submit Complaint', icon: 'add-circle-outline' },
            { id: 'my-complaints', label: 'My Complaints', icon: 'list-outline' }
          ].map((tab) => (
            <TouchableOpacity
              key={tab.id}
              onPress={() => {
                if (tab.id === 'submit') {
                  router.push('/new-complaint'); // Navigate to the multi-step flow
                } else {
                  setActiveTab(tab.id);
                }
              }}
              style={{
                flex: 1,
                paddingVertical: 12,
                borderRadius: 8,
                backgroundColor: activeTab === tab.id ? colors.primary : 'transparent',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Ionicons 
                name={tab.icon} 
                size={16} 
                color={activeTab === tab.id ? colors.primaryText : colors.text}
                style={{ marginRight: 8 }}
              />
              <Text style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 14,
                color: activeTab === tab.id ? colors.primaryText : colors.text
              }}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Submit Complaint Tab - Now navigates to new-complaint.jsx */}
        {activeTab === 'submit' && (
          <View style={{ padding: 20, alignItems: 'center' }}>
            <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 16, color: colors.textSecondary, marginBottom: 16 }}>
              Redirecting to new complaint submission flow...
            </Text>
          </View>
        )}

        {/* My Complaints Tab */}
        {activeTab === 'my-complaints' && (
          <>
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 18,
              color: colors.text,
              marginBottom: 16
            }}>
              Your Complaints
            </Text>

            {myComplaints.map((complaint) => {
              const statusConfig = getStatusConfig(complaint.status);
              const priorityConfig = getPriorityConfig(complaint.priority);
              const categoryData = complaintCategories.find(cat => cat.id === complaint.category);
              
              return (
                <TouchableOpacity
                  key={complaint.id}
                  onPress={() => handleComplaintPress(complaint)}
                  style={{
                    backgroundColor: colors.cardBackground,
                    borderRadius: 16,
                    padding: 20,
                    marginBottom: 16,
                    borderWidth: 1,
                    borderColor: colors.border
                  }}
                >
                  {/* Header */}
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <Text style={{
                      fontFamily: 'Inter_600SemiBold',
                      fontSize: 12,
                      color: colors.primary
                    }}>
                      #{complaint.id}
                    </Text>
                    
                    <View style={{ flexDirection: 'row' }}>
                      <View style={{
                        backgroundColor: priorityConfig.bg,
                        paddingHorizontal: 6,
                        paddingVertical: 2,
                        borderRadius: 8,
                        marginRight: 8
                      }}>
                        <Text style={{
                          fontFamily: 'Inter_500Medium',
                          fontSize: 9,
                          color: priorityConfig.color
                        }}>
                          {priorityConfig.text}
                        </Text>
                      </View>
                      
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
                  </View>

                  {/* Title and Category */}
                  <Text style={{
                    fontFamily: 'Inter_600SemiBold',
                    fontSize: 16,
                    color: colors.text,
                    marginBottom: 8
                  }}>
                    {complaint.title}
                  </Text>

                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                    <Ionicons 
                      name={categoryData?.icon || 'folder-outline'} 
                      size={16} 
                      color={categoryData?.color || colors.textSecondary} 
                    />
                    <Text style={{
                      fontFamily: 'Inter_500Medium',
                      fontSize: 14,
                      color: colors.textSecondary,
                      marginLeft: 8
                    }}>
                      {categoryData?.label || 'Other'}
                    </Text>
                  </View>

                  {/* Description */}
                  <Text style={{
                    fontFamily: 'Inter_400Regular',
                    fontSize: 14,
                    color: colors.textSecondary,
                    lineHeight: 20,
                    marginBottom: 16
                  }} numberOfLines={2}>
                    {complaint.description}
                  </Text>

                  {/* Footer */}
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View>
                      <Text style={{
                        fontFamily: 'Inter_400Regular',
                        fontSize: 12,
                        color: colors.textSecondary
                      }}>
                        Submitted {formatTimeAgo(complaint.submittedAt)}
                      </Text>
                      <Text style={{
                        fontFamily: 'Inter_400Regular',
                        fontSize: 12,
                        color: colors.textSecondary
                      }}>
                        Updated {formatTimeAgo(complaint.lastUpdate)}
                      </Text>
                    </View>
                    
                    <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />
                  </View>
                </TouchableOpacity>
              );
            })}

            {/* Empty State */}
            {myComplaints.length === 0 && (
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
                  No Complaints Yet
                </Text>
                <Text style={{
                  fontFamily: 'Inter_400Regular',
                  fontSize: 14,
                  color: colors.textSecondary,
                  textAlign: 'center'
                }}>
                  You haven't submitted any complaints. Use the Submit tab to file a new complaint.
                </Text>
              </View>
            )}
          </>
        )}

        {/* Help Section */}
        <View style={{
          backgroundColor: colors.surfaceSecondary,
          borderRadius: 16,
          padding: 20,
          alignItems: 'center',
          marginTop: 24
        }}>
          <Ionicons name="call-outline" size={32} color={colors.primary} />
          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 16,
            color: colors.text,
            marginTop: 8,
            marginBottom: 4
          }}>
            Need Immediate Help?
          </Text>
          <Text style={{
            fontFamily: 'Inter_400Regular',
            fontSize: 14,
            color: colors.textSecondary,
            textAlign: 'center',
            marginBottom: 16
          }}>
            For urgent issues, contact our 24/7 citizen support hotline
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
              Call Hotline: 0800-CITIZEN
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
