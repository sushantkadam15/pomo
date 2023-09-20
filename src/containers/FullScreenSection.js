// FullScreenSection is used to control the height and width of all the views centrally
const FullScreenSection = ({ children, extraclasses }) => {
  const globalClasses = "h-screen max-h-screen";
  const combinedClasses = `${globalClasses} ${extraclasses || ""}`;
  return <section className={combinedClasses}>{children}</section>;
};

export default FullScreenSection;
