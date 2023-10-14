import React, { useEffect } from "react";
import playButtonIcon from "../assets/icons/play-button.png";
import pauseButtonIcon from "../assets/icons/pause-button.png";
import Menu from "./Menu";

/**
 * CountdownTimer component displays a countdown timer with play/pause functionality.
 * It also includes a menu component for navigation and shows progress information.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.displayedTimer - An object containing the current timer state.
 * @param {Object} props.pomoStats - An object containing statistics about completed rounds and sessions.
 * @param {string} props.view - The current view of the timer.
 * @param {Function} props.expiryTimestamp - A function that calculates the expiry timestamp based on the timer duration.
 * @param {number} props.timerDuration - The duration of the timer in seconds.
 * @returns {JSX.Element} - The rendered CountdownTimer component.
 */
const CountdownTimer = ({
  displayedTimer,
  pomoStats,
  view,
  expiryTimestamp,
  timerDuration,
}) => {
  const { seconds, minutes, isRunning, start, pause, restart } = displayedTimer;

  /**
   * Determines the message to display based on the timer state and view.
   *
   * @returns {string|null} - The message to display.
   */
  const getMessage = () => {
    if (isRunning && view === "focus") {
      return "Focusing";
    } else if (isRunning && view === "break") {
      return "Short Break Started";
    } else {
      return null;
    }
  };

  /**
   * Pauses the timer when the view changes.
   */
  useEffect(() => {
    pause();
  }, [view, pause]);

  return (
    <>
      {/* Header Section */}
      <Menu
        menuclass={view === "focus" ? "btn btn-primary drawer-button" : "btn btn-secondary drawer-button"}
        expiryTimestamp={expiryTimestamp}
        timerDuration={timerDuration}
        restart={restart}
      />

      <div className="flex flex-col justify-center items-center">
        {/* Timer Display */}
        <div className="font-gilroyextrabold text-8xl md:text-9xl mx-4 py-12">
          <div className="countdown">
            {/* Display the minutes */}
            <span style={{ "--value": minutes }}></span>
          </div>
          <span>:</span>
          <div className="countdown">
            {/* Display the seconds */}
            <span style={{ "--value": seconds }}></span>
          </div>
        </div>
        <div className="h-10">
          {/* Display "Focusing" text while the timer is running */}
          <p className="animate-pulse text-center">{getMessage()}</p>
        </div>
        {/* Timer Control */}
        <div className="py-10 flex justify-center">
          <button>
            {/* Display Play or Pause button based on the timer state */}
            {isRunning ? (
              <img
                src={pauseButtonIcon}
                alt="Pause Button"
                onClick={pause}
              />
            ) : (
              <img
                src={playButtonIcon}
                alt="Play Button"
                onClick={start}
              />
            )}
          </button>
        </div>
      </div>
      {/* Progress Section */}
      <div className="card w-screen bg-base-100 text-secondary shadow-xl rounded-b-none text-center">
        <div className="card-body">
          <div className="flex justify-around">
            {/* Round Progress */}
            <div>
              <h2 className="card-title uppercase">Round</h2>
              <p className="text-xs">
                <span className="text-2xl">{pomoStats.roundsCompleted}</span>/
                {pomoStats.targetRounds}
              </p>
            </div>
            <div className="divider divider-horizontal bg-secondary w-[.8px]"></div>
            {/* Goal Progress */}
            <div>
              <h2 className="card-title uppercase">Goal</h2>
              <p className="text-xs">
                <span className="text-2xl">{pomoStats.sessionCompleted}</span>/
                {pomoStats.targetSession}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CountdownTimer;


