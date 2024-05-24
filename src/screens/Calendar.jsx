import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import IconButton from "../components/IconButton";
import UserIcon from "../assets/user-circle.svg";
import ReGenerateIcon from "../assets/re-generate.svg";
import BackIcon from "../assets/left.svg";
import EditIcon from "../assets/edit.svg";
import { clearUserData } from "../services/saveLogin";
import LogoutContainer from "../components/LogoutContainer";

const Calendar = () => {
  const { id } = useParams();
  const [calendarData, setCalendarData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        const response = await fetch("path/to/calendar-data.json");
        const data = await response.json();
        setCalendarData(data);
      } catch (error) {
        console.error("Error fetching calendar data:", error);
      }
    };

    fetchCalendarData();
  }, []);

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
              <h3 className="text-3xl">OpenAsphalt</h3>
              <p className="text-sm">Calendar 1 April</p>
            </div>
          </div>
          <div className="flex flex-row space-x-5 justify-between w-full mt-2 md:w-auto">
            <IconButton icon={ReGenerateIcon} text="Generate next month" />
            <IconButton icon={EditIcon} text="Edit" />
            <LogoutContainer />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full p-2 text-center overflow-auto hide-scrollbar">
          <table className="w-full text-xl">
            <thead>
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
