import FullScreenSection from "../containers/FullScreenSection";
import Menu from "./Menu";
import CountdownTimer from "./CountdownTimer";
import { useTimer } from "react-timer-hook";
import { useState } from "react";

const TimerControlPanel = () => {
  const [goal, setGoal] = useState({
    round: 0,
    targetRound: 4,
    totalPomoComplete: 0,
    targetPomo: 4,
  });
  // Initialize the target timer duration in seconds
  const [timerTargetDurationSeconds, setTimerDurationTargetSeconds] =
    useState(5);

  // Calculate the expiry timestamp for the timer
  const time = new Date();
  time.setSeconds(time.getSeconds() + timerTargetDurationSeconds);

  // Initialize the timer using the calculated expiry timestamp
  const { seconds, minutes, isRunning, start, pause, resume, restart } =
    useTimer({
      expiryTimestamp: time,
      onExpire: () => {
        setGoal((prevGoal) => ({
          ...prevGoal,
          round: prevGoal.round + 1,
        }));
      },
      autoStart: false,
    });

  return (
    <FullScreenSection extraClasses="bg-primary text-base-100 px-2 flex flex-col justify-between items-center">
      {/* Header Section */}
      <div className="w-full pr-4 pt-4 flex justify-between items-center">
        <Menu />
        {/* Button to restart the timer */}
        <button
          className="uppercase text-sm"
          onClick={() => {
            // Calculate the new expiry timestamp for the timer on restart
            const newTime = new Date();
            newTime.setSeconds(
              newTime.getSeconds() + timerTargetDurationSeconds
            );
            restart(newTime);
          }}
        >
          Restart
        </button>
      </div>

      {/* Timer Section */}
      <CountdownTimer
        seconds={seconds}
        minutes={minutes}
        isRunning={isRunning}
        start={start}
        pause={pause}
        resume={resume}
      />

      {/* Progress Section */}
      <div className="card w-screen bg-base-100 text-secondary shadow-xl rounded-b-none text-center">
        <div className="card-body">
          <div className="flex justify-around">
            {/* Round Progress */}
            <div>
              <h2 className="card-title uppercase">Round</h2>
              <p className="text-xs">
                <span className="text-2xl">{goal.round}</span>/
                {goal.targetRound}
              </p>
            </div>
            <div className="divider divider-horizontal bg-secondary w-[.8px]"></div>
            {/* Goal Progress */}
            <div>
              <h2 className="card-title uppercase">Goal</h2>
              <p className="text-xs">
                <span className="text-2xl">{goal.totalPomoComplete}</span>/
                {goal.targetPomo}
              </p>
            </div>
          </div>
        </div>
      </div>
    </FullScreenSection>
  );
};

export default TimerControlPanel;
