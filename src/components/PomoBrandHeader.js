import logo from "../assets/pomodoro-clock.gif";
import FullScreenSection from "../containers/FullScreenSection";

/**
 * Functional component that displays a logo and a heading. It uses a timeout to hide the header after a certain duration.
 *
 * @param {boolean} pomoBrandHeaderDisplay - A boolean value indicating whether the header should be displayed or not.
 * @param {function} setPomoBrandHeaderDisplay - A function to update the value of pomoBrandHeaderDisplay.
 * @returns {JSX.Element} - The rendered logo and heading wrapped in a FullScreenSection component if pomoBrandHeaderDisplay is true.
 */

const PomoBrandHeader = ({ pomoBrandHeaderDisplay, setPomoBrandHeaderDisplay }) => {
  setTimeout(() => {
    setPomoBrandHeaderDisplay(false);
  }, 1000);

  return (
    <>
      {pomoBrandHeaderDisplay && (
        <FullScreenSection extraclasses="flex flex-col justify-center items-center">
          <img src={logo} alt="Pomo Logo" className="animate-bounce" />
          <h1 className="text-5xl text-center font-gilroylight font-bold">POMO</h1>
        </FullScreenSection>
      )}
    </>
  );
};

export default PomoBrandHeader;
