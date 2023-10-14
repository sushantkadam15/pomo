import { useEffect, useRef, useContext } from "react";
import { StatsCard } from "./PomoStats";
import { GaugeCircle, Rocket } from "lucide-react";
import { PomoContext } from "../context/PomoContext";
import confetti from "canvas-confetti";

/**
 * Renders a modal dialog with statistics about completed sessions and goals.
 * @param {boolean} displayGoalCompletionCard - Indicates whether the goal completion card should be displayed.
 * @param {function} setDisplayGoalCompletionCard - Callback function to update the value of displayGoalCompletionCard.
 * @returns {JSX.Element} - Modal dialog component.
 */
const GoalCompletionCard = ({
  displayGoalCompletionCard,
  setDisplayGoalCompletionCard,
}) => {
  const goalCompletionCardRef = useRef(null);
  const { settings, pomoStats } = useContext(PomoContext);
  const {
    totalSessionsCompletedAllTime,
    totalRoundsCompletedAllTime,
    totalShortBreaksCompletedAllTime,
    totalLongBreaksCompletedAllTime,
    totalGoalsAchieved,
  } = pomoStats;

  useEffect(() => {
    if (displayGoalCompletionCard) {
      goalCompletionCardRef.current.showModal();
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
