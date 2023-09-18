import React from "react";
import playButtonIcon from "../assets/icons/play-button.png";
import pauseButtonIcon from "../assets/icons/pause-button.png";

const CountdownTimer = ({ seconds, minutes, isRunning, start, pause }) => {
  return (
    <div extraClasses={"flex flex-col justify-center items-center"}>
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
        {isRunning && <p className="animate-pulse text-center">Focusing</p>}
      </div>
      {/* Timer Control */}
      <div className=" py-32 flex justify-center">
        <button >
          {/* Display Play or Pause button based on the timer state */}
          {isRunning ? (
            <img src={pauseButtonIcon} alt="Pause Button" onClick={pause}  />
          ) : (
            <img src={playButtonIcon} alt="Play Button" onClick={start} />
          )}
        </button>
      </div>
    </div>
  );
};

export default CountdownTimer;
