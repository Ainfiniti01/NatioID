import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import routes from './app/routes.tsx'; // Import the routes array
import { ThemeProvider } from './context/ThemeContext.jsx';
import { Analytics } from "@vercel/analytics/react";

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
      <Analytics />
    </ThemeProvider>
  </React.StrictMode>,
);