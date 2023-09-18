import React, { useEffect, useRef, useState } from "react";
import FullScreenSection from "../containers/FullScreenSection";
import UnboxingDoodle from "../assets/images/UnboxingDoodle.gif";
import ReadingDoodle from "../assets/images/ReadingDoodle.gif";
import DancingDoodle from "../assets/images/DancingDoodle.gif";

const Instructions = ({ instructionsComplete, setInstructionsComplete }) => {
  // Define an array of instructions with step, heading, text, image source, and alt text.
  const steps = [
    {
      stepNumber: 1,
      heading: "How To Use",
      text: "Select a task you want to complete.",
      imageSource: UnboxingDoodle,
      altText: "Unboxing Doodle",
    },
    {
      stepNumber: 2,
      heading: "Stay Focused",
      text: "Concentrate fully on your work without distractions.",
      imageSource: ReadingDoodle,
      altText: "Reading Doodle",
    },
    {
      stepNumber: 3,
      heading: "Take Short Breaks",
      text: "Periodically take short breaks to recharge.",
      imageSource: DancingDoodle,
      altText: "Dancing Doodle",
    },
  ];

  // State variables for tracking the current instruction and completion status.
  const [currentStep, setCurrentStep] = useState(0);

  // Reference for DOM element to apply transition effects.
  const instructionsContainerRef = useRef(null);

  // Function to handle opacity transitions for heading and description.
  const applyOpacityTransition = (isVisible) => {
    instructionsContainerRef.current.classList.toggle(
      "opacity-0",
      !isVisible
    );
  };

  // Effect to initiate an opacity text transition when the component mounts.
  useEffect(() => {
    setTimeout(() => {
      applyOpacityTransition(true);
    }, 100);
  }, []);

  // Function to handle the "Next" button click.
  const handleNext = () => {
    applyOpacityTransition(false);

    setTimeout(() => {
      if (currentStep < 2) {
        setCurrentStep((prevStep) => prevStep + 1);
        applyOpacityTransition(true);
      } else if (currentStep === 2) {
        setInstructionsComplete(true);
        setCurrentStep(0);
      }
    }, 200);
  };

  return (
    <>
      {!instructionsComplete && (
        // Render the instructions section if it's not completed.
        <FullScreenSection extraClasses="flex flex-col items-center text-center justify-around font-extrabold">
          <button
            className="btn btn-sm bg-base-100 border-none self-start uppercase ml-2 mt-4"
            onClick={() => setInstructionsComplete(true)}
          >
            Skip
          </button>
          <div
            className="opacity-0 transition-opacity duration-150 ease-in-out"
            ref={instructionsContainerRef}
          >
            {/* Display current instruction heading and text */}
            <h2 className="text-primary text-2xl md:text-3xl uppercase ">
              {steps[currentStep].heading}
            </h2>
            <p className="my-6">{steps[currentStep].text}</p>
            <img
              src={steps[currentStep].imageSource}
              alt={steps[currentStep].altText}
              className=" mt-24 lg:mt-64"
            />
          </div>

          <div className="self-start md:self-center ml-8 md:ml-0">
            {/* Render buttons for each instruction step. */}
            {steps.map((step, index) => (
              <button
                className={
                  index === currentStep
                    ? "w-6 h-2 mx-1 bg-primary rounded-full"
                    : "w-2 h-2 mx-1 bg-secondary rounded-full"
                }
                onClick={() => setCurrentStep(index)}
                key={index}
                value={step}
              ></button>
            ))}
          </div>

          {/* Render the "Next" or "Finish" button based on the current step. */}
          <button
            className="btn btn-secondary px-16 my-14"
            onClick={handleNext}
          >
            {currentStep === 2 ? "Finish" : "Next"}
          </button>
        </FullScreenSection>
      )}
    </>
  );
};

export default Instructions;
