import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from "@/context/ThemeContext";

// Mock data - in a real app, you'd fetch this based on the ID
const mockSosHistory = [
  {
    id: 'SOS001',
    timestamp: '2025-09-15T08:45:00Z',
    status: 'resolved',
    location: 'Ikeja, Lagos',
    coords: '6.6059° N, 3.3491° E',
    notes: 'User confirmed that the situation is resolved. Emergency services were not required.',
    responseTime: '15 minutes',
  },
  {
    id: 'SOS002',
    timestamp: '2025-09-14T22:10:00Z',
    status: 'sent',
    location: 'Victoria Island, Lagos',
    coords: '6.4281° N, 3.4218° E',
    notes: null,
    responseTime: null,
  },
  {
    id: 'SOS003',
    timestamp: '2025-09-12T14:00:00Z',
    status: 'failed',
    location: 'Lekki, Lagos',
    coords: '6.4589° N, 3.5763° E',
    notes: 'Failed to send due to network connectivity issues.',
    responseTime: null,
  },
];

export default function SOSDetailScreen() {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();
  const sosItem = mockSosHistory.find(item => item.id === id);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  if (!fontsLoaded || !sosItem) {
    return null; // Or a loading/error screen
  }

  const getStatusConfig = (status) => {
    switch (status) {
      case 'sent': return { color: '#059669', bg: '#ECFDF5', text: 'Sent' };
      case 'resolved': return { color: '#059669', bg: '#ECFDF5', text: 'Resolved' };
      case 'failed': return { color: '#DC2626', bg: '#FEF2F2', text: 'Failed' };
      default: return { color: colors.textSecondary, bg: colors.surfaceSecondary, text: 'Unknown' };
    }
  };

  const statusConfig = getStatusConfig(sosItem.status);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDark ? "light" : "dark"} />
      
      <ScrollView contentContainerStyle={{ paddingTop: insets.top + 20, paddingHorizontal: 20, paddingBottom: insets.bottom + 40 }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Alert Details</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Map Preview Placeholder */}
        <View style={[styles.mapPreview, { backgroundColor: colors.surfaceSecondary }]}>
          <Ionicons name="map-outline" size={48} color={colors.textSecondary} />
          <Text style={{ color: colors.textSecondary, marginTop: 8, fontFamily: 'Inter_500Medium' }}>Map Preview Unavailable</Text>
        </View>

        {/* Details Card */}
        <View style={[styles.card, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>Timestamp</Text>
            <Text style={[styles.detailValue, { color: colors.text }]}>{new Date(sosItem.timestamp).toLocaleString()}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>Location</Text>
            <Text style={[styles.detailValue, { color: colors.text }]}>{sosItem.location} ({sosItem.coords})</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>Status</Text>
            <View style={[styles.statusBadge, { backgroundColor: statusConfig.bg }]}>
              <Text style={[styles.statusText, { color: statusConfig.color }]}>{statusConfig.text}</Text>
            </View>
          </View>
          {sosItem.responseTime && (
            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>Response Time</Text>
              <Text style={[styles.detailValue, { color: colors.text }]}>{sosItem.responseTime}</Text>
            </View>
          )}
        </View>

        {/* Notes Section */}
        <View style={[styles.card, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Notes & Updates</Text>
          <Text style={[styles.notesText, { color: colors.textSecondary }]}>
            {sosItem.notes || 'No notes or messages have been exchanged for this alert.'}
          </Text>
        </View>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.primary }]}>
            <Ionicons name="send-outline" size={16} color={colors.primaryText} />
            <Text style={[styles.actionButtonText, { color: colors.primaryText }]}>Re-send Alert</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.surfaceSecondary }]}>
            <Ionicons name="flag-outline" size={16} color={colors.text} />
            <Text style={[styles.actionButtonText, { color: colors.text }]}>Report Issue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  headerTitle: { fontFamily: 'Inter_600SemiBold', fontSize: 18 },
  mapPreview: { height: 200, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
  card: { borderRadius: 16, padding: 20, marginBottom: 16, borderWidth: 1 },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#E0E0E0' },
  detailLabel: { fontFamily: 'Inter_500Medium', fontSize: 14 },
  detailValue: { fontFamily: 'Inter_400Regular', fontSize: 14, flex: 1, textAlign: 'right' },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  statusText: { fontFamily: 'Inter_500Medium', fontSize: 12 },
  sectionTitle: { fontFamily: 'Inter_600SemiBold', fontSize: 16, marginBottom: 8 },
  notesText: { fontFamily: 'Inter_400Regular', fontSize: 14, lineHeight: 20 },
  actionsContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 16 },
  actionButton: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 12 },
  actionButtonText: { fontFamily: 'Inter_500Medium', fontSize: 14, marginLeft: 8 },
});
