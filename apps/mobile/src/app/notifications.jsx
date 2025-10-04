import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from "@/context/ThemeContext";

const notificationCategories = [
  { id: 'all', label: 'All', color: '#059669' },
  { id: 'security', label: 'Security', color: '#DC2626' },
  { id: 'documents', label: 'Documents', color: '#D97706' },
  { id: 'services', label: 'Services', color: '#7C3AED' },
  { id: 'news', label: 'News', color: '#059669' },
  { id: 'reminders', label: 'Reminders', color: '#6B7280' }
];

const notifications = [
  {
    id: 1,
    title: 'Security Alert: New Device Login',
    message: 'A new device was used to access your account from Abuja, Country.',
    category: 'security',
    type: 'alert',
    timestamp: '2025-09-11T09:15:00Z',
    isRead: false,
    priority: 'high',
    actionRequired: true,
    actionText: 'Review Activity'
  },
  {
    id: 2,
    title: 'Document Expiry Warning',
    message: 'Your passport will expire in 30 days. Renew now to avoid disruption.',
    category: 'documents',
    type: 'warning',
    timestamp: '2025-09-11T08:30:00Z',
    isRead: false,
    priority: 'medium',
    actionRequired: true,
    actionText: 'Renew Passport'
  },
  {
    id: 3,
    title: 'Complaint Update',
    message: 'Your complaint #CMP002 about road conditions has been resolved.',
    category: 'services',
    type: 'success',
    timestamp: '2025-09-10T16:45:00Z',
    isRead: true,
    priority: 'medium',
    actionRequired: false,
    actionText: 'View Details'
  },
  {
    id: 4,
    title: 'Breaking: New Digital Services',
    message: 'Government launches enhanced digital identity verification system.',
    category: 'news',
    type: 'info',
    timestamp: '2025-09-10T14:20:00Z',
    isRead: true,
    priority: 'low',
    actionRequired: false,
    actionText: 'Read More'
  },
  {
    id: 5,
    title: 'Biometric Setup Reminder',
    message: 'Complete your biometric setup for enhanced security.',
    category: 'reminders',
    type: 'reminder',
    timestamp: '2025-09-10T10:15:00Z',
    isRead: false,
    priority: 'medium',
    actionRequired: true,
    actionText: 'Setup Now'
  },
  {
    id: 6,
    title: 'Application Approved',
    message: 'Your business registration application has been approved.',
    category: 'services',
    type: 'success',
    timestamp: '2025-09-09T15:30:00Z',
    isRead: true,
    priority: 'high',
    actionRequired: false,
    actionText: 'Download Certificate'
  },
  {
    id: 7,
    title: 'PIN Change Successful',
    message: 'Your security PIN was successfully changed on your iPhone.',
    category: 'security',
    type: 'success',
    timestamp: '2025-09-09T11:45:00Z',
    isRead: true,
    priority: 'low',
    actionRequired: false,
    actionText: null
  },
  {
    id: 8,
    title: 'Maintenance Scheduled',
    message: 'System maintenance on Sep 15, 2025 from 2:00 AM - 4:00 AM.',
    category: 'news',
    type: 'info',
    timestamp: '2025-09-08T12:00:00Z',
    isRead: false,
    priority: 'low',
    actionRequired: false,
    actionText: null
  }
];

export default function NotificationsScreen() {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [notificationsList, setNotificationsList] = useState(notifications);
  
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'alert':
        return 'warning';
      case 'success':
        return 'checkmark-circle';
      case 'warning':
        return 'alert-circle';
      case 'info':
        return 'information-circle';
      case 'reminder':
        return 'time';
      default:
        return 'notifications';
    }
  };

  const getNotificationColor = (type, priority) => {
    if (priority === 'high') {
      return { color: '#DC2626', bg: '#FEF2F2' };
    }
    
    switch (type) {
      case 'alert':
        return { color: '#DC2626', bg: '#FEF2F2' };
      case 'success':
        return { color: '#059669', bg: '#ECFDF5' };
      case 'warning':
        return { color: '#D97706', bg: '#FFFBEB' };
      case 'info':
        return { color: '#2563EB', bg: '#EFF6FF' };
      case 'reminder':
        return { color: '#7C3AED', bg: '#F3E8FF' };
      default:
        return { color: colors.primary, bg: colors.surfaceSecondary };
    }
  };

  const filteredNotifications = notificationsList.filter(notification => {
    if (selectedCategory === 'all') return true;
    return notification.category === selectedCategory;
  });

  const unreadCount = notificationsList.filter(n => !n.isRead).length;
  const todayCount = notificationsList.filter(n => {
    const notifDate = new Date(n.timestamp);
    const today = new Date();
    return notifDate.toDateString() === today.toDateString();
  }).length;

  const handleNotificationPress = (notification) => {
    // Mark as read
    setNotificationsList(prev => prev.map(n => 
      n.id === notification.id ? { ...n, isRead: true } : n
    ));

    if (notification.actionRequired) {
      Alert.alert(
        notification.title,
        `${notification.message}\n\nWould you like to take action?`,
        [
          { text: 'Later', style: 'cancel' },
          { 
            text: notification.actionText, 
            onPress: () => Alert.alert('Action', `Performing: ${notification.actionText}`) 
          }
        ]
      );
    } else {
      Alert.alert(notification.title, notification.message);
    }
  };

  const handleMarkAllRead = () => {
    setNotificationsList(prev => prev.map(n => ({ ...n, isRead: true })));
    Alert.alert('Success', 'All notifications marked as read.');
  };

  const handleClearAll = () => {
    Alert.alert(
      'Clear All Notifications',
      'Are you sure you want to clear all notifications? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear All', 
          style: 'destructive',
          onPress: () => {
            setNotificationsList([]);
            Alert.alert('Success', 'All notifications cleared.');
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
            Notifications
          </Text>
          
          <TouchableOpacity onPress={() => router.push('/notification-settings')}>
            <Ionicons name="settings-outline" size={24} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Summary Stats */}
        <View style={{
          backgroundColor: colors.primary,
          borderRadius: 16,
          padding: 20,
          marginBottom: 24
        }}>
          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 16,
            color: colors.primaryText,
            marginBottom: 16
          }}>
            Notification Summary
          </Text>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{
                fontFamily: 'Inter_700Bold',
                fontSize: 24,
                color: colors.primaryText
              }}>
                {unreadCount}
              </Text>
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 12,
                color: colors.primaryText,
                opacity: 0.9
              }}>
                Unread
              </Text>
            </View>
            
            <View style={{ alignItems: 'center' }}>
              <Text style={{
                fontFamily: 'Inter_700Bold',
                fontSize: 24,
                color: colors.primaryText
              }}>
                {todayCount}
              </Text>
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 12,
                color: colors.primaryText,
                opacity: 0.9
              }}>
                Today
              </Text>
            </View>
            
            <View style={{ alignItems: 'center' }}>
              <Text style={{
                fontFamily: 'Inter_700Bold',
                fontSize: 24,
                color: colors.primaryText
              }}>
                {notificationsList.length}
              </Text>
              <Text style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 12,
                color: colors.primaryText,
                opacity: 0.9
              }}>
                Total
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={{
          flexDirection: 'row',
          marginBottom: 24
        }}>
          <TouchableOpacity
            onPress={handleMarkAllRead}
            style={{
              flex: 1,
              backgroundColor: colors.surfaceSecondary,
              borderRadius: 12,
              paddingVertical: 12,
              paddingHorizontal: 16,
              marginRight: 8,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Ionicons name="checkmark-done-outline" size={16} color={colors.text} />
            <Text style={{
              fontFamily: 'Inter_500Medium',
              fontSize: 14,
              color: colors.text,
              marginLeft: 8
            }}>
              Mark All Read
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={handleClearAll}
            style={{
              flex: 1,
              backgroundColor: colors.surfaceSecondary,
              borderRadius: 12,
              paddingVertical: 12,
              paddingHorizontal: 16,
              marginLeft: 8,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Ionicons name="trash-outline" size={16} color={colors.text} />
            <Text style={{
              fontFamily: 'Inter_500Medium',
              fontSize: 14,
              color: colors.text,
              marginLeft: 8
            }}>
              Clear All
            </Text>
          </TouchableOpacity>
        </View>

        {/* Category Filter */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 24 }}
          contentContainerStyle={{ paddingRight: 20 }}
        >
          {notificationCategories.map((category) => (
            <TouchableOpacity
              key={category.id}
              onPress={() => setSelectedCategory(category.id)}
              style={{
                backgroundColor: selectedCategory === category.id ? category.color : colors.surfaceSecondary,
                borderRadius: 20,
                paddingHorizontal: 16,
                paddingVertical: 8,
                marginRight: 12
              }}
            >
              <Text style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 14,
                color: selectedCategory === category.id ? '#FFFFFF' : colors.text
              }}>
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Notifications List */}
        <Text style={{
          fontFamily: 'Inter_600SemiBold',
          fontSize: 18,
          color: colors.text,
          marginBottom: 16
        }}>
          {selectedCategory === 'all' ? 'All Notifications' : notificationCategories.find(c => c.id === selectedCategory)?.label} ({filteredNotifications.length})
        </Text>

        {filteredNotifications.map((notification) => {
          const notifColor = getNotificationColor(notification.type, notification.priority);
          const icon = getNotificationIcon(notification.type);
          
          return (
            <TouchableOpacity
              key={notification.id}
              onPress={() => handleNotificationPress(notification)}
              style={{
                backgroundColor: colors.cardBackground,
                borderRadius: 16,
                padding: 20,
                marginBottom: 12,
                borderWidth: 1,
                borderColor: notification.isRead ? colors.border : notifColor.color,
                borderLeftWidth: 4,
                borderLeftColor: notifColor.color,
                opacity: notification.isRead ? 0.8 : 1
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                {/* Icon */}
                <View style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: notifColor.bg,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 16
                }}>
                  <Ionicons name={icon} size={20} color={notifColor.color} />
                </View>

                {/* Content */}
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                    <Text style={{
                      fontFamily: notification.isRead ? 'Inter_500Medium' : 'Inter_600SemiBold',
                      fontSize: 16,
                      color: colors.text,
                      flex: 1,
                      marginRight: 8
                    }}>
                      {notification.title}
                    </Text>
                    
                    <View style={{ alignItems: 'flex-end' }}>
                      <Text style={{
                        fontFamily: 'Inter_400Regular',
                        fontSize: 12,
                        color: colors.textSecondary,
                        marginBottom: 4
                      }}>
                        {formatTimeAgo(notification.timestamp)}
                      </Text>
                      
                      {!notification.isRead && (
                        <View style={{
                          width: 8,
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: notifColor.color
                        }} />
                      )}
                    </View>
                  </View>

                  <Text style={{
                    fontFamily: 'Inter_400Regular',
                    fontSize: 14,
                    color: colors.textSecondary,
                    lineHeight: 20,
                    marginBottom: notification.actionRequired ? 12 : 8
                  }}>
                    {notification.message}
                  </Text>

                  {/* Action Button */}
                  {notification.actionRequired && notification.actionText && (
                    <TouchableOpacity
                      onPress={() => handleNotificationPress(notification)}
                      style={{
                        backgroundColor: notifColor.color,
                        borderRadius: 8,
                        paddingVertical: 8,
                        paddingHorizontal: 12,
                        alignSelf: 'flex-start'
                      }}
                    >
                      <Text style={{
                        fontFamily: 'Inter_500Medium',
                        fontSize: 12,
                        color: '#FFFFFF'
                      }}>
                        {notification.actionText}
                      </Text>
                    </TouchableOpacity>
                  )}

                  {/* Priority and Category Tags */}
                  <View style={{ flexDirection: 'row', marginTop: 8 }}>
                    {notification.priority === 'high' && (
                      <View style={{
                        backgroundColor: '#FEF2F2',
                        paddingHorizontal: 6,
                        paddingVertical: 2,
                        borderRadius: 8,
                        marginRight: 8
                      }}>
                        <Text style={{
                          fontFamily: 'Inter_500Medium',
                          fontSize: 9,
                          color: '#DC2626'
                        }}>
                          HIGH PRIORITY
                        </Text>
                      </View>
                    )}
                    
                    <View style={{
                      backgroundColor: colors.surfaceSecondary,
                      paddingHorizontal: 6,
                      paddingVertical: 2,
                      borderRadius: 8
                    }}>
                      <Text style={{
                        fontFamily: 'Inter_500Medium',
                        fontSize: 9,
                        color: colors.textSecondary
                      }}>
                        {notification.category.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}

        {/* Empty State */}
        {filteredNotifications.length === 0 && (
          <View style={{
            backgroundColor: colors.surfaceSecondary,
            borderRadius: 16,
            padding: 40,
            alignItems: 'center'
          }}>
            <Ionicons name="notifications-outline" size={48} color={colors.textSecondary} />
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 16,
              color: colors.text,
              marginTop: 16,
              marginBottom: 8
            }}>
              No Notifications
            </Text>
            <Text style={{
              fontFamily: 'Inter_400Regular',
              fontSize: 14,
              color: colors.textSecondary,
              textAlign: 'center'
            }}>
              {selectedCategory === 'all' 
                ? 'You have no notifications at this time.' 
                : `No notifications in the ${notificationCategories.find(c => c.id === selectedCategory)?.label} category.`
              }
            </Text>
          </View>
        )}

        {/* Push Notification Settings */}
        <View style={{
          backgroundColor: colors.surfaceSecondary,
          borderRadius: 16,
          padding: 20,
          marginTop: 24,
          borderLeftWidth: 4,
          borderLeftColor: colors.primary
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <Ionicons name="notifications" size={20} color={colors.primary} />
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 16,
              color: colors.text,
              marginLeft: 8
            }}>
              Push Notifications
            </Text>
          </View>
          <Text style={{
            fontFamily: 'Inter_400Regular',
            fontSize: 14,
            color: colors.textSecondary,
            lineHeight: 20,
            marginBottom: 16
          }}>
            Stay updated with important security alerts, document reminders, and service updates.
          </Text>
          
          <TouchableOpacity
            onPress={() => router.push('/notification-settings')}
            style={{
              backgroundColor: colors.primary,
              borderRadius: 12,
              paddingVertical: 12,
              paddingHorizontal: 16,
              alignSelf: 'flex-start'
            }}
          >
            <Text style={{
              fontFamily: 'Inter_500Medium',
              fontSize: 14,
              color: colors.primaryText
            }}>
              Manage Settings
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}