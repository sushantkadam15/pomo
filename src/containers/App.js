import React, { useState } from "react";
import PomoBrandHeader from "../components/PomoBrandHeader";
import Onboarding from "../components/Onboarding";
import TimerControlPanel from "../components/TimerControlPanel";
import { PomoStatsProvider } from "../context/PomoStatsContext";

function App() {
  const [pomoBrandHeaderDisplay, setPomoBrandHeaderDisplay] = useState(true);
  const [instructionsComplete, setInstructionsComplete] = useState(false);

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
    }
  };

  return (
    <PomoStatsProvider>
      <main className="font-montserrat-regular my-0">
        {currentDisplayItem()}
        <TimerControlPanel />
      </main>
    </PomoStatsProvider>
  );
}

export default App;
