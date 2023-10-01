import { PomoContext } from "../context/PomoContext";
import { useContext } from "react";
import { GaugeCircle, Play, Pause, StopCircle, Rocket } from "lucide-react";
import convertSeconds from "convert-seconds";

const StatsCard = ({
  // Define it as a functional component with props
  statsDescription,
  statsIcon,
  stats,
  statsCalculationParam,
}) => {
  // Check if stats and statsCalculationParam are valid numbers
  if (typeof stats !== "number" || typeof statsCalculationParam !== "number") {
    console.error(
      "Invalid value sent to convert-seconds:",
      stats, // undefined
      statsCalculationParam // undefined
    );
    return null; // Return null or handle the error appropriately
  }

  return (
    <div className="stat">
      <div className="stat-figure text-secondary">{statsIcon}</div>
      <div className="stat-title">{statsDescription}</div>
      <div className="stat-value">{stats}</div>
      <div className="stat-desc">
        {convertSeconds(stats * statsCalculationParam).minutes} mins
      </div>
    </div>
  );
};

const PomoStats = () => {
  const { pomoStats, settings } = useContext(PomoContext);
  const {
    totalRoundsCompletedAllTime,
    totalSessionsCompletedAllTime,
    totalShortBreaksCompletedAllTime,
    totalLongBreaksCompletedAllTime,
    totalGoalsAchieved,
  } = pomoStats;
  return (
    <div className="mt-10">
      <div className="flex flex-wrap">
        <div className="stats shadow m-5 w-full">
          <StatsCard
            statsDescription="Rounds"
            statsIcon={<Play size={36} />}
            stats={totalRoundsCompletedAllTime}
            statsCalculationParam={settings.pomoSessionDuration}
          />
          <StatsCard
            statsDescription="Short Breaks"
            statsIcon={<Pause size={36} />}
            stats={totalShortBreaksCompletedAllTime}
            statsCalculationParam={settings.shortBreakDuration}
          />
        </div>
        <div className="stats shadow m-5 w-full">
          <StatsCard
            statsDescription="Long Breaks"
            statsIcon={<StopCircle size={36} />}
            stats={totalLongBreaksCompletedAllTime}
            statsCalculationParam={settings.longBreakDuration}
          />
          <StatsCard
            statsDescription="Sessions"
            statsIcon={<GaugeCircle size={36} />}
            stats={totalSessionsCompletedAllTime}
            statsCalculationParam={settings.pomoSessionDuration}
          />
        </div>
        <div className="stats shadow m-5 w-full">
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
        </div>
      </div>
    </div>
  );
};

export { StatsCard };

export default PomoStats;
