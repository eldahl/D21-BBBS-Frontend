import 'react';
import { useContext, useEffect, useState } from 'react';
import { BookingContext } from './BookingFlow';
import { Button, Datepicker, Label, Spinner, TextInput } from 'flowbite-react';
import SearchRoomsRoomItem from '../SearchRoomsRoomItem';
import OrderSummarySideBarList from '../OrderSummarySideBarList';
import BookingFlowSidebar from '../BookingFlowSidebar';
import "./RoomSelectionPage.css"

const testImg = "data:image/png;base64,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";

function RoomSelectionPage() {
    const {context, setContext, selectedRoomsList, setSelectedRoomsList, bookingData, setBookingData, setError, setErrorMsg } = useContext(BookingContext);
    
    // Data from backend
    const [roomData, setRoomData] = useState(null);    
    
    // Input fields
    const [amountGuests, setAmountGuests] = useState(1);
    const [checkInDate, setCheckInDate] = useState(new Date());
    const [checkOutDate, setCheckOutDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1));

    // UI State
    const [sidebarShow, setSidebarShow] = useState(true);
    const [didFetchRooms, setDidFetchRooms] = useState(false);

    function toggleRoomSelection(event, index) {
        // Add checked room to the map
        if(event.target.checked === true) {
            const newRoomsSelection = new Map(selectedRoomsList)
            newRoomsSelection.set(index, roomData[index])
            setSelectedRoomsList(newRoomsSelection);
        } 
        // Remove unchecked room from map
        else {
            const newRoomsSelection = new Map(selectedRoomsList)
            newRoomsSelection.delete(index)
            setSelectedRoomsList(newRoomsSelection)
        }
    }

    function fetchRooms() {
        if(checkInDate > checkOutDate)
            return;

        // Change to loading animation instead of message asking for input
        setDidFetchRooms(true);

        const arrive = toTimezoneIndependantDate(checkInDate);
        const depart = toTimezoneIndependantDate(checkOutDate);
        
        console.log("ENV:" + import.meta.env.VITE_BACKEND_URL)

        fetch(import.meta.env.VITE_BACKEND_URL + "/Booking/GetAvailableRoomsForDates", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                arrivalDate: arrive,
                departureDate: depart,
                amountOfGuests: Number(amountGuests)
            }),
        }).then((res) => {
            if(res.status === 400) {
                console.log("Not enough room");
                return;
            }
            if(res.status !== 200) {
                setError(true);
                setErrorMsg("Server error!");
            }
            res.json().then((json) => {
                console.log(json)
                setRoomData(json);
            })
            .catch((error) => { 
                setError(true);
                setErrorMsg(error);
             });
        })
        .catch((error) => {
            setError(true);
            setErrorMsg(error);
        });
    }

    function toTimezoneIndependantDate(date) {
        return new Date(Date.UTC(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
        ));
    }

    function checkIfCanAccomodateGuests() {
        let sumCapacity = 0;
        selectedRoomsList.forEach((room) => {
            sumCapacity += room.capacity;
        });

        if(amountGuests <= sumCapacity)
            return true;
        else
            return false;
    }

    function selectRooms() {
        if(!checkIfCanAccomodateGuests())
            return;

        setBookingData({ 
            arrival: toTimezoneIndependantDate(checkInDate),
            depart: toTimezoneIndependantDate(checkOutDate),
            numberOfGuests: amountGuests,
        });
        
        setContext(2)
    }

    return (
        <div className='flex'>
            <BookingFlowSidebar show={sidebarShow} setShow={setSidebarShow} butColor={"bg-orange-200"} bgColor={"bg-orange-50"}>
                <div className='flex flex-col justify-between overflow-auto h-screen'>
                    <div>
                        <div className='mx-4 mt-2 mb-4'>
                            <Label value='Number of people:' className=''></Label>
                            <TextInput placeholder='1-24' size={"sm"} type="number" value={amountGuests} onChange={(e) => { 
                                if(e.target.value >= 1 && e.target.value <= 24) 
                                    setAmountGuests(e.target.value)
                                }} required={true} className='w-1/3 mt-1 shadow'></TextInput>
                            <Label value='Check-In:' className=''></Label>
                            
                            <Datepicker className='mt-1 shadow' value={checkInDate.toLocaleDateString()} onSelectedDateChanged={(date) => {setCheckInDate(date)}}></Datepicker>
                            <Label value='Check-Out:' className=''></Label>
                            <Datepicker className='mt-1 shadow' value={checkOutDate.toLocaleDateString()} onSelectedDateChanged={(date) => {setCheckOutDate(date)}}></Datepicker>
                        </div>
                        <div className='flex flex-col gap-2 items-center'>
                            {checkInDate > checkOutDate ? <p className="inline-flex items-center shadow rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">Check-in cannot be after check-out or on the same day!</p> : ""}
                            {checkIfCanAccomodateGuests() ? <p className='rounded-md shadow bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20'>There is room for all guests in the selected rooms!</p> : <p className="inline-flex items-center shadow rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">Please select rooms for all guests!</p>}
                            
                            <Button onClick={() => { fetchRooms() }} className='w-1/2 h-9 shadow-md'>
                                Search for room(s)
                            </Button>
                            <Button onClick={() => { selectRooms() }} className='w-1/3s shadow-md'>
                                Select room(s)
                            </Button>
                        </div>
                    </div>
                    <OrderSummarySideBarList />
                </div>
            </BookingFlowSidebar>
            <div id="contentSidebars" className="w-full px-0 md:px-24 lg:px-0 xl:px-12 2xl:px-24 bg-slate-200 h-screen">
                <div className="bg-orange-50 py-2 h-screen overflow-auto shadow-xl">
                    {(roomData === null || roomData === undefined) ? 
                    <div className='flex items-center justify-center mt-6'>
                        {didFetchRooms ? <Spinner size="xl"/> : 
                            <div className='text-center text-2xl'>
                                Please select arrival, departure, and amount of guests,<br></br>to see available rooms!
                            </div>
                        }
                    </div> 
                    : roomData.map((room, index) => {
                        return (
                            <SearchRoomsRoomItem key={index} img={room.thumbnailImagePath} room={room} index={index} toggleRoomSelection={toggleRoomSelection}></SearchRoomsRoomItem>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
export default RoomSelectionPage