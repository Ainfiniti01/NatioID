import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Assuming react-navigation is used for navigation

function GenericErrorBoundary({ error }) {
  const navigation = useNavigation();

  const handleGoHome = () => {
    // Navigate to the home screen. Adjust the route name if necessary.
    // This assumes there's a route named 'index' or similar for the home screen.
    // If using expo-router, you might need to use router.replace('/') or similar.
    // For simplicity, let's assume a basic navigation action.
    if (navigation && typeof navigation.navigate === 'function') {
      navigation.navigate('index'); // Replace 'index' with your home screen route name
    } else {
      // Fallback if navigation is not available or navigate function is missing
      console.error("Navigation or navigate function not available.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Something went wrong!</Text>
      <Text style={styles.errorMessage}>
        {error.message || 'An unexpected error occurred.'}
      </Text>
      <Text style={styles.details}>
        Error details: {error.stack || 'No stack trace available.'}
      </Text>
      <Button title="Go to Home" onPress={handleGoHome} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e53935', // Red color for error
    marginBottom: 10,
  },
  errorMessage: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  details: {
    fontSize: 12,
    color: '#777',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default GenericErrorBoundary;
