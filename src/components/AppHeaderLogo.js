import logo from "../assets/pomodoro-clock.png";
import FullScreenSection from "../containers/FullScreenSection";
const AppHeaderLogo = () => {
  return (
    <FullScreenSection extraClasses="flex flex-col justify-center items-center">
      <div>
        <img src={logo} alt="Pomo Logo" />
        <h1 className="text-5xl text-center font-gilroylight font-bold">
          POMO
        </h1>
      </div>
    </FullScreenSection>
  );
};

export default AppHeaderLogo;
