import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import questionsData from "../data/questions.json";
import ProgressBarContainer from "../components/ProgressBar";
import UpIcon from "../assets/up.svg";
import DownIcon from "../assets/down.svg";

const Question = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    // Fetch the question based on the ID from the JSON data
    const fetchQuestion = () => {
      const fetchedQuestion = questionsData.find((q) => q.id === id);
      setQuestion(fetchedQuestion);
    };

    fetchQuestion();
  }, [id]);

  if (!question) {
    return <div>Loading...</div>;
  }

  const { questionType, questionText, options } = question;

  const renderQuestion = () => {
    if (questionType === "multipleChoice") {
      return (
        <div>
          <h2>{questionText}</h2>
          <ul>
            {options.map((option, index) => (
              <li key={index}>{option}</li>
            ))}
          </ul>
        </div>
      );
    } else if (questionType === "textInput") {
      return (
        <div>
          <h2>{questionText}</h2>
          <input type="text" />
        </div>
      );
    } else {
      return <div>Invalid question type</div>;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col h-[80%] w-[90%] bg-black bg-opacity-75 rounded-3xl text-white relative">
        {renderQuestion()}
        <div className="flex flex-row absolute right-0 bottom-0 mr-5 mb-10">
          <button className="bg-green-500 border-r-2 p-2 rounded-l-lg">
            <img src={UpIcon} className="w-7" />
          </button>
          <button className="bg-green-500 p-2 rounded-r-lg">
            <img src={DownIcon} className="w-7" />
          </button>
        </div>
      </div>
      <ProgressBarContainer />
    </div>
  );
};

export default Question;
