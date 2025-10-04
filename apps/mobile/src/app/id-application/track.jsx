import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from "@/context/ThemeContext";

const MyApplications = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState('All'); // 'All', 'Success', 'Pending', 'Rejected', 'Needs More Info'
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest'

  // Dummy data for applications
  const allApplications = [
    {
      id: '1',
      documentType: 'National ID',
      applicationDate: '2023-01-15',
      status: 'Success',
      referenceId: 'NID-12345',
    },
    {
      id: '2',
      documentType: 'Voter’s Card',
      applicationDate: '2023-02-20',
      status: 'Pending',
      referenceId: 'VOT-67890',
    },
    {
      id: '3',
      documentType: 'Driver’s License',
      applicationDate: '2023-03-10',
      status: 'Rejected',
      reason: 'Incomplete documents',
      referenceId: 'DRV-11223',
    },
    {
      id: '4',
      documentType: 'Passport',
      applicationDate: '2023-04-01',
      status: 'Needs More Info',
      referenceId: 'PAS-44556',
    },
    {
      id: '5',
      documentType: 'National ID',
      applicationDate: '2023-05-01',
      status: 'Pending',
      referenceId: 'NID-98765',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Success':
        return '#4CAF50'; // Green
      case 'Pending':
        return '#FFC107'; // Amber
      case 'Rejected':
        return '#F44336'; // Red
      case 'Needs More Info':
        return '#2196F3'; // Blue
      default:
        return colors.textSecondary; // Grey
    }
  };

  const handleCardPress = (application) => {
    router.push({
      pathname: `/id-application/application-status`,
      params: {
        id: application.id,
        idType: application.documentType,
        applicationType: 'renewal', // Example, you might want to pass the actual type
        renewalReason: 'lost_or_stolen', // Example
        applicationId: application.id,
        selectedDocumentType: application.documentType,
        documentDetails: JSON.stringify({
          'Reference ID': application.referenceId,
          'Application Date': application.applicationDate,
        }),
        reasonForLinking: application.reason || '',
      },
    });
  };

  const filteredApplications = allApplications
    .filter(app => 
      app.documentType.toLowerCase().includes(searchText.toLowerCase()) ||
      app.referenceId.toLowerCase().includes(searchText.toLowerCase())
    )
    .filter(app => 
      filterStatus === 'All' || app.status === filterStatus
    )
    .sort((a, b) => {
      const dateA = new Date(a.applicationDate);
      const dateB = new Date(b.applicationDate);
      return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
    });

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen options={{ headerShown: false }} /> {/* Hide default header */}
      
      {/* Custom Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10, backgroundColor: colors.background }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>My Applications</Text>
        <View style={styles.rightHeaderPlaceholder} />
      </View>

      {/* Search and Filter */}
      <View style={[styles.searchFilterContainer, { backgroundColor: colors.cardBackground }]}>
        <View style={[styles.searchInputContainer, { borderColor: colors.border }]}>
          <Ionicons name="search" size={20} color={colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search by document type or ID"
            placeholderTextColor={colors.textSecondary}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        <View style={styles.filterSortRow}>
          <TouchableOpacity 
            style={[styles.filterSortButton, { borderColor: colors.border, backgroundColor: colors.surfaceSecondary }]}
            onPress={() => Alert.alert('Filter by Status', 'Choose a status to filter by: All, Success, Pending, Rejected, Needs More Info')}
          >
            <Ionicons name="filter" size={18} color={colors.text} />
            <Text style={[styles.filterSortText, { color: colors.text }]}>Filter: {filterStatus}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.filterSortButton, { borderColor: colors.border, backgroundColor: colors.surfaceSecondary }]}
            onPress={() => Alert.alert('Sort by', 'Choose sorting order: Newest, Oldest')}
          >
            <Ionicons name="swap-vertical" size={18} color={colors.text} />
            <Text style={[styles.filterSortText, { color: colors.text }]}>Sort: {sortBy === 'newest' ? 'Newest' : 'Oldest'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {filteredApplications.length > 0 ? (
          filteredApplications.map((app) => (
            <TouchableOpacity
              key={app.id}
              style={[styles.card, { backgroundColor: colors.cardBackground }]}
              onPress={() => handleCardPress(app)}
            >
              <View style={styles.cardHeader}>
              <Text style={[styles.documentType, { color: colors.text }]}>{app.documentType}</Text>
              <View style={styles.statusContainer}>
                {app.status === 'Success' && <Ionicons name="checkmark-circle" size={16} color="#4CAF50" style={styles.statusIcon} />}
                {app.status === 'Pending' && <Ionicons name="time-outline" size={16} color="#FFC107" style={styles.statusIcon} />}
                {app.status === 'Rejected' && <Ionicons name="close-circle" size={16} color="#F44336" style={styles.statusIcon} />}
                {app.status === 'Needs More Info' && <Ionicons name="alert-circle" size={16} color="#2196F3" style={styles.statusIcon} />}
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(app.status) }]}>
                  <Text style={styles.statusText}>{app.status}</Text>
                </View>
              </View>
            </View>
              <Text style={[styles.applicationDate, { color: colors.textSecondary }]}>Applied On: {app.applicationDate}</Text>
              {app.reason && <Text style={[styles.reasonText, { color: colors.error }]}>Reason: {app.reason}</Text>}
              {app.referenceId && <Text style={[styles.referenceId, { color: colors.textSecondary }]}>Ref ID: {app.referenceId}</Text>}
            </TouchableOpacity>
          ))
        ) : (
          <Text style={[styles.noApplicationsText, { color: colors.textSecondary }]}>No applications found.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0', // Use a neutral color, theme will override
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600', // Corresponds to Inter_600SemiBold
  },
  rightHeaderPlaceholder: {
    width: 24, // To balance the back button
  },
  searchFilterContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0', // Use a neutral color, theme will override
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  filterSortRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  filterSortButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
  },
  filterSortText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500', // Corresponds to Inter_500Medium
  },
  scrollViewContent: {
    padding: 16,
    paddingBottom: 20,
  },
  card: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIcon: {
    marginRight: 5,
  },
  documentType: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  applicationDate: {
    fontSize: 14,
    marginBottom: 4,
  },
  reasonText: {
    fontSize: 14,
    marginTop: 4,
  },
  referenceId: {
    fontSize: 14,
    marginTop: 4,
  },
  noApplicationsText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
  },
});

export default MyApplications;
