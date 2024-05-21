import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Calendar = () => {
  const { id } = useParams();
  const [calendarData, setCalendarData] = useState(null);

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
      <h1 className="text-2xl font-bold mb-4">Calendar ID: {id}</h1>
      {calendarData ? (
        <div>{/* Render calendar data here */}</div>
      ) : (
        <p>Loading calendar data...</p>
      )}
    </div>
  );
};

export default Calendar;
