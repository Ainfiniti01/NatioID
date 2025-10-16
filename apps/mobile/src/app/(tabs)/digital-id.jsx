import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Share, Alert, Modal, FlatList, Dimensions, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from "@/context/ThemeContext";
import * as Clipboard from 'expo-clipboard';
import * as LocalAuthentication from 'expo-local-authentication'; // For biometric unlock
import { documents as linkedDocumentsDataImport } from '../linked-documents'; // Import documents from linked-documents
import DocumentNotFound from '../document-not-found'; // Import DocumentNotFound
import DocumentCard from '../../components/DocumentCard'; // Import DocumentCard

const { width: screenWidth } = Dimensions.get('window');

// Helper function to transform linked document data to ID card format
const transformLinkedDocumentToIDCard = (doc, colors, userData) => {
  let data = {};
  if (doc.details) {
    data = {
      fullName: doc.details['Full Name'] || userData.fullName,
      dateOfBirth: doc.details['Date of Birth'] || userData.dateOfBirth,
      gender: doc.details['Gender'] || userData.gender,
      nationality: doc.details['Nationality'] || userData.nationality,
      issueDate: doc.details['Issue Date'] || doc.issueDate,
      expiryDate: doc.details['Expiry Date'] || doc.expiryDate,
      nin: doc.details['National Identification Number (NIN)'] || doc.number,
      passportNumber: doc.details['Passport Number'] || doc.number,
      licenseNumber: doc.details['Licence Number'] || doc.number,
      vin: doc.details['Voter Identification Number (VIN)'] || doc.number,
      healthInsuranceNumber: doc.details['Health Insurance Number'] || doc.number,
      registrationNumber: doc.details['Registration Number'] || doc.number,
      studentNumber: doc.details['Student Number'] || doc.number,
      employeeID: doc.details['Employee ID'] || doc.number,
      permitNumber: doc.details['Permit Number'] || doc.number,
      placeOfBirth: doc.details['Place of Birth'] || '',
      address: doc.details['Address'] || '',
      class: doc.details['Class of Vehicle(s) Permitted'] || '',
      pollingUnit: doc.details['Address / Polling Unit'] ? doc.details['Address / Polling Unit'].split(', ')[1] : '',
      region: '',
      province: '',
    };
  } else {
    data = {
      fullName: userData.fullName,
      dateOfBirth: userData.dateOfBirth,
      gender: userData.gender,
      nationality: userData.nationality,
      issueDate: doc.issueDate,
      expiryDate: doc.expiryDate,
      nin: doc.number,
      passportNumber: doc.number,
      licenseNumber: doc.number,
      vin: doc.number,
    };
  }

  let idType = doc.type;
  if (idType === 'National ID Card') idType = 'NIN';
  if (idType === 'International Passport') idType = 'Passport';
  if (idType === "Driver's License") idType = 'Driver\'s License';
  if (idType === "Voter's Card") idType = 'Voter\'s Card';

  return {
    id: doc.id,
    name: doc.type,
    type: idType,
    data: data,
    status: doc.status,
    color: doc.color || colors.primary,
    icon: doc.icon || 'document-text-outline'
  };
};

export default function DigitalIDScreen() {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = useState('main');
  const [blurSensitive, setBlurSensitive] = useState(false);
  const [isQrModalVisible, setIsQrModalVisible] = useState(false);
  const [isCardEnlarged, setIsCardEnlarged] = useState(false);
  const [selectedCardForEnlargement, setSelectedCardForEnlargement] = useState(null); // New state for selected card

  const [lastSynced, setLastSynced] = useState(new Date().toLocaleString());
  const linkedDocuments = linkedDocumentsDataImport || [];

  const handleViewDetailsFromDigitalID = (document) => {
    router.push({
      pathname: '/linked-documents',
      params: { mode: 'service', id: document.id }
    });
  };

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    const checkNetworkStatus = () => {
      const isOnline = true;
      if (isOnline) {
        setLastSynced(new Date().toLocaleString());
      }
    };
    checkNetworkStatus();
    const interval = setInterval(checkNetworkStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  const userData = {
    fullName: 'John Doe Citizen',
    nin: '12345678901',
    dateOfBirth: '15/03/1990',
    placeOfBirth: 'SomeCity, Country',
    gender: 'Male',
    email: 'john.citizen@email.com',
    phone: '+1 555 123 4567',
    provinceOfOrigin: 'SomeProvince',
    address: '123 Main Street, SomeCity, SomeProvince',
    nationality: 'Genericland',
    region: 'SomeRegion',
    verificationType: 'Biometric',
    idNumber: '41-1Genericland',
    bloodGroup: 'O+',
    issueDate: '2024-01-15',
    expiryDate: '2034-01-15',
    lastUpdated: new Date().toLocaleString(),
    linkedServices: [
      { name: 'Bank KYC', status: '✅' },
      { name: 'Voting Access', status: '✅' },
      { name: 'Health Records', status: '❌' },
    ]
  };

  const existingIDTypes = new Set(['NIN', 'Passport', 'Driver\'s License', 'Voter\'s Card']);

  const newLinkedCards = linkedDocuments
    .filter(doc => !existingIDTypes.has(doc.type))
    .map(doc => transformLinkedDocumentToIDCard(doc, colors, userData));

  const allIDs = [
    {
      id: 'nin',
      name: 'National ID Card',
      type: 'NIN',
      data: userData,
      status: 'verified',
      color: colors.primary,
      icon: 'id-card-outline'
    },
    {
      id: 'passport',
      name: 'International Passport',
      type: 'Passport',
      data: {
        fullName: 'John Doe Citizen',
        passportNumber: 'A12345678',
        nationality: 'Genericland',
        issueDate: '2019-06-15',
        expiryDate: '2029-06-15',
        placeOfIssue: 'SomeCity',
        dateOfBirth: '15/03/1990',
        gender: 'Male'
      },
      status: 'verified',
      color: colors.success,
      icon: 'airplane-outline'
    },
    {
      id: 'drivers_license',
      name: 'Driver\'s License',
      type: 'Driver\'s License',
      data: {
        fullName: 'John Doe Citizen',
        licenseNumber: 'GEN-DL-123456',
        issueDate: '2020-01-01',
        expiryDate: '2025-01-01',
        dateOfBirth: '15/03/1990',
        gender: 'Male',
        class: 'B'
      },
      status: 'expired',
      color: colors.warning,
      icon: 'car-outline'
    },
    {
      id: 'voters_card',
      name: 'Voter\'s Card',
      type: 'Voter\'s Card',
      data: {
        fullName: 'John Doe Citizen',
        vin: 'VIN2345789',
        pollingUnit: 'PU 001',
        region: 'SomeRegion',
        province: 'SomeProvince',
        issueDate: '2018-01-01',
        expiryDate: 'Permanent'
      },
      status: 'verified',
      color: colors.primary,
      icon: 'people-outline'
    },
    ...newLinkedCards
  ];

  const handleShare = async (idType, data) => {
    try {
      const message = `My NatioID - ${idType}\nName: ${data.fullName}\n${idType === 'NIN' ? `NIN: ${data.nin}` : `Number: ${data.idNumber || data.passportNumber || data.licenseNumber || data.vin || data.healthInsuranceNumber || data.registrationNumber || data.studentNumber || data.employeeID || data.permitNumber}`}\nVerified Genericland Digital Identity`;
      const result = await Share.share({
        message: message,
        title: `NatioID Digital Identity - ${idType}`
      });
      if (result.action === Share.sharedAction) {
        // shared
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert('Error', 'Could not share your ID');
    }
  };

  const handleDownload = (idType, data) => {
    Alert.alert(
      'Download ID',
      `Choose download format for ${idType}`,
      [
        { text: 'PDF', onPress: () => Alert.alert('Success', `${idType} downloaded as PDF`) },
        { text: 'QR Code', onPress: () => Alert.alert('Success', `${idType} QR code downloaded`) },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleCopyNIN = async () => {
    await Clipboard.setStringAsync(userData.nin);
    Alert.alert('Copied', 'NIN copied to clipboard');
  };

  const handleBiometricUnlock = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    if (!compatible) {
      Alert.alert('Error', 'Biometric authentication not available on this device.');
      return;
    }

    const enrolled = await LocalAuthentication.isEnrolledAsync();
    if (!enrolled) {
      Alert.alert('Error', 'No biometrics enrolled. Please set up fingerprint or face ID in your device settings.');
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Unlock Digital ID',
      fallbackLabel: 'Enter PIN',
    });

    if (result.success) {
      Alert.alert('Success', 'Digital ID unlocked with biometrics!');
      // Proceed to show sensitive info or navigate
    } else {
      Alert.alert('Authentication Failed', 'Could not verify biometrics.');
    }
  };

  const checkLoginStatus = () => {
    return true;
  };

  const renderIDCard = ({ item, isEnlarged = false }) => (
    <Pressable
      onPress={() => {
        setSelectedCardForEnlargement(item); // Set the selected card
        setIsCardEnlarged(true); // Open the modal
      }}
      style={{
        backgroundColor: item.color,
        borderRadius: 20,
        padding: 24,
        marginHorizontal: isEnlarged ? 0 : 10,
        width: isEnlarged ? screenWidth : screenWidth - 40,
        height: isEnlarged ? 'auto' : 250,
        position: 'relative',
        overflow: 'hidden',
        justifyContent: 'space-between',
        alignSelf: 'center'
      }}
    >
      {/* Background Pattern */}
      <View style={{
        position: 'absolute',
        top: -50,
        right: -50,
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: 'rgba(255, 255, 255, 0.1)'
      }} />
      
      {/* Header */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <Text style={{
          fontFamily: 'Inter_700Bold',
          fontSize: 18,
          color: colors.primaryText
        }}>
          {item.name}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{
            backgroundColor: item.status === 'verified' || item.status === 'active' ? colors.success : colors.warning,
            borderRadius: 8,
            paddingHorizontal: 8,
            paddingVertical: 4,
            marginRight: 8
          }}>
            <Text style={{
              fontFamily: 'Inter_500Medium',
              fontSize: 10,
              color: '#FFFFFF'
            }}>
              {item.status.toUpperCase()}
            </Text>
          </View>
          <TouchableOpacity onPress={() => setBlurSensitive(!blurSensitive)}>
            <Ionicons 
              name={blurSensitive ? "eye-off" : "eye"} 
              size={20} 
              color={colors.primaryText} 
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Profile Section */}
      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        <View style={{
          width: 80,
          height: 80,
          borderRadius: 12,
          backgroundColor: colors.primaryText,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 16
        }}>
          <Text style={{
            fontFamily: 'Inter_700Bold',
            fontSize: 28,
            color: item.color
          }}>
            {item.data.fullName.split(' ').map(n => n[0]).join('')}
          </Text>
        </View>
        
        <View style={{ flex: 1 }}>
          <Text style={{
            fontFamily: 'Inter_700Bold',
            fontSize: 18,
            color: colors.primaryText,
            marginBottom: 4
          }}>
            {item.data.fullName}
          </Text>
          <Text style={{
            fontFamily: 'Inter_400Regular',
            fontSize: 14,
            color: colors.primaryText,
            opacity: 0.9,
            marginBottom: 8
          }}>
            Born: {item.data.dateOfBirth}
          </Text>
        </View>
      </View>

      {/* ID Number */}
      <View style={{ marginBottom: 16 }}>
        <Text style={{
          fontFamily: 'Inter_500Medium',
          fontSize: 12,
          color: colors.primaryText,
          opacity: 0.8,
          marginBottom: 4
        }}>
          {item.type === 'NIN' ? 'National Identification Number' : `${item.type} Number`}
        </Text>
        <Text style={{
          fontFamily: 'Inter_700Bold',
          fontSize: 16,
          color: colors.primaryText,
          letterSpacing: 2,
          textDecorationLine: blurSensitive ? 'line-through' : 'none',
          opacity: blurSensitive ? 0.5 : 1
        }}>
          {blurSensitive ? '••• •••• •••' : (item.data.nin || item.data.passportNumber || item.data.licenseNumber || item.data.vin || item.data.healthInsuranceNumber || item.data.registrationNumber || item.data.studentNumber || item.data.employeeID || item.data.permitNumber || 'N/A')}
        </Text>
      </View>

      {/* QR Code Section */}
      <View style={{ alignItems: 'center' }}>
        <View style={{
          width: 80,
          height: 80,
          backgroundColor: colors.primaryText,
          borderRadius: 8,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 8
        }}>
          {/* Placeholder for actual QR Code */}
          <Ionicons name="qr-code-outline" size={60} color={item.color} />
        </View>
        <Text style={{
          fontFamily: 'Inter_400Regular',
          fontSize: 10,
          color: colors.primaryText,
          opacity: 0.8
        }}>
          Scan to verify
        </Text>
      </View>

      {/* Footer */}
      <View style={{ 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginTop: 16,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.2)'
      }}>
        <Text style={{
          fontFamily: 'Inter_400Regular',
          fontSize: 10,
          color: colors.primaryText,
          opacity: 0.8
        }}>
          Federal Republic of Genericland
        </Text>
        <Text style={{
          fontFamily: 'Inter_400Regular',
          fontSize: 10,
          color: colors.primaryText,
          opacity: 0.8
        }}>
          Expires: {item.data.expiryDate || 'N/A'}
        </Text>
      </View>

      {isEnlarged && (
        <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-around' }}>
          <TouchableOpacity onPress={handleCopyNIN} style={{ alignItems: 'center' }}>
            <Ionicons name="copy-outline" size={24} color={colors.primaryText} />
            <Text style={{ color: colors.primaryText, fontSize: 10 }}>Copy NIN</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleShare(item.type, item.data)} style={{ alignItems: 'center' }}>
            <Ionicons name="share-outline" size={24} color={colors.primaryText} />
            <Text style={{ color: colors.primaryText, fontSize: 10 }}>Share QR</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDownload(item.type, item.data)} style={{ alignItems: 'center' }}>
            <Ionicons name="download-outline" size={24} color={colors.primaryText} />
            <Text style={{ color: colors.primaryText, fontSize: 10 }}>Download</Text>
          </TouchableOpacity>
        </View>
      )}
    </Pressable>
  );

  const renderIDCarousel = () => (
    <FlatList
      data={allIDs}
      renderItem={({ item }) => renderIDCard({ item, isEnlarged: false })}
      keyExtractor={(item) => item.id}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 20 }}
      snapToInterval={screenWidth - 20}
      decelerationRate="fast"
    />
  );

  const renderDetailsTab = () => (
    <View style={{ paddingHorizontal: 20 }}>
      <View style={{
        backgroundColor: colors.cardBackground,
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: colors.border
      }}>
        <Text style={{
          fontFamily: 'Inter_600SemiBold',
          fontSize: 18,
          color: colors.text,
          marginBottom: 20
        }}>
          Personal Information
        </Text>

        {[
          { label: 'Full Name', value: userData.fullName },
          { label: 'NIN', value: userData.nin },
          { label: 'ID Number', value: userData.idNumber },
          { label: 'Date of Birth', value: userData.dateOfBirth },
          { label: 'Place of Birth', value: userData.placeOfBirth },
          { label: 'Gender', value: userData.gender },
          { label: 'Nationality', value: userData.nationality },
          { label: 'Province of Origin', value: userData.provinceOfOrigin },
          { label: 'Region', value: userData.region },
          { label: 'Blood Group', value: userData.bloodGroup },
          { label: 'Verification Type', value: userData.verificationType },
          { label: 'Issue Date', value: userData.issueDate },
          { label: 'Expiry Date', value: userData.expiryDate },
          { label: 'Last Updated', value: userData.lastUpdated }
        ].map((item, index) => (
          <View key={index} style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 12,
            borderBottomWidth: index < 13 ? 1 : 0,
            borderBottomColor: colors.border
          }}>
            <Text style={{
              fontFamily: 'Inter_400Regular',
              fontSize: 14,
              color: colors.textSecondary
            }}>
              {item.label}
            </Text>
            <Text style={{
              fontFamily: 'Inter_500Medium',
              fontSize: 14,
              color: colors.text,
              textAlign: 'right',
              flex: 1,
              marginLeft: 16
            }}>
              {item.value}
            </Text>
          </View>
        ))}
      </View>

      {/* Linked Services */}
      <View style={{
        backgroundColor: colors.cardBackground,
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: colors.border,
        marginTop: 20
      }}>
        <Text style={{
          fontFamily: 'Inter_600SemiBold',
          fontSize: 18,
          color: colors.text,
          marginBottom: 20
        }}>
          Linked Services
        </Text>
        {userData.linkedServices.map((service, index) => (
          <View key={index} style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 12,
            borderBottomWidth: index < userData.linkedServices.length - 1 ? 1 : 0,
            borderBottomColor: colors.border
          }}>
            <Text style={{
              fontFamily: 'Inter_400Regular',
              fontSize: 14,
              color: colors.textSecondary
            }}>
              {service.name}
            </Text>
            <Text style={{
              fontFamily: 'Inter_500Medium',
              fontSize: 14,
              color: colors.text,
              textAlign: 'right',
              flex: 1,
              marginLeft: 16
            }}>
              {service.status}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderLinkedDocsTab = () => (
    <View style={{ paddingHorizontal: 20 }}>
      <Text style={{
        fontFamily: 'Inter_600SemiBold',
        fontSize: 18,
        color: colors.text,
        marginBottom: 16
      }}>
        Linked Documents
      </Text>

      {linkedDocuments.length === 0 ? (
        <DocumentNotFound
          onLinkDocument={() => router.push('/linked-documents?mode=readonly')}
        />
      ) : (
        linkedDocuments.map((doc) => (
          <DocumentCard
            key={doc.id}
            document={doc}
            mode="readonly" // Digital ID's linked docs tab should be read-only
            onViewDetails={handleViewDetailsFromDigitalID}
            onPrint={() => Alert.alert('Not Available', 'Printing is not available from this view.')}
            onDelete={() => Alert.alert('Not Available', 'Deleting is not available from this view.')}
            onRenew={() => Alert.alert('Not Available', 'Renewing is not available from this view.')}
          />
        ))
      )}

      {linkedDocuments.length > 0 && (
        <TouchableOpacity
          onPress={() => router.push('/id-application/document-upload')}
          style={{
            backgroundColor: colors.surface,
            borderRadius: 12,
            paddingVertical: 16,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: colors.border,
            borderStyle: 'dashed'
          }}
        >
          <Ionicons name="add-circle-outline" size={24} color={colors.primary} />
          <Text style={{
            fontFamily: 'Inter_500Medium',
            fontSize: 14,
            color: colors.primary,
            marginTop: 4
          }}>
            Link New Document
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDark ? "light" : "dark"} />
      
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom + 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
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
            Digital ID
          </Text>
          
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => handleShare(allIDs[0].type, allIDs[0].data)} style={{ marginRight: 16 }}>
              <Ionicons name="share-outline" size={24} color={colors.text} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDownload(allIDs[0].type, allIDs[0].data)}>
              <Ionicons name="download-outline" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Multi-ID Wallet Carousel */}
        <View style={{ marginBottom: 24 }}>
          {renderIDCarousel()}
        </View>

        {/* Tab Navigation */}
        <View style={{
          flexDirection: 'row',
          paddingHorizontal: 20,
          marginBottom: 24
        }}>
          {[
            { key: 'main', label: 'Overview' },
            { key: 'details', label: 'Details' },
            { key: 'linked', label: 'Linked Docs' }
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              onPress={() => setSelectedTab(tab.key)}
              style={{
                flex: 1,
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 8,
                backgroundColor: selectedTab === tab.key ? colors.primary : colors.surface,
                marginHorizontal: 4,
                alignItems: 'center'
              }}
            >
              <Text style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 14,
                color: selectedTab === tab.key ? colors.primaryText : colors.text
              }}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        {selectedTab === 'main' && (
          <View style={{ paddingHorizontal: 20 }}>
            <View style={{
              backgroundColor: colors.cardBackground,
              borderRadius: 16,
              padding: 20,
              borderWidth: 1,
              borderColor: colors.border
            }}>
              <Text style={{
                fontFamily: 'Inter_600SemiBold',
                fontSize: 16,
                color: colors.text,
                marginBottom: 16
              }}>
                Quick Actions
              </Text>

              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {[
                  { icon: 'qr-code-outline', label: 'Show QR', action: () => setIsQrModalVisible(true) },
                  { icon: 'shield-checkmark-outline', label: 'Scan to Verify', action: () => router.push('/scan-verify') },
                  { icon: 'copy-outline', label: 'Copy NIN', action: handleCopyNIN },
                  { icon: 'document-text-outline', label: 'Apply for an ID', action: () => router.push('/id-application/id-type-selection') },
                  { icon: 'print-outline', label: 'Print an ID', action: () => router.push('/linked-documents?mode=print') }
                ].map((action, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={action.action}
                    style={{
                      width: '48%',
                      backgroundColor: colors.surface,
                      borderRadius: 12,
                      padding: 16,
                      alignItems: 'center',
                      margin: '1%',
                      borderWidth: 1,
                      borderColor: colors.border
                    }}
                  >
                    <Ionicons name={action.icon} size={24} color={colors.primary} />
                    <Text style={{
                      fontFamily: 'Inter_500Medium',
                      fontSize: 12,
                      color: colors.text,
                      marginTop: 8,
                      textAlign: 'center'
                    }}>
                      {action.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Offline Mode Placeholder */}
            <View style={{
              backgroundColor: colors.cardBackground,
              borderRadius: 16,
              padding: 20,
              borderWidth: 1,
              borderColor: colors.border,
              marginTop: 20,
              alignItems: 'center'
            }}>
              <Ionicons name="cloud-offline-outline" size={24} color={colors.textSecondary} />
              <Text style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 14,
                color: colors.text,
                marginTop: 8
              }}>
                Offline Mode Active
              </Text>
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 12,
                color: colors.textSecondary,
                marginTop: 4
              }}>
                Last Synced: {lastSynced}
              </Text>
            </View>

            {/* Screenshot Prevention Placeholder */}
            {/*
            // To implement screenshot prevention, you would typically use a native module.
            // For example, on Android:
            // import { NativeModules } from 'react-native';
            // const { ScreenshotPreventer } = NativeModules;
            // useEffect(() => {
            //   ScreenshotPreventer.enable();
            //   return () => ScreenshotPreventer.disable();
            // }, []);
            // On iOS, you might use a library like 'react-native-screenshot-prevent'
            */}
          </View>
        )}

        {selectedTab === 'details' && renderDetailsTab()}
        {selectedTab === 'linked' && renderLinkedDocsTab()}
      </ScrollView>

      {/* QR Code Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isQrModalVisible}
        onRequestClose={() => {
          setIsQrModalVisible(!isQrModalVisible);
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
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 18,
              color: colors.text,
              marginBottom: 16
            }}>
              Your QR Code
            </Text>
            {/* Placeholder for QR Code */}
            <View style={{
              width: 150,
              height: 150,
              backgroundColor: colors.primaryText,
              borderRadius: 12,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 20
            }}>
              <Ionicons name="qr-code-outline" size={100} color={colors.primary} />
            </View>
            <TouchableOpacity
              onPress={() => setIsQrModalVisible(!isQrModalVisible)}
              style={{
                backgroundColor: colors.primary,
                borderRadius: 8,
                paddingVertical: 10,
                paddingHorizontal: 20,
              }}
            >
              <Text style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 14,
                color: colors.primaryText
              }}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Enlarged ID Card Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isCardEnlarged}
        onRequestClose={() => setIsCardEnlarged(false)}
      >
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.8)',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <TouchableOpacity
            style={{ position: 'absolute', top: insets.top + 20, right: 20, zIndex: 1 }}
            onPress={() => setIsCardEnlarged(false)}
          >
            <Ionicons name="close-circle" size={32} color="white" />
          </TouchableOpacity>
          {selectedCardForEnlargement && renderIDCard({ item: selectedCardForEnlargement, isEnlarged: true })}
        </View>
      </Modal>
    </View>
  );
}
