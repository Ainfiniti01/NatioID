import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from "@/context/ThemeContext";

export default function ScanVerifyScreen() {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const [scannedData, setScannedData] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleStartScan = () => {
    setIsScanning(true);
    
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
      // Simulate successful scan with dummy data
      setScannedData({
        name: 'Adebayo Johnson',
        nin: '12345678901',
        status: 'verified',
        issueDate: '2024-01-15',
        expiryDate: '2029-01-15',
        photo: 'placeholder',
        verificationId: 'VER-2024-001'
      });
    }, 3000);
  };

  const handleManualEntry = () => {
    Alert.alert(
      'Manual Verification',
      'Enter the NIN to verify manually',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Verify',
          onPress: () => {
            // Simulate manual verification
            setScannedData({
              name: 'Kemi Okafor',
              nin: '98765432109',
              status: 'verified',
              issueDate: '2023-08-10',
              expiryDate: '2028-08-10',
              photo: 'placeholder',
              verificationId: 'VER-2024-002'
            });
          }
        }
      ]
    );
  };

  const resetScan = () => {
    setScannedData(null);
    setIsScanning(false);
  };

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
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24
        }}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          
          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 18,
            color: colors.text
          }}>
            Scan & Verify
          </Text>
          
          <TouchableOpacity onPress={resetScan}>
            <Ionicons name="refresh" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {!scannedData ? (
          <>
            {/* Scanner Area */}
            <View style={{
              backgroundColor: colors.cardBackground,
              borderRadius: 16,
              padding: 24,
              marginBottom: 24,
              borderWidth: 2,
              borderColor: isScanning ? colors.primary : colors.border,
              borderStyle: isScanning ? 'solid' : 'dashed',
              alignItems: 'center'
            }}>
              <View style={{
                width: 200,
                height: 200,
                borderRadius: 12,
                backgroundColor: colors.surface,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20
              }}>
                {isScanning ? (
                  <View style={{ alignItems: 'center' }}>
                    <Ionicons name="scan" size={64} color={colors.primary} />
                    <View style={{
                      width: 120,
                      height: 2,
                      backgroundColor: colors.primary,
                      marginTop: 16,
                      opacity: 0.7
                    }} />
                    <Text style={{
                      fontFamily: 'Inter_500Medium',
                      fontSize: 12,
                      color: colors.primary,
                      marginTop: 8
                    }}>
                      Scanning...
                    </Text>
                  </View>
                ) : (
                  <View style={{ alignItems: 'center' }}>
                    <Ionicons name="qr-code-outline" size={64} color={colors.textSecondary} />
                    <Text style={{
                      fontFamily: 'Inter_500Medium',
                      fontSize: 14,
                      color: colors.textSecondary,
                      marginTop: 12,
                      textAlign: 'center'
                    }}>
                      Position QR code or barcode{'\n'}within the frame
                    </Text>
                  </View>
                )}
              </View>

              {!isScanning && (
                <TouchableOpacity
                  onPress={handleStartScan}
                  style={{
                    backgroundColor: colors.primary,
                    borderRadius: 12,
                    paddingVertical: 16,
                    paddingHorizontal: 32,
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}
                >
                  <Ionicons name="camera" size={20} color={colors.primaryText} style={{ marginRight: 8 }} />
                  <Text style={{
                    fontFamily: 'Inter_600SemiBold',
                    fontSize: 16,
                    color: colors.primaryText
                  }}>
                    Start Scanning
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Manual Entry Option */}
            <View style={{
              backgroundColor: colors.surfaceSecondary,
              borderRadius: 12,
              padding: 16,
              marginBottom: 24
            }}>
              <Text style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 14,
                color: colors.text,
                marginBottom: 8,
                textAlign: 'center'
              }}>
                Can't scan? Try manual entry
              </Text>
              <TouchableOpacity
                onPress={handleManualEntry}
                style={{
                  backgroundColor: colors.surface,
                  borderRadius: 8,
                  paddingVertical: 12,
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: colors.border
                }}
              >
                <Text style={{
                  fontFamily: 'Inter_500Medium',
                  fontSize: 14,
                  color: colors.primary
                }}>
                  Enter NIN Manually
                </Text>
              </TouchableOpacity>
            </View>

            {/* Instructions */}
            <View style={{
              backgroundColor: colors.cardBackground,
              borderRadius: 12,
              padding: 16,
              borderWidth: 1,
              borderColor: colors.border
            }}>
              <Text style={{
                fontFamily: 'Inter_600SemiBold',
                fontSize: 16,
                color: colors.text,
                marginBottom: 12
              }}>
                How to Verify an ID
              </Text>
              
              <View style={{ marginBottom: 8 }}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                  <View style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: colors.primary,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12,
                    marginTop: 2
                  }}>
                    <Text style={{ color: colors.primaryText, fontSize: 10, fontWeight: 'bold' }}>1</Text>
                  </View>
                  <Text style={{
                    fontFamily: 'Inter_400Regular',
                    fontSize: 14,
                    color: colors.text,
                    flex: 1,
                    lineHeight: 20
                  }}>
                    Position the NatioID card's QR code within the scanner frame
                  </Text>
                </View>
              </View>

              <View style={{ marginBottom: 8 }}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                  <View style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: colors.primary,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12,
                    marginTop: 2
                  }}>
                    <Text style={{ color: colors.primaryText, fontSize: 10, fontWeight: 'bold' }}>2</Text>
                  </View>
                  <Text style={{
                    fontFamily: 'Inter_400Regular',
                    fontSize: 14,
                    color: colors.text,
                    flex: 1,
                    lineHeight: 20
                  }}>
                    Wait for the automatic scan and verification process
                  </Text>
                </View>
              </View>

              <View>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                  <View style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: colors.primary,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12,
                    marginTop: 2
                  }}>
                    <Text style={{ color: colors.primaryText, fontSize: 10, fontWeight: 'bold' }}>3</Text>
                  </View>
                  <Text style={{
                    fontFamily: 'Inter_400Regular',
                    fontSize: 14,
                    color: colors.text,
                    flex: 1,
                    lineHeight: 20
                  }}>
                    Review the verification results and status
                  </Text>
                </View>
              </View>
            </View>
          </>
        ) : (
          /* Verification Results */
          <View style={{
            backgroundColor: colors.cardBackground,
            borderRadius: 16,
            padding: 24,
            borderWidth: 1,
            borderColor: colors.border
          }}>
            {/* Success Header */}
            <View style={{
              alignItems: 'center',
              marginBottom: 24
            }}>
              <View style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: colors.success,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 12
              }}>
                <Ionicons name="checkmark" size={32} color="#FFFFFF" />
              </View>
              <Text style={{
                fontFamily: 'Inter_700Bold',
                fontSize: 18,
                color: colors.success,
                marginBottom: 4
              }}>
                Verification Successful
              </Text>
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 12,
                color: colors.textSecondary
              }}>
                ID: {scannedData.verificationId}
              </Text>
            </View>

            {/* User Info */}
            <View style={{
              backgroundColor: colors.surface,
              borderRadius: 12,
              padding: 16,
              marginBottom: 20
            }}>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 16
              }}>
                <View style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: colors.primary,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 16
                }}>
                  <Ionicons name="person" size={28} color={colors.primaryText} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{
                    fontFamily: 'Inter_600SemiBold',
                    fontSize: 18,
                    color: colors.text,
                    marginBottom: 4
                  }}>
                    {scannedData.name}
                  </Text>
                  <Text style={{
                    fontFamily: 'Inter_400Regular',
                    fontSize: 14,
                    color: colors.textSecondary
                  }}>
                    NIN: {scannedData.nin}
                  </Text>
                </View>
              </View>

              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: 16,
                borderTopWidth: 1,
                borderTopColor: colors.border
              }}>
                <View>
                  <Text style={{
                    fontFamily: 'Inter_500Medium',
                    fontSize: 12,
                    color: colors.textSecondary,
                    marginBottom: 4
                  }}>
                    Issue Date
                  </Text>
                  <Text style={{
                    fontFamily: 'Inter_600SemiBold',
                    fontSize: 14,
                    color: colors.text
                  }}>
                    {scannedData.issueDate}
                  </Text>
                </View>
                <View>
                  <Text style={{
                    fontFamily: 'Inter_500Medium',
                    fontSize: 12,
                    color: colors.textSecondary,
                    marginBottom: 4
                  }}>
                    Expiry Date
                  </Text>
                  <Text style={{
                    fontFamily: 'Inter_600SemiBold',
                    fontSize: 14,
                    color: colors.text
                  }}>
                    {scannedData.expiryDate}
                  </Text>
                </View>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
              <TouchableOpacity
                onPress={resetScan}
                style={{
                  flex: 1,
                  backgroundColor: colors.surface,
                  borderRadius: 12,
                  paddingVertical: 12,
                  alignItems: 'center',
                  marginRight: 8,
                  borderWidth: 1,
                  borderColor: colors.border
                }}
              >
                <Text style={{
                  fontFamily: 'Inter_500Medium',
                  fontSize: 14,
                  color: colors.text
                }}>
                  Scan Another
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => Alert.alert('Save', 'Verification saved to history')}
                style={{
                  flex: 1,
                  backgroundColor: colors.primary,
                  borderRadius: 12,
                  paddingVertical: 12,
                  alignItems: 'center',
                  marginLeft: 8
                }}
              >
                <Text style={{
                  fontFamily: 'Inter_600SemiBold',
                  fontSize: 14,
                  color: colors.primaryText
                }}>
                  Save Result
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}