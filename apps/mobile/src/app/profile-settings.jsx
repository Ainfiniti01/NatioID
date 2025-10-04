import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
  Switch,
  Image,
  ActivityIndicator, // Import ActivityIndicator for loading spinner
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "../context/ThemeContext";
import * as ImagePicker from 'expo-image-picker'; // Import ImagePicker
import DropdownPicker from '@/components/DropdownPicker'; // Import DropdownPicker

export default function ProfileSettingsScreen() {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null); // State for profile image
  const [isUploadingImage, setIsUploadingImage] = useState(false); // State for image upload loading

  const [profile, setProfile] = useState({
    fullName: "Jane Citizen",
    email: "jane.citizen@example.com",
    phone: "+1 555 123 4567",
    nin: "98765432109",
    address: "456 Main Street, Capital City, State 1",
    dateOfBirth: "1985-05-20",
    gender: "Female",
    maritalStatus: "Married",
    occupation: "Doctor",
    stateOfOrigin: "State 1",
    localGovernment: "LGA A",
    emergencyContact: "+1 555 987 6543",
    isProfilePublic: false,
    allowLocationSharing: true,
    enableBiometric: true,
    twoFactorEnabled: false,
  });

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleSave = async () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert("Success", "Profile updated successfully!");
    }, 1500);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "This action is permanent and cannot be undone. All your data will be deleted.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete Account",
          style: "destructive",
          onPress: () => {
            Alert.alert("Account Deleted", "Your account has been deleted.");
          },
        },
      ],
    );
  };

  // Function to handle image picking from gallery or camera
  const handleImagePicker = async (source) => {
    let permissionStatus;
    if (source === 'camera') {
      permissionStatus = await ImagePicker.requestCameraPermissionsAsync();
    } else { // 'gallery'
      permissionStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
    }

    if (permissionStatus.status !== 'granted') {
      Alert.alert('Permission Denied', `Sorry, we need ${source} permissions to make this work!`);
      return;
    }

    let result;
    try {
      setIsUploadingImage(true); // Start loading indicator
      if (source === 'camera') {
        result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      } else { // 'gallery'
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      }
    } catch (error) {
      console.error("ImagePicker Error: ", error);
      Alert.alert('Error', 'Could not pick image. Please try again.');
      setIsUploadingImage(false); // Stop loading indicator on error
      return;
    }

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri); // Update state with the selected image URI
      // TODO: Implement upload logic here
      // For now, simulate upload completion
      setTimeout(() => {
        setIsUploadingImage(false); // Stop loading indicator after simulated upload
        Alert.alert("Success", "Profile image updated!");
      }, 1500); // Simulate upload time
    } else {
      setIsUploadingImage(false); // Stop loading indicator if cancelled
    }
  };

  // Function to remove the profile image
  const handleRemoveImage = () => {
    setProfileImage(null);
    // TODO: Implement logic to remove the image from the server if it exists
  };

  // Function to show image options modal
  const showImageOptions = () => {
    Alert.alert(
      "Update Profile Image",
      "Choose an option:",
      [
        {
          text: "Take Photo",
          onPress: () => handleImagePicker('camera'),
        },
        {
          text: "Choose from Gallery",
          onPress: () => handleImagePicker('gallery'),
        },
        profileImage && { // Only show "Remove Photo" if an image is currently set
          text: "Remove Photo",
          style: "destructive",
          onPress: handleRemoveImage,
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  const settingSections = [
    {
      title: "Personal Information",
      icon: "person-outline",
      items: [
        { key: "fullName", label: "Full Name", type: "text" },
        { key: "dateOfBirth", label: "Date of Birth", type: "date" },
        {
          key: "gender",
          label: "Gender",
          type: "select",
          options: ["Male", "Female", "Non-binary", "Prefer not to say"],
        },
        {
          key: "maritalStatus",
          label: "Marital Status",
          type: "select",
          options: ["Single", "Married", "Divorced", "Widowed", "Separated"],
        },
        { key: "occupation", label: "Occupation", type: "text" },
      ],
    },
    {
      title: "Contact Information",
      icon: "call-outline",
      items: [
        { key: "email", label: "Email Address", type: "email" },
        { key: "phone", label: "Phone Number", type: "phone" },
        { key: "address", label: "Address", type: "textarea" },
        { key: "emergencyContact", label: "Emergency Contact", type: "phone" },
      ],
    },
    {
      title: "Government Information",
      icon: "shield-outline",
      items: [
        {
          key: "nin",
          label: "National ID Number (NIN)",
          type: "text",
          readonly: true,
        },
        {
          key: "stateOfOrigin",
          label: "State of Origin",
          type: "select",
          options: ["State 1", "State 2", "State 3", "State 4", "State 5"],
        },
        {
          key: "localGovernment",
          label: "Local Government Area",
          type: "select",
          options: ["LGA A", "LGA B", "LGA C", "LGA D", "LGA E"],
        },
      ],
    },
    {
      title: "Privacy & Security",
      icon: "lock-closed-outline",
      items: [
        {
          key: "isProfilePublic",
          label: "Public Profile",
          type: "toggle",
          description: "Allow others to find your profile",
        },
        {
          key: "allowLocationSharing",
          label: "Location Sharing",
          type: "toggle",
          description: "Share location for location-based services",
        },
        {
          key: "enableBiometric",
          label: "Biometric Authentication",
          type: "toggle",
          description: "Use fingerprint or face ID",
        },
        {
          key: "twoFactorEnabled",
          label: "Two-Factor Authentication",
          type: "toggle",
          description: "Add extra security to your account",
        },
      ],
    },
  ];

  const renderField = (item) => {
    if (item.type === "toggle") {
      return (
        <View
          style={{
            backgroundColor: colors.cardBackground,
            borderRadius: 12,
            padding: 16,
            marginBottom: 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontFamily: "Inter_500Medium",
                fontSize: 16,
                color: colors.text,
                marginBottom: 4,
              }}
            >
              {item.label}
            </Text>
            {item.description && (
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: colors.textSecondary,
                }}
              >
                {item.description}
              </Text>
            )}
          </View>
          <Switch
            value={profile[item.key]}
            onValueChange={(value) =>
              setProfile((prev) => ({ ...prev, [item.key]: value }))
            }
            trackColor={{ false: colors.border, true: colors.primary + "40" }}
            thumbColor={
              profile[item.key] ? colors.primary : colors.surfaceSecondary
            }
          />
        </View>
      );
    }

    if (item.type === "select") {
      return (
        <View style={{ marginBottom: 16 }}>
          <Text
            style={{
              fontFamily: "Inter_500Medium",
              fontSize: 16,
              color: colors.text,
              marginBottom: 8,
            }}
          >
            {item.label}
          </Text>
          <DropdownPicker
            items={item.options.map(option => ({ label: option, value: option }))}
            selectedValue={profile[item.key]}
            onValueChange={(value) =>
              setProfile((prev) => ({ ...prev, [item.key]: value }))
            }
            label={item.label}
            disabled={item.readonly}
          />
        </View>
      );
    }

    const handleChangeText = (text) => {
      let isValid = true;
      if (item.type === "phone" || item.key === "nin") {
        isValid = /^\d*$/.test(text); // Only digits
      } else if (item.type === "email") {
        isValid = text.includes('@'); // Must include @
      } else if (item.type === "text" || item.type === "textarea") {
        isValid = /^[a-zA-Z\s]*$/.test(text); // Only text and spaces
      }

      if (isValid) {
        setProfile((prev) => ({ ...prev, [item.key]: text }));
      } else {
        // Optionally, provide feedback to the user about invalid input
        // For now, we'll just prevent the update if invalid
        Alert.alert("Invalid Input", `Please enter a valid ${item.label}.`);
      }
    };

    return (
      <View style={{ marginBottom: 16 }}>
        <Text
          style={{
            fontFamily: "Inter_500Medium",
            fontSize: 16,
            color: colors.text,
            marginBottom: 8,
          }}
        >
          {item.label}
          {item.readonly && (
            <Text style={{ color: colors.textSecondary }}> (Read Only)</Text>
          )}
        </Text>

        <TextInput
          value={profile[item.key]}
          onChangeText={handleChangeText}
          placeholder={`Enter your ${item.label.toLowerCase()}`}
          placeholderTextColor={colors.textSecondary}
          multiline={item.type === "textarea"}
          numberOfLines={item.type === "textarea" ? 3 : 1}
          textAlignVertical={item.type === "textarea" ? "top" : "center"}
          editable={!item.readonly}
          keyboardType={
            item.type === "email"
              ? "email-address"
              : item.type === "phone" || item.key === "nin"
                ? "phone-pad"
                : "default"
          }
          style={{
            backgroundColor: item.readonly
              ? colors.surfaceSecondary
              : colors.cardBackground,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingVertical: 12,
            fontFamily: "Inter_400Regular",
            fontSize: 16,
            color: item.readonly ? colors.textSecondary : colors.text,
            minHeight: item.type === "textarea" ? 80 : undefined,
          }}
        />
      </View>
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>

          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 18,
              color: colors.text,
            }}
          >
            Profile Settings
          </Text>

          <TouchableOpacity onPress={handleSave} disabled={isLoading}>
            {isLoading ? (
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: colors.primary,
                  borderTopColor: "transparent",
                }}
              />
            ) : (
              <Ionicons name="checkmark" size={24} color={colors.primary} />
            )}
          </TouchableOpacity>
        </View>

        {/* Profile Overview */}
        <View
          style={{
            backgroundColor: colors.primary,
            borderRadius: 16,
            padding: 20,
            marginBottom: 24,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={showImageOptions} // Call the new function to show options
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: profileImage ? "transparent" : "rgba(255,255,255,0.2)",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 16,
              overflow: "hidden", // Ensures image stays within the circle
              position: 'relative', // Needed for absolute positioning of the edit icon
            }}
          >
            {isUploadingImage ? ( // Show spinner if uploading
              <ActivityIndicator size="large" color={colors.primaryText} />
            ) : profileImage ? (
              <Image
                source={{ uri: profileImage }}
                style={{ width: "100%", height: "100%", borderRadius: 40 }}
              />
            ) : (
              <Text
                style={{
                  fontFamily: "Inter_700Bold",
                  fontSize: 32,
                  color: colors.primaryText,
                }}
              >
                {profile.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </Text>
            )}
            {/* Edit Icon Overlay */}
            <TouchableOpacity
              onPress={showImageOptions} // Use the same handler for the edit icon
              style={{
                position: 'absolute',
                bottom: 5,
                right: 5,
                backgroundColor: 'rgba(0,0,0,0.5)',
                borderRadius: 12,
                padding: 4,
                zIndex: 1, // Ensure it's above the image/initials
              }}
            >
              <Ionicons
                name="create-outline" // Always show create icon for editing
                size={16}
                color="white"
              />
            </TouchableOpacity>
          </TouchableOpacity>

          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 20,
              color: colors.primaryText,
              marginBottom: 4,
            }}
          >
            {profile.fullName}
          </Text>

          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 14,
              color: colors.primaryText,
              opacity: 0.9,
              marginBottom: 8,
            }}
          >
            NIN: {profile.nin}
          </Text>

          <View
            style={{
              backgroundColor: "rgba(255,255,255,0.2)",
              borderRadius: 12,
              paddingHorizontal: 12,
              paddingVertical: 6,
            }}
          >
            <Text
              style={{
                fontFamily: "Inter_500Medium",
                fontSize: 12,
                color: colors.primaryText,
              }}
            >
              VERIFIED CITIZEN
            </Text>
          </View>
        </View>

        {/* Settings Sections */}
        {settingSections.map((section) => (
          <View key={section.title} style={{ marginBottom: 24 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <Ionicons name={section.icon} size={20} color={colors.primary} />
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 18,
                  color: colors.text,
                  marginLeft: 8,
                }}
              >
                {section.title}
              </Text>
            </View>

            {section.items.map((item) => (
              <View key={item.key}>{renderField(item)}</View>
            ))}
          </View>
        ))}

        {/* Quick Actions */}
        <View style={{ marginBottom: 24 }}>
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 18,
              color: colors.text,
              marginBottom: 16,
            }}
          >
            Quick Actions
          </Text>

          <View style={{ gap: 12 }}>
            <TouchableOpacity
              onPress={() => router.push("/change-pin")}
              style={{
                backgroundColor: colors.cardBackground,
                borderRadius: 12,
                padding: 16,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="key-outline" size={20} color={colors.primary} />
                <Text
                  style={{
                    fontFamily: "Inter_500Medium",
                    fontSize: 16,
                    color: colors.text,
                    marginLeft: 12,
                  }}
                >
                  Change PIN
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.textSecondary}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/biometric")}
              style={{
                backgroundColor: colors.cardBackground,
                borderRadius: 12,
                padding: 16,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons
                  name="finger-print-outline"
                  size={20}
                  color={colors.primary}
                />
                <Text
                  style={{
                    fontFamily: "Inter_500Medium",
                    fontSize: 16,
                    color: colors.text,
                    marginLeft: 12,
                  }}
                >
                  Biometric Settings
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.textSecondary}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/recovery")}
              style={{
                backgroundColor: colors.cardBackground,
                borderRadius: 12,
                padding: 16,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons
                  name="refresh-outline"
                  size={20}
                  color={colors.primary}
                />
                <Text
                  style={{
                    fontFamily: "Inter_500Medium",
                    fontSize: 16,
                    color: colors.text,
                    marginLeft: 12,
                  }}
                >
                  Account Recovery
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.textSecondary}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/activity-log")}
              style={{
                backgroundColor: colors.cardBackground,
                borderRadius: 12,
                padding: 16,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons
                  name="list-outline"
                  size={20}
                  color={colors.primary}
                />
                <Text
                  style={{
                    fontFamily: "Inter_500Medium",
                    fontSize: 16,
                    color: colors.text,
                    marginLeft: 12,
                  }}
                >
                  Activity Log
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Danger Zone */}
        <View
          style={{
            backgroundColor: "#FEF2F2",
            borderRadius: 16,
            padding: 20,
            borderLeftWidth: 4,
            borderLeftColor: "#DC2626",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <Ionicons name="warning" size={20} color="#DC2626" />
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 16,
                color: "#DC2626",
                marginLeft: 8,
              }}
            >
              Danger Zone
            </Text>
          </View>

          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 14,
              color: "#7F1D1D",
              lineHeight: 20,
              marginBottom: 16,
            }}
          >
            These actions are permanent and cannot be undone. Please proceed
            with caution.
          </Text>

          <TouchableOpacity
            onPress={handleDeleteAccount}
            style={{
              backgroundColor: "#DC2626",
              borderRadius: 12,
              paddingVertical: 12,
              paddingHorizontal: 16,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 14,
                color: "white",
              }}
            >
              Delete Account
            </Text>
          </TouchableOpacity>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          onPress={handleSave}
          disabled={isLoading}
          style={{
            backgroundColor: colors.primary,
            borderRadius: 16,
            paddingVertical: 16,
            alignItems: "center",
            marginTop: 24,
            opacity: isLoading ? 0.7 : 1,
          }}
        >
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 16,
              color: colors.primaryText,
            }}
          >
            {isLoading ? "Saving Changes..." : "Save Changes"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
