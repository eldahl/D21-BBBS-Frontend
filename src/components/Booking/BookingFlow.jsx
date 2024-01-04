import 'react';
import { createContext, useEffect, useState } from 'react';
import RoomSelectionPage from './RoomSelectionPage';
import AddtionalServicesAndInfoPage from './AddtionalServicesAndInfoPage';

export const BookingContext = createContext({
    context: 1,
    setContext: () => {}, 
    selectedRoomsList: new Map(), 
    setSelectedRoomsList: () => {},
    bookingData: {},
    setBookingData: () => {},
    addServicesData: {},
    setAddServicesData: () => {},
    addServiceCheckboxes: {},
    setAddServiceCheckboxes: () => {},
    error: false,
    setError: () => {},
    errorMsg: "",
    setErrorMsg: () => {}
});

function BookingFlow() {
    // Values of Booking context
    const [context, setContext] = useState(1);
    const [selectedRoomsList, setSelectedRoomsList] = useState(new Map());
    const [bookingData, setBookingData] = useState({});
    const [addServicesData, setAddServicesData] = useState([]);
    const [addServiceCheckboxes, setAddServiceCheckboxes] = useState({});
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    
    // Create composite value for provider
    const contextValue = { 
        context, 
        setContext, 
        selectedRoomsList, 
        setSelectedRoomsList, 
        bookingData, 
        setBookingData,
        addServicesData,
        setAddServicesData,
        addServiceCheckboxes, 
        setAddServiceCheckboxes,
        error,
        setError,
        errorMsg,
        setErrorMsg
    };

    useEffect(() => {
        if(error === true) {
            throw new Error(errorMsg);
        }
    }, [error]);

    return (
        <div className="">
            <BookingContext.Provider value={contextValue}>
                { context === 1 && <RoomSelectionPage /> }
                { context === 2 && <AddtionalServicesAndInfoPage /> }
            </BookingContext.Provider>
        </div>
    )
}

export default BookingFlow
