import { useState } from "react";

const MultipleChoiceInput = ({ options }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionClick = (option) => {
    setSelectedOptions((prevSelectedOptions) => {
      if (prevSelectedOptions.includes(option)) {
        return prevSelectedOptions.filter((o) => o !== option);
      } else {
        return [...prevSelectedOptions, option];
      }
    });
  };

  return (
    <div className="flex flex-col items-start justify-center w-full">
      {options.map((option) => (
        <button
          key={option?.value}
          onClick={() => handleOptionClick(option?.value)}
          className={`w-80 text-xl font-thin my-1 px-4 py-2 border-2 rounded-md text-white bg-green-500 border-green-500 hover:bg-opacity-100 ${
            selectedOptions.includes(option?.value)
              ? "bg-opacity-100"
              : "bg-opacity-10"
          }`}
        >
          {option?.key} {option?.value}
        </button>
      ))}
    </div>
  );
};

export default MultipleChoiceInput;
