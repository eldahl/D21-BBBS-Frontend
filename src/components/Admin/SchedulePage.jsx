import React, { useEffect, useState, useContext } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Schedule from './Schedule';
import { getWeek, startOfWeek, endOfWeek, addWeeks, addDays } from 'date-fns';
import { da } from 'date-fns/locale';
import { AdminContext } from './Admin';


const SchedulePage = () => {
  const [selectedWeekOffset, setSelectedWeekOffset] = useState(0);
  const [selectedBooking, setSelectedBooking] = useState(null);
  
  const {context, setContext } = useContext(AdminContext);

  // Holds schedule data fetched for each week
  const [scheduleData, setScheduleDate] = useState([]);
  
  const getStartOfWeek = (date) => {
    return startOfWeek(date, { weekStartsOn: 1, locale: da });
  };

  const getEndOfWeek = (date) => {
    return endOfWeek(date, { weekStartsOn: 1, locale: da });
  };

  const getCurrentWeekNumber = (date) => {
    return getWeek(date, { locale: da });
  };

  // Calculate the start, middle, and end date of the selected week
  const startDateOfWeek = getStartOfWeek(addWeeks(new Date(), selectedWeekOffset));
  const middleDateOfWeek = addDays(startDateOfWeek, 3); // Middle of the week (Wednesday)
  const endDateOfWeek = getEndOfWeek(addWeeks(new Date(), selectedWeekOffset));

  const handleWeekChange = (increment) => {
    setSelectedWeekOffset((currentOffset) => currentOffset + increment);
  };

  function fetchBookingsForWeek () {
    const body = JSON.stringify({
      startDate: startDateOfWeek,
      endDate: endDateOfWeek
    });

    fetch(import.meta.env.VITE_BACKEND_URL + "/Admin/GetScheduleBookingsForPeriod", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`, 
          'Content-Type': 'application/json'
        },
        body: body,
    }).then((res) => {
        if(res.status === 400) {
            return;
        }
        // Unauthorized
        if(res.status === 401) {
          localStorage.removeItem('token');
          setContext(1)
          return;
      }
        if(res.status === 200) {
          res.json().then((json) => {
            setScheduleDate(json);
            //console.log(json)
          })
        }
    })
  }

  useEffect(() => {
    // Fetch bookings for the week that is displayed
    fetchBookingsForWeek();
  }, [selectedWeekOffset]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-grow overflow-hidden">
        <Sidebar bookingDetails={selectedBooking || {}} />
        <Schedule 
          selectedWeekNumber={getCurrentWeekNumber(startDateOfWeek)}
          year={middleDateOfWeek.getFullYear()}
          startDateOfWeek={startDateOfWeek}
          onWeekChange={handleWeekChange}
          scheduleData={scheduleData}
          onSelectBooking={setSelectedBooking}
        />
      </div>
    </div>
  );
};

export default SchedulePage;