import { useState } from "react";
import CheckIcon from "../assets/done.svg";
const MultipleChoiceInput = ({ options, setAnswers }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionClick = (option) => {
    setSelectedOptions((prevSelectedOptions) => {
      if (prevSelectedOptions.includes(option)) {
        return prevSelectedOptions.filter((o) => o !== option);
      } else {
        return [...prevSelectedOptions, option];
      }
    });
    setAnswers((prevAnswers) => {
      if (prevAnswers.includes(option)) {
        return prevAnswers.filter((o) => o !== option);
      } else {
        return [...prevAnswers, option];
      }
    });
  };

  return (
    <div className="flex flex-col items-start justify-center w-full">
      {options.map((option) => (
        <button
          key={option?.value}
          onClick={() => handleOptionClick(option?.value)}
          className={`flex flex-row justify-between w-80 text-xl font-thin my-1 px-4 py-2 rounded-md text-white bg-opacity-10 bg-green-500 border-green-500 hover:bg-opacity-40 ${
            selectedOptions.includes(option?.value)
              ? "border-[3px]"
              : "border-[1px]"
          }`}
        >
          <div>
            <span
              className={`border-[1px] border-green-500 px-2 mr-2 ${
                selectedOptions.includes(option?.value)
                  ? "bg-green-500"
                  : "bg-black"
              }`}
            >
              {option?.id}
            </span>
            {option?.value}
          </div>

          <span className="mr-2">
            {selectedOptions.includes(option?.value) && <img src={CheckIcon} />}
          </span>
        </button>
      ))}
    </div>
  );
};

export default MultipleChoiceInput;
