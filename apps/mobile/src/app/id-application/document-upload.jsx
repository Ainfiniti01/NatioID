import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, Image, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from "@/context/ThemeContext";
import DropdownPicker from '@/components/DropdownPicker'; // Assuming this component exists

const documentTypes = [
  { label: "Voter's Card", value: "voters_card" },
  { label: "National ID", value: "national_id" },
  { label: "Passport", value: "passport" },
  { label: "Driver's License", value: "drivers_license" },
  { label: "Health Card", value: "health_card" },
  { label: "Other", value: "other" },
];

const documentFields = {
  voters_card: [
    { name: "fullName", label: "Full Name", type: "text" },
    { name: "documentNumber", label: "Voter ID Number", type: "text" },
    { name: "issueDate", label: "Issue Date", type: "date" },
  ],
  national_id: [
    { name: "fullName", label: "Full Name", type: "text" },
    { name: "dateOfBirth", label: "Date of Birth", type: "date" },
    { name: "gender", label: "Gender", type: "dropdown", options: [{ label: "Male", value: "male" }, { label: "Female", value: "female" }] },
    { name: "documentNumber", label: "NIN", type: "text" },
    { name: "issueDate", label: "Issue Date", type: "date" },
  ],
  passport: [
    { name: "fullName", label: "Full Name", type: "text" },
    { name: "dateOfBirth", label: "Date of Birth", type: "date" },
    { name: "gender", label: "Gender", type: "dropdown", options: [{ label: "Male", value: "male" }, { label: "Female", value: "female" }] },
    { name: "documentNumber", label: "Passport Number", type: "text" },
    { name: "issueDate", label: "Issue Date", type: "date" },
    { name: "expiryDate", label: "Expiry Date", type: "date" },
    { name: "issuingAuthority", label: "Issuing Authority", type: "text" },
  ],
  drivers_license: [
    { name: "fullName", label: "Full Name", type: "text" },
    { name: "dateOfBirth", label: "Date of Birth", type: "date" },
    { name: "documentNumber", label: "License Number", type: "text" },
    { name: "issueDate", label: "Issue Date", type: "date" },
    { name: "expiryDate", label: "Expiry Date", type: "date" },
    { name: "issuingAuthority", label: "Issuing Authority", type: "text" },
  ],
  health_card: [
    { name: "fullName", label: "Full Name", type: "text" },
    { name: "documentNumber", label: "Health Card Number", type: "text" },
    { name: "issueDate", label: "Issue Date", type: "date" },
  ],
  other: [
    { name: "documentName", label: "Document Name", type: "text" },
    { name: "documentNumber", label: "Document Number", type: "text" },
    { name: "issueDate", label: "Issue Date", type: "date" },
    { name: "expiryDate", label: "Expiry Date", type: "date" },
  ]
};

export default function DocumentUploadScreen() {
  const router = useRouter();
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const [selectedDocumentType, setSelectedDocumentType] = useState(null);
  const [documentImages, setDocumentImages] = useState({ front: null, back: null }); // { front: { uri, name }, back: { uri, name } }
  const [documentDetails, setDocumentDetails] = useState({});
  const [reasonForLinking, setReasonForLinking] = useState('');
  const [showReasonForLinking, setShowReasonForLinking] = useState(false); // Placeholder for conditional display
  const [progressSteps, setProgressSteps] = useState([
    { id: 1, title: 'Select Document Type', status: 'in_progress', icon: 'document-outline' },
    { id: 2, title: 'Upload Images', status: 'pending', icon: 'cloud-upload-outline' },
    { id: 3, title: 'Enter Details', status: 'pending', icon: 'text-outline' },
    { id: 4, title: 'Review & Submit', status: 'pending', icon: 'checkmark-done-outline' },
  ]);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);

  const handleDocumentTypeChange = (value) => {
    setSelectedDocumentType(value);
    setDocumentDetails({}); // Reset details when document type changes
    // Update progress
    updateProgress(1, 'completed');
    updateProgress(2, 'in_progress');
  };

  const pickImage = async (side) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const fileName = uri.split('/').pop();
      setDocumentImages(prev => ({ ...prev, [side]: { uri, name: fileName } }));
      // Placeholder for OCR scan
      Alert.alert('OCR Scan', `Simulating OCR scan for ${side} image.`);
      // In a real app, send image to OCR service and populate documentDetails
      // For now, just update progress
      updateProgress(2, 'completed');
      updateProgress(3, 'in_progress');
    }
  };

  const updateProgress = (stepId, status) => {
    setProgressSteps(prevSteps =>
      prevSteps.map(step =>
        step.id === stepId ? { ...step, status: status } : step
      )
    );
  };

  const handleDetailChange = (fieldName, value) => {
    setDocumentDetails(prev => ({ ...prev, [fieldName]: value }));
  };

  const handleProceed = () => {
    // Validate if all required documents are uploaded and details filled
    if (!selectedDocumentType) {
      Alert.alert('Validation Error', 'Please select a document type.');
      return;
    }
    if (!documentImages.front) {
      Alert.alert('Validation Error', 'Please upload the front image of the document.');
      return;
    }
    // Basic validation for document details
    const currentDocFields = documentFields[selectedDocumentType] || [];
    for (const field of currentDocFields) {
      if (field.type !== 'date' && !documentDetails[field.name]) { // Simple check, can be more robust
        Alert.alert('Validation Error', `Please fill in ${field.label}.`);
        return;
      }
    }

    // Placeholder for validation against existing linked documents
    // For now, just navigate to the summary page
    router.push({
      pathname: '/id-application/summary-confirmation',
      params: {
        ...params,
        selectedDocumentType,
        documentImages: JSON.stringify(documentImages),
        documentDetails: JSON.stringify(documentDetails),
        reasonForLinking,
      }
    });
  };

  if (!fontsLoaded) {
    return null;
  }

  const renderDocumentFields = () => {
    if (!selectedDocumentType) return null;

    const fields = documentFields[selectedDocumentType];
    return (
      <View style={{ marginBottom: 24 }}>
        <Text style={{
          fontFamily: 'Inter_600SemiBold',
          fontSize: 20,
          color: colors.text,
          marginBottom: 16,
        }}>
          Basic Document Information
        </Text>
        {fields.map((field, index) => (
          <View key={index} style={{ marginBottom: 16 }}>
            <Text style={{
              fontFamily: 'Inter_500Medium',
              fontSize: 14,
              color: colors.text,
              marginBottom: 8,
            }}>
              {field.label}
            </Text>
            {field.type === 'dropdown' ? (
              <DropdownPicker
                items={field.options}
                defaultValue={documentDetails[field.name]}
                onValueChange={(value) => handleDetailChange(field.name, value)}
                placeholder={field.label}
              />
            ) : (
              <TextInput
                style={{
                  backgroundColor: colors.inputBackground,
                  color: colors.text,
                  borderRadius: 12,
                  padding: 16,
                  fontFamily: 'Inter_400Regular',
                  fontSize: 16,
                  borderWidth: 1,
                  borderColor: colors.border,
                }}
                placeholder={field.label}
                placeholderTextColor={colors.textSecondary}
                value={documentDetails[field.name]}
                onChangeText={(text) => handleDetailChange(field.name, text)}
                keyboardType={field.type === 'number' ? 'numeric' : 'default'}
              />
            )}
          </View>
        ))}
      </View>
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#10B981';
      case 'in_progress': return '#F59E0B';
      case 'pending': return '#6B7280';
      default: return '#6B7280';
    }
  };

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
            Document Upload
          </Text>

          <View style={{ width: 24 }} />
        </View>

        {/* Progress Tracker */}
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
            Application Progress
          </Text>

          <View style={{ gap: 20 }}>
            {progressSteps.map((step, index) => {
              const isLast = index === progressSteps.length - 1;
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
                        name={step.icon} 
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
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Document Type Selection */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 20,
            color: colors.text,
            marginBottom: 16,
          }}>
            Select Document Type
          </Text>
          <DropdownPicker
            items={documentTypes}
            selectedValue={selectedDocumentType}
            onValueChange={handleDocumentTypeChange}
            placeholder="Choose Document Type"
          />
        </View>

        {/* Document Image Upload */}
        {selectedDocumentType && (
          <View style={{ marginBottom: 24 }}>
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 20,
              color: colors.text,
              marginBottom: 16,
            }}>
              Upload Document Images
            </Text>

            {/* Front Image */}
            <View style={{ marginBottom: 16 }}>
              <Text style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 14,
                color: colors.text,
                marginBottom: 8,
              }}>
                Front Image (Required)
              </Text>
              <TouchableOpacity
                onPress={() => pickImage('front')}
                style={{
                  backgroundColor: colors.inputBackground,
                  borderRadius: 12,
                  padding: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 1,
                  borderColor: colors.border,
                  height: 150,
                }}
              >
                {documentImages.front ? (
                  <Image source={{ uri: documentImages.front.uri }} style={{ width: '100%', height: '100%', borderRadius: 8 }} resizeMode="contain" />
                ) : (
                  <View style={{ alignItems: 'center' }}>
                    <Ionicons name="camera-outline" size={30} color={colors.textSecondary} />
                    <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 14, color: colors.textSecondary, marginTop: 8 }}>
                      Tap to Upload Front Image
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
              {documentImages.front && (
                <TouchableOpacity 
                  onPress={() => setDocumentImages(prev => ({ ...prev, front: null }))}
                  style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    borderRadius: 15,
                    padding: 5,
                  }}
                >
                  <Ionicons name="close-circle" size={20} color="white" />
                </TouchableOpacity>
              )}
            </View>

            {/* Back Image (Optional) */}
            <View>
              <Text style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 14,
                color: colors.text,
                marginBottom: 8,
              }}>
                Back Image (Optional)
              </Text>
              <TouchableOpacity
                onPress={() => pickImage('back')}
                style={{
                  backgroundColor: colors.inputBackground,
                  borderRadius: 12,
                  padding: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 1,
                  borderColor: colors.border,
                  height: 150,
                }}
              >
                {documentImages.back ? (
                  <Image source={{ uri: documentImages.back.uri }} style={{ width: '100%', height: '100%', borderRadius: 8 }} resizeMode="contain" />
                ) : (
                  <View style={{ alignItems: 'center' }}>
                    <Ionicons name="camera-outline" size={30} color={colors.textSecondary} />
                    <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 14, color: colors.textSecondary, marginTop: 8 }}>
                      Tap to Upload Back Image
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
              {documentImages.back && (
                <TouchableOpacity 
                  onPress={() => setDocumentImages(prev => ({ ...prev, back: null }))}
                  style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    borderRadius: 15,
                    padding: 5,
                  }}
                >
                  <Ionicons name="close-circle" size={20} color="white" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}

        {/* Basic Document Info */}
        {selectedDocumentType && renderDocumentFields()}

        {/* Reason for Linking / Replacement */}
        {showReasonForLinking && ( // This will be conditionally rendered based on actual logic later
          <View style={{ marginBottom: 24 }}>
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 20,
              color: colors.text,
              marginBottom: 16,
            }}>
              Reason for Linking / Replacement (Optional)
            </Text>
            <TextInput
              style={{
                backgroundColor: colors.inputBackground,
                color: colors.text,
                borderRadius: 12,
                padding: 16,
                fontFamily: 'Inter_400Regular',
                fontSize: 16,
                borderWidth: 1,
                borderColor: colors.border,
                minHeight: 100,
                textAlignVertical: 'top',
              }}
              placeholder="e.g. Old document expired, Lost previous card, Updated details"
              placeholderTextColor={colors.textSecondary}
              value={reasonForLinking}
              onChangeText={setReasonForLinking}
              multiline
            />
          </View>
        )}

        {/* Upload Tips */}
        <View style={{
          backgroundColor: colors.cardBackground,
          borderRadius: 16,
          padding: 20,
          marginTop: 16,
        }}>
          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 16,
            color: colors.text,
            marginBottom: 12,
          }}>
            Upload Tips
          </Text>

          <View style={{ gap: 8 }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <Ionicons name="checkmark-circle" size={16} color="#10B981" />
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 14,
                color: colors.textSecondary,
                marginLeft: 8,
                flex: 1,
              }}>
                Ensure documents are clear and legible
              </Text>
            </View>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <Ionicons name="checkmark-circle" size={16} color="#10B981" />
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 14,
                color: colors.textSecondary,
                marginLeft: 8,
                flex: 1,
              }}>
                Accepted formats: JPG, PNG (max 5MB per file)
              </Text>
            </View>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <Ionicons name="checkmark-circle" size={16} color="#10B981" />
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 14,
                color: colors.textSecondary,
                marginLeft: 8,
                flex: 1,
              }}>
                Upload a recent passport-sized photo with a white background
              </Text>
            </View>
          </View>
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
          onPress={handleProceed}
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
            Proceed to Summary
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Add any specific styles for this component if needed, or reuse global styles
});
