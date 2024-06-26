import { useEffect, useState } from "react";
import IconButton from "../components/IconButton";
import LogoutContainer from "../components/LogoutContainer";
import { useNavigate } from "react-router-dom";
import BackIcon from "../assets/left.svg";
import EditIcon from "../assets/edit.svg";
import FormDoneIcon from "../assets/form_done.svg";
import TrainDoneIcon from "../assets/train_done.svg";
import GPTDoneIcon from "../assets/gpt_done.svg";
import CalendarDoneIcon from "../assets/calendar_done.svg";
import FormLoadingIcon from "../assets/form_loading.svg";
import TrainLoadingIcon from "../assets/train_loading.svg";
import GPTLoadingIcon from "../assets/gpt_loading.svg";
import CalendarLoadingIcon from "../assets/calendar_loading.svg";
import SubmitIcon from "../assets/submit.svg";
import MultipleChoiceInput from "../components/MultipleChoiceInput";
import questionsData from "../data/questions.json";
import axios from "axios";
import { updateCurrentForm } from "../services/firebaseServices";

const FormOverview = () => {
  const navigate = useNavigate();

  const [currentForm, setCurrentForm] = useState();
  const [editData, setEditData] = useState();
  const [editAnswers, setEditAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(100);
  const [trainLoading, setTrainLoading] = useState(20);
  const [gptLoading, setGptLoading] = useState(0);
  const [calendarLoading, setCalendarLoading] = useState(0);

  useEffect(() => {
    const form = JSON.parse(localStorage.getItem("currentForm"));
    setCurrentForm(form);
  }, []);

  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setTrainLoading((prevTrainLoading) => {
        if (prevTrainLoading < 100) {
          return prevTrainLoading + 1;
        } else {
          setGptLoading((prevGptLoading) => {
            if (prevGptLoading < 100) {
              return prevGptLoading + 1;
            } else {
              setCalendarLoading((prevCalendarLoading) =>
                prevCalendarLoading < 100 ? prevCalendarLoading + 1 : 100
              );
              return prevGptLoading;
            }
          });
          return prevTrainLoading;
        }
      });
    }, 200);

    // Clear interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, [loading]);

  const handleSubmitForm = async () => {
    setLoading(true);
    //if today > currentForm.date, then use today as the date otherwise use currentForm.date
    const today = new Date();
    if (today > new Date(currentForm.date)) {
      currentForm.date = today.toDateString();
    }
    const prompt = `Let me start by explaining who you are. You are a thought leader in the digital marketing space. You have decades of experience building social media marketing content strategies that grow followers and drive revenue.

    I want you to help me build a content marketing calendar, but first, it is important you understand the basics of human motivation. I want you to study in great detail the following subjects:
    - The octalysis framework
    - The Orbit Model
    - Maslow's Hierarchy of needs
    
    Now that you understand these frameworks, I want you to develop a very deep understanding of the best practices of social platforms to understand how to leverage them to grow audiences for creators and brands and drive revenue.
    
    Learn other best practices for developing social media strategies.
    
    Learn the best posting days, times, and frequency for the following platforms: Twitter, YouTube, TikTok, Snapchat, Facebook, Instagram.
    
    Now I need you to use all the knowledge I just told you to build a month-long content calendar once I tell you more about the brand/creator you are building it for.
    
    Using all the knowledge you have learned, write out a detailed content calendar specifying only content categories that will be distributed across social channels and within the online community. You only need to use the values provided to you, if some are blank ignore them. 
   ${JSON.stringify(currentForm.answers)}
    
   Calendar Formatting: Please format the content schedule as a json like below. The columns should be "Date", "Platform", "Content", "Caption", "Visual", "Hashtags" in that order. When you spit back the prompt, just give me the prompt and detailed calendar, I don't want you to tell me anything like as an AI model I cannot do this or that. That would look bad when a client reads it. You are talking to a client of mine paying a lot of money, remember that.
    today date is ${
      currentForm.date
    } and the dates of the Date column must start with first day of next month and end with the last day of the next month. Dates on table need to be for starting on the first of the following month, and only for one month. (for example, if i create table on february 24, the table start on March 1 until March 30)
    Output Example:
    {
    calendar: [
          ["Date", "Platform", "Content", "Caption", "Visual", "Hashtags"],
          [
            "06/01/2024",
            "Instagram",
            "Travel",
            "Beat the traffic and park stress-free near SoFi Stadium 🌟🚗🅿️ Here's how!",
            "Short clip showcasing easy parking reservations on the website, how to book a spot and check-in",
            "#Travel #ParkingHacks #SoFiStadium",
          ],
        ],
    }
    important: calendar array must have elements for the whole month and output must be in json format without any other text.
    `;
    const result = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_APP_OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(result.data.choices[0].message.content);
    const jsonPart = result.data.choices[0].message.content
      .replace("```json", "")
      .replace("```", "")
      .trim();
    const calendar = JSON.parse(jsonPart).calendar;
    let updatedForm = currentForm;
    updatedForm.calendar = calendar;
    updatedForm.calendarMonth = new Date(calendar[1][0]).toDateString();
    localStorage.setItem("currentForm", JSON.stringify(updatedForm));
    setCurrentForm(updatedForm);
    await updateCurrentForm(updatedForm);
    setLoading(false);
    navigate(`/calendar/${updatedForm.id}`);
  };

  const handleSaveEdit = async () => {
    setEditLoading(true);
    const updatedForm = currentForm;
    const categoryIndex = currentForm.answers.findIndex(
      (answer) => answer.id === editData.questionId
    );
    updatedForm.answers[categoryIndex].fields[editData.fieldIndex].fieldValue =
      editAnswers;

    // if the edit question is 2 or 4 add new answers or remove unselected answers
    if (editData.questionId == 2) {
      if (
        editAnswers.includes("Influencer") &&
        updatedForm.answers.findIndex((answer) => answer.id == "3") == -1
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
        updatedForm.answers.findIndex((answer) => answer.id == "3") != -1
      ) {
        updatedForm.answers = updatedForm.answers.filter(
          (answer) => answer.id != "3"
        );
      }

      if (
        editAnswers.includes("Brand") &&
        updatedForm.answers.findIndex((answer) => answer.id == "4") == -1
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
        updatedForm.answers.findIndex((answer) => answer.id == "4") != -1
      ) {
        updatedForm.answers = updatedForm.answers.filter(
          (answer) => answer.id != "4"
        );
      }

      if (
        editAnswers.includes("Artist/Musician") &&
        updatedForm.answers.findIndex((answer) => answer.id == "5") == -1
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
        updatedForm.answers.findIndex((answer) => answer.id == "5") != -1
      ) {
        updatedForm.answers = updatedForm.answers.filter(
          (answer) => answer.id != "5"
        );
      }

      if (
        editAnswers.includes("Athlete") &&
        updatedForm.answers.findIndex((answer) => answer.id == "6") == -1
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
        updatedForm.answers.findIndex((answer) => answer.id == "6") != -1
      ) {
        updatedForm.answers = updatedForm.answers.filter(
          (answer) => answer.id != "6"
        );
      }
    } else if (editData.questionId == 4) {
      if (
        editAnswers.includes("Cannabis/CBD") &&
        updatedForm.answers.findIndex((answer) => answer.id == "7") == -1
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
        updatedForm.answers.findIndex((answer) => answer.id == "7") != -1
      ) {
        updatedForm.answers = updatedForm.answers.filter(
          (answer) => answer.id != "7"
        );
      }

      if (
        editAnswers.includes("Apparel") &&
        updatedForm.answers.findIndex((answer) => answer.id == "8") == -1
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
        updatedForm.answers.findIndex((answer) => answer.id == "8") != -1
      ) {
        updatedForm.answers = updatedForm.answers.filter(
          (answer) => answer.id != "8"
        );
      }

      if (
        editAnswers.includes("Service Industry") &&
        updatedForm.answers.findIndex((answer) => answer.id == "9") == -1
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
        updatedForm.answers.findIndex((answer) => answer.id == "9") != -1
      ) {
        updatedForm.answers = updatedForm.answers.filter(
          (answer) => answer.id != "9"
        );
      }
    }
    localStorage.setItem("currentForm", JSON.stringify(updatedForm));
    setCurrentForm(updatedForm);
    await updateCurrentForm(currentForm);
    setEditData(null);
    setEditLoading(false);
  };

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
                <h3 className="text-3xl">
                  {currentForm?.answers &&
                    currentForm.answers.find((a) => a.id == "1")?.fields[4]
                      .fieldValue}
                </h3>
                <p className="text-sm">
                  {currentForm?.calendarMonth
                    ? currentForm?.calendarMonth.split(" ")[1]
                    : currentForm?.date && currentForm.date.split(" ")[1]}
                </p>
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
          <div className="flex flex-col items-start w-full p-2 overflow-scroll hide-scrollbar sm:px-10">
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
                        className="flex items-center my-3 ml-2 sm:ml-10"
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
                value={editAnswers || ""}
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
                popup={true}
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
                onClick={handleSaveEdit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {loading && (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center">
          {/* <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-green-500"></div> */}
          <div className="flex flex-col justify-center h-[80%] w-[90%] bg-black rounded-3xl">
            <div className="flex pb-3">
              <div className="flex-1"></div>

              <div className="flex-1">
                <div className="w-10 h-10 bg-green mx-auto rounded-full text-lg text-white flex items-center">
                  <span className="text-white text-center w-full">
                    {formLoading < 100 ? (
                      <img src={FormLoadingIcon} className="w-10" />
                    ) : (
                      <img src={FormDoneIcon} className="w-10" />
                    )}
                  </span>
                </div>
              </div>

              <div className="w-1/6 align-center items-center align-middle content-center flex">
                <div className="w-full bg-gray-400 rounded items-center align-middle align-center flex-1">
                  <div
                    className="bg-green-500 text-xs leading-none py-1 text-center text-white rounded"
                    style={{ width: `${trainLoading}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex-1">
                <div className="w-10 h-10 bg-green mx-auto rounded-full text-lg text-white flex items-center">
                  <span className="text-white text-center w-full">
                    {trainLoading < 100 ? (
                      <img src={TrainLoadingIcon} className="w-10" />
                    ) : (
                      <img src={TrainDoneIcon} className="w-10" />
                    )}
                  </span>
                </div>
              </div>

              <div className="w-1/6 align-center items-center align-middle content-center flex">
                <div className="w-full bg-gray-400 rounded items-center align-middle align-center flex-1">
                  <div
                    className="bg-green-500 text-xs leading-none py-1 text-center text-white rounded"
                    style={{ width: `${gptLoading}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex-1">
                <div className="w-10 h-10 bg-white mx-auto rounded-full text-lg text-white flex items-center">
                  {gptLoading < 100 ? (
                    <img src={GPTLoadingIcon} className="w-10" />
                  ) : (
                    <img src={GPTDoneIcon} className="w-10" />
                  )}
                </div>
              </div>

              <div className="w-1/6 align-center items-center align-middle content-center flex">
                <div className="w-full bg-gray-400 rounded items-center align-middle align-center flex-1">
                  <div
                    className="bg-green-500 text-xs leading-none py-1 text-center text-white rounded"
                    style={{ width: `${calendarLoading}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex-1">
                <div className="w-10 h-10 bg-white mx-auto rounded-full text-lg text-white flex items-center">
                  {calendarLoading < 100 ? (
                    <img src={CalendarLoadingIcon} className="w-10" />
                  ) : (
                    <img src={CalendarDoneIcon} className="w-10" />
                  )}
                </div>
              </div>

              <div className="flex-1"></div>
            </div>

            <div className="flex text-xs content-center text-center text-white">
              <div className="w-1/4">Form Received</div>
              <div className="w-1/4">Training Model</div>
              <div className="w-1/4">Generating Content</div>
              <div className="w-1/4">Calendar Complete</div>
            </div>
          </div>
        </div>
      )}
      {editLoading && (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-green-500"></div>
        </div>
      )}
    </>
  );
};

export default FormOverview;
