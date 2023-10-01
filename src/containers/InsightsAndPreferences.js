import FullScreenSection from "./FullScreenSection";
import { Link } from "react-router-dom";
import close from "../assets/icons/close.png";
import PomoStats from "../components/PomoStats";
import { useState } from "react";

import Settings from "../components/Settings";
import timerImg from "../assets/icons/CompositeLayer.png";

const InsightsAndPreferences = () => {
  const [activeTab, setActiveTab] = useState("progress");
  return (
    <FullScreenSection extraclasses={"flex justify-center bg-base-100"}>
      <Link to="/">
        <img src={close} alt="close button" className="absolute top-5 left-5" />
      </Link>
      <div className="mt-4 md:mt-0 p-10 rounded-3xl bg-base-100">
        <div className="flex justify-center mb-10">
          <img src={timerImg} alt="Timer Header" />
        </div>
        <div className="tabs tabs-boxed">
          <button
            className={
              activeTab === "progress" ? "tab btn-md tab-active" : "tab btn-md"
            }
            onClick={() => setActiveTab("progress")}
          >
            Insights
          </button>
          <button
            className={
              activeTab === "preferences"
                ? "tab btn-md tab-active"
                : "tab btn-md"
            }
            onClick={() => setActiveTab("preferences")}
          >
            Preferences
          </button>
        </div>
        <div className=" w-[25rem] md:w-[40rem]">
          {activeTab === "progress" && <PomoStats />}
          {activeTab === "preferences" && <Settings />}
        </div>
      </div>
    </FullScreenSection>
  );
};

export default InsightsAndPreferences;
