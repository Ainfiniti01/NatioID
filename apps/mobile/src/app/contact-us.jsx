import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

const ContactUs = () => {
  const router = useRouter();
  const supportEmail = 'support@example.com';
  const supportPhoneNumber = '+1234567890'; // Dummy phone number

  const handleEmailSupport = () => {
    const url = `mailto:${supportEmail}?subject=Support Request&body=Hello, I need assistance with...`;
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'No email app found or unable to open email client.');
    });
  };

  const handlePhoneSupport = () => {
    Alert.alert(
      'Call Support',
      `Do you want to call ${supportPhoneNumber}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Call',
          onPress: () => Linking.openURL(`tel:${supportPhoneNumber}`).catch(() => {
            Alert.alert('Error', 'Unable to make a phone call.');
          }),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Contact Us",
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 15 }}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>Get in Touch</Text>

        <TouchableOpacity style={styles.optionButton} onPress={() => router.push('/live-chat')}>
          <Text style={styles.optionButtonText}>Live Chat Support</Text>
          <Text style={styles.optionButtonDescription}>Chat with a human or AI agent</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton} onPress={handleEmailSupport}>
          <Text style={styles.optionButtonText}>Email Support</Text>
          <Text style={styles.optionButtonDescription}>Send us an email</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton} onPress={handlePhoneSupport}>
          <Text style={styles.optionButtonText}>Phone Support</Text>
          <Text style={styles.optionButtonDescription}>Call us directly</Text>
        </TouchableOpacity>

        {/* Add more contact options as needed */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  optionButton: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionButtonText: {
    fontSize: 18,
    color: '#007bff',
    fontWeight: '600',
  },
  optionButtonDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});

export default ContactUs;
