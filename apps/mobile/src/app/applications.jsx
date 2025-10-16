import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from "@/context/ThemeContext";

export default function ApplicationsScreen() {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('all');

  const [applications, setApplications] = useState([
    {
      id: 'APP001',
      type: 'national_id_replacement',
      title: 'National ID Card Replacement',
      description: 'Replace lost National ID Card',
      status: 'approved',
      submittedDate: '2024-01-15',
      lastUpdate: '2024-02-05',
      estimatedCompletion: '2024-02-15',
      fee: '$5,000',
      trackingCode: 'ID-REP-2024-001',
      documents: ['Affidavit', 'Police Report', 'Birth Certificate'],
      icon: 'card-outline'
    },
    {
      id: 'APP002', 
      type: 'passport_renewal',
      title: 'Passport Renewal',
      description: 'Renew expired international passport',
      status: 'under_review',
      submittedDate: '2024-02-01',
      lastUpdate: '2024-02-08',
      estimatedCompletion: '2024-03-01',
      fee: '$35,000',
      trackingCode: 'PASS-REN-2024-002',
      documents: ['Old Passport', 'Photographs', 'Guarantor Form'],
      icon: 'airplane-outline'
    },
    {
      id: 'APP003',
      type: 'driver_license',
      title: "Driver's License Application",
      description: 'New driver license application',
      status: 'pending_payment',
      submittedDate: '2024-02-10',
      lastUpdate: '2024-02-10',
      estimatedCompletion: '2024-03-15',
      fee: '$15,000',
      trackingCode: 'DL-NEW-2024-003',
      documents: ['Birth Certificate', 'Medical Certificate', 'Driving School Certificate'],
      icon: 'car-outline'
    },
    {
      id: 'APP004',
      type: 'birth_certificate',
      title: 'Birth Certificate Request',
      description: 'Request for birth certificate',
      status: 'rejected',
      submittedDate: '2024-01-20',
      lastUpdate: '2024-01-25',
      estimatedCompletion: 'N/A',
      fee: '$3,500',
      trackingCode: 'BIRTH-REQ-2024-004',
      documents: ['Hospital Record', 'Parent ID'],
      rejectionReason: 'Incomplete documentation - missing hospital delivery record',
      icon: 'document-outline'
    },
    {
      id: 'APP005',
      type: 'voter_registration',
      title: 'Voter Registration',
      description: 'Register for permanent voter card',
      status: 'completed',
      submittedDate: '2023-12-05',
      lastUpdate: '2024-01-10',
      estimatedCompletion: 'Completed',
      fee: 'Free',
      trackingCode: 'VOTER-REG-2023-005',
      documents: ['National ID Slip', 'Utility Bill', 'Photographs'],
      icon: 'checkbox-outline'
    }
  ]);

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
        return { color: '#059669', bg: '#ECFDF5', text: 'Approved', icon: 'checkmark-circle' };
      case 'under_review':
        return { color: '#D97706', bg: '#FFFBEB', text: 'Under Review', icon: 'time-outline' };
      case 'pending_payment':
        return { color: '#DC2626', bg: '#FEF2F2', text: 'Pending Payment', icon: 'card-outline' };
      case 'rejected':
        return { color: '#991B1B', bg: '#FEF2F2', text: 'Rejected', icon: 'close-circle' };
      case 'completed':
        return { color: '#059669', bg: '#ECFDF5', text: 'Completed', icon: 'checkmark-done-circle' };
      case 'pending_documents':
        return { color: '#7C2D12', bg: '#FEF7FF', text: 'Documents Needed', icon: 'document-text-outline' };
      default:
        return { color: colors.textSecondary, bg: colors.surfaceSecondary, text: 'Unknown', icon: 'help-circle' };
    }
  };

  const filteredApplications = applications.filter(app => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return ['under_review', 'pending_payment', 'pending_documents'].includes(app.status);
    if (activeTab === 'completed') return ['approved', 'completed'].includes(app.status);
    if (activeTab === 'rejected') return app.status === 'rejected';
    return true;
  });

  const handleApplicationPress = (application) => {
    Alert.alert(
      application.title,
      `Status: ${application.status}\nTracking: ${application.trackingCode}\n\nTap 'View Details' for full information.`,
      [
        { text: 'View Details', onPress: () => {} },
        { text: 'Track Status', onPress: () => {} },
        { text: 'OK' }
      ]
    );
  };

  const handlePayment = (application) => {
    Alert.alert(
      'Payment Required',
      `Pay ${application.fee} for ${application.title}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Pay Now', onPress: () => Alert.alert('Success', 'Payment processed successfully') }
      ]
    );
  };

  const handleReapply = (application) => {
    Alert.alert(
      'Reapply',
      `Reapply for ${application.title}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Reapply', onPress: () => Alert.alert('Success', 'New application submitted') }
      ]
    );
  };

  const getTabCounts = () => {
    return {
      all: applications.length,
      pending: applications.filter(app => ['under_review', 'pending_payment', 'pending_documents'].includes(app.status)).length,
      completed: applications.filter(app => ['approved', 'completed'].includes(app.status)).length,
      rejected: applications.filter(app => app.status === 'rejected').length
    };
  };

  const tabCounts = getTabCounts();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDark ? "light" : "dark"} />
      
      <View style={{
        paddingTop: insets.top + 20,
        paddingHorizontal: 20,
        paddingBottom: insets.bottom + 20,
        flex: 1
      }}>
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
            My Applications
          </Text>
          
          <TouchableOpacity>
            <Ionicons name="add-circle-outline" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Summary Cards */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 12 }}
          contentContainerStyle={{ paddingRight: 20 }}
        >
          <View
          style={{
            backgroundColor: colors.cardBackground,
            borderRadius: 12,
            paddingVertical: 8,   // smaller vertical padding
            paddingHorizontal: 10, // smaller horizontal padding
            marginRight: 8,
            minWidth: 90,          // smaller width
            borderWidth: 1,
            borderColor: colors.border,
            alignSelf: "flex-start" // prevents stretching
          }}
        >
          <Text
            style={{
              fontFamily: "Inter_700Bold",
              fontSize: 16, // smaller text
              color: colors.primary,
              textAlign: "center"
            }}
          >
            {tabCounts.all}
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 11,
              color: colors.textSecondary,
              textAlign: "center",
              marginTop: 2
            }}
          >
            Total Applications
          </Text>
        </View>


                  <View
          style={{
            backgroundColor: colors.cardBackground,
            borderRadius: 12,        // match compact style
            paddingVertical: 8,      // smaller padding
            paddingHorizontal: 10,   // smaller padding
            marginRight: 8,
            minWidth: 90,            // slimmer card
            borderWidth: 1,
            borderColor: colors.border,
            alignSelf: "flex-start", // prevent stretch
          }}
        >
          <Text
            style={{
              fontFamily: "Inter_700Bold",
              fontSize: 16,          // smaller font
              color: "#D97706",
              textAlign: "center",
            }}
          >
            {tabCounts.pending}
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 11,          // smaller label
              color: colors.textSecondary,
              textAlign: "center",
              marginTop: 2,
            }}
          >
            In Progress
          </Text>
        </View>

        <View
          style={{
            backgroundColor: colors.cardBackground,
            borderRadius: 12,
            paddingVertical: 8,
            paddingHorizontal: 10,
            marginRight: 9,
            minWidth: 90,
            borderWidth: 1,
            borderColor: colors.border,
            alignSelf: "flex-start",
          }}
        >
          <Text
            style={{
              fontFamily: "Inter_700Bold",
              fontSize: 16,
              color: "#059669",
              textAlign: "center",
            }}
          >
            {tabCounts.completed}
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 11,
              color: colors.textSecondary,
              textAlign: "center",
              marginTop: 2,
            }}
          >
            Completed
          </Text>
        </View>

        </ScrollView>

        {/* Filter Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 12 }}
          contentContainerStyle={{ paddingRight: 20 }}
        >
         {[
          { id: "all", name: "All", count: tabCounts.all },
          { id: "pending", name: "Pending", count: tabCounts.pending },
          { id: "completed", name: "Completed", count: tabCounts.completed },
          { id: "rejected", name: "Rejected", count: tabCounts.rejected },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.id}
            onPress={() => setActiveTab(tab.id)}
            style={{
              backgroundColor: activeTab === tab.id ? "#059669" : "#333",
              borderRadius: 16,         // smaller curve so height feels shorter
              paddingVertical: 0,      // 🔑 no extra top/bottom padding
              paddingHorizontal: 10,
              marginRight: 6,
              height: 28,              // 🔑 fixed short height
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Inter_500Medium",
                fontSize: 12,          // slightly smaller text → keeps button short
                color: activeTab === tab.id ? "#fff" : "#ccc",
                marginRight: 4,
              }}
            >
              {tab.name}
            </Text>
            <View
              style={{
                backgroundColor: activeTab === tab.id ? "#047857" : "#444",
                borderRadius: 6,
                paddingHorizontal: 4,
                height: 16,             // 🔑 fixed small height for badge
                minWidth: 16,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 10,
                  color: activeTab === tab.id ? "#fff" : "#ccc",
                }}
              >
                {tab.count}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        </ScrollView>

        {/* Applications List */}
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {filteredApplications.length === 0 ? (
            <View style={{
              backgroundColor: colors.cardBackground,
              borderRadius: 16,
              padding: 40,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: colors.border
            }}>
              <Ionicons name="document-outline" size={48} color={colors.textSecondary} />
              <Text style={{
                fontFamily: 'Inter_600SemiBold',
                fontSize: 16,
                color: colors.text,
                marginTop: 16,
                marginBottom: 8
              }}>
                No Applications Found
              </Text>
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 14,
                color: colors.textSecondary,
                textAlign: 'center'
              }}>
                No applications match your current filter
              </Text>
            </View>
          ) : (
            filteredApplications.map((application) => {
              const statusConfig = getStatusConfig(application.status);
              
              return (
                <TouchableOpacity
                  key={application.id}
                  onPress={() => handleApplicationPress(application)}
                  style={{
                    backgroundColor: colors.cardBackground,
                    borderRadius: 16,
                    padding: 16,
                    marginBottom: 16,
                    borderWidth: 1,
                    borderColor: colors.border
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                    {/* Application Icon */}
                      <View style={{
                backgroundColor: colors.cardBackground,
                borderRadius: 12,
                padding: 6,                 // smaller padding
                marginRight: 8,
                width: 40,                  // fixed short width
                height: 40,                 // fixed short height
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: colors.border
              }}>
                <Ionicons name={application.icon} size={20} color={statusConfig.color} />
              </View>
                    {/* Application Info */}
                    <View style={{ flex: 1 }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                        <Text style={{
                          fontFamily: 'Inter_600SemiBold',
                          fontSize: 16,
                          color: colors.text,
                          flex: 1
                        }}>
                          {application.title}
                        </Text>
                        
                        <View style={{
                          backgroundColor: statusConfig.bg,
                          paddingHorizontal: 8,
                          paddingVertical: 4,
                          borderRadius: 12,
                          flexDirection: 'row',
                          alignItems: 'center'
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
                      </View>

                      <Text style={{
                        fontFamily: 'Inter_400Regular',
                        fontSize: 14,
                        color: colors.textSecondary,
                        marginBottom: 8
                      }}>
                        {application.description}
                      </Text>

                      <View style={{
                        backgroundColor: colors.surface,
                        borderRadius: 8,
                        padding: 12,
                        marginBottom: 12
                      }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                          <Text style={{
                            fontFamily: 'Inter_500Medium',
                            fontSize: 12,
                            color: colors.textSecondary
                          }}>
                            Tracking Code:
                          </Text>
                          <Text style={{
                            fontFamily: 'Inter_600SemiBold',
                            fontSize: 12,
                            color: colors.text
                          }}>
                            {application.trackingCode}
                          </Text>
                        </View>
                        
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                          <Text style={{
                            fontFamily: 'Inter_500Medium',
                            fontSize: 12,
                            color: colors.textSecondary
                          }}>
                            Fee:
                          </Text>
                          <Text style={{
                            fontFamily: 'Inter_600SemiBold',
                            fontSize: 12,
                            color: colors.primary
                          }}>
                            {application.fee}
                          </Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                          <Text style={{
                            fontFamily: 'Inter_500Medium',
                            fontSize: 12,
                            color: colors.textSecondary
                          }}>
                            Expected:
                          </Text>
                          <Text style={{
                            fontFamily: 'Inter_500Medium',
                            fontSize: 12,
                            color: colors.text
                          }}>
                            {application.estimatedCompletion}
                          </Text>
                        </View>
                      </View>

                      {/* Rejection Reason */}
                      {application.rejectionReason && (
                        <View style={{
                          backgroundColor: '#FEF2F2',
                          borderRadius: 8,
                          padding: 8,
                          marginBottom: 12,
                          borderLeftWidth: 3,
                          borderLeftColor: '#DC2626'
                        }}>
                          <Text style={{
                            fontFamily: 'Inter_500Medium',
                            fontSize: 11,
                            color: '#991B1B'
                          }}>
                            Rejection Reason: {application.rejectionReason}
                          </Text>
                        </View>
                      )}

                      {/* Action Buttons */}
                      <View style={{ flexDirection: 'row' }}>
                        {application.status === 'pending_payment' && (
                          <TouchableOpacity
                            onPress={() => handlePayment(application)}
                            style={{
                              backgroundColor: colors.primary,
                              borderRadius: 8,
                              paddingVertical: 8,
                              paddingHorizontal: 12,
                              marginRight: 8,
                              flexDirection: 'row',
                              alignItems: 'center'
                            }}
                          >
                            <Ionicons name="card-outline" size={14} color={colors.primaryText} style={{ marginRight: 4 }} />
                            <Text style={{
                              fontFamily: 'Inter_500Medium',
                              fontSize: 12,
                              color: colors.primaryText
                            }}>
                              Pay Now
                            </Text>
                          </TouchableOpacity>
                        )}

                        {application.status === 'rejected' && (
                          <TouchableOpacity
                            onPress={() => handleReapply(application)}
                            style={{
                              backgroundColor: colors.primary,
                              borderRadius: 8,
                              paddingVertical: 8,
                              paddingHorizontal: 12,
                              marginRight: 8,
                              flexDirection: 'row',
                              alignItems: 'center'
                            }}
                          >
                            <Ionicons name="refresh" size={14} color={colors.primaryText} style={{ marginRight: 4 }} />
                            <Text style={{
                              fontFamily: 'Inter_500Medium',
                              fontSize: 12,
                              color: colors.primaryText
                            }}>
                              Reapply
                            </Text>
                          </TouchableOpacity>
                        )}
                        
                        <TouchableOpacity
                          style={{
                            backgroundColor: colors.surface,
                            borderRadius: 8,
                            paddingVertical: 8,
                            paddingHorizontal: 12,
                            borderWidth: 1,
                            borderColor: colors.border,
                            flex: 1,
                            alignItems: 'center'
                          }}
                        >
                          <Text style={{
                            fontFamily: 'Inter_500Medium',
                            fontSize: 12,
                            color: colors.text
                          }}>
                            View Details
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          )}
        </ScrollView>
      </View>
    </View>
  );
}
