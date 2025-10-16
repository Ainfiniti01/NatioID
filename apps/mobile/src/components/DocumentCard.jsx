import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from "@/context/ThemeContext";
import { router } from 'expo-router';

const DocumentCard = ({ document, mode, onPrint, onDelete, onRenew, onViewDetails }) => {
  const { colors } = useTheme();

  const getStatusConfig = (status) => {
    switch (status) {
      case 'active':
        return { color: '#059669', bg: '#ECFDF5', text: 'Active' };
      case 'expired':
        return { color: '#DC2626', bg: '#FEF2F2', text: 'Expired' };
      case 'pending':
        return { color: '#D97706', bg: '#FFFBEB', text: 'Pending' };
      case 'attention': // New status for expiring soon
        return { color: '#D97706', bg: '#FFFBEB', text: 'Attention' };
      case 'suspended':
        return { color: '#7C2D12', bg: '#FEF7FF', text: 'Suspended' };
      default:
        return { color: colors.textSecondary, bg: colors.surfaceSecondary, text: 'Unknown' };
    }
  };

  const isExpiringSoon = (expiryDate) => {
    if (expiryDate === 'Permanent') return false;
    try {
      const today = new Date();
      const expiry = new Date(expiryDate);
      if (expiry < today) return false;
      const diffTime = expiry - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 90 && diffDays > 0;
    } catch (e) {
      console.error("Error parsing date:", expiryDate, e);
      return false;
    }
  };

  const statusConfig = getStatusConfig(document.status);
  const expiringSoon = isExpiringSoon(document.expiryDate);
  const displayStatusText = expiringSoon && document.status !== 'expired' ? 'Attention' : statusConfig.text;
  const displayStatusColor = expiringSoon && document.status !== 'expired' ? '#D97706' : statusConfig.color;
  const displayStatusBg = expiringSoon && document.status !== 'expired' ? '#FFFBEB' : statusConfig.bg;

  const isReadOnly = mode === 'readonly';
  const isPrintMode = mode === 'print';
  const isServiceMode = mode === 'service' || !mode; // Default to service mode if no mode is specified

  const handleCardPress = () => {
    if (isReadOnly) {
      onViewDetails(document);
    } else if (isPrintMode) {
      onPrint(document);
    } else if (isServiceMode) {
      onViewDetails(document); // Default action for service mode
    }
  };

  return (
    <TouchableOpacity
      key={document.id}
      onPress={handleCardPress}
      style={{
        backgroundColor: colors.cardBackground,
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: colors.border,
        opacity: isReadOnly && document.status !== 'active' ? 0.6 : 1, // Dim non-active docs in read-only
      }}
      disabled={isReadOnly && document.status !== 'active'} // Disable non-active docs in read-only
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        {/* Document Icon */}
        <View style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          backgroundColor: document.color + '20',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 16
        }}>
          <Ionicons name={document.icon} size={24} color={document.color} />
        </View>

        {/* Document Info */}
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 16,
              color: colors.text,
              flex: 1
            }}>
              {document.type}
            </Text>
            
            <View style={{
              backgroundColor: displayStatusBg,
              paddingHorizontal: 8,
              paddingVertical: 2,
              borderRadius: 12
            }}>
              <Text style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 10,
                color: displayStatusColor
              }}>
                {displayStatusText}
              </Text>
            </View>
          </View>

          <Text style={{
            fontFamily: 'Inter_500Medium',
            fontSize: 14,
            color: colors.text,
            marginBottom: 4
          }}>
            {document.number}
          </Text>

          <Text style={{
            fontFamily: 'Inter_400Regular',
            fontSize: 12,
            color: colors.textSecondary,
            marginBottom: 8
          }}>
            Issued by {document.issuer}
          </Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
            <View>
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 10,
                color: colors.textSecondary
              }}>
                Issued
              </Text>
              <Text style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 12,
                color: colors.text
              }}>
                {document.issueDate}
              </Text>
            </View>
            
            <View>
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 10,
                color: colors.textSecondary
              }}>
                Expires
              </Text>
              <Text style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 12,
                color: expiringSoon || document.status === 'expired' ? '#D97706' : colors.text
              }}>
                {document.expiryDate}
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {/* View Details Button */}
            <TouchableOpacity
              onPress={() => onViewDetails(document)}
              style={{
                backgroundColor: colors.surface,
                borderRadius: 8,
                paddingVertical: 6,
                paddingHorizontal: 12,
                marginRight: 8,
                marginBottom: 8,
                borderWidth: 1,
                borderColor: colors.border,
                opacity: isReadOnly ? 0.5 : 1,
              }}
              disabled={isReadOnly}
            >
              <Text style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 12,
                color: colors.text
              }}>
                View Details
              </Text>
            </TouchableOpacity>

            {/* Print Button */}
            {(document.status === 'active' || document.status === 'expired') && (isPrintMode || isServiceMode) && (
              <TouchableOpacity
                onPress={() => onPrint(document)}
                style={{
                  backgroundColor: colors.surface,
                  borderRadius: 8,
                  paddingVertical: 6,
                  paddingHorizontal: 12,
                  marginRight: 8,
                  marginBottom: 8,
                  borderWidth: 1,
                  borderColor: colors.border,
                  opacity: isReadOnly ? 0.5 : 1,
                }}
                disabled={isReadOnly}
              >
                <Text style={{
                  fontFamily: 'Inter_500Medium',
                  fontSize: 12,
                  color: colors.text
                }}>
                  Print
                </Text>
              </TouchableOpacity>
            )}

            {/* Delete Button */}
            {(document.status === 'active' || document.status === 'pending') && isServiceMode && (
              <TouchableOpacity
                onPress={() => onDelete(document)}
                style={{
                  backgroundColor: colors.danger,
                  borderRadius: 8,
                  paddingVertical: 6,
                  paddingHorizontal: 12,
                  marginRight: 8,
                  marginBottom: 8,
                  opacity: isReadOnly ? 0.5 : 1,
                }}
                disabled={isReadOnly}
              >
                <Text style={{
                  fontFamily: 'Inter_500Medium',
                  fontSize: 12,
                  color: colors.primaryText
                }}>
                  Delete
                </Text>
              </TouchableOpacity>
            )}

            {/* Renew Button */}
            {document.status === 'expired' && isServiceMode && (
              <TouchableOpacity
                onPress={() => onRenew(document)}
                style={{
                  backgroundColor: colors.primary,
                  borderRadius: 8,
                  paddingVertical: 6,
                  paddingHorizontal: 12,
                  marginRight: 8,
                  marginBottom: 8,
                  opacity: isReadOnly ? 0.5 : 1,
                }}
                disabled={isReadOnly}
              >
                <Text style={{
                  fontFamily: 'Inter_500Medium',
                  fontSize: 12,
                  color: colors.primaryText
                }}>
                  Renew
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DocumentCard;
