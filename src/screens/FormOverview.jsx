import { useEffect, useState } from "react";
import IconButton from "../components/IconButton";
import LogoutContainer from "../components/LogoutContainer";
import { useNavigate } from "react-router-dom";
import BackIcon from "../assets/left.svg";
import EditIcon from "../assets/edit.svg";
import SubmitIcon from "../assets/submit.svg";
import MultipleChoiceInput from "../components/MultipleChoiceInput";
import questionsData from "../data/questions.json";

const FormOverview = () => {
  const [currentForm, setCurrentForm] = useState();
  const [editData, setEditData] = useState();
  const [editAnswers, setEditAnswers] = useState([]);

  useEffect(() => {
    const form = JSON.parse(localStorage.getItem("currentForm"));
    setCurrentForm(form);
  }, []);

  const navigate = useNavigate();
  //TODO: when selecting or deselecting a business categories add or remove answers
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex flex-col h-[80%] w-[90%] bg-black bg-opacity-75 rounded-3xl text-white">
          <div className="flex flex-row items-start justify-between p-4 flex-wrap">
            <div className="flex flex-row">
              <img
                src={BackIcon}
                className="w-10 mr-2 cursor-pointer"
                onClick={() => navigate("/dashboard")}
              />
              <div className="flex flex-col ml-5">
                <h3 className="text-3xl">OpenAsphalt</h3>
                <p className="text-sm">Calendar 1 April</p>
              </div>
            </div>
            <div className="flex flex-row space-x-5 justify-between w-full mt-2 md:w-auto">
              <IconButton
                icon={SubmitIcon}
                text="Submit"
                textColor="text-green-500"
              />
              <LogoutContainer />
            </div>
          </div>
          <div className="flex flex-col items-start w-full p-2 overflow-scroll hide-scrollbar px-10">
            {currentForm &&
              currentForm.answers.map((answer, answerIndex) => (
                <div key={answerIndex} className="mb-4">
                  <h3 className="text-2xl font-bold mb-2">
                    {answer.categoryTitle}
                  </h3>
                  {answer.fields.map((field, fieldIndex) => (
                    <div
                      key={`${answerIndex}_${fieldIndex}`}
                      className="flex items-center my-3 ml-10"
                    >
                      <img
                        src={EditIcon}
                        className="w-5 mr-2 cursor-pointer"
                        onClick={() => {
                          setEditData({
                            questionId: answer.id,
                            categoryIndex: answerIndex,
                            fieldIndex: fieldIndex,
                            categoryTitle: answer.categoryTitle,
                            fieldTitle: field.fieldTitle,
                            fieldValue: field.fieldValue,
                            type: answer.type,
                          });
                          setEditAnswers(field.fieldValue);
                        }}
                      />
                      <p className="text-lg">
                        <span className="font-semibold">
                          {field.fieldTitle}:
                        </span>{" "}
                        {answer.type == "multipleChoice"
                          ? field.fieldValue.join(", ")
                          : field.fieldValue}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>
      </div>
      {editData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-black p-5 rounded-lg">
            <h3 className="text-2xl font-bold mb-5 text-green-500">
              {editData.categoryTitle} - {editData.fieldTitle}
            </h3>
            {editData.type === "textInput" ? (
              <input
                type="text"
                className="w-full border-b-2 border-green-500 bg-transparent text-green-500 placeholder-green-800 focus:border-b-4 focus:outline-none text-2xl"
                placeholder="Type your answer here"
                value={editData.fieldValue}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    fieldValue: e.target.value,
                  })
                }
              />
            ) : editData.type === "multipleChoice" ? (
              <MultipleChoiceInput
                options={
                  questionsData.find((q) => q.id === editData.questionId)
                    .options
                }
                selected={editAnswers}
                setAnswers={setEditAnswers}
              />
            ) : editData.type === "titlePage" ? (
              <></>
            ) : (
              <></>
            )}
            <div className="flex justify-end mt-5">
              <button
                className="border-2 border-green-500 text-green-500 px-4 py-2 rounded-lg"
                onClick={() => setEditData(null)}
              >
                Cancel
              </button>
              <button
                className="border-2 border-green-500 text-white bg-green-500 px-4 py-2 rounded-lg ml-2"
                onClick={() => {
                  const updatedForm = currentForm;
                  updatedForm.answers[editData.categoryIndex].fields[
                    editData.fieldIndex
                  ].fieldValue = editAnswers;
                  localStorage.setItem(
                    "currentForm",
                    JSON.stringify(updatedForm)
                  );
                  setCurrentForm(updatedForm);
                  setEditData(null);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormOverview;
