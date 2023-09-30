import React, { useContext, useEffect, useState } from "react";
import FullScreenSection from "../containers/FullScreenSection";
import CountdownTimer from "./CountdownTimer";
import { useTimer } from "react-timer-hook";
import { PomoContext } from "../context/PomoContext";
import GoalCompletionCard from "./GoalCompletionCard";
import bellSound from "../assets/sounds/bell.wav";

const bell = new Audio(bellSound);

function TimerControlPanel() {
  // State variables for controlling the timer and session data
  const { pomoStats, setPomoStats, settings, pomoStatsStateless } =
    useContext(PomoContext); // Removed unnecessary pomoStatsStateless
  const [view, setView] = useState("focus");
  const [currentBreakDuration, setCurrentBreakDuration] = useState(
    settings.shortBreakDuration
  );

  const [displayGoalCompletionCard, setDisplayGoalCompletionCard] =
    useState(false);

  // Function to calculate expiry timestamp based on timer duration in seconds
  const expiryTimestamp = (timerDurationInSeconds) => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + timerDurationInSeconds);
    return time;
  };

  // Create session and break timers using custom hook
  const sessionTimer = useTimer({
    expiryTimestamp: expiryTimestamp(settings.pomoSessionDuration),
    onExpire: handleSessionCompletion,
    autoStart: false,
  });

  const breakTimer = useTimer({
    expiryTimestamp: expiryTimestamp(currentBreakDuration),
    onExpire: handleSessionCompletion,
    autoStart: false,
  });

  function handleSessionCompletion() {
    // Function to change the view and restart the timer
    const changeViewAndRestartTimer = (newView, newDuration, timer) => {
      setCurrentBreakDuration(newDuration);
      setView(newView);
      const newTime = expiryTimestamp(newDuration);
      timer.restart(newTime);
    };
  
    // Function to update pomoStats and handle view changes
    const handleViewChange = (newView, newDuration, statsUpdate) => {
      setPomoStats((prevPomo) => ({
        ...prevPomo,
        ...statsUpdate,
      }));
      changeViewAndRestartTimer(newView, newDuration, newView === "focus" ? sessionTimer : breakTimer);
    };
  
    const isFocusRound = view === "focus";
    const isShortBreak = currentBreakDuration === settings.shortBreakDuration && view === "break";
    const isLongBreak = currentBreakDuration === settings.longBreakDuration && view === "break";
    const isGoalComplete =
      pomoStats.sessionCompleted === pomoStats.targetSession - 1 &&
      pomoStats.roundsCompleted === pomoStats.targetRounds - 1;
  
    if (isFocusRound && pomoStats.sessionCompleted < 4) {
      // Increment rounds completed and switch to a break if not the final round
      if (pomoStats.roundsCompleted === 3 && !isGoalComplete) {
        handleViewChange("break", settings.longBreakDuration, {
          roundsCompleted: pomoStats.roundsCompleted + 1,
          sessionCompleted: pomoStats.sessionCompleted + 1,
          totalSessionsCompletedAllTime: pomoStats.totalSessionsCompletedAllTime + 1,
          totalRoundsCompletedAllTime: pomoStats.totalRoundsCompletedAllTime + 1,
        });
      } else if (!isGoalComplete && pomoStats.roundsCompleted !== 3) {
        handleViewChange("break", settings.shortBreakDuration, {
          roundsCompleted: pomoStats.roundsCompleted + 1,
          totalRoundsCompletedAllTime: pomoStats.totalRoundsCompletedAllTime + 1,
        });
      } else if (isGoalComplete) {
        setDisplayGoalCompletionCard(true);
        handleViewChange("focus", settings.pomoSessionDuration, {
          totalGoalsAchieved: pomoStats.totalGoalsAchieved + 1,
          totalRoundsCompletedAllTime: pomoStats.totalRoundsCompletedAllTime + 1,
          totalSessionsCompletedAllTime: pomoStats.totalSessionsCompletedAllTime + 1,
          roundsCompleted: 0,
          sessionCompleted: 0,
        });
      }
    } else if (isShortBreak) {
      handleViewChange("focus", settings.pomoSessionDuration, {
        shortBreaksCompleted: pomoStats.shortBreaksCompleted + 1,
        totalShortBreaksCompletedAllTime: pomoStats.totalShortBreaksCompletedAllTime + 1,
      });
    } else if (isLongBreak) {
      handleViewChange("focus", settings.pomoSessionDuration, {
        roundsCompleted: 0,
        longBreaksCompleted: pomoStats.longBreaksCompleted + 1,
        totalLongBreaksCompletedAllTime: pomoStats.totalLongBreaksCompletedAllTime + 1,
      });
    }
  
    console.log(`
    ***********************
    roundsCompleted: ${pomoStats.roundsCompleted}
    targetRounds: ${pomoStats.targetRounds}
    sessionCompleted: ${pomoStats.sessionCompleted}
    targetSession: ${pomoStats.targetSession}
    shortBreaksCompleted: ${pomoStats.shortBreaksCompleted}
    longBreaksCompleted: ${pomoStats.longBreaksCompleted}
    totalRoundsCompletedAllTime: ${pomoStats.totalRoundsCompletedAllTime}
    totalSessionsCompletedAllTime: ${pomoStats.totalSessionsCompletedAllTime}
    totalShortBreaksCompletedAllTime: ${pomoStats.totalShortBreaksCompletedAllTime}
    totalLongBreaksCompletedAllTime: ${pomoStats.totalLongBreaksCompletedAllTime}
    totalGoalsAchieved: ${pomoStats.totalGoalsAchieved}
    
    `);
  }
  

  // Render the TimerControlPanel component
  return (
    <FullScreenSection
      extraclasses={
        view === "focus"
          ? "bg-primary text-base-100 px-2 flex flex-col justify-between items-center"
          : "bg-secondary text-base-100 px-2 flex flex-col justify-between items-center"
      }
    >
      {view === "focus" && (
        <CountdownTimer
          displayedTimer={sessionTimer}
          pomoStats={pomoStats}
          view={view}
          expiryTimestamp={expiryTimestamp}
          timerDuration={settings.pomoSessionDuration}
        />
      )}

      {view === "break" && (
        <CountdownTimer
          displayedTimer={breakTimer}
          pomoStats={pomoStats}
          view={view}
          expiryTimestamp={expiryTimestamp}
          timerDuration={currentBreakDuration}
        />
      )}
      <GoalCompletionCard
        displayGoalCompletionCard={displayGoalCompletionCard}
        setDisplayGoalCompletionCard={setDisplayGoalCompletionCard}
      />
    </FullScreenSection>
  );
}

export default TimerControlPanel;
