import FullScreenSection from "../containers/FullScreenSection";
import { Link } from "react-router-dom";
import close from "../assets/icons/close.png";
import timerImg from "../assets/icons/CompositeLayer.png";
const PomoStats = () => {
  return (
    <FullScreenSection extraclasses={"flex justify-center items-start"}>
      <Link to="/">
        <img src={close} alt="close button" className="absolute top-5 left-5" />
      </Link>
      <div className=" mt-28 shadow-2xl p-10 max-w-lg">
        <div className="flex justify-center">
          <img src={timerImg} alt="Timer Header" />
        </div>
        <div className="mt-24 flex  flex-wrap justify-center">
          <div className="w-full max-w-xl">
            <div className="flex justify-between">
              <div className=" bg-white h-20 w-1/3 mx-3 rounded-lg shadow-xl">1</div>
              <div className=" bg-white  h-20 w-1/3 mx-3 rounded-lg shadow-xl">1</div>
              <div className=" bg-white   h-20 w-1/3 mx-3 rounded-lg shadow-xl">1</div>
            </div>
            <div className=" flex justify-between mt-10">
              <div className=" bg-white  h-40 rounded-lg shadow-xl">1</div>
              <div className=" bg-white   mx-3 rounded-lg shadow-xl">1</div>
            </div>
          </div>
        </div>
      </div>
    </FullScreenSection>
  );
};

export default PomoStats;
