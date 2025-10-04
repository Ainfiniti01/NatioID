import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useTheme } from "@/context/ThemeContext"; // ✅ use theme context

const Icon = ({ name, color }) => (
  <Text style={{ fontSize: 24, color: color, marginRight: 10 }}>{name}</Text>
);

const reportTypes = [
  { id: '1', name: 'General Inquiry', description: 'Ask a question or provide feedback', icon: '❓', color: '#FFD700' },
  { id: '2', name: 'Technical Issue', description: 'Report a bug or technical problem', icon: '💻', color: '#FF6B6B' },
  { id: '3', name: 'Feature Request', description: 'Suggest a new feature or improvement', icon: '✨', color: '#6BFF6B' },
  { id: '4', name: 'Security Concern', description: 'Report a security vulnerability', icon: '🔒', color: '#FFA500' },
  { id: '5', name: 'Other', description: 'Report an issue not covered above', icon: '•••', color: '#A9A9A9' },
];

export default function NewReportScreen() {
  const router = useRouter();
  const { colors } = useTheme(); // ✅ pull theme colors
  const [selectedReportType, setSelectedReportType] = useState(null);

  const handleContinue = () => {
    if (selectedReportType) {
      router.push({
        pathname: '/new-report-details',
        params: { selectedReportType },
      });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'New Report',
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.text,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.push('/reports')}>
              <Text style={{ color: colors.text, fontSize: 24 }}>←</Text>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push('/reports')}>
              <Text style={{ color: colors.primary, fontSize: 16 }}>View All</Text>
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Progress Steps */}
        <View style={styles.progressBar}>
          {['Type', 'Details', 'Confirmation'].map((step, index) => (
            <View key={step} style={styles.progressStep}>
              <View style={[
                styles.progressCircle,
                { backgroundColor: index === 0 ? colors.primary : colors.surfaceSecondary }
              ]}>
                <Text style={{ color: colors.primaryText, fontWeight: 'bold' }}>{index + 1}</Text>
              </View>
              <Text style={[
                styles.progressText,
                { color: index === 0 ? colors.primary : colors.textSecondary }
              ]}>
                {step}
              </Text>
            </View>
          ))}
        </View>

        {/* Question */}
        <Text style={[styles.question, { color: colors.text }]}>
          What type of report are you submitting?
        </Text>
        <Text style={[styles.description, { color: colors.textSecondary }]}>
          Select the type of report that best describes your issue or request.
        </Text>

        {/* Report Types */}
        <View>
          {reportTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.reportTypeCard,
                { backgroundColor: colors.surface, borderColor: colors.border },
                selectedReportType === type.id && { borderColor: colors.primary }
              ]}
              onPress={() => setSelectedReportType(type.id)}
            >
              <View style={styles.reportTypeContent}>
                <Icon name={type.icon} color={type.color} />
                <View>
                  <Text style={[styles.reportTypeName, { color: colors.text }]}>{type.name}</Text>
                  <Text style={[styles.reportTypeDescription, { color: colors.textSecondary }]}>
                    {type.description}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Continue Button */}
      <TouchableOpacity
        style={[
          styles.continueButton,
          { backgroundColor: colors.primary },
          !selectedReportType && { backgroundColor: colors.textSecondary }
        ]}
        onPress={handleContinue}
        disabled={!selectedReportType}
      >
        <Text style={[styles.continueButtonText, { color: colors.primaryText }]}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 20, paddingBottom: 100 },
  progressBar: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30, marginTop: 10 },
  progressStep: { alignItems: 'center' },
  progressCircle: { width: 30, height: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginBottom: 5 },
  progressText: { fontSize: 12 },
  question: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  description: { fontSize: 14, marginBottom: 30 },
  reportTypeCard: { borderRadius: 10, padding: 15, marginBottom: 15, borderWidth: 1 },
  reportTypeContent: { flexDirection: 'row', alignItems: 'center' },
  reportTypeName: { fontSize: 18, fontWeight: 'bold' },
  reportTypeDescription: { fontSize: 12 },
  continueButton: { padding: 18, borderRadius: 10, alignItems: 'center', margin: 20, position: 'absolute', bottom: 0, left: 0, right: 0 },
  continueButtonText: { fontSize: 18, fontWeight: 'bold' }
});
