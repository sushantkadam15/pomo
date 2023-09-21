import React, { useEffect, useState } from "react";
import PomoBrandHeader from "../components/PomoBrandHeader";
import Onboarding from "../components/Onboarding";
import TimerControlPanel from "../components/TimerControlPanel";
import { PomoProvider } from "../context/PomoContext";

function App() {
  const [pomoBrandHeaderDisplay, setPomoBrandHeaderDisplay] = useState(true);
  const [instructionsComplete, setInstructionsComplete] = useState(
    localStorage.getItem("instructionsComplete") || false
  );

  useEffect(() => {
    localStorage.setItem("instructionsComplete", instructionsComplete);
  }, [instructionsComplete]);

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

  return (
    <PomoProvider>
      <main className="font-montserrat-regular my-0">
        {currentDisplayItem()}
      </main>
    </PomoProvider>
  );
}

export default App;
