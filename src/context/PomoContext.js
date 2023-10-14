/**
 * Creates a context and provider for managing Pomodoro statistics and settings.
 * @module PomoProvider
 * @exports PomoProvider
 * @exports PomoContext
 */

import React, { createContext, useEffect, useState } from "react";

// Define default values for pomoStats and settings
const defaultPomoStats = {
  roundsCompleted: 0,
  targetRounds: 4,
  sessionCompleted: 0,
  targetSession: 4,
  shortBreaksCompleted: 0,
  longBreaksCompleted: 0,
  totalRoundsCompletedAllTime: 0,
  totalSessionsCompletedAllTime: 0,
  totalShortBreaksCompletedAllTime: 0,
  totalLongBreaksCompletedAllTime: 0,
  totalGoalsAchieved: 0,
};

const defaultSettings = {
  audioMuted: false,
  pomoSessionDuration: 1500, // seconds
  shortBreakDuration: 300, // seconds
  longBreakDuration: 900, // seconds
};

// Load pomoStats from local storage or set default values
const cachedPomoStats = JSON.parse(localStorage.getItem("pomoStats")) || {};
const pomoStatsStateless = { ...defaultPomoStats, ...cachedPomoStats };

/**
 * Context for managing Pomodoro statistics and settings.
 * @type {object}
 * @property {object} pomoStats - The Pomodoro statistics.
 * @property {function} setPomoStats - Function to update the Pomodoro statistics.
 * @property {object} settings - The Pomodoro settings.
 * @property {function} setSettings - Function to update the Pomodoro settings.
 * @property {object} pomoStatsStateless - The Pomodoro statistics without state.
 */
const PomoContext = createContext();

/**
 * Provider component for managing Pomodoro statistics and settings.
 * @param {object} props - The component props.
 * @param {ReactNode} props.children - The child components.
 * @returns {JSX.Element} The PomoProvider component.
 */
const PomoProvider = ({ children }) => {
  // Use state to manage pomoStats and settings
  const [pomoStats, setPomoStats] = useState(pomoStatsStateless);
  const [settings, setSettings] = useState(() => {
    const cachedSettings =
      JSON.parse(localStorage.getItem("pomoSettings")) || {};
    return { ...defaultSettings, ...cachedSettings };
  });

  // Save pomoStats to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("pomoStats", JSON.stringify(pomoStats));
  }, [pomoStats]);

  // Save settings to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("pomoSettings", JSON.stringify(settings));
  }, [settings]);

  const contextValue = {
    pomoStats,
    setPomoStats,
    settings,
    setSettings,
    pomoStatsStateless,
  };

  return (
    <PomoContext.Provider value={contextValue}>{children}</PomoContext.Provider>
  );
};

export { PomoProvider, PomoContext };
