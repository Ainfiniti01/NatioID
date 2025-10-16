import React, { createContext, useContext, useState, useEffect } from "react";
import { Appearance } from "react-native";

export const themes = {
  light: {
    background: "#FFFFFF",
    surface: "#FFFFFF",
    surfaceSecondary: "#F5F5F5",
    text: "#070728",
    textSecondary: "#8E8E99",
    border: "#E5E7EB",
    primary: "#004040",
    primaryText: "#FFFFFF",
    cardBackground: "#FFFFFF",

    // status colors
    warningBg: "#FEF3C7",
    warningText: "#92400E",
    successBg: "#D1FAE5",
    successText: "#065F46",
    pendingBg: "#DBEAFE",
    pendingText: "#1E40AF",
  },
  dark: {
    background: "#121212",
    surface: "#1E1E1E",
    surfaceSecondary: "#262626",
    text: "rgba(255,255,255,0.87)",
    textSecondary: "rgba(255,255,255,0.6)",
    border: "#333333",
    primary: "#004040",
    primaryText: "#FFFFFF",
    cardBackground: "#2A2A2A",

    // status colors
    warningBg: "#451A03",
    warningText: "#FCD34D",
    successBg: "#064E3B",
    successText: "#6EE7B7",
    pendingBg: "#1E3A8A",
    pendingText: "#93C5FD",
  },
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = Appearance.getColorScheme();
  const [theme, setTheme] = useState(systemColorScheme || "light");
  const [useSystem, setUseSystem] = useState(true);

  // Keep in sync with system theme when "system" is selected
  useEffect(() => {
    const listener = ({ colorScheme }) => {
      if (useSystem) {
        setTheme(colorScheme || "light");
      }
    };
    const sub = Appearance.addChangeListener(listener);
    return () => sub.remove();
  }, [useSystem]);

  const changeTheme = (newTheme) => {
    if (newTheme === "system") {
      setUseSystem(true);
      setTheme(Appearance.getColorScheme() || "light");
    } else {
      setUseSystem(false);
      setTheme(newTheme);
    }
  };

  const colors = theme === "dark" ? themes.dark : themes.light;
  const isDark = theme === "dark";

  return (
    <ThemeContext.Provider value={{ colors, isDark, theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return context;
};
