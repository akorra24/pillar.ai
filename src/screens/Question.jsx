import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import questionsData from "../data/questions.json";
import ProgressBarContainer from "../components/ProgressBar";
import UpIcon from "../assets/up.svg";
import DownIcon from "../assets/down.svg";
import RightArrowIcon from "../assets/right-arrow.svg";
import TextInput from "../components/TextInput";
import MultipleChoiceInput from "../components/MultipleChoiceInput";
import { updateCurrentForm } from "../services/firebaseServices";

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchQuestion = () => {
      const fetchedQuestion = questionsData.find((q) => q.id === id);
      setQuestion(fetchedQuestion);
    };

    fetchQuestion();
  }, [id]);

  const handleNextQuestion = async () => {
    setLoading(true);
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
      if (!currentForm.answers) {
        currentForm.answers = [];
      }
      const existingAnswer = currentForm.answers.findIndex(
        (a) => a.id === question.id
      );
      if (existingAnswer !== -1) {
        currentForm.answers[existingAnswer].fields = [
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
        ];
      } else {
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
    }
    if (id == 2) {
      if (
        !answers.includes("Influencer") &&
        currentForm.answers.findIndex((answer) => answer.id == "3") != -1
      ) {
        currentForm.answers = currentForm.answers.filter(
          (answer) => answer.id != "3"
        );
      }

      if (
        !answers.includes("Brand") &&
        currentForm.answers.findIndex((answer) => answer.id == "4") != -1
      ) {
        currentForm.answers = currentForm.answers.filter(
          (answer) =>
            answer.id != "4" &&
            answer.id != "7" &&
            answer.id != "8" &&
            answer.id != "9"
        );
      }

      if (
        !answers.includes("Artist/Musician") &&
        currentForm.answers.findIndex((answer) => answer.id == "5") != -1
      ) {
        currentForm.answers = currentForm.answers.filter(
          (answer) => answer.id != "5"
        );
      }

      if (
        !answers.includes("Athlete") &&
        currentForm.answers.findIndex((answer) => answer.id == "6") != -1
      ) {
        currentForm.answers = currentForm.answers.filter(
          (answer) => answer.id != "6"
        );
      }
    } else if (id == 4) {
      if (
        !answers.includes("Cannabis/CBD") &&
        currentForm.answers.findIndex((answer) => answer.id == "7") != -1
      ) {
        currentForm.answers = currentForm.answers.filter(
          (answer) => answer.id != "7"
        );
      }

      if (
        !answers.includes("Apparel") &&
        currentForm.answers.findIndex((answer) => answer.id == "8") != -1
      ) {
        currentForm.answers = currentForm.answers.filter(
          (answer) => answer.id != "8"
        );
      }

      if (
        !answers.includes("Service Industry") &&
        currentForm.answers.findIndex((answer) => answer.id == "9") != -1
      ) {
        currentForm.answers = currentForm.answers.filter(
          (answer) => answer.id != "9"
        );
      }
    }

    setAnswers([]);
    const questionIndex = questionsData.findIndex((q) => q.id === id);
    currentForm.progress = ((questionIndex + 1) / questionsData.length) * 100;
    currentForm.lastIndex = questionIndex;
    localStorage.setItem("currentForm", JSON.stringify(currentForm));

    await updateCurrentForm(currentForm);

    if (questionIndex === questionsData.length - 1) {
      navigate("/form-overview");
    } else {
      if (question.id == 2) {
        if (answers.includes("Influencer")) {
          navigate("/question/3");
        } else if (answers.includes("Brand")) {
          navigate("/question/4");
        } else if (answers.includes("Artist/Musician")) {
          navigate("/question/5");
        } else if (answers.includes("Athlete")) {
          navigate("/question/6");
        } else {
          navigate("/question/10");
        }
      } else if (question.id == 4) {
        if (answers.includes("Cannabis/CBD")) {
          navigate("/question/7");
        } else if (answers.includes("Apparel")) {
          navigate("/question/8");
        } else if (answers.includes("Service Industry")) {
          navigate("/question/9");
        } else {
          navigate("/question/10");
        }
      } else if (
        question.id == 3 ||
        question.id == 5 ||
        question.id == 6 ||
        question.id == 7 ||
        question.id == 8 ||
        question.id == 9
      ) {
        navigate("/question/10");
      } else {
        navigate(`/question/${questionsData[questionIndex + 1].id}`);
      }
    }
  };

  useEffect(() => {
    if (question?.id == 10) {
      const currentForm = JSON.parse(localStorage.getItem("currentForm"));
      const businessTypes = currentForm.answers.find((a) => a.id === 2)
        ?.fields[0].fieldValue;
      const brandTypes = currentForm.answers.find((a) => a.id === 4)?.fields[0]
        .fieldValue;
      if (businessTypes) {
        businessTypes.forEach((type) => {
          if (type === "Influencer") {
            if (currentForm.answers.find((a) => a.id === 3) === undefined) {
              navigate("/question/3");
            }
          } else if (type === "Brand") {
            if (currentForm.answers.find((a) => a.id === 4) === undefined) {
              navigate("/question/4");
            }
          } else if (type === "Artist/Musician") {
            if (currentForm.answers.find((a) => a.id === 5) === undefined) {
              navigate("/question/5");
            }
          } else if (type === "Athlete") {
            if (currentForm.answers.find((a) => a.id === 6) === undefined) {
              navigate("/question/6");
            }
          }
        });
      }
      if (brandTypes) {
        brandTypes.forEach((type) => {
          if (type === "Cannabis/CBD") {
            if (currentForm.answers.find((a) => a.id === 7) === undefined) {
              navigate("/question/7");
            }
          } else if (type === "Apparel") {
            if (currentForm.answers.find((a) => a.id === 8) === undefined) {
              navigate("/question/8");
            }
          } else if (type === "Service Industry") {
            if (currentForm.answers.find((a) => a.id === 9) === undefined) {
              navigate("/question/9");
            }
          }
        });
      }
    }
  }, [navigate, question]);

  useEffect(() => {
    const currentForm = JSON.parse(localStorage.getItem("currentForm"));
    if (currentForm?.answers) {
      const currentAnswer = currentForm.answers.find(
        (a) => a.id === question?.id
      );
      if (currentAnswer) {
        if (question?.type === "multipleChoice") {
          setAnswers(currentAnswer.fields[0].fieldValue);
        } else if (question?.type === "textInput") {
          setAnswers([currentAnswer.fields[0].fieldValue]);
        } else if (question?.type === "startPage") {
          setFirstName(currentAnswer.fields[0].fieldValue);
          setLastName(currentAnswer.fields[1].fieldValue);
          setPhoneNumber(currentAnswer.fields[2].fieldValue);
          setEmail(currentAnswer.fields[3].fieldValue);
          setCompany(currentAnswer.fields[4].fieldValue);
        }
      }
    }
    setLoading(false);
  }, [question]);

  const handlePreviousQuestion = async () => {
    setLoading(true);
    const questionIndex = questionsData.findIndex((q) => q.id === id);
    if (questionIndex === 0) {
      navigate("/dashboard");
    } else {
      let currentForm = JSON.parse(localStorage.getItem("currentForm"));
      currentForm.progress = ((questionIndex - 1) / questionsData.length) * 100;
      currentForm.lastIndex = questionIndex - 1;
      localStorage.setItem("currentForm", JSON.stringify(currentForm));

      await updateCurrentForm(currentForm);

      if (id == 3 || id == 4 || id == 5 || id == 6) {
        navigate(`/question/2`);
      } else if (id == 7 || id == 8 || id == 9) {
        navigate(`/question/4`);
      } else if (id == 10) {
        const currentForm = JSON.parse(localStorage.getItem("currentForm"));
        if (currentForm?.answers) {
          if (currentForm.answers.find((a) => a.id == 9)) {
            navigate(`/question/9`);
          } else if (currentForm.answers.find((a) => a.id == 8)) {
            navigate(`/question/8`);
          } else if (currentForm.answers.find((a) => a.id == 7)) {
            navigate(`/question/7`);
          } else if (currentForm.answers.find((a) => a.id == 6)) {
            navigate(`/question/6`);
          } else if (currentForm.answers.find((a) => a.id == 5)) {
            navigate(`/question/5`);
          } else if (currentForm.answers.find((a) => a.id == 4)) {
            navigate(`/question/4`);
          } else if (currentForm.answers.find((a) => a.id == 3)) {
            navigate(`/question/3`);
          } else {
            navigate(`/question/2`);
          }
        }
      } else {
        navigate(`/question/${questionsData[questionIndex - 1].id}`);
      }
    }
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
                selected={answers}
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
        <div className="flex flex-col items-start justify-between py-10 mb-10 sm:mb-auto sm:px-10 overflow-y-scroll hide-scrollbar">
          <h3 className="text-3xl flex flex-row">
            1
            <img src={RightArrowIcon} className="w-7 mx-3" />
            ...
          </h3>
          <div className="flex flex-col items-center justify-center px-10">
            <p className="text-xl font-thin my-5">
              We are excited for you to join the Pillar family. Before we begin
              it&apos;s important we gather as much information about you/your
              brand as possible.
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
              placeholder="(281) 330-8004"
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
      <div className="flex flex-col h-[80%] w-[90%] lg:w-[60%] bg-black bg-opacity-75 rounded-t-3xl text-green-500 relative font-courier">
        {renderQuestion()}
        <ProgressBarContainer className="absolute bottom-0 w-full" />
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
      {loading && (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-green-500"></div>
        </div>
      )}
    </div>
  );
};

export default Question;
