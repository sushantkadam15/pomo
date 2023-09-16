// FullScreenSection is used to control the height and width of all the views centrally
const FullScreenSection = ({ children, extraClasses }) => {
  const globalClasses = "h-screen h-width max-h-fit";
  const combinedClasses = `${globalClasses} ${extraClasses || ""}`;
  return <section className={combinedClasses}>{children}</section>;
};

export default FullScreenSection;
