import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from "@/context/ThemeContext"; // Assuming useTheme is available
import DropdownPicker from '../../components/DropdownPicker'; // Import DropdownPicker

const ApplicationForm = () => {
  const router = useRouter();
  const { colors } = useTheme(); // Access theme colors
  const { idType, idName, applicationType, reason } = useLocalSearchParams();

  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [nationality, setNationality] = useState('United States'); // Default to a generic country
  const [updateFields, setUpdateFields] = useState([]); // For 'update_info' application type
  const [reasonText, setReasonText] = useState(''); // For 'update_info' application type

  // Placeholder for pre-filling data
  React.useEffect(() => {
    if (applicationType === 'renewal' || applicationType === 'update_info') {
      // In a real application, you would fetch existing user data here
      // For now, we'll simulate pre-filling
      setFirstName('John');
      setLastName('Doe');
      setDateOfBirth('1990-01-01');
      setGender('male');
      setMaritalStatus('single');
      setNationality('United States'); // Pre-fill nationality
      // Other fields would be pre-filled similarly
    }
  }, [applicationType]);

  const handleNext = () => {
    // Navigate to the document upload section or summary page
    router.push({
      pathname: '/id-application/document-upload', // Assuming this is the next step
      params: {
        idType,
        idName,
        applicationType,
        reason,
        firstName,
        lastName,
        nationality, // Pass nationality
        // Pass all form data
      }
    });
  };

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
    // This would ideally come from a centralized reasons list or API
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

  const countries = [
    { label: 'United States', value: 'United States' },
    { label: 'Canada', value: 'Canada' },
    { label: 'United Kingdom', value: 'United Kingdom' },
    { label: 'Australia', value: 'Australia' },
    { label: 'Germany', value: 'Germany' },
    { label: 'France', value: 'France' },
    { label: 'Japan', value: 'Japan' },
    { label: 'Brazil', value: 'Brazil' },
    { label: 'India', value: 'India' },
    { label: 'South Africa', value: 'South Africa' },
  ];

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Application Form',
          headerStyle: { backgroundColor: '#1a1a1a' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.stepText}>Step 1 of 5</Text>
          <View style={styles.progressBarContainer}>
            {/* Placeholder for actual progress bar */}
            <View style={styles.progressBarFill} />
          </View>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <Text style={styles.sectionDescription}>Basic personal details and identification</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.applicationTypeTag}>
            <Text style={styles.applicationTypeTagText}>
              Application Type: {getApplicationTypeDisplayName(applicationType)}
              {reason && ` (${getReasonDisplayName(reason)})`}
            </Text>
          </View>

          {applicationType === 'update_info' && (
            <View>
              <Text style={styles.label}>Fields to Update <Text style={styles.required}>*</Text></Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={updateFields}
                  onValueChange={(itemValue) => setUpdateFields(itemValue)}
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                  mode="dropdown"
                >
                  <Picker.Item label="Select fields to update" value="" />
                  <Picker.Item label="Address" value="address" />
                  <Picker.Item label="Marital Status" value="marital_status" />
                  <Picker.Item label="Name" value="name" />
                  <Picker.Item label="Other" value="other" />
                </Picker>
              </View>

              <Text style={styles.label}>Reason for Update <Text style={styles.required}>*</Text></Text>
              <TextInput
                style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
                placeholder="Provide a detailed reason for the update *"
                placeholderTextColor="#888"
                multiline
                value={reasonText}
                onChangeText={setReasonText}
              />
            </View>
          )}

          <Text style={styles.label}>First Name <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={styles.input}
            placeholder="Enter first name *"
            placeholderTextColor="#888"
            value={firstName}
            onChangeText={setFirstName}
            editable={applicationType !== 'replace_lost_stolen'} // Example: Not editable for lost/stolen
          />

          <Text style={styles.label}>Middle Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter middle name"
            placeholderTextColor="#888"
            value={middleName}
            onChangeText={setMiddleName}
          />

          <Text style={styles.label}>Last Name <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={styles.input}
            placeholder="Enter last name *"
            placeholderTextColor="#888"
            value={lastName}
            onChangeText={setLastName}
          />

          <Text style={styles.label}>Date of Birth <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={styles.input}
            placeholder="Enter date of birth *"
            placeholderTextColor="#888"
            value={dateOfBirth}
            onChangeText={setDateOfBirth}
          />

          <Text style={styles.label}>Gender <Text style={styles.required}>*</Text></Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue) => setGender(itemValue)}
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              <Picker.Item label="Select Gender" value="" />
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
              <Picker.Item label="Other" value="other" />
            </Picker>
          </View>

          <Text style={styles.label}>Marital Status <Text style={styles.required}>*</Text></Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={maritalStatus}
              onValueChange={(itemValue) => setMaritalStatus(itemValue)}
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              <Picker.Item label="Select Marital Status" value="" />
              <Picker.Item label="Single" value="single" />
              <Picker.Item label="Married" value="married" />
              <Picker.Item label="Divorced" value="divorced" />
              <Picker.Item label="Widowed" value="widowed" />
            </Picker>
          </View>

          <Text style={styles.label}>Nationality <Text style={styles.required}>*</Text></Text>
          <DropdownPicker
            label="Nationality"
            items={countries}
            selectedValue={nationality}
            onValueChange={setNationality}
          />
        </View>
        
        {/* Document Upload Section - Placeholder */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Document Upload</Text>
          <Text style={styles.sectionDescription}>Upload required documents for your application</Text>
          <TouchableOpacity style={styles.uploadButton}>
            <Text style={styles.uploadButtonText}>Upload Documents</Text>
          </TouchableOpacity>
          <Text style={styles.uploadHint}>
            (e.g., Passport Photo, Birth Certificate, Police Report, etc. based on ID and Application Type)
          </Text>
        </View>

        <View style={styles.importantBox}>
          <Text style={styles.importantTitle}>⚠️ Important</Text>
          <Text style={styles.importantText}>• Ensure all information matches your official documents</Text>
          <Text style={styles.importantText}>• Fields marked with <Text style={styles.required}>*</Text> are required</Text>
          <Text style={styles.importantText}>• Information provided will be verified against national databases</Text>
        </View>

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark background
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100, // Give some space for the button
  },
  header: {
    marginBottom: 20,
  },
  stepText: {
    color: '#00e676', // Green color for step indicator
    fontSize: 14,
    marginBottom: 5,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#333',
    borderRadius: 2,
    marginBottom: 10,
  },
  progressBarFill: {
    width: '20%', // Assuming Step 1 of 5 is 20%
    height: '100%',
    backgroundColor: '#00e676',
    borderRadius: 2,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sectionDescription: {
    color: '#aaa',
    fontSize: 14,
  },
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  applicationTypeTag: {
    backgroundColor: '#333',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
    marginBottom: 15,
  },
  applicationTypeTagText: {
    color: '#00e676',
    fontSize: 12,
    fontWeight: 'bold',
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
    marginTop: 15,
  },
  required: {
    color: '#ff5252', // Red color for required asterisk
  },
  input: {
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
  },
  pickerContainer: {
    backgroundColor: '#333',
    borderRadius: 8,
    marginBottom: 10,
    justifyContent: 'center',
    height: 50, // Ensure consistent height with TextInput
  },
  picker: {
    color: '#fff',
    height: 50,
    width: '100%',
  },
  pickerItem: {
    color: '#fff', // This might not work on all platforms, styling Picker items is tricky
    backgroundColor: '#333', // Background for dropdown items
  },
  importantBox: {
    backgroundColor: '#332b1a', // Yellowish dark background
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderLeftWidth: 5,
    borderColor: '#ffc107', // Yellow border
  },
  importantTitle: {
    color: '#ffc107',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  importantText: {
    color: '#ccc',
    fontSize: 13,
    marginBottom: 3,
  },
  nextButton: {
    backgroundColor: '#00e676', // Green button
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    color: '#121212',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ApplicationForm;
