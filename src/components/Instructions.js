import FullScreenSection from "../containers/FullScreenSection";
import UnboxingDoodle from "../assets/images/UnboxingDoodle.gif";
import ReadingDoodle from "../assets/images/ReadingDoodle.gif";
import DancingDoodle from "../assets/images/DancingDoodle.gif";

import { useEffect, useRef, useState } from "react";

const Instructions = () => {
  const instructions = [
    {
      step: 1,
      heading: "How To Use",
      text: "Select a task you want to complete.",
      imgSrc: UnboxingDoodle,
      altTxt: "Unboxing Doodle",
    },
    {
      step: 2,
      heading: "Stay Focused",
      text: "Concentrate fully on your work without distractions.",
      imgSrc: ReadingDoodle,
      altTxt: "Reading Doodle",
    },
    {
      step: 3,
      heading: "Take Short Breaks",
      text: "Periodically take short breaks to recharge.",
      imgSrc: DancingDoodle,
      altTxt: "Dancing Doodle",
    },
  ];

  const [currentInstruction, setCurrentInstruction] = useState(0);
  const [instructionsComplete, setInstructionsComplete] = useState(false);
  const headingtRef = useRef(null);
  const descriptionRef = useRef(null);

  const textTransition = {
    opacityHundred: () => {
      headingtRef.current.classList.remove("opacity-0");
      descriptionRef.current.classList.remove("opacity-0");
    },
    opacityZero: () => {
      headingtRef.current.classList.add("opacity-0");
      descriptionRef.current.classList.add("opacity-0");
    },
  };

  useEffect(() => {
    setTimeout(() => {
      textTransition.opacityHundred();
    }, 100);
  }, []);

  const handleNext = () => {
    textTransition.opacityZero();

    setTimeout(() => {
      if (currentInstruction < 2) {
        setCurrentInstruction(
          (previousCurrentInstruction) => previousCurrentInstruction + 1
        );
        textTransition.opacityHundred();
      } else if (currentInstruction === 2) {
        setInstructionsComplete(true);
        setCurrentInstruction(0);
      }
    }, 200);
  };

  return (
    <>
      {!instructionsComplete && (
        <FullScreenSection extraClasses="flex flex-col justify-around items-center text-center font-extrabold">
          <div className="">
            <h2
              className="text-primary text-2xl md:text-3xl uppercase opacity-0 transition-opacity duration-150 ease-in-out"
              ref={headingtRef}
            >
              {instructions[currentInstruction].heading}
            </h2>
            <p
              className="my-6 opacity-0 transition-opacity duration-150 ease-in-out"
              ref={descriptionRef}
            >
              {instructions[currentInstruction].text}
            </p>
          </div>
          <div className="flex flex-col">
            <img
              src={instructions[currentInstruction].imgSrc}
              alt={instructions[currentInstruction].altTxt}
            />

            <div className=" self-start md:self-center mt-6 ml-8 md:ml-0">
              {instructions.map((instruction, index) => (
                <button
                  className={
                    index === currentInstruction
                      ? "w-6 h-2 mx-1 bg-primary rounded-full"
                      : "w-2 h-2 mx-1 bg-secondary rounded-full"
                  }
                  onClick={() => setCurrentInstruction(index)}
                  key={index}
                  value={instruction}
                ></button>
              ))}
            </div>
          </div>

          <button className="btn btn-secondary px-16 my-5" onClick={handleNext}>
            {currentInstruction == 2 ? "Finish" : "Next"}
          </button>
        </FullScreenSection>
      )}
    </>
  );
};

export default Instructions;
