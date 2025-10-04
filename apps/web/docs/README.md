# Web Application Documentation

This document outlines the key features and architecture of the web application.

## Overview
The web application serves as an administrative and citizen portal for the digital identity platform. It allows administrators to manage users, applications, and system settings, while citizens can access their digital ID, apply for services, and view their records. The application is designed for scalability, security, and ease of use.

## Key Features
- **Admin Dashboard**: Manage users, applications, voting, and system settings.
- **Citizen Portal**: Access digital ID, apply for services, view linked documents.
- **API Endpoints**: Provides a robust API for mobile and other integrations.
- **Internationalization**: Supports generic fields and neutral terminology for global adaptability.

## Internationalization
The application has been refactored to remove Nigeria-specific references, making it adaptable for international use.
- **Generic Fields**: Replaced "LGA" with "Region/Province" (where applicable).
- **Neutral Terminology**: Uses terms like "Digital Citizen ID" and "National Authority".

## Technical Stack
- React (Next.js/Vite)
- Tailwind CSS
- Various React libraries (e.g., for routing, state management)

## Project Structure
- `apps/web/src/app`: Contains the main application pages and API routes.
- `apps/web/src/components`: Reusable UI components.
- `apps/web/src/utils`: Utility functions and configurations.
- `apps/web/docs`: This documentation.

## Getting Started (Development)
1. Install dependencies: `npm install` (or `bun install`)
2. Start the development server: `npm run dev` (or `bun dev`)
3. Access the application in your browser, usually at `http://localhost:3000`.

## Contributing
Please refer to the project's main `CONTRIBUTING.md` for guidelines.
