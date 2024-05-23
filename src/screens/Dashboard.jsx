import UserIcon from "../assets/user-circle.svg";
import CalendarIcon from "../assets/calendar.svg";

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col h-[80%] w-[90%] md:w-[60%] bg-black opacity-75 rounded-3xl text-white">
        <div className="flex flex-row items-start justify-between p-4 ">
          <h3 className="text-3xl md:ml-10">Welcome</h3>
          <div className="flex flex-row">
            <button className="border-2 border-white text-center rounded-lg">
              start New
            </button>
            <button className="border-2 border-white text-center rounded-lg">
              Continue
            </button>
            <img src={UserIcon} className="w-10" />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full p-2 text-center">
          <table className="w-full">
            <tr>
              <th className="flex flex-row items-center justify-center py-10"><img src={CalendarIcon} className="w-10 mr-2" /> Calendar</th>
              <th>Month</th>
              <th>Brand</th>
              <th  className="md:w-[40%]">Action</th>
            </tr>
            <tr>
              <td className="flex flex-row items-center justify-center py-5">Data 1</td>
              <td>Data 2</td>
              <td>Data 3</td>
              <td>Data 4</td>
            </tr>
            <tr>
              <td className="flex flex-row items-center justify-center py-5">Data 5</td>
              <td>Data 6</td>
              <td>Data 7</td>
              <td>Data 8</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
