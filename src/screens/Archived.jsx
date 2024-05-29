import UserIcon from "../assets/user-circle.svg";
import CalendarIcon from "../assets/calendar.svg";
import PlusIcon from "../assets/plus.svg";
import ArchiveIcon from "../assets/trash.svg";
import EditIcon from "../assets/edit.svg";
import BackIcon from "../assets/left.svg";
import { clearUserData, getUserData } from "../services/saveLogin";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "../components/IconButton";
import Question from "./Question";
import { uid } from "uid";
import LogoutContainer from "../components/LogoutContainer";
import {
  getFireStoreData,
  updateCurrentForm,
} from "../services/firebaseServices";

const Archived = () => {
  const navigate = useNavigate();
  const [forms, setForms] = useState([]);

  const handleCalendarClick = () => {
    navigate("/calendar/1");
  };

  const createNewForm = () => {
    //TODO: In user we store array of forms, we store current form in the local storage
    // const newForm = {
    //   id: Math.floor(Math.random() * 1000),
    //   date: new Date().toISOString(),
    //   brand: "OpenAsphalt",
    //   questions: [],
    //   calendar: [
    //     ["Date", "Platform", "Content", "Caption", "Visual", "Hashtags"],
    //     [
    //       "06/01/2024",
    //       "Instagram",
    //       "Travel",
    //       "Beat the traffic and park stress-free near SoFi Stadium 🌟🚗🅿️ Here's how!",
    //       "Short clip showcasing easy parking reservations on the website",
    //       "#Travel #ParkingHacks #SoFiStadium",
    //     ],
    //   ],
    //   isArchived: false,
    // };
    const newForm = {
      id: uid(),
      date: new Date().toDateString(),
      isArchived: false,
      questions: [],
      calendar: [
        ["Date", "Platform", "Content", "Caption", "Visual", "Hashtags"],
      ],
      progress: 0,
    };
    localStorage.setItem("currentForm", JSON.stringify(newForm));
    navigate("/question/1");
  };

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getFireStoreData(getUserData()?.uid);
      if (userData) {
        const userForms = userData.forms
          ? userData.forms
              .map((form) => JSON.parse(form))
              .filter((form) => form.isArchived)
          : [];
        setForms(userForms);
      }
    };

    fetchData();
  }, []);

  const handleEditClick = (form) => {
    localStorage.setItem("currentForm", JSON.stringify(form));
    if (form.answers && form.answers.length > 0) {
      const lastAnswer = form.answers[form.answers.length - 1];
      navigate(`/question/${lastAnswer.id}`);
    } else {
      navigate(`/question/1`);
    }
  };

  const handleArchiveClick = async (form) => {
    form.isArchived = true;
    await updateCurrentForm(form);
    setForms(forms.filter((f) => f.id !== form.id));
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col h-[80%] w-[90%] md:w-[60%] bg-black bg-opacity-75 rounded-3xl text-white">
        <div className="flex flex-row items-start justify-between p-4 flex-wrap">
          <div className="flex flex-row">
            <img
              src={BackIcon}
              className="w-10 mr-2 cursor-pointer"
              onClick={() => navigate("/dashboard")}
            />
            <div className="flex flex-col ml-5">
              <h3 className="text-3xl">Archived</h3>
              <p className="text-sm">Deleted Calendars</p>
            </div>
          </div>
          <div className="flex flex-row space-x-5 justify-between w-full mt-2 md:w-auto">
            <IconButton
              icon={PlusIcon}
              text="start New"
              onClick={createNewForm}
            />
            <LogoutContainer />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full p-2 text-center overflow-auto hide-scrollbar">
          <table className="w-full">
            <thead>
              <tr>
                <th className="flex flex-row items-center justify-center py-10">
                  <img src={CalendarIcon} className="w-10 mr-2" /> Calendar
                </th>
                <th>Month</th>
                <th>Brand</th>
                <th className="md:w-[30%]">Action</th>
              </tr>
            </thead>
            <tbody>
              {forms &&
                forms.map((form, index) => (
                  <tr key={form.id}>
                    <td className="flex flex-row items-center justify-center py-5">
                      <button
                        className="border-2 border-green-500 text-center rounded-lg p-2 m-1"
                        onClick={handleCalendarClick}
                      >
                        View Calender {index + 1}
                      </button>
                    </td>
                    <td>{form.date && form.date.split(" ")[1]}</td>
                    <td>
                      {form.answers &&
                        form.answers.find((a) => a.id == "1")?.fields[4]
                          .fieldValue}
                    </td>
                    <td className="flex flex-row items-center justify-center">
                      <img
                        src={EditIcon}
                        className="w-5 mr-5 cursor-pointer"
                        onClick={() => handleEditClick(form)}
                      />
                      <img
                        src={ArchiveIcon}
                        className="w-5 cursor-pointer"
                        onClick={() => handleArchiveClick(form)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Archived;
