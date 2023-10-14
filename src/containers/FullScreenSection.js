/**
 * FullScreenSection is a functional component used to control the height and width of all the views centrally.
 *
 * @param {Object} props - The props object.
 * @param {ReactNode} props.children - The content to be rendered inside the FullScreenSection component.
 * @param {string} [props.extraclasses] - Additional CSS classes to be applied to the section element.
 * @returns {ReactElement} The FullScreenSection component.
 */
const FullScreenSection = ({ children, extraclasses }) => {
  const globalClasses = "h-screen max-h-screen";
  const combinedClasses = `${globalClasses} ${extraclasses || ""}`;
  return <section className={combinedClasses}>{children}</section>;
};

export default FullScreenSection;
