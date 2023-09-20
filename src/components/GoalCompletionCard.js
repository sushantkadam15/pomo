import { useEffect, useRef } from "react";

const GoalCompletionCard = ({
  displayGoalCompletionCard,
  setDisplayGoalCompletionCard,
}) => {
  const goalCompletionCardRef = useRef(null);

  useEffect(() => {
    // Effect triggered when displayGoalCompletionCard prop changes
    if (displayGoalCompletionCard) {
      goalCompletionCardRef.current.showModal(); // Show the modal when prop is true
    }
  }, [displayGoalCompletionCard]);

  return (
    <>
      <dialog id="goalCompleted" className="modal" ref={goalCompletionCardRef}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* Button to close the modal */}
              <button
                className="btn"
                onClick={() => setDisplayGoalCompletionCard(false)}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default GoalCompletionCard;
