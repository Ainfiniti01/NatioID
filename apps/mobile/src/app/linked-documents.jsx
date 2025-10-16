import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from "@/context/ThemeContext";
import DocumentNotFound from './document-not-found'; // Import the DocumentNotFound component
import DocumentCard from '../components/DocumentCard'; // Import DocumentCard
import IDPreviewModal from '../components/IDPreviewModal'; // Import IDPreviewModal

const initialDocuments = [
  {
    id: '1',
    type: 'National ID Card',
    number: 'NIN12345678901',
    status: 'active',
    issueDate: '2020-03-15',
    expiryDate: 'Permanent',
    issuer: 'National Identity Authority',
    icon: 'card-outline',
    color: '#059669',
    eligible: true,
    details: {
      'Full Name': 'John Doe',
      'Photograph': 'N/A',
      'Date of Birth': '1990-05-20',
      'Gender': 'Male',
      'National ID or Citizen ID': 'ID12345678901',
      'Address': '123 Main St, Anytown, USA',
      'Nationality': 'Citizen of Country X',
      'Signature / Thumbprint': 'N/A',
      'Issue Date': '2020-03-15',
      'Expiry Date': 'Permanent',
    }
  },
  {
    id: '2',
    type: 'International Passport',
    number: 'A50123456',
    status: 'active',
    issueDate: '2022-01-10',
    expiryDate: '2027-01-10',
    issuer: 'National Immigration Authority',
    icon: 'airplane-outline',
    color: '#DC2626',
    eligible: true,
    details: {
      'Passport Number': 'A50123456',
      'Photograph': 'N/A',
      'Full Name': 'John Doe',
      'Date of Birth': '1990-05-20',
      'Gender': 'Male',
      'Place of Birth': 'City, Country X',
      'Nationality': 'Citizen of Country X',
      'Date of Issue': '2022-01-10',
      'Date of Expiry': '2027-01-10',
      'Issuing Authority': 'National Immigration Authority',
      'Signature': 'N/A',
      'Machine-Readable Zone (MRZ)': 'N/A',
    }
  },
  {
    id: '3',
    type: "Driver's License",
    number: 'DL-LAG-987654',
    status: 'expired',
    issueDate: '2019-06-20',
    expiryDate: '2024-06-20',
    issuer: 'National Road Safety Authority',
    icon: 'car-outline',
    color: '#7C2D12',
    eligible: false,
    details: {
      'Full Name': 'John Doe',
      'Photograph': 'N/A',
      'Date of Birth': '1990-05-20',
      'Gender': 'Male',
      'Licence Number': 'DL-LAG-987654',
      'Address': '123 Main St, Anytown, USA',
      'Class of Vehicle(s) Permitted': 'All',
      'Issue Date': '2019-06-20',
      'Expiry Date': '2024-06-20',
      'Signature': 'N/A',
      'Security Features': 'Hologram, Barcode',
    }
  },
  {
    id: '4',
    type: 'Health Insurance Card',
    number: 'NHIA-JD-12345',
    status: 'pending',
    issueDate: '2024-01-15',
    expiryDate: '2025-12-31',
    issuer: 'National Health Insurance Authority (NHIA)',
    icon: 'pulse-outline',
    color: '#14B8A6',
    eligible: true,
    details: {
      'Full Name': 'John Doe',
      'Photograph': 'N/A',
      'Date of Birth': '1990-05-20',
      'Gender': 'Male',
      'Health Insurance Number': 'NHIA-JD-12345',
      'Insurance Provider Name': 'NHIA',
      'Coverage Type': 'Comprehensive Plan',
      'Expiry Date': '2025-12-31',
      'Emergency Contact': 'Jane Doe - 08012345678',
    }
  },
  {
    id: '5',
    type: 'Birth Certificate',
    number: 'BC-2024-001234',
    status: 'active',
    issueDate: '2024-01-15',
    expiryDate: 'Permanent',
    issuer: 'National Statistics Office',
    icon: 'document-text-outline',
    color: '#EA580C',
    eligible: true,
    details: {
      'Full Name of Child': 'Baby Doe',
      'Date of Birth': '2024-01-15',
      'Place of Birth': 'City, Country X',
      'Gender': 'Male',
      'Names of Parents': 'John Doe, Jane Doe',
      'Nationality': 'Citizen of Country X',
      'Registration Number': 'BC-2024-001234',
      'Date of Registration': '2024-01-15',
      'Signature/Seal of Registrar': 'N/A',
    }
  },
  {
    id: '6',
    type: "Voter's Card",
    number: 'VIN98765432101',
    status: 'active',
    issueDate: '2021-11-05',
    expiryDate: 'Permanent',
    issuer: 'National Electoral Commission',
    icon: 'person-outline',
    color: '#059669',
    eligible: true,
    details: {
      'Full Name': 'John Doe',
      'Photograph': 'N/A',
      'Date of Birth / Age': '1990-05-20 (34)',
      'Gender': 'Male',
      'Address / Polling Unit': '123 Main St, Polling Unit 001',
      'Voter Identification Number (VIN)': 'VIN98765432101',
      'Issue Date': '2021-11-05',
      'Expiry Date': 'Permanent',
      'Signature / Thumbprint': 'N/A',
    }
  },
  {
    id: '7',
    type: 'Student ID Card',
    number: 'SU-2023-001',
    status: 'active',
    issueDate: '2023-09-01',
    expiryDate: '2027-08-31',
    issuer: 'University of Country X',
    icon: 'school-outline',
    color: '#1E3A8A',
    eligible: true,
    details: {
      'Name': 'John Doe',
      'Photo': 'N/A',
      'Student Number': 'SU-2023-001',
      'Department': 'Computer Science',
      'Validity Period': '2023-2027',
    }
  },
  {
    id: '8',
    type: 'Work ID / Staff ID',
    number: 'EMP-JD-5678',
    status: 'active',
    issueDate: '2021-02-01',
    expiryDate: 'Permanent',
    issuer: 'Global Solutions Inc.',
    icon: 'briefcase-outline',
    color: '#A16207',
    eligible: true,
    details: {
      'Name': 'John Doe',
      'Photo': 'N/A',
      'Employee ID': 'EMP-JD-5678',
      'Department': 'Software Engineering',
      'Position': 'Senior Developer',
      'Employer Logo': 'N/A',
    }
  },
  {
    id: '9',
    type: 'Residence Permit',
    number: 'RP-NG-98765',
    status: 'active',
    issueDate: '2023-07-01',
    expiryDate: '2028-06-30',
    issuer: 'National Immigration Authority',
    icon: 'home-outline',
    color: '#2563EB',
    eligible: true,
    details: {
      'Name': 'John Doe',
      'Photo': 'N/A',
      'Nationality': 'Citizen of Country Y',
      'Permit Number': 'RP-NG-98765',
      'Expiry Date': '2028-06-30',
      'Visa/Residence Status': 'Work Permit',
    }
  }
];

export { initialDocuments as documents }; // Export the documents array

export default function LinkedDocumentsScreen() {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const { mode } = useLocalSearchParams(); // Get mode from route params: 'readonly', 'print', 'service'

  const [documents, setDocuments] = useState(initialDocuments);

  const [isDocumentNotFoundModalVisible, setIsDocumentNotFoundModalVisible] = useState(false);
  const [documentNotFoundMessage, setDocumentNotFoundMessage] = useState('');
  const [isIDPreviewModalVisible, setIsIDPreviewModalVisible] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

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
      case 'active':
        return { color: '#059669', bg: '#ECFDF5', text: 'Active' };
      case 'expired':
        return { color: '#DC2626', bg: '#FEF2F2', text: 'Expired' };
      case 'pending':
        return { color: '#D97706', bg: '#FFFBEB', text: 'Pending' };
      case 'suspended':
        return { color: '#7C2D12', bg: '#FEF7FF', text: 'Suspended' };
      default:
        return { color: colors.textSecondary, bg: colors.surfaceSecondary, text: 'Unknown' };
    }
  };

  const handleViewDetails = (document) => {
    setSelectedDocument(document);
    setIsIDPreviewModalVisible(true);
  };

  const handlePrintDocument = (document) => {
    if (mode === 'readonly') {
      Alert.alert('Read-only', 'Printing is not available in read-only mode.');
      return;
    }
    router.push({
      pathname: '/print-id-verification',
      params: { id: document.id }
    });
  };

  const handleDeleteDocument = (document) => {
    if (mode === 'readonly') {
      Alert.alert('Read-only', 'Deleting documents is not available in read-only mode.');
      return;
    }
    Alert.alert(
      'Delete Document',
      `Are you sure you want to delete your ${document.type}? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setDocuments(documents.filter(doc => doc.id !== document.id));
            Alert.alert('Deleted', `${document.type} has been deleted.`);
          },
        },
      ]
    );
  };

  const handleRenewDocument = (document) => {
    if (mode === 'readonly') {
      Alert.alert('Read-only', 'Renewing documents is not available in read-only mode.');
      return;
    }
    router.push('/id-application/id-type-selection'); // Navigate to the ID application flow for renewal
  };

  const handleAddDocument = () => {
    if (mode === 'readonly') {
      Alert.alert('Read-only', 'Linking new documents is not available in read-only mode.');
      return;
    }
    router.push('/id-application/id-type-selection'); // Navigate to the ID application flow
  };

  const isExpiringSoon = (expiryDate) => {
    if (expiryDate === 'Permanent') return false;
    try {
      const today = new Date();
      const expiry = new Date(expiryDate);
      if (expiry < today) return false;
      const diffTime = expiry - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 90 && diffDays > 0;
    } catch (e) {
      console.error("Error parsing date:", expiryDate, e);
      return false;
    }
  };

  const renderDocumentNotFoundModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isDocumentNotFoundModalVisible}
      onRequestClose={() => {
        setIsDocumentNotFoundModalVisible(!isDocumentNotFoundModalVisible);
      }}
    >
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      }}>
        <View style={{
          backgroundColor: colors.cardBackground,
          borderRadius: 20,
          padding: 24,
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          width: '80%'
        }}>
          <Ionicons name="warning-outline" size={48} color={colors.warning} style={{ marginBottom: 16 }} />
          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 18,
            color: colors.text,
            marginBottom: 16,
            textAlign: 'center'
          }}>
            Document Not Available
          </Text>
          <Text style={{
            fontFamily: 'Inter_400Regular',
            fontSize: 14,
            color: colors.textSecondary,
            marginBottom: 24,
            textAlign: 'center'
          }}>
            {documentNotFoundMessage}
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
            <TouchableOpacity
              onPress={() => {
                setIsDocumentNotFoundModalVisible(false);
                router.push('/document-not-found');
              }}
              style={{
                backgroundColor: colors.primary,
                borderRadius: 8,
                paddingVertical: 10,
                paddingHorizontal: 20,
                flex: 1,
                marginRight: 8
              }}
            >
              <Text style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 14,
                color: colors.primaryText,
                textAlign: 'center'
              }}>
                Link 
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsDocumentNotFoundModalVisible(false)}
              style={{
                backgroundColor: colors.surface,
                borderRadius: 8,
                paddingVertical: 10,
                paddingHorizontal: 20,
                flex: 1,
                marginLeft: 8,
                borderWidth: 1,
                borderColor: colors.border
              }}
            >
              <Text style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 14,
                color: colors.text,
                textAlign: 'center'
              }}>
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

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
            Linked Documents
          </Text>
          
          <TouchableOpacity onPress={handleAddDocument} disabled={mode === 'readonly'}>
            <Ionicons
              name="add-circle-outline"
              size={24}
              color={mode === 'readonly' ? colors.textSecondary : colors.primary}
            />
          </TouchableOpacity>
        </View>

        {/* Summary */}
        <View style={{
          backgroundColor: colors.cardBackground,
          borderRadius: 16,
          padding: 20,
          marginBottom: 24,
          borderWidth: 1,
          borderColor: colors.border
        }}>
          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 16,
            color: colors.text,
            marginBottom: 12
          }}>
            Document Summary
          </Text>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{
                fontFamily: 'Inter_700Bold',
                fontSize: 24,
                color: '#059669'
              }}>
                {documents.filter(doc => doc.status === 'active').length}
              </Text>
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 12,
                color: colors.textSecondary
              }}>
                Active
              </Text>
            </View>
            
            <View style={{ alignItems: 'center' }}>
              <Text style={{
                fontFamily: 'Inter_700Bold',
                fontSize: 24,
                color: '#D97706'
              }}>
                {documents.filter(doc => doc.status === 'pending').length}
              </Text>
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 12,
                color: colors.textSecondary
              }}>
                Pending
              </Text>
            </View>
            
            <View style={{ alignItems: 'center' }}>
              <Text style={{
                fontFamily: 'Inter_700Bold',
                fontSize: 24,
                color: '#DC2626'
              }}>
                {documents.filter(doc => doc.status === 'expired' || (isExpiringSoon(doc.expiryDate) && doc.expiryDate !== 'Permanent')).length}
              </Text>
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 12,
                color: colors.textSecondary
              }}>
                Attention
              </Text>
            </View>
          </View>
        </View>

        {/* Expiring Soon Alert */}
        {documents.some(doc => isExpiringSoon(doc.expiryDate)) && (
          <View style={{
            backgroundColor: '#FFFBEB',
            borderRadius: 12,
            padding: 16,
            marginBottom: 20,
            borderLeftWidth: 4,
            borderLeftColor: '#D97706'
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <Ionicons name="warning" size={20} color="#D97706" />
              <Text style={{
                fontFamily: 'Inter_600SemiBold',
                fontSize: 14,
                color: '#92400E',
                marginLeft: 8
              }}>
                Documents Expiring Soon
              </Text>
            </View>
            <Text style={{
              fontFamily: 'Inter_400Regular',
              fontSize: 12,
              color: '#92400E'
            }}>
              Some documents will expire within 90 days. Tap to renew.
            </Text>
          </View>
        )}

        {/* Documents List */}
        {documents.map((document) => (
          <DocumentCard
            key={document.id}
            document={document}
            mode={mode}
            onViewDetails={handleViewDetails}
            onPrint={handlePrintDocument}
            onDelete={handleDeleteDocument}
            onRenew={handleRenewDocument}
          />
        ))}
         
         {/* Add Document Button */}
        <TouchableOpacity
          onPress={handleAddDocument}
          style={{
            backgroundColor: colors.surface,
            borderRadius: 16,
            paddingVertical: 20,
            alignItems: 'center',
            borderWidth: 2,
            borderColor: colors.primary,
            borderStyle: 'dashed',
            marginBottom: 24,
            opacity: mode === 'readonly' ? 0.5 : 1,
          }}
          disabled={mode === 'readonly'}
        >
          <Ionicons name="add-circle-outline" size={32} color={colors.primary} />
          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 16,
            color: colors.text,
            marginTop: 8
          }}>
            Link New Document
          </Text>
          <Text style={{
            fontFamily: 'Inter_400Regular',
            fontSize: 12,
            color: colors.textSecondary,
            marginTop: 4,
            textAlign: 'center',
            paddingHorizontal: 40
          }}>
            Connect additional government documents to your NatioID for quick access
          </Text>
        </TouchableOpacity>

        {/* Info Section */}
        <View style={{
          backgroundColor: colors.surfaceSecondary,
          borderRadius: 12,
          padding: 16
        }}>
          <Text style={{
            fontFamily: 'Inter_500Medium',
            fontSize: 14,
            color: colors.text,
            marginBottom: 8
          }}>
            About Linked Documents
          </Text>
          <Text style={{
            fontFamily: 'Inter_400Regular',
            fontSize: 12,
            color: colors.textSecondary,
            lineHeight: 18
          }}>
            Linking documents to your NatioID provides:{'\n'}
            • Quick access to all your government documents{'\n'}
            • Automatic expiry notifications{'\n'}
            • Simplified verification process{'\n'}
            • Secure digital storage and backup
          </Text>
        </View>
      </ScrollView>
      {renderDocumentNotFoundModal()}
      <IDPreviewModal
        isVisible={isIDPreviewModalVisible}
        onClose={() => setIsIDPreviewModalVisible(false)}
        document={selectedDocument}
        mode={mode}
      />
    </View>
  );
}
