import React, { useEffect } from "react";
import playButtonIcon from "../assets/icons/play-button.png";
import pauseButtonIcon from "../assets/icons/pause-button.png";
import Menu from "./Menu";

const CountdownTimer = ({
  displayedTimer,
  pomoStats,
  view,
  expiryTimestamp,
  timerDuration,
}) => {
  const { seconds, minutes, isRunning, start, pause, restart } = displayedTimer;

  // Handle the restart button click
  const handleRestartClick = () => {
    const newTime = expiryTimestamp(timerDuration);
    restart(newTime);
  };

  // Define the message based on the timer state and view
  const message =
    isRunning && view === "focus"
      ? "Focusing"
      : isRunning && view === "break"
      ? "Short Break Started"
      : null;

  // Pause the timer when the view changes (e.g., from focus to break) because react-timer-hook does not have a reset option but restart that runs automatcally
  useEffect(() => {
    pause();
  }, [view]);

  return (
    <>
      {/* Header Section */}
      <div className="w-full pr-4 pt-4 flex justify-between items-center">
        <Menu view={view} />
        {/* Button to restart the timer */}
        <button className="uppercase text-sm" onClick={handleRestartClick}>
          Restart
        </button>
      </div>

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
          <p className="animate-pulse text-center">{message}</p>
        </div>
        {/* Timer Control */}
        <div className="py-10 flex justify-center">
          <button>
            {/* Display Play or Pause button based on the timer state */}
            {isRunning ? (
              <img
                src={pauseButtonIcon}
                alt="Pause Button"
                onClick={() => {
                  pause();
                }}
              />
            ) : (
              <img
                src={playButtonIcon}
                alt="Play Button"
                onClick={() => {
                  start();
                }}
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
