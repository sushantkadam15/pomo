import React, { useContext } from "react";
import { Pause, Play, StopCircle } from "lucide-react";
import { PomoContext } from "../context/PomoContext";
import convertSeconds from "convert-seconds";

/**
 * The `SettingCard` component renders a card with a title, an icon, a range input, and a duration display.
 * It is used in the `Settings` component to display and update the user's preferences for the Pomodoro session, short break, and long break durations.
 *
 * @param {Object} props - The props object containing the following properties:
 *   - title (string): The title of the setting card.
 *   - currentDurationInSec (number): The current duration in seconds.
 *   - icon (React element): The icon to display on the card.
 *   - inputmin (number): The minimum value for the range input.
 *   - inputmax (number): The maximum value for the range input.
 *   - currentvalue (number): The current value of the range input.
 *   - updatePreferences (function): A function to update the user's preferences.
 *   - name (string): The name of the setting.
 * @returns {JSX.Element} The rendered SettingCard component.
 */
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

/**
 * The `Settings` component renders a collection of `SettingCard` components to display and update the user's preferences for the Pomodoro session, short break, and long break durations.
 *
 * @returns {JSX.Element} The rendered Settings component.
 */
const Settings = () => {
  const { settings, setSettings } = useContext(PomoContext);
  const {
    pomoSessionDuration, // seconds
    shortBreakDuration, // seconds
    longBreakDuration, // seconds
  } = settings;

  /**
   * Updates the user's preferences based on the input change event.
   *
   * @param {Object} e - The input change event object.
   */
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
