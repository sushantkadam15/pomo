import React, { useContext, useEffect, useState } from "react";
import FullScreenSection from "../containers/FullScreenSection";
import CountdownTimer from "./CountdownTimer";
import { useTimer } from "react-timer-hook";
import { PomoContext } from "../context/PomoContext";
import GoalCompletionCard from "./GoalCompletionCard";
import belllSound from "../assets/sounds/bell.wav";

function TimerControlPanel() {
  // State variables for controlling the timer and session data
  const [view, setView] = useState("focus");
  const [pomoDuration, setPomoDuration] = useState(2); // Default Pomodoro duration set to 25 minutes
  const [shortBreakDuration, setShortBreakDuration] = useState(3); // Default short break duration set to 5 minutes
  const [longBreakDuration, setLongBreakDuration] = useState(4); // Default long break duration set to 15 minutes
  const [currentBreakDuration, setCurrentBreakDuration] =
    useState(shortBreakDuration);

  const { pomoStats, setPomoStats, audioMuted } = useContext(PomoContext);
  const [displayGoalCompletionCard, setDisplayGoalCompletionCard] =
    useState(false);

  const bell = new Audio(belllSound);

  // Function to calculate expiry timestamp based on timer duration in seconds
  const expiryTimestamp = (timerDurationInSeconds) => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + timerDurationInSeconds);
    return time;
  };

  // Create session and break timers using custom hook
  const sessionTimer = useTimer({
    expiryTimestamp: expiryTimestamp(pomoDuration),
    onExpire: handleSessionCompletion,
    autoStart: false, // Timer doesn't start automatically.
  });

  const breakTimer = useTimer({
    expiryTimestamp: expiryTimestamp(currentBreakDuration),
    onExpire: handleSessionCompletion,
    autoStart: false, // Timer doesn't start automatically.
  });

  // Function to handle the completion of a focus session
  function handleSessionCompletion() {
    !audioMuted && bell.play();
    const isFocusRound = view === "focus";
    const isShortBreak =
      currentBreakDuration === shortBreakDuration && view === "break";
    const isLongBreak =
      currentBreakDuration === longBreakDuration && view === "break";
    const isGoalComplete =
      pomoStats.sessionCompleted === pomoStats.targetSession - 1 &&
      pomoStats.roundsCompleted === pomoStats.targetRounds - 1;

    const changeViewToFocus = () => {
      setView("focus");
      const newTime = expiryTimestamp(pomoDuration); // Assuming expiryTimestamp exists
      sessionTimer.restart(newTime); // Assuming sessionTimer exists
    };

    const changeViewToBreak = (breakDuration) => {
      setCurrentBreakDuration(breakDuration);
      setView("break");
      const newTime = expiryTimestamp(breakDuration); // Assuming expiryTimestamp exists
      breakTimer.restart(newTime); // Assuming breakTimer exists
    };

    if (isFocusRound && pomoStats.sessionCompleted < 4) {
      // Increment rounds completed and switch to a break if not the final round
      console.log("isFocusRound");
      if (pomoStats.roundsCompleted === 3 && !isGoalComplete) {
        setPomoStats((prevPomo) => ({
          ...prevPomo,
          roundsCompleted: prevPomo.roundsCompleted + 1,
          sessionCompleted: prevPomo.sessionCompleted + 1,
          totalSessionsCompletedAllTime:
            prevPomo.totalSessionsCompletedAllTime + 1,
          totalRoundsCompletedAllTime: prevPomo.totalRoundsCompletedAllTime + 1,
        }));
        changeViewToBreak(longBreakDuration);
      } else if (!isGoalComplete && pomoStats.roundsCompleted !== 3) {
        setPomoStats((prevPomo) => ({
          ...prevPomo,
          roundsCompleted: prevPomo.roundsCompleted + 1,
          totalRoundsCompletedAllTime: prevPomo.totalRoundsCompletedAllTime + 1,
        }));
        changeViewToBreak(shortBreakDuration);
      } else if (isGoalComplete) {
        setDisplayGoalCompletionCard(true);
        setPomoStats((prevPomo) => ({
          ...prevPomo,
          totalGoalsAchieved: prevPomo.totalGoalsAchieved + 1,
          totalRoundsCompletedAllTime: prevPomo.totalRoundsCompletedAllTime + 1,
          totalSessionsCompletedAllTime:
            prevPomo.totalSessionsCompletedAllTime + 1,
          roundsCompleted: 0,
          sessionCompleted: 0,
        }));
        changeViewToFocus();
      }
    } else if (isShortBreak) {
      setPomoStats((prevPomo) => ({
        ...prevPomo,
        shortBreaksCompleted: prevPomo.shortBreaksCompleted + 1,
        totalShortBreaksCompletedAllTime:
          prevPomo.totalShortBreaksCompletedAllTime + 1,
      }));
      console.log("isShortBreak");
      changeViewToFocus();
    } else if (isLongBreak) {
      setPomoStats((prevPomo) => ({
        ...prevPomo,
        roundsCompleted: 0,
        longBreaksCompleted: prevPomo.longBreaksCompleted + 1,
        totalLongBreaksCompletedAllTime:
          prevPomo.totalLongBreaksCompletedAllTime + 1,
      }));
      console.log("isLongBreak");
      changeViewToFocus();
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
          timerDuration={pomoDuration}
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
        setDisplayGoalCompletionCard={setCurrentBreakDuration}
      />
    </FullScreenSection>
  );
}

export default TimerControlPanel;
