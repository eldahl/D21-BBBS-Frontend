import { useContext, useEffect, useState } from 'react';
import { BookingContext } from './BookingFlow';
import BookingFlowSidebar from '../BookingFlowSidebar';
import { Button, Checkbox, Datepicker, Label, TextInput, Textarea } from 'flowbite-react';
import OrderSummarySideBarList from '../OrderSummarySideBarList';
import CheckboxesForService from '../CheckboxesForServices';
import { useNavigate } from 'react-router-dom';
import './AdditionalServicesAndInfoPage.css'

function AddtionalServicesAndInfoPage() {
    // State management
    const { addServicesData, setAddServicesData, addServiceCheckboxes, bookingData, setBookingData, selectedRoomsList, setError, setErrorMsg } = useContext(BookingContext);
    
    // UI State
    const [sidebarShow, setSidebarShow] = useState(true);

    // Data fields
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [country, setCountry] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [telephone, setTelephone] = useState("");
    const [comment, setComment] = useState("");
    const [receiveNewsletter, setReceiveNewsletter] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);

    // Navigate
    const navigate = useNavigate();

    function fetchAdditionalServices() {
        fetch(import.meta.env.VITE_BACKEND_URL + "/Booking/GetAvailableServices").then((res) => {
            res.json().then((json) => {
                setAddServicesData(json);
            })
        })
    }

    function isInformationFilledOut() {
        return  firstName   !== "" &&
                lastName    !== "" &&
                email       !== "" &&
                country     !== "" &&
                postalCode  !== "" &&
                city        !== "" &&
                street      !== "" &&
                telephone   !== "" &&
                acceptTerms != false
    }

    function postBooking() {
        if(!isInformationFilledOut()) {
            return;
        }

        // Collect Rooms
        const rooms = [];
        for(let [key, value] of selectedRoomsList) {
            rooms.push({name: value.name, id: value.id});
        }

        // Collect Additional Services
        const addServices = [];
        Object.keys(addServiceCheckboxes).forEach((key) => {
            for(let addSer of addServicesData) {
                if(addSer.id == key) {
                    addServices.push({name: addSer.name, id: key, days: addServiceCheckboxes[key]});
                }
            }
        })

        setBookingData({ 
                ...bookingData,
                customer: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    country: country,
                    postalCode: postalCode,
                    city: city,
                    address: street,
                    telephone: telephone,
                    receiveNewsletter: Boolean(receiveNewsletter),
                },
                rooms: rooms,
                addServices: addServices
        });

        const body = JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
            country: country,
            postalCode: postalCode,
            city: city,
            address: street,
            telephone: telephone,
            receiveNewsletter: Boolean(receiveNewsletter),
            bookingData: {
                rooms: rooms,
                arrivalDate: bookingData.arrival,
                departureDate: bookingData.depart,
                numberOfPeople: bookingData.numberOfGuests,
                addServices: addServices,
                comment: comment
            }
        });

        console.log(body)

        fetch(import.meta.env.VITE_BACKEND_URL + "/Booking/PlaceReservation", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: body,
        }).then((res) => {
            if(res.status === 400) {
                // Error occurred, redirect to Error page
                return;
            }
            if(res.status !== 200) {
                setError(true);
                setErrorMsg("Server error!");
            }
            res.json().then((json) => {
                // Query backend for order nr, and redirect to order summary page.
                console.log(json)
                navigate(`summary/${json}`);
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

    useEffect(() => {
        fetchAdditionalServices();
    }, []);

    return (
        <div className='flex'>
            <BookingFlowSidebar show={sidebarShow} setShow={setSidebarShow} butColor={"bg-orange-200"} bgColor={"bg-orange-50"}>
                <div className='flex flex-col justify-between overflow-auto h-screen'>
                    <div>
                        <div className='mx-4 mt-2 mb-6'>
                            <div className='flex gap-2'>
                                <div>
                                    <Label value='First name:'></Label>
                                    <TextInput placeholder='' value={firstName} onChange={(e) => { setFirstName(e.target.value) }} sizing="sm" type="text" ></TextInput>
                                </div>
                                <div>
                                    <Label value='Last name:'></Label>
                                    <TextInput placeholder='' value={lastName} onChange={(e) => { setLastName(e.target.value) }} sizing="sm" type="text" ></TextInput>
                                </div>
                            </div>
                            <div>
                                <Label value='Email:'></Label>
                                <TextInput placeholder='' value={email} onChange={(e) => { setEmail(e.target.value) }} sizing="sm" type="text" className=''></TextInput>
                            </div>
                            <div>
                                <Label value='Country:'></Label>
                                <TextInput placeholder='' value={country} onChange={(e) => { setCountry(e.target.value) }} sizing="sm" type="text" className=''></TextInput>
                            </div>
                            <div className='flex gap-2'>
                                <div className='basis-1/3'>
                                    <Label value='Postal code:'></Label>
                                    <TextInput placeholder='' value={postalCode} onChange={(e) => { setPostalCode(e.target.value) }} sizing="sm" type="text" className=''></TextInput>
                                </div>
                                <div className='basis-2/3'>
                                    <Label value='City:'></Label>
                                    <TextInput placeholder='' value={city} onChange={(e) => { setCity(e.target.value) }} sizing="sm" type="text" className=''></TextInput>
                                </div>
                            </div>
                            <div>
                                <Label value='Street:'></Label>
                                <TextInput placeholder='' value={street} onChange={(e) => { setStreet(e.target.value) }} sizing="sm" type="text" className=''></TextInput>
                            </div>
                            <div>
                                <Label value='Telephone:'></Label>
                                <TextInput placeholder='' value={telephone} onChange={(e) => { setTelephone(e.target.value) }} sizing="sm" type="text" className='text-sm'></TextInput>
                            </div>
                            <div>
                                <Label value='Comments:'></Label>
                                <Textarea placeholder='' value={comment} onChange={(e) => { setComment(e.target.value) }}  type="text" className='text-xs'></Textarea>
                            </div>
                        </div>
                    </div>
                    <OrderSummarySideBarList />
                    <div className='flex flex-col items-center mt-6 mb-8'>
                        <div className='flex flex-col mb-2'>
                            <div className='flex items-center'>
                                <Checkbox value={receiveNewsletter} onChange={(e) => { setReceiveNewsletter(e.target.value) }}></Checkbox>
                                <p className='ml-1 text-sm'>I want to receive Iller Slot's newsletter.</p>
                            </div>
                            <div className='flex items-center'>
                                <Checkbox value={acceptTerms} onChange={(e) => { setAcceptTerms(e.target.value) }}></Checkbox>
                                <p className='ml-1 text-sm'>I agree to the Terms of Booking.</p>
                            </div>
                        </div>
                        <Button className='' onClick={() => postBooking()}>Confirm Booking</Button>
                    </div>
                </div>
            </BookingFlowSidebar>
            <div id="contentSidebars" className="w-full px-0 md:px-24 lg:px-0 xl:px-12 2xl:px-24 bg-slate-200 h-screen">
                <div className="bg-orange-50 py-2 h-screen shadow-md">
                    <div className=''>
                        {addServicesData.map((as, index) => {
                            return (
                                <div id="additionalServiceItem" key={index} className='flex bg-gray-200 mx-4 my-3 border-2 border-orange-200 rounded-lg shadow-md overflow-hidden'>
                                    <div className=''>
                                        <img src={as.thumbnailImagePath} className='h-24 md:h-32 lg:h-32 xl:h-44'></img>
                                    </div>
                                    <div className='ml-4'>
                                        <div className=''>
                                            <h1 className='mt-2 text-lg'><b>{as.name} | {as.pricePerUnit},- per antal.</b></h1>
                                            <p className='text-small'>{as.description}</p>
                                        </div>
                                        <CheckboxesForService addServiceKey={as.id} />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddtionalServicesAndInfoPage
