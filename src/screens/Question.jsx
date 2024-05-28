import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import questionsData from "../data/questions.json";
import ProgressBarContainer from "../components/ProgressBar";
import UpIcon from "../assets/up.svg";
import DownIcon from "../assets/down.svg";
import RightArrowIcon from "../assets/right-arrow.svg";
import TextInput from "../components/TextInput";
import MultipleChoiceInput from "../components/MultipleChoiceInput";
import { set } from "firebase/database";
//TODO: We will custom make the first question screen others are from json
const Question = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");

  useEffect(() => {
    // Fetch the question based on the ID from the JSON data
    const fetchQuestion = () => {
      const fetchedQuestion = questionsData.find((q) => q.id === id);
      setQuestion(fetchedQuestion);
    };

    fetchQuestion();
  }, [id]);

  const handleNextQuestion = () => {
    let currentForm = JSON.parse(localStorage.getItem("currentForm"));
    if (question?.type === "multipleChoice") {
      const existingAnswer = currentForm.answers.findIndex(
        (a) => a.id === question.id
      );
      if (existingAnswer !== -1) {
        const existingField = currentForm.answers[
          existingAnswer
        ].fields.findIndex((f) => f.fieldTitle === question.fieldTitle);
        if (existingField !== -1) {
          currentForm.answers[existingAnswer].fields[existingField].fieldValue =
            answers;
        } else {
          currentForm.answers[existingAnswer].fields.push({
            fieldTitle: question.fieldTitle,
            fieldValue: answers,
          });
        }
      } else {
        currentForm.answers.push({
          id: question.id,
          type: question.type,
          categoryTitle: question.categoryTitle,
          fields: [
            {
              fieldTitle: question.fieldTitle,
              fieldValue: answers,
            },
          ],
        });
      }
    } else if (question?.type === "textInput") {
      const existingAnswer = currentForm.answers.findIndex(
        (a) => a.id === question.id
      );
      if (existingAnswer !== -1) {
        const existingField = currentForm.answers[
          existingAnswer
        ].fields.findIndex((f) => f.fieldTitle === question.fieldTitle);
        if (existingField !== -1) {
          currentForm.answers[existingAnswer].fields[existingField].fieldValue =
            answers[0];
        } else {
          currentForm.answers[existingAnswer].fields.push({
            fieldTitle: question.fieldTitle,
            fieldValue: answers[0],
          });
        }
      } else {
        currentForm.answers.push({
          id: question.id,
          type: question.type,
          categoryTitle: question.categoryTitle,
          fields: [
            {
              fieldTitle: question.fieldTitle,
              fieldValue: answers[0],
            },
          ],
        });
      }
    } else if (question?.type === "startPage") {
      currentForm.answers = [];
      currentForm.brand = company;
      currentForm.answers.push({
        id: question.id,
        type: "textInput",
        categoryTitle: question.categoryTitle,
        fields: [
          {
            fieldTitle: "First Name",
            fieldValue: firstName,
          },
          {
            fieldTitle: "Last Name",
            fieldValue: lastName,
          },
          {
            fieldTitle: "Phone Number",
            fieldValue: phoneNumber,
          },
          {
            fieldTitle: "Email",
            fieldValue: email,
          },
          {
            fieldTitle: "Company",
            fieldValue: company,
          },
        ],
      });
    }
    setAnswers([]);
    const questionIndex = questionsData.findIndex((q) => q.id === id);
    currentForm.progress = ((questionIndex + 1) / questionsData.length) * 100;
    currentForm.lastIndex = questionIndex;
    localStorage.setItem("currentForm", JSON.stringify(currentForm));

    if (questionIndex === questionsData.length - 1) {
      navigate("/form-overview");
    } else {
      if (question.id == 3) {
        if (answers.includes("Influencer")) {
          navigate("/question/4");
        } else if (answers.includes("Brand")) {
          navigate("/question/5");
        } else if (answers.includes("Artist/Musician")) {
          navigate("/question/6");
        } else if (answers.includes("Athlete")) {
          navigate("/question/7");
        } else {
          navigate("/question/11");
        }
      } else {
        navigate(`/question/${questionsData[questionIndex + 1].id}`);
      }
    }
  };

  const handlePreviousQuestion = () => {
    const questionIndex = questionsData.findIndex((q) => q.id === id);
    if (questionIndex === 0) return;
    navigate(`/question/${questionsData[questionIndex - 1].id}`);
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
            <label className="text-xl font-thin mt-5">{question?.label}</label>
            <div className="flex flex-col items-start justify-center w-full">
              <MultipleChoiceInput
                options={question?.options}
                setAnswers={setAnswers}
              />
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
            <p className="text-xl font-thin my-5">{question?.subtitle}</p>
            <input
              type="text"
              className="w-full border-b-2 border-green-500 bg-transparent text-green-500 placeholder-green-800 focus:border-b-4 focus:outline-none text-2xl"
              placeholder="Type your answer here"
              value={answers[0] || ""}
              onChange={(e) => setAnswers([e.target.value])}
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
          <p className="text-xl font-thin my-5 mx-10">{question?.subtitle}</p>
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
            <TextInput
              label="First name"
              placeholder="Jane"
              value={firstName}
              setValue={setFirstName}
            />
            <TextInput
              label="Last name"
              placeholder="Smith"
              value={lastName}
              setValue={setLastName}
            />
            <TextInput
              label="Phone number"
              placeholder="(201) 555-0123"
              type="phone"
              value={phoneNumber}
              setValue={setPhoneNumber}
            />
            <TextInput
              label="Email"
              placeholder="name@example.com"
              type="email"
              value={email}
              setValue={setEmail}
            />
            <TextInput
              label="Company"
              placeholder="Acme Corporation"
              value={company}
              setValue={setCompany}
            />
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
