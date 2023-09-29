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

  const sessionCompletionHandler = () => {
    !settings.audioMuted && bell.play();
    const updatePomoStats = (update) => {
      // Merges both objects
      Object.assign(pomoStatsStateless, update);
      setPomoStats({
        ...pomoStats,
        ...update,
      });
    };

    // Updated variable names here to use pomoStats from the context
    const endPomoRound = () => {
      updatePomoStats({
        roundsCompleted: pomoStatsStateless.roundsCompleted + 1,
      });

      setView("break");
    };

    const endShortBreak = () => {
      updatePomoStats({
        shortBreaksCompleted: pomoStatsStateless.shortBreaksCompleted + 1,
      });

      setView("focus");
    };

    const endLongBreak = () => {
      updatePomoStats({
        longBreaksCompleted: pomoStatsStateless.longBreaksCompleted + 1,
      });

      setView("focus");
    };

    const endPomoSession = () => {
      updatePomoStats({
        roundsCompleted: pomoStatsStateless.roundsCompleted + 1,
        sessionCompleted: pomoStatsStateless.sessionCompleted + 1,
      });
    };

    if (view === "focus") {
      endPomoRound();
    }
    if (view === "break") {
      endShortBreak();
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
  };

  // Create session and break timers using custom hook
  const sessionTimer = useTimer({
    expiryTimestamp: expiryTimestamp(settings.pomoSessionDuration),
    onExpire: sessionCompletionHandler,
    autoStart: false,
  });

  const breakTimer = useTimer({
    expiryTimestamp: expiryTimestamp(currentBreakDuration),
    onExpire: sessionCompletionHandler,
    autoStart: false,
  });

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
