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

  const handleSubmitForm = async () => {};

  const navigate = useNavigate();

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
                onClick={handleSubmitForm}
              />
              <LogoutContainer />
            </div>
          </div>
          <div className="flex flex-col items-start w-full p-2 overflow-scroll hide-scrollbar px-10">
            {currentForm &&
              Object.entries(
                currentForm.answers.reduce((categories, answer) => {
                  (categories[answer.categoryTitle] =
                    categories[answer.categoryTitle] || []).push(answer);
                  return categories;
                }, {})
              ).map(([categoryTitle, answers], categoryIndex) => (
                <div key={categoryIndex} className="mb-4">
                  <h3 className="text-2xl font-bold mb-2">{categoryTitle}</h3>
                  {answers.map((answer, answerIndex) =>
                    answer.fields.map((field, fieldIndex) => (
                      <div
                        key={`${categoryIndex}_${answerIndex}_${fieldIndex}`}
                        className="flex items-center my-3 ml-10"
                      >
                        <img
                          src={EditIcon}
                          className="w-5 mr-2 cursor-pointer"
                          onClick={() => {
                            setEditData({
                              questionId: answer.id,
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
                    ))
                  )}
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
                value={editAnswers[0] || ""}
                onChange={(e) =>
                  setEditAnswers(e.target.value ? [e.target.value] : [])
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
                  const categoryIndex = currentForm.answers.findIndex(
                    (answer) => answer.id === editData.questionId
                  );
                  updatedForm.answers[categoryIndex].fields[
                    editData.fieldIndex
                  ].fieldValue = editAnswers;

                  // if the edit question is 2 or 4 add new answers or remove unselected answers
                  if (editData.questionId == 2) {
                    if (
                      editAnswers.includes("Influencer") &&
                      updatedForm.answers.findIndex(
                        (answer) => answer.id == "3"
                      ) == -1
                    ) {
                      updatedForm.answers.push({
                        id: "3",
                        type: "multipleChoice",
                        categoryTitle: "Content Creation",
                        fields: [
                          {
                            fieldTitle: "Content Type",
                            fieldValue: [],
                          },
                        ],
                      });
                    } else if (
                      !editAnswers.includes("Influencer") &&
                      updatedForm.answers.findIndex(
                        (answer) => answer.id == "3"
                      ) != -1
                    ) {
                      updatedForm.answers = updatedForm.answers.filter(
                        (answer) => answer.id != "3"
                      );
                    }

                    if (
                      editAnswers.includes("Brand") &&
                      updatedForm.answers.findIndex(
                        (answer) => answer.id == "4"
                      ) == -1
                    ) {
                      updatedForm.answers.push({
                        id: "4",
                        type: "multipleChoice",
                        categoryTitle: "Brand Category",
                        fields: [
                          {
                            fieldTitle: "Brand Type",
                            fieldValue: [],
                          },
                        ],
                      });
                    } else if (
                      !editAnswers.includes("Brand") &&
                      updatedForm.answers.findIndex(
                        (answer) => answer.id == "4"
                      ) != -1
                    ) {
                      updatedForm.answers = updatedForm.answers.filter(
                        (answer) => answer.id != "4"
                      );
                    }

                    if (
                      editAnswers.includes("Artist/Musician") &&
                      updatedForm.answers.findIndex(
                        (answer) => answer.id == "5"
                      ) == -1
                    ) {
                      updatedForm.answers.push({
                        id: "5",
                        type: "multipleChoice",
                        categoryTitle: "Music Genre",
                        fields: [
                          {
                            fieldTitle: "Music Type",
                            fieldValue: [],
                          },
                        ],
                      });
                    } else if (
                      !editAnswers.includes("Artist/Musician") &&
                      updatedForm.answers.findIndex(
                        (answer) => answer.id == "5"
                      ) != -1
                    ) {
                      updatedForm.answers = updatedForm.answers.filter(
                        (answer) => answer.id != "5"
                      );
                    }

                    if (
                      editAnswers.includes("Athlete") &&
                      updatedForm.answers.findIndex(
                        (answer) => answer.id == "6"
                      ) == -1
                    ) {
                      updatedForm.answers.push({
                        id: "6",
                        type: "multipleChoice",
                        categoryTitle: "Sports Category",
                        fields: [
                          {
                            fieldTitle: "Sport Type",
                            fieldValue: [],
                          },
                        ],
                      });
                    } else if (
                      !editAnswers.includes("Athlete") &&
                      updatedForm.answers.findIndex(
                        (answer) => answer.id == "6"
                      ) != -1
                    ) {
                      updatedForm.answers = updatedForm.answers.filter(
                        (answer) => answer.id != "6"
                      );
                    }
                  } else if (editData.questionId == 4) {
                    if (
                      editAnswers.includes("Cannabis/CBD") &&
                      updatedForm.answers.findIndex(
                        (answer) => answer.id == "7"
                      ) == -1
                    ) {
                      updatedForm.answers.push({
                        id: "7",
                        type: "multipleChoice",
                        categoryTitle: "Cannabis/CBD Category",
                        fields: [
                          {
                            fieldTitle: "Business Type",
                            fieldValue: [],
                          },
                        ],
                      });
                    } else if (
                      !editAnswers.includes("Cannabis/CBD") &&
                      updatedForm.answers.findIndex(
                        (answer) => answer.id == "7"
                      ) != -1
                    ) {
                      updatedForm.answers = updatedForm.answers.filter(
                        (answer) => answer.id != "7"
                      );
                    }

                    if (
                      editAnswers.includes("Apparel") &&
                      updatedForm.answers.findIndex(
                        (answer) => answer.id == "8"
                      ) == -1
                    ) {
                      updatedForm.answers.push({
                        id: "8",
                        type: "multipleChoice",
                        categoryTitle: "Apparel Category",
                        fields: [
                          {
                            fieldTitle: "Apparel Type",
                            fieldValue: [],
                          },
                        ],
                      });
                    } else if (
                      !editAnswers.includes("Apparel") &&
                      updatedForm.answers.findIndex(
                        (answer) => answer.id == "8"
                      ) != -1
                    ) {
                      updatedForm.answers = updatedForm.answers.filter(
                        (answer) => answer.id != "8"
                      );
                    }

                    if (
                      editAnswers.includes("Service Industry") &&
                      updatedForm.answers.findIndex(
                        (answer) => answer.id == "9"
                      ) == -1
                    ) {
                      updatedForm.answers.push({
                        id: "9",
                        type: "multipleChoice",
                        categoryTitle: "Service Category",
                        fields: [
                          {
                            fieldTitle: "Service Type",
                            fieldValue: [],
                          },
                        ],
                      });
                    } else if (
                      !editAnswers.includes("Service Industry") &&
                      updatedForm.answers.findIndex(
                        (answer) => answer.id == "9"
                      ) != -1
                    ) {
                      updatedForm.answers = updatedForm.answers.filter(
                        (answer) => answer.id != "9"
                      );
                    }
                  }
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
