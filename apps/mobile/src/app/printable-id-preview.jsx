import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Linking, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from "@/context/ThemeContext";
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as WebBrowser from 'expo-web-browser';
import { documents as mockDocuments } from './linked-documents'; // Import documents from linked-documents

export default function PrintableIdPreview() {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const { id, mode } = useLocalSearchParams(); // Get document ID and mode from route params

  const [document, setDocument] = useState(null);
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

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

  useEffect(() => {
    if (id) {
      // Find the document from the imported mockDocuments array
      const foundDoc = mockDocuments.find(doc => doc.id === id);
      if (foundDoc) {
        setDocument(foundDoc);
      } else {
        Alert.alert('Error', 'Document not found.');
        router.back();
      }
    }
  }, [id]);

  if (!fontsLoaded || !document) {
    return null;
  }

  const handleDownload = async () => {
    // Assuming a 'url' property exists in the document object for downloadable content
    const docUrl = document.url || 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'; // Fallback URL
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

  const handleShare = async () => {
    const docUrl = document.url || 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'; // Fallback URL
    const fileName = document.fileName || `${document.type.replace(/\s/g, '_').toLowerCase()}.pdf`;

    if (!docUrl) {
      Alert.alert('Share Error', 'Document URL is not available.');
      return;
    }

    if (!(await Sharing.isAvailableAsync())) {
      Alert.alert('Sharing not available', 'Sharing is not supported on this device.');
      return;
    }

    try {
      await Sharing.shareAsync(docUrl, {
        mimeType: 'application/pdf',
        dialogTitle: `Share ${fileName}`,
        UTI: 'public.pdf',
      });
    } catch (error) {
      console.error('Share error:', error);
      Alert.alert('Share Failed', 'Could not share the document.');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, paddingTop: insets.top }}>
      <StatusBar style={isDark ? "light" : "dark"} />
      
      <View style={styles.container}>
        <View style={[styles.header, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: colors.text }]}>Print Preview: {document.type}</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity onPress={handleDownload} style={styles.headerButton}>
              <Ionicons name="download-outline" size={24} color={colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleShare} style={styles.headerButton}>
              <Ionicons name="share-social-outline" size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <Text style={[styles.documentTitle, { color: colors.text }]}>{document.type}</Text>
          <Text style={[styles.documentDescription, { color: colors.textSecondary }]}>{document.description || 'Preview of your document for printing.'}</Text>

          {/* Watermark for expired documents */}
          {isDocumentExpired(document.expiryDate) && (
            <View style={[styles.watermark, { backgroundColor: colors.warning + '30', borderColor: colors.warning }]}>
              <Text style={[styles.watermarkText, { color: colors.warning }]}>EXPIRED</Text>
            </View>
          )}

          {/* Placeholder for document preview */}
          <View style={[styles.previewPlaceholder, { backgroundColor: colors.surfaceSecondary, borderColor: colors.border, height: '100%' }]}>
            <Ionicons name="document-text-outline" size={48} color={colors.textSecondary} />
            <Text style={[styles.previewText, { color: colors.textSecondary }]}>Document Preview Area</Text>
            <Text style={[styles.previewSubText, { color: colors.textSecondary }]}>
              {document.fileName || `${document.type.replace(/\s/g, '_').toLowerCase()}.pdf`} (Online)
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  backButton: {
    padding: 5,
  },
  title: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    flex: 1,
    textAlign: 'center',
    marginLeft: -24, // Adjust for back button
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    padding: 5,
    marginLeft: 15,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  documentTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 24,
    marginBottom: 8,
    textAlign: 'center',
  },
  documentDescription: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    marginBottom: 30,
    textAlign: 'center',
  },
  previewPlaceholder: {
    width: '100%',
    borderRadius: 16,
    borderWidth: 2,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  previewText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    marginTop: 10,
  },
  previewSubText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    marginTop: 5,
  },
  watermark: {
    position: 'absolute',
    top: '40%',
    left: '10%',
    right: '10%',
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  watermarkText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 36,
    opacity: 0.6,
  },
});
