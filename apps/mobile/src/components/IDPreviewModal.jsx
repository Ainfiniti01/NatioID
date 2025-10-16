import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, Alert, Share, Dimensions, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from "@/context/ThemeContext";
import * as Clipboard from 'expo-clipboard';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as WebBrowser from 'expo-web-browser';

const { width: screenWidth } = Dimensions.get('window');

// Configuration for displaying document details based on type
const displayConfig = {
  'Voter\'s Card': [
    { label: 'Full Name', key: 'Full Name', sensitive: false },
    { label: 'Date of Birth / Age', key: 'Date of Birth / Age', sensitive: false },
    { label: 'Gender', key: 'Gender', sensitive: false },
    { label: 'Address / Polling Unit', key: 'Address / Polling Unit', sensitive: false },
    { label: 'Voter Identification Number (VIN)', key: 'Voter Identification Number (VIN)', sensitive: true },
    { label: 'Issue Date', key: 'Issue Date', sensitive: false },
    { label: 'Expiry Date', key: 'Expiry Date', sensitive: false },
  ],
  'National ID Card': [
    { label: 'Full Name', key: 'Full Name', sensitive: false },
    { label: 'Date of Birth', key: 'Date of Birth', sensitive: false },
    { label: 'Gender', key: 'Gender', sensitive: false },
    { label: 'National Identification Number (NIN)', key: 'National Identification Number (NIN)', sensitive: true },
    { label: 'Address', key: 'Address', sensitive: false },
    { label: 'Nationality', key: 'Nationality', sensitive: false },
    { label: 'Issue Date', key: 'Issue Date', sensitive: false },
    { label: 'Expiry Date', key: 'Expiry Date', sensitive: false },
  ],
  "Driver's License": [
    { label: 'Full Name', key: 'Full Name', sensitive: false },
    { label: 'Date of Birth', key: 'Date of Birth', sensitive: false },
    { label: 'Gender', key: 'Gender', sensitive: false },
    { label: 'Licence Number', key: 'Licence Number', sensitive: true },
    { label: 'Address', key: 'Address', sensitive: false },
    { label: 'Class of Vehicle(s) Permitted', key: 'Class of Vehicle(s) Permitted', sensitive: false },
    { label: 'Issue Date', key: 'Issue Date', sensitive: false },
    { label: 'Expiry Date', key: 'Expiry Date', sensitive: false },
    { label: 'Security Features', key: 'Security Features', sensitive: false },
  ],
  'Health Insurance Card': [
    { label: 'Full Name', key: 'Full Name', sensitive: false },
    { label: 'Date of Birth', key: 'Date of Birth', sensitive: false },
    { label: 'Gender', key: 'Gender', sensitive: false },
    { label: 'Health Insurance Number', key: 'Health Insurance Number', sensitive: true },
    { label: 'Insurance Provider Name', key: 'Insurance Provider Name', sensitive: false },
    { label: 'Coverage Type / Plan', key: 'Coverage Type', sensitive: false },
    { label: 'Expiry Date', key: 'Expiry Date', sensitive: false },
    { label: 'Emergency Contact / Hotline', key: 'Emergency Contact', sensitive: false },
  ],
  'Birth Certificate': [
    { label: 'Full Name of Child', key: 'Full Name of Child', sensitive: false },
    { label: 'Date of Birth', key: 'Date of Birth', sensitive: false },
    { label: 'Place of Birth', key: 'Place of Birth', sensitive: false },
    { label: 'Gender', key: 'Gender', sensitive: false },
    { label: 'Names of Parents', key: 'Names of Parents', sensitive: false },
    { label: 'Nationality / Citizenship', key: 'Nationality', sensitive: false },
    { label: 'Registration Number', key: 'Registration Number', sensitive: true },
    { label: 'Date of Registration', key: 'Date of Registration', sensitive: false },
    { label: 'Signature/Seal of Registrar', key: 'Signature/Seal of Registrar', sensitive: false },
  ],
  'International Passport': [
    { label: 'Passport Number', key: 'Passport Number', sensitive: true },
    { label: 'Full Name', key: 'Full Name', sensitive: false },
    { label: 'Date of Birth', key: 'Date of Birth', sensitive: false },
    { label: 'Gender', key: 'Gender', sensitive: false },
    { label: 'Place of Birth', key: 'Place of Birth', sensitive: false },
    { label: 'Nationality', key: 'Nationality', sensitive: false },
    { label: 'Date of Issue', key: 'Date of Issue', sensitive: false },
    { label: 'Date of Expiry', key: 'Date of Expiry', sensitive: false },
    { label: 'Issuing Authority', key: 'Issuing Authority', sensitive: false },
    { label: 'Machine-Readable Zone (MRZ)', key: 'Machine-Readable Zone (MRZ)', sensitive: true },
  ],
  'Student ID Card': [
    { label: 'Name', key: 'Name', sensitive: false },
    { label: 'Student Number', key: 'Student Number', sensitive: true },
    { label: 'Department', key: 'Department', sensitive: false },
    { label: 'Validity Period', key: 'Validity Period', sensitive: false },
  ],
  'Work ID / Staff ID': [
    { label: 'Name', key: 'Name', sensitive: false },
    { label: 'Employee ID', key: 'Employee ID', sensitive: true },
    { label: 'Department', key: 'Department', sensitive: false },
    { label: 'Position', key: 'Position', sensitive: false },
  ],
  'Residence Permit': [
    { label: 'Name', key: 'Name', sensitive: false },
    { label: 'Nationality', key: 'Nationality', sensitive: false },
    { label: 'Permit Number', key: 'Permit Number', sensitive: true },
    { label: 'Expiry Date', key: 'Expiry Date', sensitive: false },
    { label: 'Visa/Residence Status', key: 'Visa/Residence Status', sensitive: false },
  ],
};

const IDPreviewModal = ({ isVisible, onClose, document, mode }) => {
  const { colors } = useTheme();
  const [blurSensitive, setBlurSensitive] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      setBlurSensitive(false);
    }
  }, [isVisible]);

  if (!document) {
    return null;
  }

  const isDocumentExpired = (expiryDate) => {
    if (expiryDate === 'Permanent') return false;
    try {
      const today = new Date();
      const expiry = new Date(expiryDate);
      return expiry < today;
    } catch (e) {
      console.error("Error parsing date:", expiryDate, e);
      return false;
    }
  };

  const expired = isDocumentExpired(document.expiryDate);

  const handleCopy = async (value) => {
    await Clipboard.setStringAsync(value);
    Alert.alert('Copied', `${document.type} number copied to clipboard`);
  };

  const handleShare = async () => {
    try {
      const message = `My NatioID - ${document.type}\nNumber: ${document.number}\nVerified Country Digital Identity`;
      const result = await Share.share({
        message: message,
        title: `NatioID Digital Identity - ${document.type}`
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

  const handleDownload = async () => {
    const docUrl = document.url || 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
    const fileName = document.fileName || `${document.type.replace(/\s/g, '_').toLowerCase()}.pdf`;

    if (!docUrl) {
      Alert.alert('Download Error', 'Document URL is not available.');
      return;
    }

    const fileUri = FileSystem.documentDirectory + fileName;

    try {
      const { exists } = await FileSystem.getInfoAsync(fileUri);
      if (exists) {
        Alert.alert('File Exists', 'This file has already been downloaded.');
        return;
      }

      const downloadRes = await FileSystem.downloadAsync(docUrl, fileUri);
      Alert.alert('Download Complete', `File downloaded to: ${downloadRes.uri}`);
    } catch (error) {
      console.error('Download error:', error);
      Alert.alert('Download Failed', 'Could not download the file. Please try again.');
    }
  };

  const handleViewQR = () => {
    Alert.alert('QR Code', 'Displaying QR code for verification.');
  };

  const renderDetailRow = (label, value, isSensitive = false) => (
    <View style={styles.detailRow}>
      <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>{label}</Text>
      <Text style={[
        styles.detailValue,
        { color: colors.text },
        isSensitive && blurSensitive && styles.blurredText
      ]}>
        {isSensitive && blurSensitive ? '••••••••••' : value}
      </Text>
    </View>
  );

  const isReadOnly = mode === 'readonly';
  const isPrintMode = mode === 'print';

  // Get the display configuration for the current document type
  const currentDisplayConfig = displayConfig[document.type] || [];

  // Determine the full name for the profile image placeholder
  const getFullNameForPlaceholder = () => {
    if (document.type === 'Birth Certificate') {
      return document.details['Full Name of Child'] || 'JD';
    }
    return document.details['Full Name'] || document.details['Name'] || 'JD';
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={[styles.modalOverlay, { backgroundColor: colors.background }]}>
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: colors.text }]}>
            {document.type} Details
          </Text>
          {!isReadOnly && (
            <TouchableOpacity onPress={() => setBlurSensitive(!blurSensitive)} style={styles.blurButton}>
              <Ionicons
                name={blurSensitive ? "eye-off-outline" : "eye-outline"}
                size={24}
                color={colors.text}
              />
            </TouchableOpacity>
          )}
        </View>

        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {expired && (
            <View style={[styles.watermarkContainer, { backgroundColor: colors.warning + '30', borderColor: colors.warning }]}>
              <Text style={[styles.watermarkText, { color: colors.warning }]}>EXPIRED</Text>
            </View>
          )}

          <View style={[styles.cardContainer, { backgroundColor: document.color, borderColor: colors.border }]}>
            {/* Document Header */}
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{document.type}</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>
                  {expired ? 'EXPIRED' : (document.status || 'ACTIVE').toUpperCase()}
                </Text>
              </View>
            </View>

            {/* Main Content */}
            <View style={styles.cardContent}>
              <View style={styles.profileImagePlaceholder}>
                <Text style={styles.profileImageText}>
                  {getFullNameForPlaceholder().split(' ').map(n => n[0]).join('')}
                </Text>
              </View>
              <View style={styles.infoSection}>
                {currentDisplayConfig.map((field, index) => {
                  const value = document.details[field.key];
                  if (value === undefined || value === null || value === '') return null; // Don't render if value is empty
                  // Add a unique key prop to the list item to satisfy React's requirement
                  return (
                    <View key={field.key || index}>
                      {renderDetailRow(field.label, value, field.sensitive)}
                    </View>
                  );
                })}
              </View>
            </View>

            {/* QR Code Placeholder */}
            <View style={styles.qrCodeContainer}>
              <Ionicons name="qr-code-outline" size={80} color={colors.primaryText} />
              <Text style={styles.qrCodeText}>Scan to verify</Text>
            </View>
          </View>

          {/* Action Icons */}
          <View style={styles.actionIconsContainer}>
            {document.number && (
              <TouchableOpacity onPress={() => handleCopy(document.number)} style={styles.actionIcon}>
                <Ionicons name="copy-outline" size={28} color={colors.primary} />
                <Text style={[styles.actionIconText, { color: colors.textSecondary }]}>Copy ID</Text>
              </TouchableOpacity>
            )}
            {!isReadOnly && (
              <>
                <TouchableOpacity onPress={handleShare} style={styles.actionIcon}>
                  <Ionicons name="share-social-outline" size={28} color={colors.primary} />
                  <Text style={[styles.actionIconText, { color: colors.textSecondary }]}>Share</Text>
                </TouchableOpacity>
                {(isPrintMode || !isReadOnly) && (
                  <TouchableOpacity onPress={handleDownload} style={styles.actionIcon}>
                    <Ionicons name="download-outline" size={28} color={colors.primary} />
                    <Text style={[styles.actionIconText, { color: colors.textSecondary }]}>Download</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity onPress={handleViewQR} style={styles.actionIcon}>
                  <Ionicons name="qr-code-outline" size={28} color={colors.primary} />
                  <Text style={[styles.actionIconText, { color: colors.textSecondary }]}>View QR</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 5,
  },
  title: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    flex: 1,
    textAlign: 'center',
    marginLeft: -24,
  },
  blurButton: {
    padding: 5,
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  watermarkContainer: {
    alignSelf: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    marginVertical: 15,
  },
  watermarkText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 20,
    transform: [{ rotate: '-15deg' }],
  },
  cardContainer: {
    borderRadius: 20,
    padding: 24,
    width: screenWidth - 40,
    alignSelf: 'center',
    position: 'relative',
    overflow: 'hidden',
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
    color: '#FFFFFF',
  },
  statusBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 10,
    color: '#FFFFFF',
  },
  cardContent: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  profileImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  profileImageText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 28,
    color: '#000000',
  },
  infoSection: {
    flex: 1,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  detailLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
  },
  detailValue: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    textAlign: 'right',
    flex: 1,
    marginLeft: 10,
  },
  blurredText: {
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },
  qrCodeContainer: {
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrCodeText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 10,
    color: '#FFFFFF',
    opacity: 0.8,
    marginTop: 5,
  },
  actionIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  actionIcon: {
    alignItems: 'center',
    width: '20%',
  },
  actionIconText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 10,
    marginTop: 4,
    textAlign: 'center',
  },
});

export default IDPreviewModal;
