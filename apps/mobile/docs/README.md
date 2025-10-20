📱 NatioID Mobile Application

This document is for the super admin.

The **NatioID Mobile App** is a companion to the NatioID web portal — providing citizens with a portable, secure, and user-friendly interface for managing their **Digital Citizen ID** and related services.

This application is built with **React Native (Expo)** and designed to work seamlessly alongside the web version for accessibility, verification, and service interaction.

---

## 🚀 Live Demo Links
- **Web App**: [Web App](https://natio-id.vercel.app/admin/login)
- **Mobile App**: [APK download](https://expo.dev/accounts/ainfiniti/projects/natioid/builds/f66d46db-007c-4da7-9cda-db6db180115e)

---

## 🌍 Overview

The NatioID Mobile App enables users to:
- View and manage their **Digital Citizen ID**.
- Apply for new or updated records.
- Access linked services (benefits, voting, complaints).
- Manage complaints and benefits.
- Trigger emergency SOS requests.
- Interact with government services directly from their devices.

It emphasizes **privacy**, **offline readiness**, and **secure local storage**, with a structure that’s easily adaptable for different national contexts.

---

## 🚀 Key Features

### 👤 Digital Citizen ID
A secure on-device representation of the user’s identity with profile details and a unique ID code.

### 🗳️ Voting Services
The mobile app provides a user-friendly interface for secure, decentralized participation in elections or public surveys, acting as a mock voting system to demonstrate these capabilities. Key features include:
- Voter registration
- Election creation & management
- Live result monitoring
- Candidate campaign pages
- Securely cast your ballot in national or organizational elections.

### 📄 Linked Documents
Ability to manage attached records such as birth certificates, voter cards, and driver’s licenses.

### 🚨 Emergency SOS
Instant access to emergency assistance — can transmit a user’s location to authorities.

### 🧾 Application & Renewal Forms
Apply for ID registration, renewal, or updates using universal, non-country-specific data fields.

---

## 🔐 Security & Privacy Features
- **Login/Auth System**: Admin-only access for secure management.
- **Data Validation & Error Handling**: Ensures data integrity and robust user experience.
- **Role-Based Access**: Differentiates between admin and citizen privileges.
- **Rate Limiting / Anti-Abuse**: Basic measures to prevent abuse.

Features like screenshot prevention and data blur on sensitive pages are planned for future releases.

---


## 🌐 Internationalization (i18n)

The app follows the **internationalized structure** established across NatioID:

- Replaced “LGA” with **“Region / Province”**
- Removed country-locked text or icons
- Introduced placeholder **Country Selector**
- Uses **neutral governance terms** like “National Authority” and “Digital Citizen ID”

This ensures that the app can be rebranded or deployed in different regions without major refactoring.

---

## 🧱 Technical Stack

| Category | Tools & Frameworks |
|-----------|--------------------|
| **Framework** | React Native (Expo) |
| **UI & Components** | React Native Paper, Ionicons |
| **Fonts** | @expo-google-fonts/inter |
| **Inputs** | @react-native-picker/picker |
| **Utilities** | Expo LocalAuthentication, Expo Clipboard |
| **Language** | JavaScript / TypeScript (Hybrid) |
| **Build** | Expo Build Service (EAS) |
| **Deployment** | APK (Android) – locally installable |

---

## 📂 Project Structure

apps/
├── web/ # Web frontend (Vite + React)
└── mobile/
├── src/
│ ├── app/ # Main screens & navigation
│ ├── components/ # Shared UI components (e.g. DropdownPicker)
│ ├── utils/ # Utility helpers & theme configuration
│ └── assets/ # Fonts, icons, and static resources
├── app.json # Expo configuration
├── package.json
└── docs/README.md # This file

yaml
Copy code

---

## 🧩 Development Setup

### 1️⃣ Install Dependencies
From inside the `apps/mobile/` directory:
```bash
npm install
2️⃣ Start Expo Dev Server
bash
Copy code
npm start
3️⃣ Run the App
Scan the QR code from your terminal using the Expo Go app on Android/iOS.

Or use an emulator (Android Studio or iOS Simulator).

📦 Building the APK
You can build a standalone Android APK for distribution or offline testing:

bash
Copy code
npx expo build:android -t apk
The generated file can be shared and installed directly on Android devices.

🛠️ Deployment
Currently, the mobile app is distributed via APK for local testing. You can download the APK directly from the Live Demo Links section.
It is not published to app stores yet but can be easily adapted for Play Store or TestFlight release through EAS Build.

🧠 Contributing
Contributions are welcome, particularly for:

Integrating backend APIs for real data.

Adding biometric login and offline storage.

Enhancing cross-app sync with the NatioID Web portal.

Please refer to the main project’s CONTRIBUTING.md for more information.

👨‍💻 Author
Abdulazeez Adam.A
Lead Developer – NatioID Project
Email: abdulazeezadam09@gmail.com
GitHub: https://github.com/Ainfiniti01

📌 Disclaimer

> **Disclaimer:**  
> This project is a working prototype developed solely for presentation and proposal purposes.  
> All features, content, and functionalities are intended for demonstration only and may not represent a final or deployable product.  
> Please contact the author before any reuse, sharing, or distribution.

---

## 📄 LICENSE (Custom — All Rights Reserved)

© 2025 Ainfiniti. All rights reserved.

This software, including all code, designs, and documentation, is the intellectual property of Ainfiniti.

It is provided for demonstration, evaluation, and proposal purposes only. Unauthorized reproduction, modification, distribution, or commercial use of any part of this project is strictly prohibited.

This project may not be copied, reproduced, or used in whole or in part without explicit written permission from the owner.
