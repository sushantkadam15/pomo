import logo from "../assets/pomodoro-clock.gif";
import FullScreenSection from "../containers/FullScreenSection";
const PomoBrandHeader = ({pomoBrandHeaderDisplay, setPomoBrandHeaderDisplay}) => {

  setTimeout(() => {
    setPomoBrandHeaderDisplay(false);
  }, 2550);
  return (
    <>
      {pomoBrandHeaderDisplay && (
        <FullScreenSection extraclasses="flex flex-col justify-center items-center">
          <img src={logo} alt="Pomo Logo" className=" animate-bounce" />
          <h1 className="text-5xl text-center font-gilroylight font-bold ">
            POMO
          </h1>
        </FullScreenSection>
      )}
    </>
  );
};

export default PomoBrandHeader;
