# NatioID – Digital ID Management System

**NatioID** is a modern digital identity management system featuring a responsive **React (Vite)** web interface and a companion **mobile application (APK)**.  
It enables administrators and citizens to manage identification records, view applications, and interact with a unified national identity platform — all through a fast, accessible, and scalable frontend.

---

## 🚀 Live Demo Links
- **Web App**: [https://natio-id.vercel.app/](https://natio-id.vercel.app/)
- **Mobile App**: APK download or Expo link (coming soon)

---

## 🌍 Overview

NatioID serves as a **presentation-ready prototype** for a national digital ID system.  
The web app functions as both the **admin dashboard** and **citizen portal**, showcasing how digital ID infrastructure can be managed through a user-friendly interface.  
It is built purely on the frontend (no backend APIs or SSR), optimized for deployment on **Vercel** as a static web application.

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

### 💡 System Features
- Fully responsive UI (desktop and mobile support).
- Modular routing using **React Router**.
- Scalable structure with reusable UI components.
- Multi-language structure (ready for localization).
- Optimized static export using **Vite** for fast load and deployment.

---

## 🧱 Technology Stack

| Layer | Tools & Frameworks |
|-------|--------------------|
| **Frontend** | React + Vite + React Router |
| **Styling** | Tailwind CSS |
| **State & Logic** | React Hooks, Zustand, React Query |
| **Icons & UI** | Lucide React, ShadCN UI, Chakra UI |
| **Language** | TypeScript + JSX |
| **Build Tool** | Vite |
| **Deployment** | Vercel (Static Export) |

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

yaml
Copy code

---

## 🧩 Setup & Development

### 1️⃣ Install Dependencies
From the root or `apps/web/` directory:
```bash
npm install
2️⃣ Start Development Server
bash
Copy code
npm run dev
Then open http://localhost:4000

3️⃣ Build for Production
bash
Copy code
npm run build
This will generate a static build inside apps/web/build/client/
or apps/web/dist/ depending on configuration.

4️⃣ Preview Locally
bash
Copy code
npm run preview
☁️ Deployment (Vercel)
This project is configured for static hosting on Vercel.

Vercel settings:

Framework Preset: Other

Root Directory: apps/web

Build Command: npm run build

Output Directory: build/client (or dist depending on Vite config)

Install Command: npm install

vercel.json

json
Copy code
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
📱 Mobile Version
The mobile application (APK) is a companion app to NatioID Web.
It shares the same design language and logic but is optimized for offline and on-device use.

APK can be installed directly for demonstration or testing purposes.

🧭 Internationalization
The project uses neutral terminology for adaptability:

“Region / Province” replaces “LGA”

“Digital Citizen ID” instead of “National ID”

Ready for integration with translation libraries (multi-language structure supported)

🤝 Contributing
While this version focuses on presentation and UI, contributions are welcome for:

Backend integration

API layer improvements

Mobile-Web synchronization

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

🧠 Author
Abdulazeez Adam.A
Project Lead & Full-Stack Developer
Email: abdulazeezadam09@gmail.com
GitHub: https://github.com/Ainfiniti01
