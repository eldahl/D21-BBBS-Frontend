import 'react';
import { format, addDays } from 'date-fns';
import { useContext, useEffect } from 'react';
import { AdminContext } from './Admin';

const Schedule = ({ selectedWeekNumber, year, startDateOfWeek, onWeekChange, scheduleData, onSelectBooking }) => {

  const {context, setContext } = useContext(AdminContext);

  const daysOfWeek = Array.from({ length: 7 }).map((_, i) => addDays(startDateOfWeek, i));

  useEffect(() => {
    const token = localStorage.getItem("token")
    if(token === null) {
      setContext(1)
    }
  }, []);
  
  return (
    <div className="flex flex-col flex-grow overflow-auto w-[80%]">
      <div className="bg-white flex justify-between items-center p-[0.9rem] border-y-2 border-orange-200 shadow-lg">
        <button className="text-gray-600 bg-orange-300 hover:bg-gray-300 rounded px-4 py-2" onClick={() => onWeekChange(-1)}>
          &lt;
        </button>
        <h2 className="text-xl font-semibold">Week {selectedWeekNumber} - {year}</h2>
        <button className="text-gray-600 bg-orange-300 hover:bg-gray-300 rounded px-4 py-2" onClick={() => onWeekChange(1)}>
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 divide-x divide-gray-200">
        {daysOfWeek.map((dayDate, index) => {
          const dayName = format(dayDate, 'EEEE');
          const dayNumber = format(dayDate, 'd. MMM');
          return (
            <div key={index} className="p-4">
              <div className="font-bold bg-orange-300 rounded text-center mb-2">
                {dayName}
                <br></br>
                {dayNumber}
              </div>
              {scheduleData
                .map((booking, bookingIndex) => {
                  const relevantRoomForBookings = booking.roomForBookings.filter(rfb => {
                    const bookingDate = new Date(rfb.date);
                    return bookingDate.getTime() === dayDate.getTime();
                  })

                  if(relevantRoomForBookings.length > 0){
                    return(
                      <div key={bookingIndex} 
                      className={`${booking.canceled ? "bg-gray-300" : booking.reservationTimeOut ? "bg-red-200" : "bg-white"} p-2 mb-2 text-sm hover:bg-orange-100 shadow-md rounded cursor-pointer break-words flex flex-col text-center`} 
                      onClick={() => onSelectBooking(booking)}
                      style={{}}>
                        <div className={`border-gray-300 border-b`}>
                          {booking.customer.firstName} {booking.customer.lastName}
                        </div>
                        <div>
                          <div className={`border-gray-300 border-b`}>
                            {booking.numberOfPeople || 0} guests
                          </div>
                          
                        </div>
                        
                        {relevantRoomForBookings.map((roomBooking, roomIndex) => (
                            <div key={roomIndex}>{roomBooking.room.name}</div>
                          ))}
                      </div>
                    );
                  }
                  return null;
                })
              }
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Schedule
