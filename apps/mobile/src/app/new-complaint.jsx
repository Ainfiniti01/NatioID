import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch, StyleSheet } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useTheme } from "@/context/ThemeContext"; // ✅ use theme context

const Icon = ({ name, color }) => (
  <Text style={{ fontSize: 24, color: color, marginRight: 10 }}>{name}</Text>
);

const categories = [
  { id: '1', name: 'Infrastructure', description: 'Roads, bridges, public utilities', icon: '🚧', color: '#FF6B6B' },
  { id: '2', name: 'Healthcare', description: 'Hospitals, clinics, medical services', icon: '🏥', color: '#6BFF6B' },
  { id: '3', name: 'Education', description: 'Schools, universities, educational facilities', icon: '🎓', color: '#6B6BFF' },
  { id: '4', name: 'Security', description: 'Police, safety, crime-related issues', icon: '🚨', color: '#FFA500' },
  { id: '5', name: 'Environment', description: 'Pollution, waste management, sanitation', icon: '🌳', color: '#00FF00' },
  { id: '6', name: 'Governance', description: 'Government services, corruption, transparency', icon: '🏛️', color: '#8A2BE2' },
  { id: '7', name: 'Utilities', description: 'Water, electricity, telecommunications', icon: '⚡', color: '#FFD700' },
  { id: '8', name: 'Other', description: 'Issues not covered in other categories', icon: '•••', color: '#A9A9A9' },
];

export default function NewComplaintScreen() {
  const router = useRouter();
  const { colors } = useTheme(); // ✅ pull from theme
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isPublic, setIsPublic] = useState(false);

  const handleContinue = () => {
    if (selectedCategory) {
      router.push({
        pathname: '/new-complaint-details',
        params: { selectedCategory, isPublic: isPublic.toString() },
      });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'New Complaint',
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.text,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.push('/reports')}>
              <Text style={{ color: colors.text, fontSize: 24 }}>←</Text>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push('/complaints')}>
              <Text style={{ color: colors.primary, fontSize: 16 }}>View All</Text>
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Progress Steps */}
        <View style={styles.progressBar}>
          {['Category', 'Details', 'Location', 'Review'].map((step, index) => (
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

        <Text style={[styles.question, { color: colors.text }]}>
          What type of issue are you reporting?
        </Text>
        <Text style={[styles.description, { color: colors.textSecondary }]}>
          Select the category that best describes your complaint to help us route it to the appropriate department.
        </Text>

        {/* Categories */}
        <View>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryCard,
                { backgroundColor: colors.surface, borderColor: colors.border },
                selectedCategory === category.id && { borderColor: colors.primary }
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <View style={styles.categoryContent}>
                <Icon name={category.icon} color={category.color} />
                <View>
                  <Text style={[styles.categoryName, { color: colors.text }]}>{category.name}</Text>
                  <Text style={[styles.categoryDescription, { color: colors.textSecondary }]}>{category.description}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Public Toggle */}
        <View style={[
          styles.publicToggleContainer,
          { backgroundColor: colors.surface, borderColor: colors.border }
        ]}>
          <Text style={[styles.publicToggleText, { color: colors.text }]}>Make Public?</Text>
          <Switch
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={colors.primaryText}
            onValueChange={setIsPublic}
            value={isPublic}
          />
        </View>
      </ScrollView>

      {/* Continue Button */}
      <TouchableOpacity
        style={[
          styles.continueButton,
          { backgroundColor: colors.primary },
          !selectedCategory && { backgroundColor: colors.textSecondary }
        ]}
        onPress={handleContinue}
        disabled={!selectedCategory}
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
  categoryCard: { borderRadius: 10, padding: 15, marginBottom: 15, borderWidth: 1 },
  categoryContent: { flexDirection: 'row', alignItems: 'center' },
  categoryName: { fontSize: 18, fontWeight: 'bold' },
  categoryDescription: { fontSize: 12 },
  publicToggleContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: 10, padding: 15, marginBottom: 15, borderWidth: 1 },
  publicToggleText: { fontSize: 18, fontWeight: 'bold' },
  continueButton: { padding: 18, borderRadius: 10, alignItems: 'center', margin: 20, position: 'absolute', bottom: 0, left: 0, right: 0 },
  continueButtonText: { fontSize: 18, fontWeight: 'bold' }
});
