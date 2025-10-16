import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from "@/context/ThemeContext";

const mockSosHistory = [
  {
    id: 'SOS001',
    timestamp: '2025-09-15T08:45:00Z',
    status: 'resolved',
    location: 'Ikeja, Lagos',
    coords: '6.6059° N, 3.3491° E',
  },
  {
    id: 'SOS002',
    timestamp: '2025-09-14T22:10:00Z',
    status: 'sent',
    location: 'Victoria Island, Lagos',
    coords: '6.4281° N, 3.4218° E',
  },
  {
    id: 'SOS003',
    timestamp: '2025-09-12T14:00:00Z',
    status: 'failed',
    location: 'Lekki, Lagos',
    coords: '6.4589° N, 3.5763° E',
  },
];

export default function SOSHistoryScreen() {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [history, setHistory] = useState(mockSosHistory);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const getStatusConfig = (status) => {
    switch (status) {
      case 'sent':
        return { color: '#059669', bg: '#ECFDF5', text: 'Sent' };
      case 'resolved':
        return { color: '#059669', bg: '#ECFDF5', text: 'Resolved' };
      case 'failed':
        return { color: '#DC2626', bg: '#FEF2F2', text: 'Failed' };
      default:
        return { color: colors.textSecondary, bg: colors.surfaceSecondary, text: 'Unknown' };
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
  };

  const filteredHistory = history.filter(item =>
    item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    formatDateTime(item.timestamp).toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDark ? "light" : "dark"} />
      
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: insets.top + 20,
          paddingHorizontal: 20,
          paddingBottom: insets.bottom + 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Emergency History
          </Text>
          
          <View style={{ width: 24 }} />
        </View>

        {/* Search Bar */}
        <View style={[styles.searchContainer, { backgroundColor: colors.surfaceSecondary }]}>
          <Ionicons name="search-outline" size={20} color={colors.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search by date, location..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* SOS List */}
        {filteredHistory.length > 0 ? (
          filteredHistory.map((item) => {
            const statusConfig = getStatusConfig(item.status);
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.card, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}
                onPress={() => router.push(`/sos-detail?id=${item.id}`)}
              >
                <View style={styles.cardHeader}>
                  <Text style={[styles.cardDate, { color: colors.textSecondary }]}>
                    {formatDateTime(item.timestamp)}
                  </Text>
                  <View style={[styles.statusBadge, { backgroundColor: statusConfig.bg }]}>
                    <Text style={[styles.statusText, { color: statusConfig.color }]}>
                      {statusConfig.text}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.locationContainer}>
                  <Ionicons name="location-outline" size={16} color={colors.primary} />
                  <Text style={[styles.locationText, { color: colors.text }]}>
                    {item.location}
                  </Text>
                </View>

                <Text style={[styles.coordsText, { color: colors.textSecondary }]}>
                  {item.coords}
                </Text>
              </TouchableOpacity>
            );
          })
        ) : (
          /* Empty State */
          <View style={[styles.emptyState, { backgroundColor: colors.surfaceSecondary }]}>
            <Ionicons name="shield-checkmark-outline" size={48} color={colors.textSecondary} />
            <Text style={[styles.emptyStateTitle, { color: colors.text }]}>
              No Emergency Alerts
            </Text>
            <Text style={[styles.emptyStateText, { color: colors.textSecondary }]}>
              You haven't sent any emergency alerts yet.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    paddingVertical: 12,
    marginLeft: 8,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardDate: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  locationText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    marginLeft: 8,
  },
  coordsText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    marginLeft: 24,
  },
  emptyState: {
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    marginTop: 40,
  },
  emptyStateTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    textAlign: 'center',
  },
});
