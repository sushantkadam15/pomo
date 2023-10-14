/**
 * The App component is the main component of the Pomo app. It renders different components based on the state of the app, including the PomoBrandHeader, Onboarding, and TimerControlPanel. It uses React Router to handle different routes and the PomoProvider to provide context to its child components.
 *
 * @returns {JSX.Element} The rendered component structure based on the state variables `pomoBrandHeaderDisplay` and `instructionsComplete`.
 */
import React, { useEffect, useState } from "react";
import PomoBrandHeader from "../components/PomoBrandHeader";
import Onboarding from "../components/Onboarding";
import TimerControlPanel from "./TimerControlPanel";
import { PomoProvider } from "../context/PomoContext";
import { Route, Routes } from "react-router-dom";
import PomoStats from "../components/PomoStats";
import InsightsAndPreferences from "./InsightsAndPreferences";

function App() {
  const [pomoBrandHeaderDisplay, setPomoBrandHeaderDisplay] = useState(true);
  const [instructionsComplete, setInstructionsComplete] = useState(
    localStorage.getItem("instructionsComplete") || false
  );

  useEffect(() => {
    localStorage.setItem("instructionsComplete", instructionsComplete);
  }, [instructionsComplete]);

  /**
   * Determines which component to render based on the values of `pomoBrandHeaderDisplay` and `instructionsComplete`.
   *
   * @returns {JSX.Element} The component to render.
   */
  const currentDisplayItem = () => {
    if (pomoBrandHeaderDisplay) {
      return (
        <PomoBrandHeader
          pomoBrandHeaderDisplay={pomoBrandHeaderDisplay}
          setPomoBrandHeaderDisplay={setPomoBrandHeaderDisplay}
        />
      );
    } else if (!instructionsComplete && !pomoBrandHeaderDisplay) {
      return (
        <Onboarding
          instructionsComplete={instructionsComplete}
          setInstructionsComplete={setInstructionsComplete}
        />
      );
    } else {
      return <TimerControlPanel />;
    }
  };

  /**
   * The Home component renders the result of the `currentDisplayItem` function.
   *
   * @returns {JSX.Element} The rendered component.
   */
  const Home = () => (
    <main className="font-montserrat-regular my-0">{currentDisplayItem()}</main>
  );

  return (
    <PomoProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pomostats" element={<PomoStats />} />
        <Route path="/settings" element={<InsightsAndPreferences />} />
      </Routes>
    </PomoProvider>
  );
}

export default App;
