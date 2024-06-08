import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import IconButton from "../components/IconButton";
import ReGenerateIcon from "../assets/re-generate.svg";
import BackIcon from "../assets/left.svg";
import EditIcon from "../assets/edit.svg";
import EmailIcon from "../assets/mail.svg";
import { getUserData } from "../services/saveLogin";
import LogoutContainer from "../components/LogoutContainer";
import {
  getFireStoreData,
  updateCurrentForm,
} from "../services/firebaseServices";
import { uid } from "uid";
import axios from "axios";

const Calendar = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [emailDialog, setEmailDialog] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCalendarData() {
      setLoading(true);
      const userData = await getFireStoreData(getUserData()?.uid);
      let data = userData?.forms.find((form) => JSON.parse(form).id == id);
      if (!data) return;
      data = JSON.parse(data);
      setFormData(data);
      setLoading(false);
    }
    fetchCalendarData();
  }, [id]);

  const handleEditClick = () => {
    localStorage.setItem("currentForm", JSON.stringify(formData));
    navigate("/form-overview");
  };

  const handleGenerateNextMonth = async () => {
    setLoading(true);
    let updatedForm = formData;
    updatedForm.id = uid();
    updatedForm.date = new Date(formData.calendar[1][0]).toDateString();
    updatedForm.calendarMonth = new Date(
      new Date(formData.calendar[1][0]).getFullYear(),
      new Date(formData.calendar[1][0]).getMonth() + 1,
      new Date(formData.calendar[1][0]).getDate()
    ).toDateString();
    updatedForm.calendar = [
      ["Date", "Platform", "Content", "Caption", "Visual", "Hashtags"],
    ];
    updatedForm.isArchived = false;
    localStorage.setItem("currentForm", JSON.stringify(formData));
    await updateCurrentForm(updatedForm);
    setLoading(false);
    navigate("/form-overview");
  };

  const sendCalendarEmail = async () => {
    setLoading(true);
    const htmlMessage = `
<table style="border: 1px solid black; border-collapse: collapse;">
  <thead>
    <tr>
      <th style="border: 1px solid black; padding: 5px;">Date</th>
      <th style="border: 1px solid black; padding: 5px;">Platform</th>
      <th style="border: 1px solid black; padding: 5px;">Content</th>
      <th style="border: 1px solid black; padding: 5px;">Caption</th>
      <th style="border: 1px solid black; padding: 5px;">Visual</th>
      <th style="border: 1px solid black; padding: 5px;">Hashtags</th>
    </tr>
  </thead>
  <tbody>
    ${formData.calendar
      .slice(1)
      .map(
        (row) => `
      <tr>
        <td style="border: 1px solid black; padding: 5px;">${row[0]}</td>
        <td style="border: 1px solid black; padding: 5px;">${row[1]}</td>
        <td style="border: 1px solid black; padding: 5px;">${row[2]}</td>
        <td style="border: 1px solid black; padding: 5px;">${row[3]}</td>
        <td style="border: 1px solid black; padding: 5px;">${row[4]}</td>
        <td style="border: 1px solid black; padding: 5px;">${row[5]}</td>
      </tr>
    `
      )
      .join("")}
  </tbody>
</table>
`;
    await axios({
      method: "POST",
      url: "https://script.google.com/macros/s/AKfycbz1wMXWmHIAGpUeLsFpVIV2EjBTioYDdh1qRqs2MlikWb4MUXlDhqlM4pAYfpHhV9I_mA/exec",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      data: {
        email: formData.answers.find((a) => a.id == "1")?.fields[3].fieldValue,
        message: htmlMessage,
      },
    });
    setLoading(false);
    setEmailDialog(true);
  };

  return (
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
                {" "}
                {formData.answers &&
                  formData.answers.find((a) => a.id == "1")?.fields[4]
                    .fieldValue}
              </h3>
              <p className="text-sm">
                {formData?.calendarMonth
                  ? formData?.calendarMonth.split(" ")[1]
                  : formData?.date && formData.date.split(" ")[1]}
              </p>
            </div>
          </div>
          <div className="flex flex-row space-y-1 justify-between w-full mt-2 md:w-auto flex-wrap">
            <IconButton
              icon={EmailIcon}
              text="Email Calendar"
              onClick={sendCalendarEmail}
            />
            <IconButton
              icon={ReGenerateIcon}
              text="Generate next month"
              onClick={handleGenerateNextMonth}
            />
            <IconButton icon={EditIcon} text="Edit" onClick={handleEditClick} />
            <LogoutContainer />
          </div>
        </div>
        <div className="flex flex-col w-full p-2 text-center overflow-auto hide-scrollbar">
          <table className="w-full sm:text-xl">
            <thead>
              <tr>
                <th className="text-center align-middle border-2 border-black sm:py-4">
                  Date
                </th>
                <th className="text-center align-middle border-2 border-black sm:py-4">
                  Platform
                </th>
                <th className="text-center align-middle border-2 border-black sm:py-4">
                  Content
                </th>
                <th className="text-center align-middle border-2 border-black sm:py-4">
                  Caption
                </th>
                <th className="text-center align-middle border-2 border-black sm:py-4">
                  Visual
                </th>
                <th className="text-center align-middle border-2 border-black sm:py-4">
                  Hashtags
                </th>
              </tr>
            </thead>
            <tbody>
              {formData.calendar &&
                formData.calendar.slice(1).map((data, index) => (
                  <tr key={`${data[0]}_${index}`}>
                    <td className="text-center align-middle border-2 border-black sm:py-5 sm:px-2">
                      {data[0]}
                    </td>
                    <td className="text-center align-middle border-2 border-black sm:py-5 sm:px-2">
                      {data[1]}
                    </td>
                    <td className="text-center align-middle border-2 border-black sm:py-5 sm:px-2">
                      {data[2]}
                    </td>
                    <td className="text-center align-middle border-2 border-black sm:py-5 sm:px-2">
                      {data[3]}
                    </td>
                    <td className="text-center align-middle border-2 border-black sm:py-5 sm:px-2">
                      {data[4]?.includes("#") && !data[5] ? "" : data[4]}
                    </td>
                    <td className="text-center align-middle border-2 border-black sm:py-5 sm:px-2">
                      {data[4]?.includes("#") && !data[5]
                        ? data[4]
                        : data[5]
                        ? data[5]
                        : ""}
                    </td>
                  </tr>
                ))}
            </tbody>

            {/* <thead>
              <tr>
                <th className="text-center align-middle border-2 border-black py-4">
                  Date
                </th>
                <th className="text-center align-middle border-2 border-black py-4">
                  Platform
                </th>
                <th className="text-center align-middle border-2 border-black py-4">
                  Content
                </th>
                <th className="text-center align-middle border-2 border-black py-4">
                  Caption
                </th>
                <th className="text-center align-middle border-2 border-black py-4">
                  Visual
                </th>
                <th className="text-center align-middle border-2 border-black py-4">
                  Hashtags
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center align-middle border-2 border-black py-5 px-2">
                  06/01/2024
                </td>
                <td className="text-center align-middle border-2 border-black py-5 px-2">
                  Instagram
                </td>
                <td className="text-center align-middle border-2 border-black py-5 px-2">
                  Travel
                </td>
                <td className="text-center align-middle border-2 border-black py-5 px-2">
                  Beat the traffic and park stress-free near SoFi Stadium 🌟🚗🅿️
                  Here's how!
                </td>
                <td className="text-center align-middle border-2 border-black py-5 px-2">
                  Short clip showcasing easy parking reservations on the website
                </td>
                <td className="text-center align-middle border-2 border-black py-5 px-2">
                  #Travel #ParkingHacks #SoFiStadium
                </td>
              </tr>
            </tbody> */}
          </table>
        </div>
      </div>
      {loading && (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-green-500"></div>
        </div>
      )}
      {emailDialog && (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-10 flex flex-col justify-center items-center">
            <h2 className="text-2xl mb-4">Email sent successfully!</h2>
            <h3 className="mb-4">
              We&apos;ve sent the calendar to{" "}
              {formData.answers.find((a) => a.id == "1")?.fields[3].fieldValue}.
            </h3>
            <button
              className="bg-green-500 text-white rounded px-4 py-2"
              onClick={() => setEmailDialog(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
