import { format } from 'date-fns';
import React from 'react';

const Sidebar = ({ bookingDetails, onWeekReport, onDayReport }) => {
  console.log(bookingDetails)
  
  const roomsData = {};
  bookingDetails.roomForBookings !== undefined ? bookingDetails.roomForBookings.forEach(booking => {
    const { name } = booking.room;
    if (!roomsData[name]) {
      roomsData[name] = { name, dates: [] };
    }
    roomsData[name].dates.push(booking.date);
  }) : ""

  const addServicesWithDates = bookingDetails.additionalServiceForBookings !== undefined ? bookingDetails.additionalServiceForBookings.reduce((acc, service) => {
    const name = service.additionalService.name;
    const date = service.date;
    if(!acc[name]) {
      acc[name] = { name, dates: [] };
    }
    acc[name].dates.push(new Date(date));
    return acc;
  }, {}) : null;

  return (
    <aside className="w-1/4 bg-white flex flex-col shadow-lg border-r-4 border-orange-200">
      {/* Top bar matching the week selector in style */}
      <div className="bg-orange-200 flex justify-between items-center p-4 border-b border-gray-300">
        <button className="bg-white text-gray-700 hover:bg-orange-100 rounded px-4 py-2" onClick={onWeekReport}>
          Week Report
        </button>
        <button className="bg-white text-gray-700 hover:bg-orange-100 rounded px-4 py-2" onClick={onDayReport}>
          Day Report
        </button>
      </div>

      {/* Booking details */}
      <div className="p-4 overflow-y-auto">
        <h2 className="font-semibold text-lg mb-4">Booking Details</h2>
        {bookingDetails.customer !== undefined &&
          <div className="mb-2">
            <h3 className="text-sm font-semibold">Customer:</h3>
            <p className="text-sm">{bookingDetails.customer.firstName} {bookingDetails.customer.lastName}</p>
            <p className="text-sm">{bookingDetails.customer.email}</p>
            <p className="text-sm">{bookingDetails.customer.phone}</p>
            <p className="text-sm">{bookingDetails.customer.city} {bookingDetails.customer.postalCode}</p>
            <p className="text-sm">{bookingDetails.customer.address}</p>
            <p className="text-sm">Newsletter: {bookingDetails.customer.receiveNewsletter ? "Yes" : "No"}</p>
          </div>
        }
        {bookingDetails.numberOfPeople !== undefined &&
          <div className="mb-2">
            <h3 className="text-sm font-semibold">Number of guests:</h3>
            <p className="text-sm">{bookingDetails.numberOfPeople}</p>
          </div>
        }
        {bookingDetails.arrivalDate !== undefined &&
          <div className="mb-2">
            <h3 className="text-sm font-semibold">Arrival Date:</h3>
            <p className="text-sm">{format(new Date(bookingDetails.arrivalDate), "EEEE dd-MM-yyyy")}</p>
          </div>
        }
        {bookingDetails.departureDate !== undefined &&
          <div className="mb-2">
            <h3 className="text-sm font-semibold">Departure Date:</h3>
            <p className="text-sm">{format(new Date(bookingDetails.departureDate), "EEEE dd-MM-yyyy")}</p>
          </div>
        }
        {bookingDetails.paid !== undefined &&
          <div className="mb-2">
            <h3 className="text-sm font-semibold">Paid:</h3>
            <p className="text-sm">{bookingDetails.paid ? "Yes" : "No"}</p>
            <h3 className="text-sm font-semibold">ReservationTimeOut:</h3>
            <p className="text-sm">{bookingDetails.reservationTimeOut ? "Yes" : "No"}</p>
            <h3 className="text-sm font-semibold">Canceled:</h3>
            <p className="text-sm">{bookingDetails.canceled ? "Yes" : "No"}</p>
          </div>
        }
        {bookingDetails.comment !== undefined &&
          <div className="mb-2">
            <h3 className="text-sm font-semibold">Comment:</h3>
            <p className="text-sm">{bookingDetails.comment}</p>
          </div>
        }
        {bookingDetails.roomForBookings !== undefined &&
          <div className='my-2'>
            Rooms:
            <hr></hr>
            {Object.keys(roomsData).map((roomName, index) => (
              <div key={index}>
                <h2>{roomName}</h2>
              </div>
            ))}
            <hr></hr>
          </div>
        } 
        {addServicesWithDates !== null && addServicesWithDates !== undefined ? 
          <div className='my-2'>
            <h2>Additional Services:</h2>
            <hr></hr>
            {Object.values(addServicesWithDates).map((service) => (
              <div key={service.name}>
                <h3 className='text-sm font-semibold'>{service.name}</h3>
                <ul>
                  {service.dates.map((date, index) => (
                    <li key={index} className="text-sm">{format(date, "EEEE dd-MM-yyyy")}</li>
                  ))}
                </ul>
              </div>
            ))}
            <hr></hr>
          </div> : "" 
        }
      </div>
    </aside>
  );
};

export default Sidebar;