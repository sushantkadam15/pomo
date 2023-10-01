import menuIcon from "../assets/icons/menu-left.png";
import { Timer, AreaChart } from "lucide-react";
import { Link } from "react-router-dom";
import { Volume, VolumeX, RotateCcw } from "lucide-react";
import { useContext } from "react";
import { PomoContext } from "../context/PomoContext";

const Menu = ({ menuclass, expiryTimestamp, timerDuration, restart }) => {
  const { settings, setSettings } = useContext(PomoContext);

  // Handle the restart button click
  const handleRestartClick = () => {
    const newTime = expiryTimestamp(timerDuration);
    restart(newTime);
  };

  return (
    <nav className="flex justify-between items-center mt-5 w-full">
      {/* Menu Starts here  */}
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label htmlFor="my-drawer" className={menuclass}>
            <img src={menuIcon} className=" h-6" alt="Menu Bar" />
          </label>
        </div>
        <div className="drawer-side  z-40">
          <label htmlFor="my-drawer" className="drawer-overlay" />
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content text-lg">
            {/* Sidebar content here */}
            <li className="my-2">
              <Link to="/">
                <Timer />
                POMO
              </Link>
            </li>
            <li className="my-2">
              <Link to="/settings">
                <AreaChart />
                Insights & Preferences
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Mute and restart button  */}
      <div className="flex items-center mr-8">
        {/* Audio Mute Button */}
        <div className="px-5">
          <div
            className="tooltip tooltip-accent tooltip-bottom"
            data-tip={
              !settings.audioMuted ? "Click to Mute" : "Click to Unmute"
            }
          >
            <label htmlFor="mute-button">
              {!settings.audioMuted ? <Volume /> : <VolumeX />}
            </label>
          </div>
          <button
            className="hidden"
            id="mute-button"
            onClick={() => {
              setSettings({
                ...settings,
                audioMuted: !settings.audioMuted,
              });
            }}
          ></button>
        </div>
        {/* Button to restart the timer */}
        <button className="uppercase" onClick={handleRestartClick}>
          <div
            className="tooltip tooltip-accent tooltip-bottom"
            data-tip="Restart"
          >
            <RotateCcw />
          </div>
        </button>
      </div>
    </nav>
  );
};

export default Menu;
