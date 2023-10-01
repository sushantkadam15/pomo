import { useEffect, useRef, useContext } from "react";
import { StatsCard } from "./PomoStats";
import { GaugeCircle, Rocket } from "lucide-react";
import { PomoContext } from "../context/PomoContext";
import confetti from "canvas-confetti";

const GoalCompletionCard = ({
  displayGoalCompletionCard,
  setDisplayGoalCompletionCard,
}) => {
  const goalCompletionCardRef = useRef(null);
  const { settings, pomoStats } = useContext(PomoContext);
  const {
    totalRoundsCompletedAllTime,
    totalSessionsCompletedAllTime,
    totalShortBreaksCompletedAllTime,
    totalLongBreaksCompletedAllTime,
    totalGoalsAchieved,
  } = pomoStats;

  useEffect(() => {
    // Effect triggered when displayGoalCompletionCard prop changes
    if (displayGoalCompletionCard) {
      goalCompletionCardRef.current.showModal(); // Show the modal when prop is true
      confetti({ particleCount: 500, startVelocity: 30, spread: 360 });
    }
  }, [displayGoalCompletionCard]);

  return (
    <>
      <dialog id="goalCompleted" className="modal" ref={goalCompletionCardRef}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Congratulations!</h3>
          <p className="py-4 stats w-full">
            <StatsCard
              statsDescription="Sessions"
              statsIcon={<GaugeCircle size={36} />}
              stats={totalSessionsCompletedAllTime}
              statsCalculationParam={settings.pomoSessionDuration}
            />
            <StatsCard
              statsDescription="Goal"
              statsIcon={<Rocket size={36} />}
              stats={totalGoalsAchieved}
              statsCalculationParam={
                totalRoundsCompletedAllTime * settings.pomoSessionDuration +
                totalShortBreaksCompletedAllTime * settings.shortBreakDuration +
                totalLongBreaksCompletedAllTime * settings.longBreakDuration
              }
            />
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* Button to close the modal */}
              <button
                className="btn"
                onClick={() => setDisplayGoalCompletionCard(false)}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default GoalCompletionCard;
