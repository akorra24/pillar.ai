import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import questionsData from "../data/questions.json";
import ProgressBarContainer from "../components/ProgressBar";
import UpIcon from "../assets/up.svg";
import DownIcon from "../assets/down.svg";
import RightArrowIcon from "../assets/right-arrow.svg";
import TextInput from "../components/TextInput";
import MultipleChoiceInput from "../components/MultipleChoiceInput";
//TODO: We will custom make the first question screen others are from json
const Question = () => {
  const navigate = useNavigate();
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

  const handleNextQuestion = () => {
    if (question.nextPage === "end") {
      navigate("/form-overview");
    } else {
      navigate(`/question/${question.nextPage}`);
    }
  };

  const handlePreviousQuestion = () => {
    navigate(`/question/${question.previousPage}`);
  };

  const renderQuestion = () => {
    if (question?.type === "multipleChoice") {
      return (
        <div className="flex flex-col items-start justify-between py-10 px-10 overflow-y-scroll hide-scrollbar">
          <h3 className="text-3xl flex flex-row items-start">
            {question?.id}
            <img src={RightArrowIcon} className="w-7 mx-3 mt-1" />
           {question?.title}
          </h3>
          <div className="flex flex-col justify-center px-10">
            <label className="text-xl font-thin mt-5">
              {question?.label}
            </label>
            <div className="flex flex-col items-start justify-center w-full">
              <MultipleChoiceInput options={question?.options} />
            </div>
          </div>
        </div>
      );
    } else if (question?.type === "textInput") {
      return (
        <div className="flex flex-col items-start justify-center py-10 px-10 overflow-y-scroll hide-scrollbar h-screen">
          <h3 className="text-3xl flex flex-row items-start">
          {question?.id}
            <img src={RightArrowIcon} className="w-7 mx-3 mt-2" />
            {question?.title}
          </h3>
          <div className="flex flex-col justify-center px-10 w-full">
            <p className="text-xl font-thin my-5">
            {question?.subtitle}
            </p>
            <input
              type="text"
              className="w-full border-b-2 border-green-500 bg-transparent text-green-500 placeholder-green-800 focus:border-b-4 focus:outline-none text-2xl"
              placeholder="Type your answer here"
            />
          </div>
        </div>
      );
    } else if (question?.type === "titlePage") {
      return (
        <div className="flex flex-col justify-center py-10 px-10 h-screen">
          <h3 className="text-3xl flex flex-row items-start">
          {question?.id}
            <img src={RightArrowIcon} className="w-7 mx-3 mt-1" />
            {question?.title}
          </h3>
          <p className="text-xl font-thin my-5 mx-10">
          {question?.subtitle}
          </p>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col items-start justify-between py-10 px-10 overflow-y-scroll hide-scrollbar">
          <h3 className="text-3xl flex flex-row">
            1
            <img src={RightArrowIcon} className="w-7 mx-3" />
            ...
          </h3>
          <div className="flex flex-col items-center justify-center px-10">
            <p className="text-xl font-thin my-5">
              We are excited for you to join the Pillar family. Before we begin
              it's important we gather as much information about you/your brand
              as possible.
            </p>
            <TextInput label="First name" placeholder="Jane" />
            <TextInput label="Last name" placeholder="Smith" />
            <TextInput
              label="Phone number"
              placeholder="(201) 555-0123"
              type="phone"
            />
            <TextInput
              label="Email"
              placeholder="name@example.com"
              type="email"
            />
            <TextInput label="Company" placeholder="Acme Corporation" />
          </div>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col h-[80%] w-[90%] md:w-[60%] bg-black bg-opacity-75 rounded-3xl text-green-500 relative font-courier">
        {renderQuestion()}
        <div className="flex flex-row right-0 bottom-0 mr-10 mb-10 absolute">
          <button
            className="bg-green-500 border-r-2 p-2 rounded-l-lg transition-colors duration-300 ease-in-out hover:bg-green-700"
            onClick={handlePreviousQuestion}
          >
            <img src={UpIcon} className="w-7" />
          </button>
          <button
            className="bg-green-500 p-2 rounded-r-lg transition-colors duration-300 ease-in-out hover:bg-green-700"
            onClick={handleNextQuestion}
          >
            <img src={DownIcon} className="w-7" />
          </button>
        </div>
      </div>
      <ProgressBarContainer />
    </div>
  );
};

export default Question;
