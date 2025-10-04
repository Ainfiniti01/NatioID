import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from "@/context/ThemeContext";

const { width } = Dimensions.get('window');

const onboardingSlides = [
  {
    id: 1,
    title: "Secure Digital Identity",
    subtitle: "Your official ID, always in your pocket",
    description: "Access your National ID, driver's license, and other documents digitally with bank-level security.",
    icon: "shield-checkmark",
    color: "#004040"
  },
  {
    id: 2,
    title: "Quick Government Services",
    subtitle: "Apply for benefits and track applications",
    description: "Submit applications for subsidies, benefits, and services. Track your progress in real-time.",
    icon: "rocket",
    color: "#ECBE07"
  },
  {
    id: 3,
    title: "Emergency Support",
    subtitle: "Help when you need it most",
    description: "Report lost documents, send emergency alerts, and access help center resources instantly.",
    icon: "medical",
    color: "#FF4444"
  }
];

export default function OnboardingScreen() {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollViewRef = useRef(null);
  
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleNext = () => {
    if (currentSlide < onboardingSlides.length - 1) {
      const nextSlide = currentSlide + 1;
      setCurrentSlide(nextSlide);
      scrollViewRef.current?.scrollTo({ x: nextSlide * width, animated: true });
    } else {
      router.replace('/language-selection');
    }
  };

  const handleSkip = () => {
    router.replace('/language-selection');
  };

  const handleScroll = (event) => {
    const slideWidth = event.nativeEvent.layoutMeasurement.width;
    const currentIndex = Math.round(event.nativeEvent.contentOffset.x / slideWidth);
    setCurrentSlide(currentIndex);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDark ? "light" : "dark"} />
      
      {/* Skip Button */}
      <View style={{
        position: 'absolute',
        top: insets.top + 16,
        right: 20,
        zIndex: 10
      }}>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={{
            fontFamily: 'Inter_500Medium',
            fontSize: 16,
            color: colors.textSecondary
          }}>
            Skip
          </Text>
        </TouchableOpacity>
      </View>

      {/* Slides */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={{ flex: 1 }}
      >
        {onboardingSlides.map((slide, index) => (
          <View key={slide.id} style={{
            width,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 40,
            paddingTop: insets.top + 80,
            paddingBottom: insets.bottom + 120
          }}>
            {/* Icon */}
            <View style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: slide.color,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 40,
              shadowColor: slide.color,
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.3,
              shadowRadius: 16,
              elevation: 8
            }}>
              <Ionicons name={slide.icon} size={48} color="#FFFFFF" />
            </View>

            {/* Content */}
            <Text style={{
              fontFamily: 'Inter_700Bold',
              fontSize: 28,
              color: colors.text,
              textAlign: 'center',
              marginBottom: 12,
              lineHeight: 36
            }}>
              {slide.title}
            </Text>
            
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 18,
              color: colors.textSecondary,
              textAlign: 'center',
              marginBottom: 24,
              lineHeight: 24
            }}>
              {slide.subtitle}
            </Text>
            
            <Text style={{
              fontFamily: 'Inter_400Regular',
              fontSize: 16,
              color: colors.textSecondary,
              textAlign: 'center',
              lineHeight: 24,
              maxWidth: 280
            }}>
              {slide.description}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Section */}
      <View style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        paddingBottom: insets.bottom + 20,
        paddingTop: 20,
        backgroundColor: colors.background
      }}>
        {/* Page Indicators */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 32
        }}>
          {onboardingSlides.map((_, index) => (
            <View
              key={index}
              style={{
                width: currentSlide === index ? 24 : 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: currentSlide === index ? colors.primary : colors.border,
                marginHorizontal: 4,
                opacity: currentSlide === index ? 1 : 0.3
              }}
            />
          ))}
        </View>

        {/* Action Buttons */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <TouchableOpacity
            onPress={currentSlide > 0 ? () => {
              const prevSlide = currentSlide - 1;
              setCurrentSlide(prevSlide);
              scrollViewRef.current?.scrollTo({ x: prevSlide * width, animated: true });
            } : handleSkip}
            style={{
              paddingVertical: 12,
              paddingHorizontal: 24,
              opacity: currentSlide > 0 ? 1 : 0.5
            }}
          >
            <Text style={{
              fontFamily: 'Inter_500Medium',
              fontSize: 16,
              color: colors.textSecondary
            }}>
              {currentSlide > 0 ? 'Back' : 'Skip'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleNext}
            style={{
              backgroundColor: colors.primary,
              paddingVertical: 16,
              paddingHorizontal: 32,
              borderRadius: 12,
              flexDirection: 'row',
              alignItems: 'center',
              shadowColor: colors.primary,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 4
            }}
          >
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 16,
              color: colors.primaryText,
              marginRight: 8
            }}>
              {currentSlide === onboardingSlides.length - 1 ? 'Get Started' : 'Next'}
            </Text>
            <Ionicons 
              name="arrow-forward" 
              size={20} 
              color={colors.primaryText} 
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}