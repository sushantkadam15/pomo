import React, { createContext, useEffect, useState } from "react";

const PomoContext = createContext();

const PomoProvider = ({ children }) => {
  // Load pomoStats from local storage or set default values
  const [pomoStats, setPomoStats] = useState(() => {
    const storedPomoStats = localStorage.getItem("pomoStats");
    return storedPomoStats
      ? JSON.parse(storedPomoStats)
      : {
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
  });

  const [audioMuted, setAudioMuted] = useState(
    localStorage.getItem("audioMuted" || false)
  );

  // Save pomoStats to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("pomoStats", JSON.stringify(pomoStats));
  }, [pomoStats]);

  useEffect(() => {
    localStorage.setItem("audioMuted", audioMuted);
  }, [audioMuted]);

  const contextValue = { pomoStats, setPomoStats, audioMuted, setAudioMuted };

  return (
    <PomoContext.Provider value={contextValue}>{children}</PomoContext.Provider>
  );
};

export { PomoProvider, PomoContext };
