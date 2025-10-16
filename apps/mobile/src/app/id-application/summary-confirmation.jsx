import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, StatusBar } from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from "@/context/ThemeContext";

export default function SummaryConfirmationScreen() {
  const router = useRouter();
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams(); // Contains all form data and uploaded documents

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const { 
    idType, 
    idName, 
    applicationType, 
    reason, 
    firstName, 
    lastName, 
    selectedDocumentType,
    documentImages,
    documentDetails,
    reasonForLinking,
  } = params;

  const parsedDocumentImages = documentImages ? JSON.parse(documentImages) : {};
  const parsedDocumentDetails = documentDetails ? JSON.parse(documentDetails) : {};
  const parsedSelectedDocumentType = selectedDocumentType; // No need to parse, it's a string

  const getDocumentTypeLabel = (value) => {
    const docType = documentTypes.find(type => type.value === value);
    return docType ? docType.label : value;
  };

  const documentTypes = [
    { label: "Voter's Card", value: "voters_card" },
    { label: "National ID", value: "national_id" },
    { label: "Passport", value: "passport" },
    { label: "Driver's License", value: "drivers_license" },
    { label: "Health Card", value: "health_card" },
    { label: "Other", value: "other" },
  ];

  const getApplicationTypeDisplayName = (type) => {
    switch (type) {
      case 'new': return 'New Application';
      case 'renewal': return 'Renewal';
      case 'replace_lost_stolen': return 'Replace Lost/Stolen';
      case 'update_info': return 'Update Information';
      default: return 'Application';
    }
  };

  const getReasonDisplayName = (reasonId) => {
    switch (reasonId) {
      case 'expired': return 'Expired Document';
      case 'lost': return 'Lost Document';
      case 'stolen': return 'Stolen Document';
      case 'damaged': return 'Damaged Document';
      case 'update_info_renewal': return 'Update Info (Renewal)';
      case 'address_change': return 'Address Change';
      case 'marital_status_change': return 'Marital Status Change';
      case 'name_change': return 'Name Change';
      case 'other_info_change': return 'Other Info Change';
      default: return reasonId;
    }
  };

  const handleSubmitApplication = () => {
    Alert.alert(
      'Confirm Submission',
      'Are you sure you want to submit your application?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Submit', 
          onPress: () => {
            // In a real application, you would send all data to a backend API here
            console.log('Submitting application with data:', params);
            Alert.alert('Application Submitted', 'Your application has been submitted successfully!');
            router.push({
              pathname: '/id-application/application-status',
              params: {
                idType,
                idName,
                applicationType,
                reason,
                selectedDocumentType,
                documentDetails: JSON.stringify(parsedDocumentDetails),
                reasonForLinking,
              }
            });
          }
        }
      ]
    );
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: insets.top + 20,
          paddingHorizontal: 20,
          paddingBottom: insets.bottom + 100,
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
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>

          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 18,
            color: colors.text,
          }}>
            Summary & Confirmation
          </Text>

          <View style={{ width: 24 }} />
        </View>

        {/* Application Details Summary */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Application Details</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>ID Type:</Text>
            <Text style={styles.detailValue}>{idName}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Application Type:</Text>
            <Text style={styles.detailValue}>{getApplicationTypeDisplayName(applicationType)}</Text>
          </View>
          {reason && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Reason:</Text>
              <Text style={styles.detailValue}>{getReasonDisplayName(reason)}</Text>
            </View>
          )}
        </View>

        {/* Personal Information Summary */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Full Name:</Text>
            <Text style={styles.detailValue}>
              {parsedDocumentDetails.fullName || `${firstName || ''} ${lastName || ''}`}
            </Text>
          </View>
          {/* Add more personal info fields here */}
        </View>

        {/* Document Summary */}
        {parsedSelectedDocumentType && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Document Summary</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Document Type:</Text>
              <Text style={styles.detailValue}>{getDocumentTypeLabel(parsedSelectedDocumentType)}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Front Image:</Text>
              <Text style={styles.detailValue}>{parsedDocumentImages.front ? 'Uploaded' : 'Not Uploaded'}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Back Image:</Text>
              <Text style={styles.detailValue}>{parsedDocumentImages.back ? 'Uploaded' : 'Not Uploaded'}</Text>
            </View>
            {Object.keys(parsedDocumentDetails).length > 0 && (
              <View style={{ marginTop: 10 }}>
                <Text style={styles.detailLabel}>Basic Document Info:</Text>
                {Object.entries(parsedDocumentDetails).map(([key, value]) => (
                  <View key={key} style={styles.detailRow}>
                    <Text style={styles.detailLabel}>  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</Text>
                    <Text style={styles.detailValue}>{value}</Text>
                  </View>
                ))}
              </View>
            )}
            {reasonForLinking && (
              <View style={{ marginTop: 10 }}>
                <Text style={styles.detailLabel}>Reason for Linking/Replacement:</Text>
                <Text style={styles.detailValue}>{reasonForLinking}</Text>
              </View>
            )}
          </View>
        )}

        {/* Important Notice */}
        <View style={{
          backgroundColor: '#FEF3C7',
          borderRadius: 16,
          padding: 20,
          borderLeftWidth: 4,
          borderLeftColor: '#F59E0B',
          marginTop: 24,
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 12,
          }}>
            <Ionicons name="warning" size={20} color="#D97706" />
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 16,
              color: '#D97706',
              marginLeft: 8,
            }}>
              Final Check
            </Text>
          </View>

          <Text style={{
            fontFamily: 'Inter_400Regular',
            fontSize: 14,
            color: '#92400E',
            lineHeight: 20,
          }}>
            Please review all the information carefully before submitting. Once submitted, changes may not be possible.
          </Text>
        </View>
      </ScrollView>

      {/* Fixed Bottom Button */}
      <View style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.background,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: insets.bottom + 16,
      }}>
        <TouchableOpacity
          onPress={handleSubmitApplication}
          style={{
            backgroundColor: colors.primary,
            borderRadius: 16,
            paddingVertical: 16,
            alignItems: 'center',
          }}
        >
          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 16,
            color: colors.primaryText,
          }}>
            Confirm & Submit Application
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    color: '#aaa',
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
  detailValue: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    flexShrink: 1,
    textAlign: 'right',
  },
  documentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  documentText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 8,
    fontFamily: 'Inter_400Regular',
  },
  noDocumentsText: {
    color: '#aaa',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    fontStyle: 'italic',
  },
});
