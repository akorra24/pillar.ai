import CalendarIcon from "../assets/calendar.svg";
import PlusIcon from "../assets/plus.svg";
import ArchiveIcon from "../assets/restore.svg";
import BackIcon from "../assets/left.svg";
import DeleteIcon from "../assets/p_delete.svg";
import { getUserData } from "../services/saveLogin";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "../components/IconButton";
import { uid } from "uid";
import LogoutContainer from "../components/LogoutContainer";
import {
  deleteForm,
  getFireStoreData,
  updateCurrentForm,
} from "../services/firebaseServices";

const Archived = () => {
  const navigate = useNavigate();
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(null);

  const handleCalendarClick = () => {
    navigate("/calendar/1");
  };

  const createNewForm = () => {
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
        setLoading(false);
      }
    };
    setLoading(true);
    fetchData();
  }, []);

  const handleArchiveClick = async (form) => {
    setLoading(true);
    form.isArchived = false;
    await updateCurrentForm(form);
    setForms(forms.filter((f) => f.id !== form.id));
    setLoading(false);
  };

  const handleDeleteClick = async () => {
    const form = deleteDialog;
    setDeleteDialog(null);
    setLoading(true);
    await deleteForm(form);
    setForms(forms.filter((f) => f.id !== form.id));
    setLoading(false);
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
        <div className="flex flex-col w-full p-2 text-center overflow-auto hide-scrollbar">
          <table className="w-full">
            <thead>
              <tr>
                <th className="flex flex-row items-center justify-center py-10">
                  <img src={CalendarIcon} className="w-10 mr-2" /> Calendar
                </th>
                <th className="px-3">Month</th>
                <th className="px-3">Brand</th>
                <th className="px-3">Restore</th>
                <th className="px-3">Delete</th>
              </tr>
            </thead>
            <tbody>
              {forms &&
                forms.map((form, index) => (
                  <tr key={form.id}>
                    <td className="flex flex-row items-center justify-center py-5">
                      <button
                        className="border-2 border-green-500 text-center rounded-lg p-2 m-1 min-w-36"
                        onClick={handleCalendarClick}
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
                    <td>
                      <div className="flex items-center justify-center">
                        <img
                          src={ArchiveIcon}
                          className="w-8 cursor-pointer"
                          onClick={() => handleArchiveClick(form)}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center justify-center">
                        <img
                          src={DeleteIcon}
                          className="w-8 cursor-pointer"
                          onClick={() => setDeleteDialog(form)}
                        />
                      </div>
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
      {deleteDialog && (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-10 flex flex-col justify-center items-center">
            <h2 className="text-2xl mb-4">Permanently Delete Item</h2>
            <h3 className="mb-4">
              Are you sure you want to permanently delete this item?
            </h3>
            <div className="flex justify-around w-full">
              <button
                className="bg-red-500 text-white rounded px-4 py-2"
                onClick={handleDeleteClick}
              >
                Permanently Delete
              </button>
              <button
                className="bg-gray-500 text-white rounded px-4 py-2"
                onClick={() => setDeleteDialog(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Archived;
