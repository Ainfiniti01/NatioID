import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Stack, useRouter } from 'expo-router'; // Assuming expo-router for navigation and stack header
// Placeholder for icons - in a real app, these would be imported from an icon library
const Icon = ({ name, color }) => <Text style={{ fontSize: 20, color: color, marginRight: 10 }}>{name}</Text>;

const documentTypes = [
  { id: '1', name: 'National ID Card', icon: '💳' },
  { id: '2', name: 'International Passport', icon: '✈️' },
  { id: '3', name: 'Driver\'s License', icon: '🚗' },
  { id: '4', name: 'Voter\'s Card', icon: '✅' },
  { id: '5', name: 'Birth Certificate', icon: '📄' },
  { id: '6', name: 'Other Document', icon: '•••' },
];

const ReportLostScreen = () => {
  const router = useRouter();
  const [reportType, setReportType] = useState('Lost'); // 'Lost' or 'Stolen'
  const [selectedDocumentType, setSelectedDocumentType] = useState(null);
  const [lastSeenLocation, setLastSeenLocation] = useState('');
  const [dateTime, setDateTime] = useState(''); // Placeholder for date/time input
  const [description, setDescription] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');

  const handleSubmitReport = async () => {
    // Basic validation
    if (!selectedDocumentType || !lastSeenLocation || !description) {
      alert('Please fill in all required fields (Document Type, Last Seen Location, Description).');
      return;
    }

    // Simulate API call to submit the lost/stolen report
    console.log('Submitting Lost/Stolen Report:', {
      reportType,
      selectedDocumentType,
      lastSeenLocation,
      dateTime,
      description,
      emergencyContact,
    });
    
    // Simulate a unique reference ID generation
    const referenceId = `LSR-${Math.floor(Math.random() * 1000000)}`;

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // 1. Acknowledgment & Confirmation:
    // Simulate SMS/email confirmation
    console.log(`SMS/Email Sent: Your lost/stolen ID report with Reference ID ${referenceId} has been received.`);

    // 2. Review Process:
    console.log(`Report ${referenceId} queued for review by relevant authority within 24 hours.`);

    // 3. Replacement Initiation:
    // This would typically be triggered after review, but we'll simulate initiation here for now.
    console.log(`Replacement/reissuance process for report ${referenceId} initiated (pending verification).`);

    // After successful submission, navigate to a success screen with confirmation details
    router.push({
      pathname: '/report-success',
      params: { 
        reportType, 
        selectedDocumentType, 
        lastSeenLocation, 
        dateTime, 
        description, 
        emergencyContact,
        referenceId, 
        status: 'Under Review' 
      },
    });
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Report Lost/Stolen ID',
          headerStyle: { backgroundColor: '#1a1a1a' },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.push('/services')}>
              <Text style={{ color: '#fff', fontSize: 24 }}>←</Text>
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Important Notice */}
        <View style={styles.noticeContainer}>
          <Text style={styles.noticeIcon}>⚠️</Text>
          <View style={styles.noticeTextContent}>
            <Text style={styles.noticeTitle}>Important Notice</Text>
            <Text style={styles.noticeDescription}>
              Reporting false information is a criminal offense. Only submit this report if your document is genuinely lost or stolen.
            </Text>
          </View>
        </View>

        {/* Report Type */}
        <Text style={styles.sectionTitle}>Report Type</Text>
        <View style={styles.reportTypeToggle}>
          <TouchableOpacity
            style={[styles.toggleButton, reportType === 'Lost' && styles.activeToggleButton]}
            onPress={() => setReportType('Lost')}
          >
            <Icon name="😔" color={reportType === 'Lost' ? '#fff' : '#ccc'} />
            <Text style={[styles.toggleButtonText, reportType === 'Lost' && styles.activeToggleButtonText]}>Lost</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, reportType === 'Stolen' && styles.activeToggleButton]}
            onPress={() => setReportType('Stolen')}
          >
            <Icon name="🛡️" color={reportType === 'Stolen' ? '#fff' : '#ccc'} />
            <Text style={[styles.toggleButtonText, reportType === 'Stolen' && styles.activeToggleButtonText]}>Stolen</Text>
          </TouchableOpacity>
        </View>

        {/* Document Type */}
        <Text style={styles.sectionTitle}>Document Type *</Text>
        <View style={styles.documentTypeList}>
          {documentTypes.map((doc) => (
            <TouchableOpacity
              key={doc.id}
              style={[
                styles.documentTypeCard,
                selectedDocumentType === doc.id && styles.selectedDocumentTypeCard,
              ]}
              onPress={() => setSelectedDocumentType(doc.id)}
            >
              <View style={styles.documentTypeContent}>
                <Icon name={doc.icon} color={selectedDocumentType === doc.id ? '#00C853' : '#ccc'} />
                <Text style={[styles.documentTypeName, selectedDocumentType === doc.id && styles.selectedDocumentTypeName]}>{doc.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Last Seen Location */}
        <Text style={styles.sectionTitle}>Last Seen Location *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Victoria Island, Lagos"
          placeholderTextColor="#888"
          value={lastSeenLocation}
          onChangeText={setLastSeenLocation}
        />
        <TextInput
          style={styles.input}
          placeholder="Date & Time (optional)"
          placeholderTextColor="#888"
          value={dateTime}
          onChangeText={setDateTime}
        />

        {/* Description */}
        <Text style={styles.sectionTitle}>Description *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Describe the circumstances of how the document was lost or stolen..."
          placeholderTextColor="#888"
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />

        {/* Emergency Contact */}
        <Text style={styles.sectionTitle}>Emergency Contact (Optional)</Text>
        <TextInput
          style={styles.input}
          placeholder="Phone number for urgent updates"
          placeholderTextColor="#888"
          keyboardType="phone-pad"
          value={emergencyContact}
          onChangeText={setEmergencyContact}
        />
      </ScrollView>

      {/* Submit Button */}
      <TouchableOpacity
        style={[styles.submitButton, (!selectedDocumentType || !lastSeenLocation || !description) && styles.disabledButton]}
        onPress={handleSubmitReport}
        disabled={!selectedDocumentType || !lastSeenLocation || !description}
      >
        <Text style={styles.submitButtonText}>Submit Report</Text>
      </TouchableOpacity>

      {/* What happens next? */}
      <View style={styles.footerContainer}>
        <Text style={styles.footerTitle}>What happens next?</Text>
        <Text style={styles.footerBullet}>• Your report will be reviewed within 24 hours</Text>
        <Text style={styles.footerBullet}>• You'll receive a confirmation SMS and email</Text>
        <Text style={styles.footerBullet}>• A replacement process will be initiated</Text>
        <Text style={styles.footerBullet}>• Track status in the Reports section</Text>
      </View>
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
    paddingBottom: 200, // Space for fixed button and footer
  },
  noticeContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFD70020', // Light yellow background with transparency
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    alignItems: 'flex-start',
    borderLeftWidth: 4,
    borderColor: '#FFD700',
  },
  noticeIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  noticeTextContent: {
    flex: 1,
  },
  noticeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 5,
  },
  noticeDescription: {
    fontSize: 12,
    color: '#ccc',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    marginTop: 20,
  },
  reportTypeToggle: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: '#1a1a1a', // Invisible border for spacing
  },
  activeToggleButton: {
    backgroundColor: '#00C853',
    borderColor: '#00C853',
  },
  toggleButtonText: {
    color: '#ccc',
    fontSize: 16,
    fontWeight: 'bold',
  },
  activeToggleButtonText: {
    color: '#fff',
  },
  documentTypeList: {
    marginBottom: 20,
  },
  documentTypeCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  selectedDocumentTypeCard: {
    borderColor: '#00C853',
  },
  documentTypeContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  documentTypeName: {
    fontSize: 16,
    color: '#fff',
  },
  selectedDocumentTypeName: {
    color: '#00C853',
  },
  input: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 15,
    color: '#fff',
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#00C853',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  disabledButton: {
    backgroundColor: '#00C85380',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerContainer: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  footerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  footerBullet: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 5,
  },
});

export default ReportLostScreen;
