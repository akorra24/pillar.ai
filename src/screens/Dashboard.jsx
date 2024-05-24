import UserIcon from "../assets/user-circle.svg";
import CalendarIcon from "../assets/calendar.svg";
import PlusIcon from "../assets/plus.svg";
import ArchiveIcon from "../assets/trash.svg";
import EditIcon from "../assets/edit.svg";
import { clearUserData } from "../services/saveLogin";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "../components/IconButton";

const Dashboard = () => {
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    clearUserData();
    setShowLogout(false);
    navigate("/login");
  };

  const handleCalendarClick = () => {
    navigate("/calendar/1");
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col h-[80%] w-[90%] md:w-[60%] bg-black bg-opacity-75 rounded-3xl text-white">
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
              <tr>
                <td className="flex flex-row items-center justify-center py-5">
                  <button
                    className="border-2 border-green-500 text-center rounded-lg p-2 m-1"
                    onClick={handleCalendarClick}
                  >
                    View Calender 1
                  </button>
                </td>
                <td>April</td>
                <td>OpenAsphalt</td>
                <td className="flex flex-row items-center justify-center">
                  <img src={EditIcon} className="w-5 mr-2" />
                  <img src={ArchiveIcon} className="w-5" />
                </td>
              </tr>
              <tr>
                <td className="flex flex-row items-center justify-center py-5">
                  <button
                    className="border-2 border-green-500 text-center rounded-lg p-2 m-1"
                    onClick={handleCalendarClick}
                  >
                    View Calender 1
                  </button>
                </td>
                <td>April</td>
                <td>OpenAsphalt</td>
                <td className="flex flex-row items-center justify-center">
                  <img src={EditIcon} className="w-5 mr-2" />
                  <img src={ArchiveIcon} className="w-5" />
                </td>
              </tr>
              <tr>
                <td className="flex flex-row items-center justify-center py-5">
                  <button className="border-2 border-green-500 text-center rounded-lg p-2 m-1">
                    View Calender 1
                  </button>
                </td>
                <td>April</td>
                <td>OpenAsphalt</td>
                <td className="flex flex-row items-center justify-center">
                  <img src={EditIcon} className="w-5 mr-2" />
                  <img src={ArchiveIcon} className="w-5" />
                </td>
              </tr>
              <tr>
                <td className="flex flex-row items-center justify-center py-5">
                  <button className="border-2 border-green-500 text-center rounded-lg p-2 m-1">
                    View Calender 1
                  </button>
                </td>
                <td>April</td>
                <td>OpenAsphalt</td>
                <td className="flex flex-row items-center justify-center">
                  <img src={EditIcon} className="w-5 mr-2" />
                  <img src={ArchiveIcon} className="w-5" />
                </td>
              </tr>
              <tr>
                <td className="flex flex-row items-center justify-center py-5">
                  <button className="border-2 border-green-500 text-center rounded-lg p-2 m-1">
                    View Calender 1
                  </button>
                </td>
                <td>April</td>
                <td>OpenAsphalt</td>
                <td className="flex flex-row items-center justify-center">
                  <img src={EditIcon} className="w-5 mr-2" />
                  <img src={ArchiveIcon} className="w-5" />
                </td>
              </tr>
              <tr>
                <td className="flex flex-row items-center justify-center py-5">
                  <button className="border-2 border-green-500 text-center rounded-lg p-2 m-1">
                    View Calender 1
                  </button>
                </td>
                <td>April</td>
                <td>OpenAsphalt</td>
                <td className="flex flex-row items-center justify-center">
                  <img src={EditIcon} className="w-5 mr-2" />
                  <img src={ArchiveIcon} className="w-5" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
