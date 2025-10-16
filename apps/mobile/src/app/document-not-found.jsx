import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DocumentNotFound = ({ document }) => {
  // This component will display a preview of a document.
  // The content displayed (front or back) will depend on the 'document' prop.
  // For now, it's a placeholder.

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Document Not Found</Text>
      <Text style={styles.message}>
        The document linked to your account could not be found.
      </Text>
      {/* Placeholder for document preview - this might not be relevant if the document is not found */}
      {/* but kept as per initial request for a preview page. */}
      <View style={styles.previewBox}>
        <Text style={styles.previewText}>Preview Unavailable</Text>
      </View>

      {/* Action buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => alert('Open Document action not implemented yet.')}>
          <Text style={styles.buttonText}>Open Document</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => alert('Download PDF action not implemented yet.')}>
          <Text style={styles.buttonText}>Download (PDF)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => alert('Share action not implemented yet.')}>
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => alert('Link Document action not implemented yet.')}>
          <Text style={styles.buttonText}>Link Document</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Add TouchableOpacity to imports
import { TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
  },
  previewBox: {
    width: '100%',
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 30, // Add margin to separate from buttons
  },
  previewText: {
    fontSize: 18,
    color: '#aaa',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginBottom: 15,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DocumentNotFound;
