import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from "@/context/ThemeContext";

export default function NewsUpdatesScreen() {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [refreshing, setRefreshing] = useState(false);
  const [savedNews, setSavedNews] = useState(new Set(['2', '5'])); // Saved article IDs

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const categories = [
    { id: 'all', name: 'All', icon: 'apps-outline' },
    { id: 'policies', name: 'Policies', icon: 'document-text-outline' },
    { id: 'subsidies', name: 'Subsidies', icon: 'cash-outline' },
    { id: 'health', name: 'Health', icon: 'medical-outline' },
    { id: 'economy', name: 'Economy', icon: 'trending-up-outline' },
    { id: 'security', name: 'Security', icon: 'shield-outline' }
  ];

  const newsArticles = [
    {
      id: '1',
      title: 'New Digital Identity Verification System Launched',
      summary: 'Government introduces enhanced biometric verification for improved security and convenience.',
      category: 'policies',
      publishedAt: '2024-02-15T09:00:00Z',
      readTime: '3 min read',
      priority: 'high',
      author: 'Ministry of Interior',
      tags: ['Digital ID', 'Security', 'Technology']
    },
    {
      id: '2',
      title: 'Fuel Subsidy Program Extended Until 2025',
      summary: 'Federal Government announces extension of fuel subsidy program to support citizens amid economic challenges.',
      category: 'subsidies',
      publishedAt: '2024-02-14T14:30:00Z',
      readTime: '2 min read',
      priority: 'breaking',
      author: 'Ministry of Petroleum',
      tags: ['Fuel', 'Subsidy', 'Economy']
    },
    {
      id: '3',
      title: 'National Health Insurance Coverage Expanded',
      summary: 'NHIS expands coverage to include more treatment options and rural healthcare facilities.',
      category: 'health',
      publishedAt: '2024-02-13T11:15:00Z',
      readTime: '4 min read',
      priority: 'normal',
      author: 'Ministry of Health',
      tags: ['Healthcare', 'Insurance', 'Coverage']
    },
    {
      id: '4',
      title: 'Economic Growth Reaches 3.2% in Q4 2024',
      summary: 'Latest statistics show positive economic indicators with growth in agriculture and services sectors.',
      category: 'economy',
      publishedAt: '2024-02-12T16:45:00Z',
      readTime: '5 min read',
      priority: 'normal',
      author: 'National Bureau of Statistics',
      tags: ['GDP', 'Growth', 'Statistics']
    },
    {
      id: '5',
      title: 'Enhanced Security Measures for Public Facilities',
      summary: 'New security protocols implemented across government buildings and public spaces nationwide.',
      category: 'security',
      publishedAt: '2024-02-11T08:20:00Z',
      readTime: '3 min read',
      priority: 'normal',
      author: 'Ministry of Interior',
      tags: ['Security', 'Public Safety', 'Infrastructure']
    },
    {
      id: '6',
      title: 'Student Loan Forgiveness Program Announced',
      summary: 'Government unveils new program to forgive student loans for graduates in public service.',
      category: 'policies',
      publishedAt: '2024-02-10T13:10:00Z',
      readTime: '4 min read',
      priority: 'normal',
      author: 'Ministry of Education',
      tags: ['Education', 'Loans', 'Students']
    }
  ];

  if (!fontsLoaded) {
    return null;
  }

  const filteredArticles = selectedCategory === 'all' 
    ? newsArticles 
    : newsArticles.filter(article => article.category === selectedCategory);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const toggleSaveArticle = (articleId) => {
    setSavedNews(prev => {
      const newSet = new Set(prev);
      if (newSet.has(articleId)) {
        newSet.delete(articleId);
      } else {
        newSet.add(articleId);
      }
      return newSet;
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));

    if (diffDays === 0) {
      if (diffHours === 0) return 'Just now';
      return `${diffHours}h ago`;
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const getPriorityConfig = (priority) => {
    switch (priority) {
      case 'breaking':
        return { color: colors.error, text: 'BREAKING', backgroundColor: '#FEF2F2' };
      case 'high':
        return { color: colors.warning, text: 'IMPORTANT', backgroundColor: '#FFF7ED' };
      default:
        return null;
    }
  };

  const handleArticlePress = (article) => {
    router.push(`/news-detail?id=${article.id}`);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDark ? "light" : "dark"} />
      
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom + 40,
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
      >
        {/* Header */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
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
          
          <TouchableOpacity onPress={() => router.push('/saved-news')}>
            <Ionicons name="bookmark" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Category Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingRight: 40
          }}
          style={{ marginBottom: 24 }}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              onPress={() => setSelectedCategory(category.id)}
              style={{
                backgroundColor: selectedCategory === category.id ? colors.primary : colors.surface,
                borderRadius: 20,
                paddingHorizontal: 16,
                paddingVertical: 8,
                marginRight: 12,
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: selectedCategory === category.id ? colors.primary : colors.border
              }}
            >
              <Ionicons 
                name={category.icon} 
                size={16} 
                color={selectedCategory === category.id ? colors.primaryText : colors.text}
                style={{ marginRight: 6 }}
              />
              <Text style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 14,
                color: selectedCategory === category.id ? colors.primaryText : colors.text
              }}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Breaking News Banner */}
        {filteredArticles.some(article => article.priority === 'breaking') && (
          <View style={{
            backgroundColor: colors.error,
            paddingHorizontal: 20,
            paddingVertical: 12,
            marginHorizontal: 20,
            borderRadius: 8,
            marginBottom: 24
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="flash" size={16} color="#FFFFFF" style={{ marginRight: 8 }} />
              <Text style={{
                fontFamily: 'Inter_600SemiBold',
                fontSize: 12,
                color: '#FFFFFF'
              }}>
                BREAKING NEWS
              </Text>
            </View>
          </View>
        )}

        {/* News Articles */}
        <View style={{ paddingHorizontal: 20 }}>
          {filteredArticles.map((article, index) => {
            const priorityConfig = getPriorityConfig(article.priority);
            const isSaved = savedNews.has(article.id);

            return (
              <TouchableOpacity
                key={article.id}
                onPress={() => handleArticlePress(article)}
                style={{
                  backgroundColor: colors.cardBackground,
                  borderRadius: 16,
                  padding: 16,
                  marginBottom: 16,
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderLeftWidth: priorityConfig ? 4 : 1,
                  borderLeftColor: priorityConfig ? priorityConfig.color : colors.border
                }}
              >
                {/* Priority Badge */}
                {priorityConfig && (
                  <View style={{
                    backgroundColor: priorityConfig.backgroundColor,
                    borderRadius: 12,
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    alignSelf: 'flex-start',
                    marginBottom: 12
                  }}>
                    <Text style={{
                      fontFamily: 'Inter_600SemiBold',
                      fontSize: 10,
                      color: priorityConfig.color
                    }}>
                      {priorityConfig.text}
                    </Text>
                  </View>
                )}

                {/* Article Header */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <Text style={{
                    fontFamily: 'Inter_600SemiBold',
                    fontSize: 16,
                    color: colors.text,
                    flex: 1,
                    marginRight: 12,
                    lineHeight: 22
                  }}>
                    {article.title}
                  </Text>
                  
                  <TouchableOpacity onPress={() => toggleSaveArticle(article.id)}>
                    <Ionicons 
                      name={isSaved ? "bookmark" : "bookmark-outline"} 
                      size={20} 
                      color={isSaved ? colors.primary : colors.textSecondary} 
                    />
                  </TouchableOpacity>
                </View>

                {/* Article Summary */}
                <Text style={{
                  fontFamily: 'Inter_400Regular',
                  fontSize: 14,
                  color: colors.textSecondary,
                  lineHeight: 20,
                  marginBottom: 12
                }}>
                  {article.summary}
                </Text>

                {/* Article Meta */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <Text style={{
                    fontFamily: 'Inter_400Regular',
                    fontSize: 12,
                    color: colors.textSecondary
                  }}>
                    {article.author}
                  </Text>
                  
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{
                      fontFamily: 'Inter_400Regular',
                      fontSize: 12,
                      color: colors.textSecondary,
                      marginRight: 8
                    }}>
                      {formatDate(article.publishedAt)}
                    </Text>
                    <Text style={{
                      fontFamily: 'Inter_400Regular',
                      fontSize: 12,
                      color: colors.textSecondary
                    }}>
                      • {article.readTime}
                    </Text>
                  </View>
                </View>

                {/* Tags */}
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  {article.tags.slice(0, 3).map((tag, tagIndex) => (
                    <View
                      key={tagIndex}
                      style={{
                        backgroundColor: colors.surfaceSecondary,
                        borderRadius: 12,
                        paddingHorizontal: 8,
                        paddingVertical: 2,
                        marginRight: 6,
                        marginBottom: 4
                      }}
                    >
                      <Text style={{
                        fontFamily: 'Inter_400Regular',
                        fontSize: 10,
                        color: colors.textSecondary
                      }}>
                        {tag}
                      </Text>
                    </View>
                  ))}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Load More Button */}
        <TouchableOpacity
          style={{
            backgroundColor: colors.surface,
            borderRadius: 12,
            paddingVertical: 16,
            alignItems: 'center',
            marginHorizontal: 20,
            marginTop: 8,
            borderWidth: 1,
            borderColor: colors.border
          }}
        >
          <Text style={{
            fontFamily: 'Inter_500Medium',
            fontSize: 14,
            color: colors.primary
          }}>
            Load More Articles
          </Text>
        </TouchableOpacity>

        {/* Footer Info */}
        <View style={{
          backgroundColor: colors.surfaceSecondary,
          borderRadius: 12,
          padding: 16,
          marginHorizontal: 20,
          marginTop: 24
        }}>
          <Text style={{
            fontFamily: 'Inter_500Medium',
            fontSize: 14,
            color: colors.text,
            marginBottom: 8
          }}>
            Stay Informed
          </Text>
          <Text style={{
            fontFamily: 'Inter_400Regular',
            fontSize: 12,
            color: colors.textSecondary,
            lineHeight: 18
          }}>
            Get the latest updates on government policies, programs, and services. Save articles to read later and enable notifications for breaking news.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}