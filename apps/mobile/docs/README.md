# Mobile Application Documentation

This document outlines the key features and architecture of the mobile application.

## Overview
The mobile application provides a digital identity platform for citizens, allowing them to manage their personal information, access government services, participate in voting, and report emergencies. The application is designed with a focus on security, privacy, and user-friendliness.

## Key Features
- **Digital Citizen ID**: Secure digital representation of a citizen's identity.
- **Voting Services**: Participate in regional and national elections securely.
- **Linked Documents**: Manage and link various personal documents.
- **Emergency SOS**: Quick access to emergency services with location sharing.
- **Application Forms**: Apply for new IDs, renewals, or update information using generic fields like Region/Province.

## Internationalization
The application has been refactored to remove Nigeria-specific references, making it adaptable for international use.
- **Generic Fields**: Replaced "LGA" with "Region/Province".
- **Neutral Terminology**: Uses terms like "Digital Citizen ID" and "National Authority".
- **Country Selector**: A placeholder country dropdown selector has been added to demonstrate adaptability.

## Technical Stack
- React Native
- Expo
- @expo-google-fonts/inter
- @react-native-picker/picker
- Ionicons
- Expo LocalAuthentication
- Expo Clipboard

## Project Structure
- `apps/mobile/src/app`: Contains the main application screens and navigation.
- `apps/mobile/src/components`: Reusable UI components like `DropdownPicker`.
- `apps/mobile/src/utils`: Utility functions and theme configurations.
- `apps/mobile/docs`: This documentation.

## Getting Started (Development)
1. Install dependencies: `npm install`
2. Start the Expo development server: `npm start`
3. Scan the QR code with your mobile device or run on an emulator.

## Contributing
Please refer to the project's main `CONTRIBUTING.md` for guidelines.
