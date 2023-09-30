import FullScreenSection from "../containers/FullScreenSection";
import { Link } from "react-router-dom";
import close from "../assets/icons/close.png";
import timerImg from "../assets/icons/CompositeLayer.png";
import { PomoContext } from "../context/PomoContext";
import { useContext } from "react";
const PomoStats = () => {
  const { pomoStats } = useContext(PomoContext);
  const {
    totalRoundsCompletedAllTime,
    totalSessionsCompletedAllTime,
    totalShortBreaksCompletedAllTime,
    totalLongBreaksCompletedAllTime,
    totalGoalsAchieved,
  } = pomoStats;

  const Card = ({ stats, description }) => {
    return (
      <div className="card  max-w-fit">
        <div className="card-body">
          <h2 className=" text-center text-4xl">{stats}</h2>
          <p className=" text-center text-sm">{description}</p>
        </div>
      </div>
    );
  };
  return (
    <FullScreenSection
      extraclasses={"flex justify-center items-center bg-secondary"}
    >
      <Link to="/">
        <img src={close} alt="close button" className="absolute top-5 left-5" />
      </Link>
      <div className="mt-4 md:mt-0  shadow-2xl shadow-primary p-10 rounded-3xl bg-base-100">
        <div className="flex justify-center md:mb-5">
          <img src={timerImg} alt="Timer Header" />
        </div>
        <div className=" flex flex-wrap max-w-screen-sm justify-evenly">
          <Card
            stats={totalRoundsCompletedAllTime}
            description="Rounds Completed"
          />
          <Card
            stats={totalSessionsCompletedAllTime}
            description="Sessions Completed"
          />

          <Card
            stats={totalShortBreaksCompletedAllTime}
            description="Short Breaks Completed"
          />

          <Card
            stats={totalLongBreaksCompletedAllTime}
            description="Long Breaks Completed"
          />

          <Card stats={totalGoalsAchieved} description="Goals Completed" />
        </div>
      </div>
    </FullScreenSection>
  );
};

export default PomoStats;
