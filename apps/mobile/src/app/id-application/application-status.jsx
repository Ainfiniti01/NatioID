import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, Share } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from "@/context/ThemeContext";

export default function ApplicationStatusScreen() {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const { 
    idType, 
    idName, 
    applicationType, 
    renewalReason, 
    applicationId,
    selectedDocumentType,
    documentDetails,
    reasonForLinking,
  } = useLocalSearchParams();
  const [applicationStatus, setApplicationStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  const parsedDocumentDetails = documentDetails ? JSON.parse(documentDetails) : {};

  const documentTypes = [
    { label: "Voter's Card", value: "voters_card" },
    { label: "National ID", value: "national_id" },
    { label: "Passport", value: "passport" },
    { label: "Driver's License", value: "drivers_license" },
    { label: "Health Card", value: "health_card" },
    { label: "Other", value: "other" },
  ];

  const getDocumentTypeLabel = (value) => {
    const docType = documentTypes.find(type => type.value === value);
    return docType ? docType.label : value;
  };

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    fetchApplicationStatus();
  }, [applicationId]); // Re-fetch when applicationId changes

  const fetchApplicationStatus = async () => {
    setLoading(true);
    // Dummy API call - simulate fetching based on applicationId
    setTimeout(() => {
      let statusData;
      if (applicationId === '1') { // Success application from track.jsx dummy data
        statusData = {
          id: applicationId,
          status: 'approved',
          submittedDate: '2023-01-15T08:00:00Z',
          expectedCompletionDate: '2023-01-29T08:00:00Z',
          trackingSteps: [
            {
              id: 1,
              title: 'Application Submitted',
              description: 'Your application has been successfully submitted',
              status: 'completed',
              date: '2023-01-15T08:00:00Z',
              icon: 'checkmark-circle'
            },
            {
              id: 2,
              title: 'Document Verification',
              description: 'Documents verified and approved',
              status: 'completed',
              date: '2023-01-17T10:00:00Z',
              icon: 'document-text-outline'
            },
            {
              id: 3,
              title: 'Background Check',
              description: 'Verification against national databases completed',
              status: 'completed',
              date: '2023-01-20T14:00:00Z',
              icon: 'shield-outline'
            },
            {
              id: 4,
              title: 'Admin Approval',
              description: 'Final review and approval by authorized admin completed',
              status: 'completed',
              date: '2023-01-22T16:00:00Z',
              icon: 'person-outline'
            },
            {
              id: 5,
              title: 'Document Production',
              description: 'Your ID document has been produced',
              status: 'completed',
              date: '2023-01-25T09:00:00Z',
              icon: 'construct-outline'
            },
            {
              id: 6,
              title: 'Ready for Collection',
              description: 'Your document is ready for pickup or delivery',
              status: 'completed',
              date: '2023-01-27T11:00:00Z',
              icon: 'gift-outline'
            }
          ],
          estimatedProcessingTime: '14-21 business days',
          applicationDetails: {
            type: applicationType,
            reason: renewalReason,
            idType: selectedDocumentType || idType,
            idName: getDocumentTypeLabel(selectedDocumentType) || idName || 'National ID',
            submissionMethod: 'Digital Application',
            fees: 'Free',
            documentDetails: parsedDocumentDetails,
            reasonForLinking: reasonForLinking,
          },
          linkedDocumentUrl: '/printable-id-preview' // Dummy URL for linked document
        };
      } else if (applicationId === '3') { // Rejected application from track.jsx dummy data
        statusData = {
          id: applicationId,
          status: 'rejected',
          submittedDate: '2023-03-10T10:00:00Z',
          expectedCompletionDate: '2023-03-24T10:00:00Z',
          trackingSteps: [
            {
              id: 1,
              title: 'Application Submitted',
              description: 'Your application has been successfully submitted',
              status: 'completed',
              date: '2023-03-10T10:00:00Z',
              icon: 'checkmark-circle'
            },
            {
              id: 2,
              title: 'Document Verification',
              description: 'Documents were incomplete or invalid',
              status: 'rejected',
              date: '2023-03-12T11:30:00Z',
              icon: 'close-circle'
            },
            {
              id: 3,
              title: 'Background Check',
              description: 'Verification against national databases',
              status: 'pending',
              date: null,
              icon: 'shield-outline',
              estimatedDays: '3-5 days'
            },
            {
              id: 4,
              title: 'Admin Approval',
              description: 'Final review and approval by authorized admin',
              status: 'pending',
              date: null,
              icon: 'person-outline',
              estimatedDays: '2-3 days'
            },
            {
              id: 5,
              title: 'Document Production',
              description: 'Your ID document is being produced',
              status: 'pending',
              date: null,
              icon: 'construct-outline',
              estimatedDays: '5-7 days'
            },
            {
              id: 6,
              title: 'Ready for Collection',
              description: 'Your document is ready for pickup or delivery',
              status: 'pending',
              date: null,
              icon: 'gift-outline',
              estimatedDays: 'Notification sent'
            }
          ],
          estimatedProcessingTime: '14-21 business days',
          applicationDetails: {
            type: applicationType,
            reason: renewalReason,
            idType: selectedDocumentType || idType,
            idName: getDocumentTypeLabel(selectedDocumentType) || idName || 'Driver’s License',
            submissionMethod: 'Digital Application',
            fees: '$6,500',
            documentDetails: parsedDocumentDetails,
            reasonForLinking: reasonForLinking,
            rejectionReason: 'Incomplete documents provided. Please upload missing information.'
          }
        };
      } else if (applicationId === '4') { // Needs More Info application
        statusData = {
          id: applicationId,
          status: 'needs_more_info',
          submittedDate: '2023-04-01T09:00:00Z',
          expectedCompletionDate: '2023-04-15T09:00:00Z',
          trackingSteps: [
            {
              id: 1,
              title: 'Application Submitted',
              description: 'Your application has been successfully submitted',
              status: 'completed',
              date: '2023-04-01T09:00:00Z',
              icon: 'checkmark-circle'
            },
            {
              id: 2,
              title: 'Document Verification',
              description: 'Additional proof of address required',
              status: 'needs_more_info',
              date: '2023-04-03T14:00:00Z',
              icon: 'alert-circle'
            },
            {
              id: 3,
              title: 'Background Check',
              description: 'Verification against national databases',
              status: 'pending',
              date: null,
              icon: 'shield-outline',
              estimatedDays: '3-5 days'
            },
            {
              id: 4,
              title: 'Admin Approval',
              description: 'Final review and approval by authorized admin',
              status: 'pending',
              date: null,
              icon: 'person-outline',
              estimatedDays: '2-3 days'
            },
            {
              id: 5,
              title: 'Document Production',
              description: 'Your ID document is being produced',
              status: 'pending',
              date: null,
              icon: 'construct-outline',
              estimatedDays: '5-7 days'
            },
            {
              id: 6,
              title: 'Ready for Collection',
              description: 'Your document is ready for pickup or delivery',
              status: 'pending',
              date: null,
              icon: 'gift-outline',
              estimatedDays: 'Notification sent'
            }
          ],
          estimatedProcessingTime: '14-21 business days',
          applicationDetails: {
            type: applicationType,
            reason: renewalReason,
            idType: selectedDocumentType || idType,
            idName: getDocumentTypeLabel(selectedDocumentType) || idName || 'Passport',
            submissionMethod: 'Digital Application',
            fees: '$25,000',
            documentDetails: parsedDocumentDetails,
            reasonForLinking: reasonForLinking,
            additionalInfoRequired: 'Please upload a recent utility bill or bank statement as proof of address.'
          }
        };
      } else { // Default pending/in-progress application
        statusData = {
          id: applicationId,
          status: 'in_progress', // Default to in_progress for other IDs
          submittedDate: new Date().toISOString(),
          expectedCompletionDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
          trackingSteps: [
            {
              id: 1,
              title: 'Application Submitted',
              description: 'Your application has been successfully submitted',
              status: 'completed',
              date: new Date().toISOString(),
              icon: 'checkmark-circle'
            },
            {
              id: 2,
              title: 'Document Verification',
              description: 'Documents are being verified by our team',
              status: 'in_progress',
              date: null,
              icon: 'document-text-outline',
              estimatedDays: '1-3 days'
            },
            {
              id: 3,
              title: 'Background Check',
              description: 'Verification against national databases',
              status: 'pending',
              date: null,
              icon: 'shield-outline',
              estimatedDays: '3-5 days'
            },
            {
              id: 4,
              title: 'Admin Approval',
              description: 'Final review and approval by authorized admin',
              status: 'pending',
              date: null,
              icon: 'person-outline',
              estimatedDays: '2-3 days'
            },
            {
              id: 5,
              title: 'Document Production',
              description: 'Your ID document is being produced',
              status: 'pending',
              date: null,
              icon: 'construct-outline',
              estimatedDays: '5-7 days'
            },
            {
              id: 6,
              title: 'Ready for Collection',
              description: 'Your document is ready for pickup or delivery',
              status: 'pending',
              date: null,
              icon: 'gift-outline',
              estimatedDays: 'Notification sent'
            }
          ],
          estimatedProcessingTime: '14-21 business days',
          applicationDetails: {
            type: applicationType,
            reason: renewalReason,
            idType: selectedDocumentType || idType, // Use selectedDocumentType if available
            idName: getDocumentTypeLabel(selectedDocumentType) || idName, // Use label for selectedDocumentType
            submissionMethod: 'Digital Application',
            fees: applicationType === 'new' ? 
              (idType === 'voters_card' ? 'Free' : 
               idType === 'citizen_id' ? '$3,000' :
               idType === 'drivers_license' ? '$6,500' :
               idType === 'passport' ? '$25,000' : '$2,000') :
              '$1,500 (Renewal Fee)',
            documentDetails: parsedDocumentDetails,
            reasonForLinking: reasonForLinking,
          }
        };
      }
      setApplicationStatus(statusData);
      setLoading(false);
    }, 1500);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#10B981';
      case 'in_progress': return '#F59E0B';
      case 'pending': return '#6B7280';
      case 'rejected': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'checkmark-circle';
      case 'in_progress': return 'sync-outline';
      case 'pending': return 'time-outline';
      case 'rejected': return 'close-circle';
      default: return 'time-outline';
    }
  };

  const shareApplicationDetails = async () => {
    try {
      const result = await Share.share({
        message: `My ${applicationStatus.applicationDetails.idName} application status:\n\nApplication ID: ${applicationStatus.id}\nStatus: ${applicationStatus.status.toUpperCase()}\nSubmitted: ${new Date(applicationStatus.submittedDate).toLocaleDateString()}\nExpected Completion: ${new Date(applicationStatus.expectedCompletionDate).toLocaleDateString()}\n\nTrack your application at: https://natioid.gov.ng/track`,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share application details.');
    }
  };

  const handleTrackAnother = () => {
    Alert.alert(
      'Track Another Application',
      'Enter your application ID to track a different application:',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => router.push('/id-application/track') }
      ]
    );
  };

  if (!fontsLoaded) {
    return null;
  }

  if (loading) {
    return (
      <View style={{ 
        flex: 1, 
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Text style={{
          fontFamily: 'Inter_400Regular',
          fontSize: 16,
          color: colors.textSecondary,
        }}>
          Loading application status...
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
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
          marginBottom: 24,
        }}>
          <TouchableOpacity onPress={() => router.replace('/(tabs)/dashboard')}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>

          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 18,
            color: colors.text,
          }}>
            Application Status
          </Text>

          <TouchableOpacity onPress={shareApplicationDetails}>
            <Ionicons name="share-outline" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Status Banners */}
        {applicationStatus.status === 'approved' && (
          <View style={{
            backgroundColor: '#ECFDF5',
            borderRadius: 16,
            padding: 24,
            marginBottom: 24,
            alignItems: 'center',
            borderLeftWidth: 4,
            borderLeftColor: '#10B981',
          }}>
            <View style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              backgroundColor: '#10B981',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
            }}>
              <Ionicons name="checkmark" size={32} color="white" />
            </View>
            
            <Text style={{
              fontFamily: 'Inter_700Bold',
              fontSize: 20,
              color: '#065F46',
              textAlign: 'center',
              marginBottom: 8,
            }}>
              Application Approved!
            </Text>
            
            <Text style={{
              fontFamily: 'Inter_400Regular',
              fontSize: 14,
              color: '#047857',
              textAlign: 'center',
            }}>
              Your {applicationStatus.applicationDetails.idName} application has been successfully approved.
            </Text>
          </View>
        )}

        {applicationStatus.status === 'in_progress' && (
          <View style={{
            backgroundColor: '#FEF3C7',
            borderRadius: 16,
            padding: 24,
            marginBottom: 24,
            alignItems: 'center',
            borderLeftWidth: 4,
            borderLeftColor: '#F59E0B',
          }}>
            <View style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              backgroundColor: '#F59E0B',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
            }}>
              <Ionicons name="hourglass-outline" size={32} color="white" />
            </View>
            
            <Text style={{
              fontFamily: 'Inter_700Bold',
              fontSize: 20,
              color: '#92400E',
              textAlign: 'center',
              marginBottom: 8,
            }}>
              Application in Progress
            </Text>
            
            <Text style={{
              fontFamily: 'Inter_400Regular',
              fontSize: 14,
              color: '#78350F',
              textAlign: 'center',
            }}>
              Your {applicationStatus.applicationDetails.idName} application is currently being processed.
            </Text>
          </View>
        )}

        {applicationStatus.status === 'rejected' && (
          <View style={{
            backgroundColor: '#FEE2E2',
            borderRadius: 16,
            padding: 24,
            marginBottom: 24,
            alignItems: 'center',
            borderLeftWidth: 4,
            borderLeftColor: '#EF4444',
          }}>
            <View style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              backgroundColor: '#EF4444',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
            }}>
              <Ionicons name="close-circle-outline" size={32} color="white" />
            </View>
            
            <Text style={{
              fontFamily: 'Inter_700Bold',
              fontSize: 20,
              color: '#92400E',
              textAlign: 'center',
              marginBottom: 8,
            }}>
              Application Rejected
            </Text>
            
            <Text style={{
              fontFamily: 'Inter_400Regular',
              fontSize: 14,
              color: '#7F1D1D',
              textAlign: 'center',
            }}>
               Reason: {applicationStatus.applicationDetails.rejectionReason}
            </Text>
          </View>
        )}

        {applicationStatus.status === 'needs_more_info' && applicationStatus.applicationDetails.additionalInfoRequired && (
          <View style={{
            backgroundColor: '#FEF3C7',
            borderRadius: 16,
            padding: 24,
            marginBottom: 24,
            alignItems: 'center',
            borderLeftWidth: 4,
            borderLeftColor: '#F59E0B',
          }}>
            <View style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              backgroundColor: '#92400E',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
            }}>
              <Ionicons name="information-circle-outline" size={32} color="white" />
            </View>
            
            <Text style={{
              fontFamily: 'Inter_700Bold',
              fontSize: 20,
              color: '#92400E',
              textAlign: 'center',
              marginBottom: 8,
            }}>
              Additional Information Required
            </Text>
            
            <Text style={{
              fontFamily: 'Inter_400Regular',
              fontSize: 14,
              color: '#78350F',
              textAlign: 'center',
            }}>
               {applicationStatus.applicationDetails.additionalInfoRequired}
            </Text>
          </View>
        )}

        {/* Application Details */}
        <View style={{
          backgroundColor: colors.cardBackground,
          borderRadius: 16,
          padding: 20,
          marginBottom: 24,
        }}>
          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 18,
            color: colors.text,
            marginBottom: 16,
          }}>
            Application Details
          </Text>

          <View style={{ gap: 12 }}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 14,
                color: colors.textSecondary,
              }}>
                Application ID
              </Text>
              <Text style={{
                fontFamily: 'Inter_600SemiBold',
                fontSize: 14,
                color: colors.primary,
              }}>
                {applicationStatus.id}
              </Text>
            </View>

            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 14,
                color: colors.textSecondary,
              }}>
                Document Type
              </Text>
              <Text style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 14,
                color: colors.text,
              }}>
                {applicationStatus.applicationDetails.idName}
              </Text>
            </View>

            {applicationStatus.applicationDetails.documentDetails && Object.keys(applicationStatus.applicationDetails.documentDetails).length > 0 && (
              <View style={{ marginTop: 10 }}>
                <Text style={{
                  fontFamily: 'Inter_600SemiBold',
                  fontSize: 16,
                  color: colors.text,
                  marginBottom: 8,
                }}>
                  Document Details:
                </Text>
                {Object.entries(applicationStatus.applicationDetails.documentDetails).map(([key, value]) => (
                  <View key={key} style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 4,
                  }}>
                    <Text style={{
                      fontFamily: 'Inter_400Regular',
                      fontSize: 14,
                      color: colors.textSecondary,
                      marginLeft: 8,
                    }}>
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
                    </Text>
                    <Text style={{
                      fontFamily: 'Inter_500Medium',
                      fontSize: 14,
                      color: colors.text,
                    }}>
                      {value}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {applicationStatus.applicationDetails.reasonForLinking && (
              <View style={{ marginTop: 10 }}>
                <Text style={{
                  fontFamily: 'Inter_600SemiBold',
                  fontSize: 16,
                  color: colors.text,
                  marginBottom: 8,
                }}>
                  Reason for Linking/Replacement:
                </Text>
                <Text style={{
                  fontFamily: 'Inter_400Regular',
                  fontSize: 14,
                  color: colors.text,
                  lineHeight: 20,
                }}>
                  {applicationStatus.applicationDetails.reasonForLinking}
                </Text>
              </View>
            )}

            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 14,
                color: colors.textSecondary,
              }}>
                Application Type
              </Text>
              <Text style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 14,
                color: colors.text,
              }}>
                {applicationStatus.applicationDetails.type === 'new' ? 'New Application' : 'Renewal'}
                {applicationStatus.applicationDetails.reason && 
                  ` (${applicationStatus.applicationDetails.reason.charAt(0).toUpperCase() + applicationStatus.applicationDetails.reason.slice(1)})`
                }
              </Text>
            </View>

            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 14,
                color: colors.textSecondary,
              }}>
                Submitted Date
              </Text>
              <Text style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 14,
                color: colors.text,
              }}>
                {new Date(applicationStatus.submittedDate).toLocaleDateString()}
              </Text>
            </View>

            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 14,
                color: colors.textSecondary,
              }}>
                Expected Completion
              </Text>
              <Text style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 14,
                color: colors.text,
              }}>
                {new Date(applicationStatus.expectedCompletionDate).toLocaleDateString()}
              </Text>
            </View>

            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 14,
                color: colors.textSecondary,
              }}>
                Processing Fee
              </Text>
              <Text style={{
                fontFamily: 'Inter_600SemiBold',
                fontSize: 14,
                color: applicationStatus.applicationDetails.fees === 'Free' ? '#10B981' : colors.text,
              }}>
                {applicationStatus.applicationDetails.fees}
              </Text>
            </View>
          </View>
        </View>

        {/* Tracking Progress */}
        <View style={{
          backgroundColor: colors.cardBackground,
          borderRadius: 16,
          padding: 20,
          marginBottom: 24,
        }}>
          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 18,
            color: colors.text,
            marginBottom: 16,
          }}>
            Processing Status
          </Text>

          <View style={{ gap: 20 }}>
            {applicationStatus.trackingSteps.map((step, index) => {
              const isLast = index === applicationStatus.trackingSteps.length - 1;
              const statusColor = getStatusColor(step.status);
              
              return (
                <View key={step.id} style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                }}>
                  <View style={{
                    alignItems: 'center',
                    marginRight: 16,
                  }}>
                    <View style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: statusColor + '20',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 8,
                    }}>
                      <Ionicons 
                        name={step.status === 'in_progress' ? 'sync-outline' : step.icon} 
                        size={20} 
                        color={statusColor} 
                      />
                    </View>
                    
                    {!isLast && (
                      <View style={{
                        width: 2,
                        height: 40,
                        backgroundColor: step.status === 'completed' ? statusColor : colors.border,
                      }} />
                    )}
                  </View>

                  <View style={{ flex: 1 }}>
                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 4,
                    }}>
                      <Text style={{
                        fontFamily: 'Inter_600SemiBold',
                        fontSize: 16,
                        color: colors.text,
                      }}>
                        {step.title}
                      </Text>
                      
                      <View style={{
                        backgroundColor: statusColor + '20',
                        borderRadius: 8,
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                      }}>
                        <Text style={{
                          fontFamily: 'Inter_500Medium',
                          fontSize: 10,
                          color: statusColor,
                        }}>
                          {step.status.toUpperCase().replace('_', ' ')}
                        </Text>
                      </View>
                    </View>

                    <Text style={{
                      fontFamily: 'Inter_400Regular',
                      fontSize: 14,
                      color: colors.textSecondary,
                      marginBottom: 8,
                      lineHeight: 20,
                    }}>
                      {step.description}
                    </Text>

                    {step.date && (
                      <Text style={{
                        fontFamily: 'Inter_400Regular',
                        fontSize: 12,
                        color: colors.textSecondary,
                      }}>
                        Completed: {new Date(step.date).toLocaleDateString()} at {new Date(step.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </Text>
                    )}

                    {step.estimatedDays && step.status !== 'completed' && (
                      <Text style={{
                        fontFamily: 'Inter_400Regular',
                        fontSize: 12,
                        color: '#F59E0B',
                      }}>
                        Estimated: {step.estimatedDays}
                      </Text>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Important Information */}
        <View style={{
          backgroundColor: '#FEF3C7',
          borderRadius: 16,
          padding: 20,
          marginBottom: 24,
          borderLeftWidth: 4,
          borderLeftColor: '#F59E0B',
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 12,
          }}>
            <Ionicons name="information-circle" size={20} color="#D97706" />
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 16,
              color: '#D97706',
              marginLeft: 8,
            }}>
              Important Information
            </Text>
          </View>

          <View style={{ gap: 8 }}>
            <Text style={{
              fontFamily: 'Inter_400Regular',
              fontSize: 14,
              color: '#92400E',
              lineHeight: 20,
            }}>
              • Keep your application ID safe for tracking purposes
            </Text>
            <Text style={{
              fontFamily: 'Inter_400Regular',
              fontSize: 14,
              color: '#92400E',
              lineHeight: 20,
            }}>
              • You will receive SMS/email notifications at each stage
            </Text>
            <Text style={{
              fontFamily: 'Inter_400Regular',
              fontSize: 14,
              color: '#92400E',
              lineHeight: 20,
            }}>
              • Processing times may vary during peak periods
            </Text>
            <Text style={{
              fontFamily: 'Inter_400Regular',
              fontSize: 14,
              color: '#92400E',
              lineHeight: 20,
            }}>
              • Contact support if no update after expected completion date
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={{ gap: 12 }}>
          {(applicationStatus.status === 'rejected' || applicationStatus.status === 'needs_more_info') && (
            <TouchableOpacity
              onPress={() => router.push('/id-application/document-upload')}
              style={{
                backgroundColor: colors.primary,
                borderRadius: 16,
                paddingVertical: 16,
                alignItems: 'center',
                marginBottom: 12,
              }}
            >
              <Text style={{
                fontFamily: 'Inter_600SemiBold',
                fontSize: 16,
                color: colors.primaryText,
              }}>
                Submit Additional Info
              </Text>
            </TouchableOpacity>
          )}

          {/* {applicationStatus.status === 'approved' && (
            <TouchableOpacity
              onPress={() => router.push('/id-application/summary-confirmation')}
              style={{
                backgroundColor: colors.primary,
                borderRadius: 16,
                paddingVertical: 16,
                alignItems: 'center',
                marginBottom: 12,
              }}
            >
              <Text style={{
                fontFamily: 'Inter_600SemiBold',
                fontSize: 16,
                color: colors.primaryText,
              }}>
                View Application Summary
              </Text>
            </TouchableOpacity>
          )} */}

          {applicationStatus.status === 'approved' && applicationStatus.linkedDocumentUrl && (
            <TouchableOpacity
              onPress={() => router.push('/linked-documents')}
              style={{
                backgroundColor: colors.primary,
                borderRadius: 16,
                paddingVertical: 16,
                alignItems: 'center',
                marginBottom: 12,
              }}
            >
              <Text style={{
                fontFamily: 'Inter_600SemiBold',
                fontSize: 16,
                color: colors.primaryText,
              }}>
                View Linked Document
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => router.push('/(tabs)/dashboard')}
            style={{
              backgroundColor: colors.surfaceSecondary,
              borderRadius: 16,
              paddingVertical: 16,
              alignItems: 'center',
            }}
          >
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 16,
              color: colors.text,
            }}>
              Back to Dashboard
            </Text>
          </TouchableOpacity>

          <View style={{
            flexDirection: 'row',
            gap: 12,
          }}>
            <TouchableOpacity
              onPress={handleTrackAnother}
              style={{
                flex: 1,
                backgroundColor: colors.surfaceSecondary,
                borderRadius: 12,
                paddingVertical: 14,
                alignItems: 'center',
              }}
            >
              <Text style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 14,
                color: colors.text,
              }}>
                Track Another
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push('/help')}
              style={{
                flex: 1,
                backgroundColor: colors.surfaceSecondary,
                borderRadius: 12,
                paddingVertical: 14,
                alignItems: 'center',
              }}
            >
              <Text style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 14,
                color: colors.text,
              }}>
                Get Help
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
