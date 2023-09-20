import React, { createContext, useState } from "react";

const PomoStatsContext = createContext();

const PomoStatsProvider = ({ children }) => {
  const [pomoStats, setPomoStats] = useState({
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
  });

  const contextValue = { pomoStats, setPomoStats };

  return (
    <PomoStatsContext.Provider value={contextValue}>
      {children}
    </PomoStatsContext.Provider>
  );
};

export { PomoStatsProvider, PomoStatsContext };
