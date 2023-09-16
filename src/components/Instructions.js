import React, { useEffect, useRef, useState } from "react";
import FullScreenSection from "../containers/FullScreenSection";
import UnboxingDoodle from "../assets/images/UnboxingDoodle.gif";
import ReadingDoodle from "../assets/images/ReadingDoodle.gif";
import DancingDoodle from "../assets/images/DancingDoodle.gif";

const Instructions = () => {
  // Define an array of instructions with step, heading, text, image source, and alt text.
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

  // State variables for tracking the current instruction and completion status.
  const [currentInstruction, setCurrentInstruction] = useState(0);
  const [instructionsComplete, setInstructionsComplete] = useState(false);

  // References for DOM elements to apply transition effects.
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);

  // Function to handle opacity transitions for heading and description.
  const textOpacity = (boolean) => {
    headingRef.current.classList.toggle("opacity-0", boolean === false);
    descriptionRef.current.classList.toggle("opacity-0", boolean === false);
  };

  // Effect to initiate a opacity text transition when the component mounts.
  useEffect(() => {
    setTimeout(() => {
      textOpacity(true);
    }, 100);
  }, []);

  // Function to handle the "Next" button click.
  const handleNext = () => {
    textOpacity(false);

    setTimeout(() => {
      if (currentInstruction < 2) {
        setCurrentInstruction(
          (prevCurrentInstruction) => prevCurrentInstruction + 1
        );
        textOpacity(true);
      } else if (currentInstruction === 2) {
        setInstructionsComplete(true);
        setCurrentInstruction(0);
      }
    }, 200);
  };

  return (
    <>
      {!instructionsComplete && (
        // Render the instructions section if it's not completed.
        <FullScreenSection extraClasses="flex flex-col justify-around items-center text-center font-extrabold">
          <div className="">
            <h2
              className="text-primary text-2xl md:text-3xl uppercase opacity-0 transition-opacity duration-150 ease-in-out"
              ref={headingRef}
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

            <div className="self-start md:self-center mt-6 ml-8 md:ml-0">
              {/* Render buttons for each instruction step. */}
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

          {/* Render the "Next" or "Finish" button based on the current step. */}
          <button className="btn btn-secondary px-16 my-5" onClick={handleNext}>
            {currentInstruction === 2 ? "Finish" : "Next"}
          </button>
        </FullScreenSection>
      )}
    </>
  );
};

export default Instructions;
