import CalendarIcon from "../assets/calendar.svg";
import PlusIcon from "../assets/plus.svg";
import ArchiveIcon from "../assets/trash.svg";
import EditIcon from "../assets/edit.svg";
import { getUserData } from "../services/saveLogin";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "../components/IconButton";
import { uid } from "uid";
import LogoutContainer from "../components/LogoutContainer";
import {
  getFireStoreData,
  updateCurrentForm,
} from "../services/firebaseServices";

const Dashboard = () => {
  const navigate = useNavigate();
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCalendarClick = () => {
    navigate("/calendar/1");
  };

  const createNewForm = async () => {
    // const newForm = {
    //   id: Math.floor(Math.random() * 1000),
    //   date: new Date().toISOString(),
    //   brand: "OpenAsphalt",
    //   answers: [],
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
      calendarMonth: new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        new Date().getDate()
      ).toDateString(),
      isArchived: false,
      answers: [],
      calendar: [
        ["Date", "Platform", "Content", "Caption", "Visual", "Hashtags"],
      ],
      progress: 0,
    };
    localStorage.setItem("currentForm", JSON.stringify(newForm));
    await updateCurrentForm(newForm);
    navigate("/question/1");
  };

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getFireStoreData(getUserData()?.uid);
      if (userData) {
        const userForms = userData.forms
          ? userData.forms
              .map((form) => JSON.parse(form))
              .filter((form) => !form.isArchived)
          : [];
        setForms(userForms);
        setLoading(false);
      }
    };
    setLoading(true);
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
    setLoading(true);
    form.isArchived = true;
    await updateCurrentForm(form);
    setForms(forms.filter((f) => f.id !== form.id));
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col h-[80%] w-[90%] md:w-[60%] bg-black bg-opacity-75 rounded-3xl text-white">
        <div className="flex flex-row items-start justify-between p-4 flex-wrap">
          <h3 className="text-3xl md:ml-10">Welcome</h3>
          <div className="flex flex-row space-x-5 justify-between w-full mt-2 md:w-auto">
            <IconButton
              icon={PlusIcon}
              text="start New"
              onClick={createNewForm}
            />
            <IconButton
              icon={ArchiveIcon}
              text="Archive"
              onClick={() => navigate("/archived")}
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
                        onClick={() => navigate(`/calendar/${form.id}`)}
                      >
                        View Calender {index + 1}
                      </button>
                    </td>
                    <td>
                      {form?.calendarMonth
                        ? form?.calendarMonth.split(" ")[1]
                        : form?.date && form.date.split(" ")[1]}
                    </td>
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
      {loading && (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-green-500"></div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
