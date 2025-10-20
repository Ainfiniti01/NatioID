# NatioID – Digital ID Management System

This document outlines the super admin functionalities.

**NatioID** is a modern digital identity management system featuring a responsive **React (Vite)** web interface and a companion **mobile application (APK)**.
It enables administrators and citizens to manage identification records, view applications, and interact with a unified national identity platform — all through a fast, accessible, and scalable frontend.

---

## 🚀 Live Demo Links
- **Web App**: [Web App](https://natio-id.vercel.app/admin/login)
- **Mobile App**: [APK download](https://expo.dev/accounts/ainfiniti/projects/natioid/builds/f66d46db-007c-4da7-9cda-db6db180115e)

---

## 🌍 Overview

NatioID serves as a **presentation-ready prototype** for a national digital ID system.
The web app functions as both the **admin dashboard** and **citizen portal**, showcasing how digital ID infrastructure can be managed through a user-friendly interface.
It is built purely on the frontend (no backend APIs or SSR), optimized for deployment on **Vercel** as a static web application.

The **NatioID Mobile App** is a companion to the NatioID web portal — providing citizens with a portable, secure, and user-friendly interface for managing their **Digital Citizen ID** and related services.

This application is built with **React Native (Expo)** and designed to work seamlessly alongside the web version for accessibility, verification, and service interaction.

---

## 🚀 Key Features

### 🧭 Admin Interface
- Manage and review citizen applications.
- Monitor system settings and activity logs.
- Access voting, benefits, complaints, and reporting modules.

### 👤 Citizen Portal
- View personal ID records and linked details.
- Apply for services or submit complaints.
- Secure login interface (demo-ready).

### 📱 Mobile App Features
- View and manage their **Digital Citizen ID**.
- Apply for new or updated records.
- The mobile app provides a user-friendly interface for secure, decentralized participation in elections or public surveys, acting as a mock voting system to demonstrate these capabilities.
- Access linked services (benefits, complaints).
- Trigger emergency SOS requests.
- Interact with government services directly from their devices.

### 💡 System Features
- Fully responsive UI (desktop and mobile support).
- Modular routing using **React Router**.
- Scalable structure with reusable UI components.
- Multi-language structure (ready for localization).
- Optimized static export using **Vite** for fast load and deployment.

---

## 🧱 Technology Stack

### Web Application

| Layer | Tools & Frameworks |
|-------|--------------------|
| **Frontend** | React + Vite + React Router |
| **Styling** | Tailwind CSS |
| **State & Logic** | React Hooks, Zustand, React Query |
| **Icons & UI** | Lucide React, ShadCN UI, Chakra UI |
| **Language** | TypeScript + JSX |
| **Build Tool** | Vite |
| **Deployment** | Vercel (Static Export) |

### Mobile Application

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
├── mobile/ # Mobile app (APK version)
└── web/
├── src/
│ ├── app/ # Main application pages & routes
│ ├── components/ # Shared UI components
│ ├── utils/ # Utilities and hooks
│ └── index.css
├── plugins/ # Vite custom plugins
├── index.html # Root HTML entry
├── vite.config.ts # Build configuration (static export)
└── package.json

---

## 🧩 Setup & Development

### Web Application

#### 1️⃣ Install Dependencies
From the root or `apps/web/` directory:
```bash
npm install
```
#### 2️⃣ Start Development Server
```bash
npm run dev
```
Then open http://localhost:4000

#### 3️⃣ Build for Production
```bash
npm run build
```
This will generate a static build inside `apps/web/build/client/` or `apps/web/dist/` depending on configuration.

#### 4️⃣ Preview Locally
```bash
npm run preview
```

### Mobile Application

#### 1️⃣ Install Dependencies
From inside the `apps/mobile/` directory:
```bash
npm install
```
#### 2️⃣ Start Expo Dev Server
```bash
npm start
```
#### 3️⃣ Run the App
Scan the QR code from your terminal using the Expo Go app on Android/iOS.

Or use an emulator (Android Studio or iOS Simulator).

#### 📦 Building the APK
You can build a standalone Android APK for distribution or offline testing:
```bash
npx expo build:android -t apk
```
The generated file can be shared and installed directly on Android devices.

---

## ☁️ Deployment (Vercel)
This project is configured for static hosting on Vercel.

**Vercel settings:**

*   **Framework Preset**: Other
*   **Root Directory**: `apps/web`
*   **Build Command**: `npm run build`
*   **Output Directory**: `apps/web/build/client` (or `dist` depending on Vite config)
*   **Install Command**: `npm install`

**`vercel.json`**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "apps/web/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "apps/web/build/client"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ]
}
```

---

## 🧭 Internationalization
The project uses neutral terminology for adaptability:

*   “Region / Province” replaces “LGA”
*   “Digital Citizen ID” instead of “National ID”
*   Ready for integration with translation libraries (multi-language structure supported)

---

## 🤝 Contributing
While this version focuses on presentation and UI, contributions are welcome for:

*   Backend integration
*   API layer improvements
*   Mobile-Web synchronization

## 📸 Visual Example

![Admin Dash 2](docs/screenshots/Admin-dash2.jpg)
![Admin Dashboard](docs/screenshots/Admin-Dashboard.jpg)
![Admin Login](docs/screenshots/Admin-Login.jpg)
![Admin User Management](docs/screenshots/Admin-user-management.jpg)
![Campaign](docs/screenshots/campaign.jpg)
![Dashboard](docs/screenshots/dashboard.jpg)
![Election Management](docs/screenshots/Election-management.jpg)
![ID Page](docs/screenshots/ID--page.jpg)
![ID Preview](docs/screenshots/ID-preview.jpg)
![Light Dashboard](docs/screenshots/light-dashboard.jpg)
![Live Result](docs/screenshots/Live-result.jpg)
![Login](docs/screenshots/Login.jpg)
![Profile](docs/screenshots/profile.jpg)
![Services](docs/screenshots/services.jpg)
![Super Admin](docs/screenshots/Super-Admin.jpg)
![Theme](docs/screenshots/Theme.jpg)

---

## 📌 Disclaimer

 **Disclaimer:**  
* This project is a working prototype developed solely for presentation and proposal purposes.  
* All features, content, and functionalities are intended for demonstration only and may not represent a final or deployable product.  
* Please contact the author before any reuse, sharing, or distribution.

---

## 📄 LICENSE (Custom — All Rights Reserved)

© 2025 Ainfiniti. All rights reserved.

This software, including all code, designs, and documentation, is the intellectual property of Ainfiniti.

It is provided for demonstration, evaluation, and proposal purposes only. Unauthorized reproduction, modification, distribution, or commercial use of any part of this project is strictly prohibited.

This project may not be copied, reproduced, or used in whole or in part without explicit written permission from the owner.

---

## 🧠 Author
**Abdulazeez Adam.A**
Project Lead & Full-Stack Developer
*   **Email**: abdulazeezadam09@gmail.com
*   **GitHub**: https://github.com/Ainfiniti01
