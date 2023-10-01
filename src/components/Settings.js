import React, { useContext } from "react";
import { Pause, Play, StopCircle } from "lucide-react";
import { PomoContext } from "../context/PomoContext";
import convertSeconds from "convert-seconds";

const SettingCard = ({
  title,
  currentDurationInSec,
  icon,
  inputmin,
  inputmax,
  currentvalue,
  updatePreferences,
  name,
}) => {
  return (
    <div className="card w-full bg-base-100 shadow-xl my-5">
      <div className="card-body">
        <h2 className="card-title">
          {icon} {title}
        </h2>
        <p className="my-5">
          <input
            name={name}
            type="range"
            min={inputmin}
            max={inputmax}
            value={currentvalue}
            className="range range-lg"
            onChange={(e) => updatePreferences(e)}
            step={1}
          />
        </p>
        <p className="mx-2 text-gray-500">
          {convertSeconds(currentDurationInSec).minutes} mins
        </p>
      </div>
    </div>
  );
};

const Settings = () => {
  const { settings, setSettings } = useContext(PomoContext);
  const {
    pomoSessionDuration, // seconds
    shortBreakDuration, // seconds
    longBreakDuration, // seconds
  } = settings;

  const updatePreferences = (e) => {
    const { name, value } = e.target;
    if (value < 60) {
      setSettings({
        ...settings,
        [name]: value * 60,
      });
    } else if (value === 60) {
      setSettings({
        ...settings,
        [name]: 3599 * 60,
      });
    }
  };

  return (
    <div>
      <SettingCard
        title="Pomo Session"
        currentDurationInSec={pomoSessionDuration}
        icon={<Play />}
        inputmin={15}
        inputmax={59}
        currentvalue={pomoSessionDuration / 60} // Convert to minutes
        updatePreferences={updatePreferences}
        name={"pomoSessionDuration"}
      />
      <SettingCard
        title="Short Break"
        currentDurationInSec={shortBreakDuration}
        icon={<Pause />}
        inputmin={5}
        inputmax={15}
        currentvalue={shortBreakDuration / 60} // Convert to minutes
        updatePreferences={updatePreferences}
        name={"shortBreakDuration"}
      />
      <SettingCard
        title="Long Break"
        currentDurationInSec={longBreakDuration}
        icon={<StopCircle />}
        inputmin={15}
        inputmax={59}
        currentvalue={longBreakDuration / 60} // Convert to minutes
        updatePreferences={updatePreferences}
        name={"longBreakDuration"}
      />
    </div>
  );
};

export default Settings;
