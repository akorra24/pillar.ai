import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import questionsData from "../data/questions.json";
import ProgressBarContainer from "../components/ProgressBar";
import UpIcon from "../assets/up.svg";
import DownIcon from "../assets/down.svg";
import TextInput from "../components/TextInput";
//TODO: We will custom make the first question screen others are from json
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
      <div className="flex flex-col h-[80%] w-[90%] bg-black bg-opacity-75 rounded-3xl text-green-500 relative font-courier ">
        <div className="flex flex-col items-start justify-between py-5 px-10 overflow-y-scroll hide-scrollbar">
          <h3 className="text-2xl">
            1 -&gt; We are excited for you to join the Pillar family. Before we
            begin it's important we gather as much information about you/your
            brand as possible.
          </h3>
          <TextInput label="First name" placeholder="Jane" />
          <TextInput label="Last name" placeholder="Smith" />
          <TextInput label="Email" placeholder="abc@aabc.lk" type="email" />
          <TextInput label="Phone number" placeholder="0712345678" />
          <TextInput label="Instagram handle" placeholder="@jane.smith" />
          <TextInput label="First name" placeholder="Jane" />
          <TextInput label="Last name" placeholder="Smith" />
          <TextInput label="Email" placeholder="abc@aabc.lk" type="email" />
          <TextInput label="Phone number" placeholder="0712345678" />
          <TextInput label="Instagram handle" placeholder="@jane.smith" />
        </div>
        <div className="flex flex-row right-0 bottom-0 mr-5 mb-10 absolute">
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
