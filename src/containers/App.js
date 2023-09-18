import PomoBrandHeader from "../components/PomoBrandHeader";
import Onboarding from "../components/Onboarding";
import TimerControlPanel from "../components/TimerControlPanel";
import { useState } from "react";
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
    } else if(!instructionsComplete && !pomoBrandHeaderDisplay){
      return(
        <Onboarding instructionsComplete={instructionsComplete}  setInstructionsComplete={setInstructionsComplete} />
      )
    } else {
      return <div>Nothing to display</div>;
    }
  };

  return (
    <main className=" font-montserratregular my-0">
     <TimerControlPanel />
    </main>
  );
}

export default App;
