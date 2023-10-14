import React, { useContext, useState } from "react";
import FullScreenSection from "./FullScreenSection";
import CountdownTimer from "../components/CountdownTimer";
import { useTimer } from "react-timer-hook";
import { PomoContext } from "../context/PomoContext";
import GoalCompletionCard from "../components/GoalCompletionCard";
import bellSound from "../assets/sounds/bell.wav";


/**
 * TimerControlPanel is a functional component that controls the timer and session data for a Pomodoro timer application.
 * It uses state variables and a custom hook to manage the view, break duration, and goal completion card display.
 * It also handles session completion events and updates the session and break timers accordingly.
 *
 * Example Usage:
 * <TimerControlPanel />
 *
 * Inputs:
 * - No explicit inputs, but it relies on the 'PomoContext' context and the 'settings' object from the context to determine the timer durations and other settings.
 *
 * Flow:
 * 1. The component initializes state variables for the view, break duration, and goal completion card display.
 * 2. It creates session and break timers using the 'useTimer' custom hook, providing the expiry timestamp and an 'onExpire' callback function.
 * 3. When a session or break timer expires, the 'handleSessionCompletion' function is called.
 * 4. The 'handleSessionCompletion' function checks the current view and break duration to determine the appropriate action based on the Pomodoro technique rules.
 * 5. It updates the session and break timers, changes the view, and updates the 'pomoStats' state variable accordingly.
 * 6. If a goal is completed, it sets the 'displayGoalCompletionCard' state variable to true.
 * 7. The component renders the 'FullScreenSection' component with the appropriate background color and text color based on the current view.
 * 8. It conditionally renders the 'CountdownTimer' component based on the current view, passing the relevant timer and pomoStats data.
 * 9. It also renders the 'GoalCompletionCard' component, passing the 'displayGoalCompletionCard' and 'setDisplayGoalCompletionCard' state variables.
 *
 * Outputs:
 * - The component renders the 'FullScreenSection' component with the appropriate background color and text color.
 * - It conditionally renders the 'CountdownTimer' component based on the current view, passing the relevant timer and pomoStats data.
 * - It renders the 'GoalCompletionCard' component, passing the 'displayGoalCompletionCard' and 'setDisplayGoalCompletionCard' state variables.
 */
function TimerControlPanel() {
  // State variables for controlling the timer and session data
  const { pomoStats, setPomoStats, settings } = useContext(PomoContext);
  const bell = new Audio(bellSound);


  // State for managing the view, break duration, and goal completion card display
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
    !settings.audioMuted && bell.play();
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
      changeViewAndRestartTimer(
        newView,
        newDuration,
        newView === "focus" ? sessionTimer : breakTimer
      );
    };

    const isFocusRound = view === "focus";
    const isShortBreak =
      currentBreakDuration === settings.shortBreakDuration && view === "break";
    const isLongBreak =
      currentBreakDuration === settings.longBreakDuration && view === "break";
    const isGoalComplete =
      pomoStats.sessionCompleted === pomoStats.targetSession - 1 &&
      pomoStats.roundsCompleted === pomoStats.targetRounds - 1;

    if (isFocusRound && pomoStats.sessionCompleted < 4) {
      // Increment rounds completed and switch to a break if not the final round
      if (pomoStats.roundsCompleted === 3 && !isGoalComplete) {
        handleViewChange("break", settings.longBreakDuration, {
          roundsCompleted: pomoStats.roundsCompleted + 1,
          sessionCompleted: pomoStats.sessionCompleted + 1,
          totalSessionsCompletedAllTime:
            pomoStats.totalSessionsCompletedAllTime + 1,
          totalRoundsCompletedAllTime:
            pomoStats.totalRoundsCompletedAllTime + 1,
        });
      } else if (!isGoalComplete && pomoStats.roundsCompleted !== 3) {
        handleViewChange("break", settings.shortBreakDuration, {
          roundsCompleted: pomoStats.roundsCompleted + 1,
          totalRoundsCompletedAllTime:
            pomoStats.totalRoundsCompletedAllTime + 1,
        });
      } else if (isGoalComplete) {
        setDisplayGoalCompletionCard(true);
        handleViewChange("focus", settings.pomoSessionDuration, {
          totalGoalsAchieved: pomoStats.totalGoalsAchieved + 1,
          totalRoundsCompletedAllTime:
            pomoStats.totalRoundsCompletedAllTime + 1,
          totalSessionsCompletedAllTime:
            pomoStats.totalSessionsCompletedAllTime + 1,
          roundsCompleted: 0,
          sessionCompleted: 0,
          longBreaksCompleted: 0,
          shortBreaksCompleted: 0,
        });
      }
    } else if (isShortBreak) {
      handleViewChange("focus", settings.pomoSessionDuration, {
        shortBreaksCompleted: pomoStats.shortBreaksCompleted + 1,
        totalShortBreaksCompletedAllTime:
          pomoStats.totalShortBreaksCompletedAllTime + 1,
      });
    } else if (isLongBreak) {
      handleViewChange("focus", settings.pomoSessionDuration, {
        roundsCompleted: 0,
        longBreaksCompleted: pomoStats.longBreaksCompleted + 1,
        totalLongBreaksCompletedAllTime:
          pomoStats.totalLongBreaksCompletedAllTime + 1,
      });
    } else if (settings.roundsCompleted > 4) {
      handleViewChange("focus", settings.pomoSessionDuration, {
        sessionCompleted: 0,
        shortBreaksCompleted: 0,
        roundsCompleted: 0,
        longBreaksCompleted: 0,
      });
    }

    // Log session stats for debugging
    console.log(`
    ***********************
    roundsCompleted: ${pomoStats.roundsCompleted}
    sessionCompleted: ${pomoStats.sessionCompleted}
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
