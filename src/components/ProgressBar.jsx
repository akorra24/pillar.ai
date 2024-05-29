import ProgressBar from "@ramonak/react-progress-bar";

const ProgressBarContainer = () => {
  const currentForm = JSON.parse(localStorage.getItem("currentForm"));
  const progress = currentForm ? Math.floor(currentForm?.progress) : 0;
  return (
    <div className="absolute bottom-0 w-full">
      <ProgressBar completed={progress} bgColor="#49FB34" />
    </div>
  );
};

export default ProgressBarContainer;
