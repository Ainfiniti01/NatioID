import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from "@/context/ThemeContext"; // Assuming useTheme is available

const DropdownPicker = ({ label, items, selectedValue, onValueChange, disabled }) => {
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (itemValue) => {
    onValueChange(itemValue);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.pickerButton,
          {
            backgroundColor: disabled ? colors.surfaceSecondary : colors.cardBackground,
            borderColor: colors.border,
          },
        ]}
        onPress={() => setModalVisible(true)}
        disabled={disabled}
      >
        <Text style={[styles.pickerButtonText, { color: disabled ? colors.textSecondary : colors.text }]}>
          {items.find(item => item.value === selectedValue)?.flag} {items.find(item => item.value === selectedValue)?.label || `Select ${label}`}
        </Text>
        <Ionicons name="chevron-down" size={20} color={colors.textSecondary} />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.centeredView}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)} // Close modal when clicking outside
        >
          <View style={[styles.modalView, { backgroundColor: colors.cardBackground }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Select {label}</Text>
            <ScrollView style={styles.optionsContainer}>
              {items.map((item, index) => (
                <TouchableOpacity
                  key={item.value || index} // Use item.value as key if available, otherwise index
                  style={[
                    styles.optionItem,
                    { borderBottomColor: colors.border },
                    selectedValue === item.value && { backgroundColor: colors.surfaceSecondary },
                  ]}
                  onPress={() => handleSelect(item.value)}
                >
                  <Text style={[styles.optionText, { color: colors.text }]}>{item.flag} {item.label}</Text>
                  {selectedValue === item.value && (
                    <Ionicons name="checkmark" size={20} color={colors.primary} />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={[styles.closeButton, { backgroundColor: colors.primary }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={[styles.closeButtonText, { color: colors.primaryText }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  pickerButton: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pickerButtonText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
    maxHeight: '70%',
  },
  modalTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    marginBottom: 20,
  },
  optionsContainer: {
    width: '100%',
    maxHeight: 200, // Limit height for scrollability
    marginBottom: 15,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
  },
  optionText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
  },
  closeButton: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
  },
});

export default DropdownPicker;
