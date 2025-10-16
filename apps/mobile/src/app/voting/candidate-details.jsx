import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Linking } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from "@/context/ThemeContext";

export default function CandidateDetailsScreen() {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const { candidateId, electionId, electionType, returnTo } = params;
  
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    fetchCandidateDetails();
  }, []);

  const fetchCandidateDetails = async () => {
    // Dummy API call
    setTimeout(() => {
      // Mock candidate data based on ID
      const candidates = {
        1: {
          id: 1,
          name: "Joe Biden",
          country: "United States",
          age: 81,
          education: "University of Delaware (BA), Syracuse University (JD)",
          experience: "President of United States (2021-Present), Vice President (2009-2017)",
          manifesto: "Building a Better America",
          bannerPhoto: "https://via.placeholder.com/400x200?text=Joe+Biden+Campaign",
          photo: "https://via.placeholder.com/120x120?text=JB",
          biography: "Joe Biden is the 46th and current President of the United States. A member of the Democratic Party, he previously served as the 47th vice president from 2009 to 2017 under President Barack Obama.",
          campaignMessage: "My vision is to restore the soul of America, rebuild our backbone—the middle class—and unite the country. We will invest in infrastructure, combat climate change, and ensure healthcare for all.",
          promises: [
            "Strengthen the Affordable Care Act",
            "Invest in clean energy and infrastructure",
            "Expand access to education and job training",
            "Restore America's standing in the world"
          ],
          achievements: [
            "Passed the American Rescue Plan",
            "Signed the Infrastructure Investment and Jobs Act",
            "Rejoined the Paris Agreement on climate change"
          ],
          website: "https://joebiden.com",
          socialMedia: {
            twitter: "@JoeBiden",
            facebook: "Joe Biden",
            instagram: "@joebiden"
          }
        },
        2: {
          id: 2,
          name: "Donald Trump",
          country: "United States",
          age: 78,
          education: "Wharton School of the University of Pennsylvania (BS)",
          experience: "President of United States (2017-2021), Businessman",
          manifesto: "Make America Great Again",
          bannerPhoto: "https://via.placeholder.com/400x200?text=Donald+Trump+Campaign",
          photo: "https://via.placeholder.com/120x120?text=DT",
          biography: "Donald Trump is an American politician, media personality, and businessman who served as the 45th president of the United States from 2017 to 2021.",
          campaignMessage: "I am fighting to make America great again by putting America First, securing our borders, and bringing back jobs. We will cut taxes, reduce regulations, and strengthen our military.",
          promises: [
            "Secure the border and build the wall",
            "Bring back manufacturing jobs to America",
            "Cut taxes for the middle class and businesses",
            "Prioritize American interests in foreign policy"
          ],
          achievements: [
            "Signed the Tax Cuts and Jobs Act of 2017",
            "Appointed three conservative Supreme Court justices",
            "Negotiated new trade deals"
          ],
          website: "https://donaldjtrump.com",
          socialMedia: {
            twitter: "@realDonaldTrump",
            facebook: "Donald J. Trump",
            instagram: "@realdonaldtrump"
          }
        },
        3: {
          id: 3,
          name: "Emmanuel Macron",
          country: "France",
          age: 46,
          education: "Sciences Po, École Nationale d'Administration (ENA)",
          experience: "President of France (2017-Present), Minister of Economy (2014-2016)",
          manifesto: "France 2030",
          bannerPhoto: "https://via.placeholder.com/400x200?text=Emmanuel+Macron+Campaign",
          photo: "https://via.placeholder.com/120x120?text=EM",
          biography: "Emmanuel Macron is the current President of France. He previously served as Minister of Economy, Industry and Digital Affairs from 2014 to 2016.",
          campaignMessage: "My commitment is to build a stronger, more sovereign France within a united Europe. We will invest in innovation, ecological transition, and social justice to ensure a prosperous future for all French citizens.",
          promises: [
            "Strengthen European sovereignty and defense",
            "Accelerate ecological transition and renewable energy",
            "Invest in education and research",
            "Promote social cohesion and equal opportunities"
          ],
          achievements: [
            "Launched the 'France Relance' economic recovery plan",
            "Implemented reforms to the labor market",
            "Championed European integration initiatives"
          ],
          website: "https://enmarche.fr",
          socialMedia: {
            twitter: "@EmmanuelMacron",
            facebook: "Emmanuel Macron",
            instagram: "@emmanuelmacron"
          }
        },
        4: {
          id: 4,
          name: "Bola Ahmed Tinubu",
          country: "Nigeria",
          age: 72,
          education: "Chicago State University (BSc)",
          experience: "President of Nigeria (2023-Present), Governor of Lagos State (1999-2007)",
          manifesto: "Renewed Hope",
          bannerPhoto: "https://via.placeholder.com/400x200?text=Bola+Tinubu+Campaign",
          photo: "https://via.placeholder.com/120x120?text=BAT",
          biography: "Bola Ahmed Tinubu is the current President of Nigeria. He previously served as the Governor of Lagos State from 1999 to 2007.",
          campaignMessage: "My administration is committed to building a stronger, more prosperous Nigeria. We will focus on economic reforms, national security, and job creation to uplift our citizens and secure our future.",
          promises: [
            "Revitalize the economy through strategic investments",
            "Enhance national security and combat insurgency",
            "Improve infrastructure and public services",
            "Promote youth empowerment and education"
          ],
          achievements: [
            "Implemented significant economic reforms in Lagos State",
            "Pioneered innovative urban development projects",
            "Fostered political stability and good governance"
          ],
          website: "https://bolatinubu.com",
          socialMedia: {
            twitter: "@officialABAT",
            facebook: "Bola Ahmed Tinubu",
            instagram: "@officialasiwajubat"
          }
        },
        5: {
          id: 5,
          name: "Rishi Sunak",
          country: "United Kingdom",
          age: 44,
          education: "Lincoln College, Oxford (BA), Stanford University (MBA)",
          experience: "Prime Minister of United Kingdom (2022-Present), Chancellor of the Exchequer (2020-2022)",
          manifesto: "Build a Better Britain",
          bannerPhoto: "https://via.placeholder.com/400x200?text=Rishi+Sunak+Campaign",
          photo: "https://via.placeholder.com/120x120?text=RS",
          biography: "Rishi Sunak is the current Prime Minister of the United Kingdom and leader of the Conservative Party. He previously served as Chancellor of the Exchequer from 2020 to 2022.",
          campaignMessage: "I am focused on delivering stability, growing the economy, and building a better future for Britain. We will tackle inflation, reduce national debt, and invest in public services.",
          promises: [
            "Halve inflation and grow the economy",
            "Reduce national debt and government spending",
            "Cut NHS waiting lists and improve healthcare",
            "Stop illegal immigration"
          ],
          achievements: [
            "Oversaw the UK's economic response to the COVID-19 pandemic",
            "Implemented the furlough scheme to protect jobs",
            "Secured trade deals post-Brexit"
          ],
          website: "https://rishisunak.com",
          socialMedia: {
            twitter: "@RishiSunak",
            facebook: "Rishi Sunak",
            instagram: "@rishisunakmp"
          }
        }
      };

      setCandidate(candidates[candidateId] || candidates[1]);
      setLoading(false);
    }, 1000);
  };

  const handleVoteForCandidate = () => {
    router.push({
      pathname: '/voting/vote-confirmation',
      params: { 
        candidateId: candidate.id,
        candidateName: candidate.name,
        candidateCountry: candidate.country, // Changed from candidateParty
        electionId,
        electionType
      }
    });
  };

  const handleOpenLink = async (url) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Failed to open URL:', error);
    }
  };

  if (!fontsLoaded || loading) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 16, color: colors.textSecondary }}>
          Loading candidate details...
        </Text>
      </View>
    );
  }

  if (!candidate) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 16, color: colors.textSecondary }}>
          Candidate not found
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 120,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Banner */}
        <View style={{
          height: 240,
          backgroundColor: colors.primary,
          position: 'relative',
        }}>
          {/* Navigation */}
          <View style={{
            position: 'absolute',
            top: insets.top + 20,
            left: 20,
            right: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 10,
          }}>
            <TouchableOpacity 
              onPress={() => router.back()}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: 'rgba(0,0,0,0.3)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => router.push('/voting/live-results')}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: 'rgba(0,0,0,0.3)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Ionicons name="bar-chart-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* Candidate Banner Info */}
          <View style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: 20,
            backgroundColor: 'rgba(0,0,0,0.4)',
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <View style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: 'rgba(255,255,255,0.2)',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 16,
              }}>
                <Text style={{
                  fontFamily: 'Inter_700Bold',
                  fontSize: 28,
                  color: 'white',
                }}>
                  {candidate.name.split(' ').map(n => n[0]).join('')}
                </Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={{
                  fontFamily: 'Inter_700Bold',
                  fontSize: 24,
                  color: 'white',
                  marginBottom: 4,
                }}>
                  {candidate.name}
                </Text>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                  <View style={{
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    borderRadius: 12,
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                    marginRight: 8,
                  }}>
                    <Text style={{
                      fontFamily: 'Inter_600SemiBold',
                      fontSize: 14,
                      color: 'white',
                    }}>
                      {candidate.country}
                    </Text>
                  </View>
                  <Text style={{
                    fontFamily: 'Inter_400Regular',
                    fontSize: 14,
                    color: 'white',
                    opacity: 0.9,
                  }}>
                    Age {candidate.age}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Content */}
        <View style={{ padding: 20 }}>
          {/* Manifesto */}
          <View style={{
            backgroundColor: colors.primary + '10',
            borderRadius: 16,
            padding: 20,
            marginBottom: 24,
            borderLeftWidth: 4,
            borderLeftColor: colors.primary,
          }}>
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 18,
              color: colors.primary,
              marginBottom: 8,
            }}>
              Campaign Theme
            </Text>
            <Text style={{
              fontFamily: 'Inter_500Medium',
              fontSize: 16,
              color: colors.text,
              fontStyle: 'italic',
            }}>
              "{candidate.manifesto}"
            </Text>
          </View>

          {/* Campaign Message */}
          <View style={{ marginBottom: 24 }}>
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 20,
              color: colors.text,
              marginBottom: 12,
            }}>
              Campaign Message
            </Text>
            <Text style={{
              fontFamily: 'Inter_400Regular',
              fontSize: 16,
              color: colors.text,
              lineHeight: 24,
            }}>
              {candidate.campaignMessage}
            </Text>
          </View>

          {/* Biography */}
          <View style={{ marginBottom: 24 }}>
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 20,
              color: colors.text,
              marginBottom: 12,
            }}>
              Biography
            </Text>
            <Text style={{
              fontFamily: 'Inter_400Regular',
              fontSize: 16,
              color: colors.text,
              lineHeight: 24,
            }}>
              {candidate.biography}
            </Text>

            <View style={{
              backgroundColor: colors.cardBackground,
              borderRadius: 12,
              padding: 16,
              marginTop: 16,
            }}>
              
              <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                <Text style={{
                  fontFamily: 'Inter_500Medium',
                  fontSize: 14,
                  color: colors.textSecondary,
                  width: 100,
                }}>
                  Education:
                </Text>
                <Text style={{
                  fontFamily: 'Inter_400Regular',
                  fontSize: 14,
                  color: colors.text,
                  flex: 1,
                }}>
                  {candidate.education}
                </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{
                  fontFamily: 'Inter_500Medium',
                  fontSize: 14,
                  color: colors.textSecondary,
                  width: 100,
                }}>
                  Experience:
                </Text>
                <Text style={{
                  fontFamily: 'Inter_400Regular',
                  fontSize: 14,
                  color: colors.text,
                  flex: 1,
                }}>
                  {candidate.experience}
                </Text>
              </View>
            </View>
          </View>

          {/* Campaign Promises */}
          <View style={{ marginBottom: 24 }}>
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 20,
              color: colors.text,
              marginBottom: 12,
            }}>
              Key Promises
            </Text>
            <View style={{ gap: 12 }}>
              {candidate.promises.map((promise, index) => (
                <View key={index} style={{
                  backgroundColor: colors.cardBackground,
                  borderRadius: 12,
                  padding: 16,
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                }}>
                  <View style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    backgroundColor: colors.primary,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12,
                    marginTop: 2,
                  }}>
                    <Text style={{
                      fontFamily: 'Inter_600SemiBold',
                      fontSize: 12,
                      color: colors.primaryText,
                    }}>
                      {index + 1}
                    </Text>
                  </View>
                  <Text style={{
                    fontFamily: 'Inter_400Regular',
                    fontSize: 16,
                    color: colors.text,
                    flex: 1,
                    lineHeight: 22,
                  }}>
                    {promise}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Achievements */}
          <View style={{ marginBottom: 24 }}>
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 20,
              color: colors.text,
              marginBottom: 12,
            }}>
              Key Achievements
            </Text>
            <View style={{ gap: 12 }}>
              {candidate.achievements.map((achievement, index) => (
                <View key={index} style={{
                  backgroundColor: colors.cardBackground,
                  borderRadius: 12,
                  padding: 16,
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                }}>
                  <Ionicons 
                    name="checkmark-circle" 
                    size={20} 
                    color="#10B981" 
                    style={{ marginRight: 12, marginTop: 2 }}
                  />
                  <Text style={{
                    fontFamily: 'Inter_400Regular',
                    fontSize: 16,
                    color: colors.text,
                    flex: 1,
                    lineHeight: 22,
                  }}>
                    {achievement}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* External Links */}
          <View style={{ marginBottom: 24 }}>
            <Text style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 20,
              color: colors.text,
              marginBottom: 12,
            }}>
              Learn More
            </Text>
            
            <TouchableOpacity
              onPress={() => handleOpenLink(candidate.website)}
              style={{
                backgroundColor: colors.cardBackground,
                borderRadius: 12,
                padding: 16,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 12,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="globe-outline" size={20} color={colors.primary} />
                <Text style={{
                  fontFamily: 'Inter_500Medium',
                  fontSize: 16,
                  color: colors.text,
                  marginLeft: 12,
                }}>
                  {candidate.country} Official Website
                </Text>
              </View>
              <Ionicons name="open-outline" size={20} color={colors.textSecondary} />
            </TouchableOpacity>

            <View style={{
              backgroundColor: colors.cardBackground,
              borderRadius: 12,
              padding: 16,
            }}>
              <Text style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 16,
                color: colors.text,
                marginBottom: 12,
              }}>
                Social Media
              </Text>
              <View style={{ gap: 8 }}>
                <Text style={{
                  fontFamily: 'Inter_400Regular',
                  fontSize: 14,
                  color: colors.textSecondary,
                }}>
                  Twitter: {candidate.socialMedia.twitter}
                </Text>
                <Text style={{
                  fontFamily: 'Inter_400Regular',
                  fontSize: 14,
                  color: colors.textSecondary,
                }}>
                  Facebook: {candidate.socialMedia.facebook}
                </Text>
                <Text style={{
                  fontFamily: 'Inter_400Regular',
                  fontSize: 14,
                  color: colors.textSecondary,
                }}>
                  Instagram: {candidate.socialMedia.instagram}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Bottom Button */}
      <View style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.background,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: insets.bottom + 16,
      }}>
        <TouchableOpacity
          onPress={handleVoteForCandidate}
          style={{
            backgroundColor: colors.primary,
            borderRadius: 16,
            paddingVertical: 16,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <Ionicons name="checkmark-circle" size={24} color={colors.primaryText} />
          <Text style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 16,
            color: colors.primaryText,
            marginLeft: 8,
          }}>
            Vote for {candidate.name}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
