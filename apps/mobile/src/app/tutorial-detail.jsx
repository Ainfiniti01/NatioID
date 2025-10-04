import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { tutorials as allTutorials } from '../utils/data';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from "@/context/ThemeContext";

const TutorialDetail = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { colors } = useTheme();
  const tutorialId = parseInt(id);
  const tutorial = allTutorials.find((t) => t.id === tutorialId);

  if (!tutorial) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Stack.Screen options={{ title: 'Tutorial Not Found' }} />
        <Text style={[styles.errorText, { color: colors.text }]}>Tutorial not found.</Text>
      </View>
    );
  }

  const getTutorialContent = (title) => {
    switch (title) {
      case 'How to Register':
        return `
          Step 1: Download the app from your app store.
          Step 2: Open the app and click on "Register".
          Step 3: Fill in your personal details.
          Step 4: Verify your email/phone number.
          Step 5: Set up your PIN and biometric authentication.
        `;
      case 'How to Apply for ID':
        return `
          Step 1: Log in to your account.
          Step 2: Navigate to the "ID Application" section.
          Step 3: Select the type of ID you want to apply for.
          Step 4: Fill out the application form and upload the required documents.
          Step 5: Review and submit your application.
        `;
      case 'How to Vote':
        return `
          Step 1: Ensure you are registered to vote.
          Step 2: Go to the "Voting" section in the app.
          Step 3: Select the election you want to vote in.
          Step 4: Follow the on-screen instructions to cast your vote.
          Step 5: Confirm your vote.
        `;
      case 'Digital ID Setup':
        return `
          Step 1: After registering, navigate to the "Digital ID" tab.
          Step 2: Follow the prompts to set up your digital ID.
          Step 3: You may need to verify your identity again.
          Step 4: Once set up, you can use your digital ID for verification.
        `;
      case 'Report Lost Documents':
        return `
          Step 1: Go to the "Reports" section.
          Step 2: Select "Report Lost Document".
          Step 3: Fill in the details of the lost document.
          Step 4: Submit the report. You will receive a confirmation.
        `;
      case 'Emergency SOS':
        return `
          Step 1: In the app, locate the "SOS" button.
          Step 2: Press and hold the button for 3 seconds to activate.
          Step 3: Your location will be sent to your emergency contacts.
        `;
      case 'Privacy Settings':
        return `
          Step 1: Go to your "Profile" and select "Settings".
          Step 2: Tap on "Privacy Settings".
          Step 3: Adjust your data sharing and other privacy preferences.
          Step 4: Save your changes.
        `;
      default:
        return tutorial.description;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: tutorial.title,
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 15 }}>
              <Ionicons name="arrow-back" size={24} color={colors.text} />
            </TouchableOpacity>
          ),
          headerStyle: { backgroundColor: colors.background },
          headerTitleStyle: { color: colors.text },
        }}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.contentBox, { backgroundColor: colors.surface }]} >
          <Text style={[styles.title, { color: colors.text }]}>{tutorial.title}</Text>
          <Text style={[styles.tutorialText, { color: colors.textSecondary }]}>{getTutorialContent(tutorial.title)}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  contentBox: {
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  tutorialText: {
    fontSize: 16,
    lineHeight: 24,
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
});

export default TutorialDetail;
