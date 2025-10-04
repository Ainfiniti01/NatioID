import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, Linking } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from "@/context/ThemeContext";

export default function PrivacyScreen() {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const [expandedSection, setExpandedSection] = useState(null);
  
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const lastUpdated = 'September 18, 2024';

  const privacySections = [
    {
      id: 'overview',
      title: 'Privacy Overview',
      icon: 'shield-outline',
      content: [
        'The NatioID system is designed with privacy and security as fundamental principles.',
        'We collect only the minimum data necessary to provide government services.',
        'Your personal information is protected using state-of-the-art encryption.',
        'We comply with Country data protection laws and international best practices.',
        'You have full control over your data and privacy settings.'
      ]
    },
    {
      id: 'collection',
      title: 'Information We Collect',
      icon: 'information-circle-outline',
      content: [
        'Personal identification information (Name, NIN, Date of Birth)',
        'Contact information (Phone number, Email address, Physical address)',
        'Biometric data (Fingerprints, Facial recognition data) - stored securely',
        'Government service usage data (Applications, Complaints, Requests)',
        'Device information (Device type, Operating system, App version)',
        'Location data (Only when necessary for specific services)',
        'Security logs (Login attempts, Device changes, Security events)'
      ]
    },
    {
      id: 'usage',
      title: 'How We Use Your Information',
      icon: 'settings-outline',
      content: [
        'Verify your identity for government services',
        'Process applications and service requests',
        'Respond to complaints and inquiries',
        'Send important notifications about your accounts',
        'Improve our services and user experience',
        'Prevent fraud and ensure system security',
        'Comply with legal requirements and government mandates',
        'Provide customer support and technical assistance'
      ]
    },
    {
      id: 'sharing',
      title: 'Information Sharing',
      icon: 'people-outline',
      content: [
        'We do not sell your personal information to third parties',
        'Information is shared only with authorized government agencies',
        'Data sharing follows strict protocols and legal requirements',
        'Emergency services may access information during critical situations',
        'Statistical data (anonymized) may be shared for research purposes',
        'Service providers process data only under strict confidentiality agreements',
        'International sharing only occurs for diplomatic or security purposes'
      ]
    },
    {
      id: 'storage',
      title: 'Data Storage & Security',
      icon: 'lock-closed-outline',
      content: [
        'Data is stored in secure, government-controlled data centers within Country',
        'All data is encrypted both in transit and at rest',
        'Access to personal data is strictly controlled and monitored',
        'Regular security audits and penetration testing are conducted',
        'Backup systems ensure data availability and disaster recovery',
        'Multi-factor authentication protects all administrative access',
        'Data retention policies ensure information is not kept indefinitely'
      ]
    },
    {
      id: 'rights',
      title: 'Your Privacy Rights',
      icon: 'person-outline',
      content: [
        'Right to access your personal information',
        'Right to correct inaccurate or incomplete data',
        'Right to request deletion of certain data (subject to legal requirements)',
        'Right to control how your data is processed',
        'Right to data portability for eligible information',
        'Right to object to certain types of data processing',
        'Right to file complaints with data protection authorities',
        'Right to withdraw consent where applicable'
      ]
    },
    {
      id: 'cookies',
      title: 'Cookies & Tracking',
      icon: 'analytics-outline',
      content: [
        'We use essential cookies for app functionality and security',
        'Performance cookies help us improve the user experience',
        'No third-party advertising cookies are used',
        'You can control cookie preferences in your device settings',
        'Session cookies are automatically deleted when you close the app',
        'Tracking is limited to essential security and operational purposes'
      ]
    },
    {
      id: 'minors',
      title: 'Protection of Minors',
      icon: 'heart-outline',
      content: [
        'Special protections apply to users under 18 years of age',
        'Parental consent is required for minors to use certain services',
        'Limited data collection from minors with additional safeguards',
        'Enhanced security measures for accounts associated with minors',
        'Educational resources about digital privacy for young users',
        'Strict policies against inappropriate contact with minors'
      ]
    },
    {
      id: 'changes',
      title: 'Policy Changes',
      icon: 'refresh-outline',
      content: [
        'This privacy policy may be updated periodically',
        'Users will be notified of significant changes via app notifications',
        'Continued use of the app constitutes acceptance of policy changes',
        'Previous versions of the policy are maintained for reference',
        'Major changes require user re-consent for data processing',
        'Policy changes are effective 30 days after notification'
      ]
    }
  ];

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const handleContactPrivacyOfficer = () => {
    Alert.alert(
      'Contact Privacy Officer',
      'How would you like to contact our Data Protection Officer?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Email', 
          onPress: () => Linking.openURL('mailto:privacy@natioid.gov.ng?subject=Privacy Inquiry')
        },
        { 
          text: 'Phone', 
          onPress: () => Linking.openURL('tel:+234700PRIVACY')
        }
      ]
    );
  };

  const handleDownloadPolicy = () => {
    Alert.alert(
      'Download Privacy Policy',
      'A PDF version of this privacy policy will be downloaded to your device.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Download', 
          onPress: () => {
            // In a real app, this would trigger a PDF download
            Alert.alert('Download Started', 'The privacy policy PDF is being downloaded.');
          }
        }
      ]
    );
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
            Privacy Policy
          </Text>
          
          <TouchableOpacity onPress={handleDownloadPolicy}>
            <Ionicons name="download-outline" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Privacy Header */}
        <View style={{
          backgroundColor: colors.primary,
          borderRadius: 20,
          padding: 24,
          alignItems: 'center',
          marginBottom: 24
        }}>
          <View style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: 'rgba(255,255,255,0.2)',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 16
          }}>
            <Ionicons name="shield-checkmark" size={40} color={colors.primaryText} />
          </View>
          
          <Text style={{
            fontFamily: 'Inter_700Bold',
            fontSize: 24,
            color: colors.primaryText,
            marginBottom: 8,
            textAlign: 'center'
          }}>
            Your Privacy Matters
          </Text>
          
          <Text style={{
            fontFamily: 'Inter_400Regular',
            fontSize: 16,
            color: colors.primaryText,
            opacity: 0.9,
            textAlign: 'center',
            lineHeight: 24
          }}>
            We are committed to protecting your personal information and respecting your privacy rights.
          </Text>
          
          <View style={{
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingVertical: 8,
            marginTop: 16
          }}>
            <Text style={{
              fontFamily: 'Inter_500Medium',
              fontSize: 14,
              color: colors.primaryText
            }}>
              Last Updated: {lastUpdated}
            </Text>
          </View>
        </View>

        {/* Quick Links */}
        <View style={{
          flexDirection: 'row',
          gap: 8,
          marginBottom: 24
        }}>
          <TouchableOpacity
            onPress={() => router.push('/profile-settings')}
            style={{
              flex: 1,
              backgroundColor: colors.cardBackground,
              borderRadius: 12,
              padding: 12,
              alignItems: 'center'
            }}
          >
            <Ionicons name="settings-outline" size={20} color={colors.primary} />
            <Text style={{
              fontFamily: 'Inter_500Medium',
              fontSize: 12,
              color: colors.text,
              marginTop: 4,
              textAlign: 'center'
            }}>
              Privacy Settings
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleContactPrivacyOfficer}
            style={{
              flex: 1,
              backgroundColor: colors.cardBackground,
              borderRadius: 12,
              padding: 12,
              alignItems: 'center'
            }}
          >
            <Ionicons name="person-outline" size={20} color={colors.primary} />
            <Text style={{
              fontFamily: 'Inter_500Medium',
              fontSize: 12,
              color: colors.text,
              marginTop: 4,
              textAlign: 'center'
            }}>
              Privacy Officer
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/activity-log')}
            style={{
              flex: 1,
              backgroundColor: colors.cardBackground,
              borderRadius: 12,
              padding: 12,
              alignItems: 'center'
            }}
          >
            <Ionicons name="list-outline" size={20} color={colors.primary} />
            <Text style={{
              fontFamily: 'Inter_500Medium',
              fontSize: 12,
              color: colors.text,
              marginTop: 4,
              textAlign: 'center'
            }}>
              Data Access Log
            </Text>
          </TouchableOpacity>
        </View>

        {/* Privacy Sections */}
        <View style={{ gap: 12, marginBottom: 24 }}>
          {privacySections.map((section) => (
            <View
              key={section.id}
              style={{
                backgroundColor: colors.cardBackground,
                borderRadius: 16,
                overflow: 'hidden'
              }}
            >
              <TouchableOpacity
                onPress={() => toggleSection(section.id)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 20
                }}
              >
                <View style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: colors.primary + '20',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 16
                }}>
                  <Ionicons name={section.icon} size={20} color={colors.primary} />
                </View>
                
                <View style={{ flex: 1 }}>
                  <Text style={{
                    fontFamily: 'Inter_600SemiBold',
                    fontSize: 16,
                    color: colors.text
                  }}>
                    {section.title}
                  </Text>
                </View>
                
                <Ionicons 
                  name={expandedSection === section.id ? "chevron-up" : "chevron-down"} 
                  size={20} 
                  color={colors.textSecondary} 
                />
              </TouchableOpacity>
              
              {expandedSection === section.id && (
                <View style={{
                  paddingHorizontal: 20,
                  paddingBottom: 20
                }}>
                  <View style={{
                    height: 1,
                    backgroundColor: colors.border,
                    marginBottom: 16
                  }} />
                  
                  <View style={{ gap: 12 }}>
                    {section.content.map((point, index) => (
                      <View key={index} style={{
                        flexDirection: 'row',
                        alignItems: 'flex-start'
                      }}>
                        <View style={{
                          width: 6,
                          height: 6,
                          borderRadius: 3,
                          backgroundColor: colors.primary,
                          marginTop: 8,
                          marginRight: 12
                        }} />
                        <Text style={{
                          fontFamily: 'Inter_400Regular',
                          fontSize: 14,
                          color: colors.text,
                          lineHeight: 22,
                          flex: 1
                        }}>
                          {point}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Contact Information */}
        <View style={{
          backgroundColor: colors.cardBackground,
          borderRadius: 16,
          padding: 20,
          marginBottom: 24
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 16
          }}>
            <Ionicons name="mail-outline" size={20} color={colors.primary} />
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 18,
              color: colors.text,
              marginLeft: 8
            }}>
              Contact Us About Privacy
            </Text>
          </View>
          
          <Text style={{
            fontFamily: 'Inter_400Regular',
            fontSize: 14,
            color: colors.text,
            lineHeight: 22,
            marginBottom: 16
          }}>
            If you have questions about this privacy policy or how we handle your personal information, please contact our Data Protection Officer.
          </Text>

          <View style={{ gap: 12 }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 8
            }}>
              <Ionicons name="mail" size={16} color={colors.primary} />
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 14,
                color: colors.text,
                marginLeft: 12
              }}>
                privacy@natioid.gov.ng
              </Text>
            </View>

            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 8
            }}>
              <Ionicons name="call" size={16} color={colors.primary} />
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 14,
                color: colors.text,
                marginLeft: 12
              }}>
                +234 700 PRIVACY (7748229)
              </Text>
            </View>

            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 8
            }}>
              <Ionicons name="location" size={16} color={colors.primary} />
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 14,
                color: colors.text,
                marginLeft: 12,
                flex: 1
              }}>
                National Information Technology Development Agency{'\n'}
Plot 28, Port Harcourt Crescent, Area 11, Garki, Abuja
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={{ gap: 12, marginBottom: 24 }}>
          <TouchableOpacity
            onPress={handleContactPrivacyOfficer}
            style={{
              backgroundColor: colors.primary,
              borderRadius: 12,
              padding: 16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Ionicons name="chatbubble-outline" size={20} color={colors.primaryText} />
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 16,
              color: colors.primaryText,
              marginLeft: 8
            }}>
              Contact Privacy Officer
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/profile-settings')}
            style={{
              backgroundColor: colors.cardBackground,
              borderRadius: 12,
              padding: 16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="settings-outline" size={20} color={colors.primary} />
              <Text style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 16,
                color: colors.text,
                marginLeft: 12
              }}>
                Manage Privacy Settings
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleDownloadPolicy}
            style={{
              backgroundColor: colors.cardBackground,
              borderRadius: 12,
              padding: 16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="download-outline" size={20} color={colors.primary} />
              <Text style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 16,
                color: colors.text,
                marginLeft: 12
              }}>
                Download Full Policy (PDF)
              </Text>
            </View>
            <Ionicons name="document-outline" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Legal Disclaimer */}
        <View style={{
          backgroundColor: '#FEF2F2',
          borderLeftWidth: 4,
          borderLeftColor: '#DC2626',
          borderRadius: 12,
          padding: 16,
          marginBottom: 24
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Ionicons name="warning" size={16} color="#DC2626" />
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 14,
              color: '#DC2626',
              marginLeft: 8
            }}>
              Legal Notice
            </Text>
          </View>
          
          <Text style={{
            fontFamily: 'Inter_400Regular',
            fontSize: 12,
            color: '#7F1D1D',
            lineHeight: 18
          }}>
            This privacy policy is governed by Country law. Any disputes will be resolved in accordance with Country legal procedures. By using this application, you consent to the collection and processing of your data as described in this policy.
          </Text>
        </View>

        {/* Government Footer */}
        <View style={{
          alignItems: 'center',
          paddingTop: 20,
          borderTopWidth: 1,
          borderTopColor: colors.border
        }}>
          <Text style={{
            fontFamily: 'Inter_400Regular',
            fontSize: 12,
            color: colors.textSecondary,
            textAlign: 'center',
            lineHeight: 18
          }}>
            © 2024 Federal Republic of Country{'\n'}
            National Information Technology Development Agency{'\n'}
            All rights reserved
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}