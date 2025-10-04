import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from "@/context/ThemeContext";

const newsCategories = [
  { id: 'all', label: 'All News', color: '#059669' },
  { id: 'government', label: 'Government', color: '#DC2626' },
  { id: 'economy', label: 'Economy', color: '#D97706' },
  { id: 'health', label: 'Health', color: '#7C3AED' },
  { id: 'education', label: 'Education', color: '#059669' },
  { id: 'security', label: 'Security', color: '#DC2626' }
];

const breakingNews = [
  {
    id: 1,
    title: 'New Digital ID System Launched Nationwide',
    summary: 'Federal Government announces the rollout of enhanced digital identity cards with improved security features.',
    category: 'government',
    publishedAt: '2025-09-11T08:00:00Z',
    readTime: '3 min read',
    priority: 'high',
    source: 'Ministry of Interior'
  },
  {
    id: 2,
    title: 'Economic Growth Reaches 3.2% in Q3 2025',
    summary: 'Latest economic indicators show positive growth across key sectors, led by technology and agriculture.',
    category: 'economy',
    publishedAt: '2025-09-11T06:30:00Z',
    readTime: '5 min read',
    priority: 'medium',
    source: 'National Bureau of Statistics'
  }
];

const featuredNews = [
  {
    id: 3,
    title: 'Universal Healthcare Coverage Extended to Rural Areas',
    summary: 'Government expands NHIS coverage to reach additional 5 million citizens in rural communities across 6 states.',
    category: 'health',
    publishedAt: '2025-09-10T14:00:00Z',
    readTime: '4 min read',
    priority: 'medium',
    source: 'Ministry of Health',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=200&fit=crop'
  },
  {
    id: 4,
    title: 'New Education Policy Introduces Digital Learning',
    summary: 'Federal Ministry of Education launches comprehensive digital education initiative for primary and secondary schools.',
    category: 'education',
    publishedAt: '2025-09-10T12:15:00Z',
    readTime: '6 min read',
    priority: 'medium',
    source: 'Ministry of Education',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=200&fit=crop'
  },
  {
    id: 5,
    title: 'Enhanced Security Measures for Public Transportation',
    summary: 'New security protocols implemented across major transport hubs to ensure citizen safety and security.',
    category: 'security',
    publishedAt: '2025-09-10T10:45:00Z',
    readTime: '3 min read',
    priority: 'high',
    source: 'Ministry of Transportation',
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=200&fit=crop'
  },
  {
    id: 6,
    title: 'Technology Hub Initiative Creates 50,000 Jobs',
    summary: 'Federal Government partners with private sector to establish technology innovation hubs in major cities.',
    category: 'economy',
    publishedAt: '2025-09-09T16:20:00Z',
    readTime: '4 min read',
    priority: 'medium',
    source: 'Ministry of Industry, Trade and Investment',
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=200&fit=crop'
  }
];

export default function NewsScreen() {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState('all');
  
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

  const getCategoryColor = (category) => {
    const cat = newsCategories.find(c => c.id === category);
    return cat ? cat.color : colors.primary;
  };

  const getPriorityConfig = (priority) => {
    switch (priority) {
      case 'high':
        return { color: '#DC2626', bg: '#FEF2F2', text: 'Breaking' };
      case 'medium':
        return { color: '#D97706', bg: '#FFFBEB', text: 'Featured' };
      default:
        return { color: colors.primary, bg: colors.surfaceSecondary, text: 'News' };
    }
  };

  const handleNewsPress = (newsItem) => {
    Alert.alert(
      newsItem.title,
      `${newsItem.summary}\n\nSource: ${newsItem.source}\nPublished: ${formatTimeAgo(newsItem.publishedAt)}\n\nWould you like to read the full article?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Read Full Article', onPress: () => Alert.alert('Opening', 'Opening full article...') },
        { text: 'Share', onPress: () => Alert.alert('Sharing', 'Opening share options...') }
      ]
    );
  };

  const filteredNews = selectedCategory === 'all' 
    ? featuredNews 
    : featuredNews.filter(news => news.category === selectedCategory);

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
            News & Updates
          </Text>
          
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Breaking News Section */}
        {breakingNews.length > 0 && (
          <>
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 18,
              color: colors.text,
              marginBottom: 16
            }}>
              Breaking News
            </Text>
            
            {breakingNews.map((news) => {
              const priorityConfig = getPriorityConfig(news.priority);
              
              return (
                <TouchableOpacity
                  key={news.id}
                  onPress={() => handleNewsPress(news)}
                  style={{
                    backgroundColor: '#FEF2F2',
                    borderRadius: 16,
                    padding: 20,
                    marginBottom: 16,
                    borderLeftWidth: 4,
                    borderLeftColor: '#DC2626'
                  }}
                >
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <View style={{
                      backgroundColor: priorityConfig.bg,
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 8
                    }}>
                      <Text style={{
                        fontFamily: 'Inter_600SemiBold',
                        fontSize: 10,
                        color: priorityConfig.color
                      }}>
                        🔴 {priorityConfig.text.toUpperCase()}
                      </Text>
                    </View>
                    
                    <Text style={{
                      fontFamily: 'Inter_400Regular',
                      fontSize: 12,
                      color: '#7F1D1D'
                    }}>
                      {formatTimeAgo(news.publishedAt)}
                    </Text>
                  </View>

                  <Text style={{
                    fontFamily: 'Inter_700Bold',
                    fontSize: 16,
                    color: '#7F1D1D',
                    marginBottom: 8
                  }}>
                    {news.title}
                  </Text>

                  <Text style={{
                    fontFamily: 'Inter_400Regular',
                    fontSize: 14,
                    color: '#991B1B',
                    lineHeight: 20,
                    marginBottom: 12
                  }}>
                    {news.summary}
                  </Text>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{
                      fontFamily: 'Inter_500Medium',
                      fontSize: 12,
                      color: '#7F1D1D'
                    }}>
                      {news.source}
                    </Text>
                    
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Ionicons name="time-outline" size={12} color="#7F1D1D" />
                      <Text style={{
                        fontFamily: 'Inter_400Regular',
                        fontSize: 12,
                        color: '#7F1D1D',
                        marginLeft: 4
                      }}>
                        {news.readTime}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </>
        )}

        {/* Category Filter */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 24 }}
          contentContainerStyle={{ paddingRight: 20 }}
        >
          {newsCategories.map((category) => (
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

        {/* Featured News */}
        <Text style={{
          fontFamily: 'Inter_600SemiBold',
          fontSize: 18,
          color: colors.text,
          marginBottom: 16
        }}>
          {selectedCategory === 'all' ? 'Featured News' : newsCategories.find(c => c.id === selectedCategory)?.label}
        </Text>

        {filteredNews.map((news) => {
          const categoryColor = getCategoryColor(news.category);
          const priorityConfig = getPriorityConfig(news.priority);
          
          return (
            <TouchableOpacity
              key={news.id}
              onPress={() => handleNewsPress(news)}
              style={{
                backgroundColor: colors.cardBackground,
                borderRadius: 16,
                marginBottom: 16,
                borderWidth: 1,
                borderColor: colors.border,
                overflow: 'hidden'
              }}
            >
              {/* News Image */}
              {news.imageUrl && (
                <Image
                  source={{ uri: news.imageUrl }}
                  style={{
                    width: '100%',
                    height: 200,
                    backgroundColor: colors.surfaceSecondary
                  }}
                  resizeMode="cover"
                />
              )}

              <View style={{ padding: 20 }}>
                {/* Category and Priority */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <View style={{
                    backgroundColor: categoryColor + '20',
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 8
                  }}>
                    <Text style={{
                      fontFamily: 'Inter_500Medium',
                      fontSize: 10,
                      color: categoryColor
                    }}>
                      {newsCategories.find(c => c.id === news.category)?.label.toUpperCase()}
                    </Text>
                  </View>
                  
                  <Text style={{
                    fontFamily: 'Inter_400Regular',
                    fontSize: 12,
                    color: colors.textSecondary
                  }}>
                    {formatTimeAgo(news.publishedAt)}
                  </Text>
                </View>

                {/* Title */}
                <Text style={{
                  fontFamily: 'Inter_700Bold',
                  fontSize: 16,
                  color: colors.text,
                  marginBottom: 8,
                  lineHeight: 22
                }}>
                  {news.title}
                </Text>

                {/* Summary */}
                <Text style={{
                  fontFamily: 'Inter_400Regular',
                  fontSize: 14,
                  color: colors.textSecondary,
                  lineHeight: 20,
                  marginBottom: 16
                }}>
                  {news.summary}
                </Text>

                {/* Footer */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={{
                    fontFamily: 'Inter_500Medium',
                    fontSize: 12,
                    color: colors.text
                  }}>
                    {news.source}
                  </Text>
                  
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16 }}>
                      <Ionicons name="time-outline" size={12} color={colors.textSecondary} />
                      <Text style={{
                        fontFamily: 'Inter_400Regular',
                        fontSize: 12,
                        color: colors.textSecondary,
                        marginLeft: 4
                      }}>
                        {news.readTime}
                      </Text>
                    </View>
                    
                    <TouchableOpacity
                      onPress={() => Alert.alert('Share', 'Opening share options...')}
                      style={{ padding: 4 }}
                    >
                      <Ionicons name="share-outline" size={16} color={colors.textSecondary} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}

        {/* No News Message */}
        {filteredNews.length === 0 && (
          <View style={{
            backgroundColor: colors.surfaceSecondary,
            borderRadius: 16,
            padding: 40,
            alignItems: 'center'
          }}>
            <Ionicons name="newspaper-outline" size={48} color={colors.textSecondary} />
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 16,
              color: colors.text,
              marginTop: 16,
              marginBottom: 8
            }}>
              No News Available
            </Text>
            <Text style={{
              fontFamily: 'Inter_400Regular',
              fontSize: 14,
              color: colors.textSecondary,
              textAlign: 'center'
            }}>
              No news articles found in this category. Check back later for updates.
            </Text>
          </View>
        )}

        {/* Subscribe Section */}
        <View style={{
          backgroundColor: colors.primary,
          borderRadius: 16,
          padding: 20,
          alignItems: 'center',
          marginTop: 24
        }}>
          <Ionicons name="mail-outline" size={32} color={colors.primaryText} />
          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 16,
            color: colors.primaryText,
            marginTop: 8,
            marginBottom: 4
          }}>
            Stay Updated
          </Text>
          <Text style={{
            fontFamily: 'Inter_400Regular',
            fontSize: 14,
            color: colors.primaryText,
            textAlign: 'center',
            marginBottom: 16,
            opacity: 0.9
          }}>
            Get notified about important government news and updates
          </Text>
          
          <TouchableOpacity
            style={{
              backgroundColor: colors.primaryText,
              borderRadius: 12,
              paddingVertical: 12,
              paddingHorizontal: 24
            }}
          >
            <Text style={{
              fontFamily: 'Inter_500Medium',
              fontSize: 14,
              color: colors.primary
            }}>
              Enable Notifications
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
