import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import IconButton from "../components/IconButton";
import UserIcon from "../assets/user-circle.svg";
import PlusIcon from "../assets/plus.svg";
import ArchiveIcon from "../assets/trash.svg";
import { clearUserData } from "../services/saveLogin";

const Calendar = () => {
  const { id } = useParams();
  const [calendarData, setCalendarData] = useState(null);

  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    clearUserData();
    setShowLogout(false);
    navigate("/login");
  };

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
          <h3 className="text-3xl md:ml-10">Welcome</h3>
          <div className="flex flex-row space-x-5 justify-between w-full mt-2 md:w-auto">
            <IconButton icon={PlusIcon} text="start New" />
            <IconButton icon={ArchiveIcon} text="Archive" />
            <div className="relative">
              <img
                src={UserIcon}
                className="w-10 cursor-pointer"
                onClick={() => setShowLogout(!showLogout)}
              />
              {showLogout && (
                <div className="absolute top-full right-0 bg-white p-2 rounded-lg shadow-lg">
                  <button
                    className="text-white bg-red-500 hover:bg-red-700 px-4 py-2 rounded transition duration-200 ease-in-out"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full p-2 text-center overflow-auto hide-scrollbar">
          <table className="w-full text-xl">
            <thead>
              <tr>
                <th className="text-center align-middle border-2 border-black py-4">Date</th>
                <th className="text-center align-middle border-2 border-black py-4">Platform</th>
                <th className="text-center align-middle border-2 border-black py-4">Content</th>
                <th className="text-center align-middle border-2 border-black py-4">Caption</th>
                <th className="text-center align-middle border-2 border-black py-4">Visual</th>
                <th className="text-center align-middle border-2 border-black py-4">Hashtags</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center align-middle border-2 border-black py-5 px-2">06/01/2024</td>
                <td className="text-center align-middle border-2 border-black py-5 px-2">Instagram</td>
                <td className="text-center align-middle border-2 border-black py-5 px-2">Travel</td>
                <td className="text-center align-middle border-2 border-black py-5 px-2">
                  Beat the traffic and park stress-free near SoFi Stadium 🌟🚗🅿️
                  Here's how!
                </td>
                <td className="text-center align-middle border-2 border-black py-5 px-2"> 
                  Short clip showcasing easy parking reservations on the website
                </td>
                <td className="text-center align-middle border-2 border-black py-5 px-2">#Travel #ParkingHacks #SoFiStadium</td>
              </tr>   
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
