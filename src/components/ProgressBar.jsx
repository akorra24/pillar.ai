import ProgressBar from "@ramonak/react-progress-bar";

const ProgressBarContainer = ({ className }) => {
  const currentForm = JSON.parse(localStorage.getItem("currentForm"));
  const progress = currentForm ? Math.floor(currentForm?.progress) : 0;

  return (
    <div className={className}>
      <ProgressBar
        completed={progress}
        bgColor="#49FB34"
        baseBgColor="#e0e0e0"
        height="5px"
        borderRadius="0"
        labelColor="#000"
        labelAlignment="center"
        labelClassName="hidden"
      />
    </div>
  );
};

export default ProgressBarContainer;
