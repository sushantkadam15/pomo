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

const PomoContext = createContext();

const PomoProvider = ({ children }) => {
  // Use state to manage pomoStats, settings, and statsData
  const [pomoStats, setPomoStats] = useState(pomoStatsStateless);
  const [settings, setSettings] = useState(() => {
    const cachedSettings =
      JSON.parse(localStorage.getItem("pomoSettings")) || {};
    return { ...defaultSettings, ...cachedSettings };
  });
  const [statsData, setStatsData] = useState(() => {
    const cachedStatsData =
      JSON.parse(localStorage.getItem("statsData")) || [];
    return cachedStatsData;
  });

  // Save pomoStats to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("pomoStats", JSON.stringify(pomoStats));
  }, [pomoStats]);

  // Save settings to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("pomoSettings", JSON.stringify(settings));
  }, [settings]);

  // Save statsData to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("statsData", JSON.stringify(statsData));
  }, [statsData]);

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
