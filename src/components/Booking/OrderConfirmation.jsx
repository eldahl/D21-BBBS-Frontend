import 'react';
import { format } from 'date-fns';
import { useFetcher, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Spinner } from 'flowbite-react';

function OrderConfirmation() {

    let { order } = useParams();
    const [orderDetails, setOrderDetails] = useState(undefined);
    const [aggregateDetails, setAggregateDetails] = useState(undefined);
    const [fetchError, setFetchError] = useState(false);

    // Validate order input so we don't get XSS
    function isValidOrderFormat(value) {
        const regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
        return regex.test(value);
    }
    if(!isValidOrderFormat(order)) {
        order = "ERROR";
        // Redirect to error page
        return
    }

    const bookingData = {
        customer: {
            firstName: "asd",
            lastName: "asd",
            email: "asd@asd.dk",
            telephone: "12345678",
            country: "DK",
            city: "padborg",
            postalCode: "1234",
            address: "asd 123"
        }
    }

    function aggregateOrderItemsData(orderDetails) {

        let totalPrice = 0;

        const roomsData = orderDetails.roomForBookings.reduce((acc, item) => {
            const { id, name, pricePerNight } = item.room;
            if (!acc[id]) {
                acc[id] = { count: 0, pricePerNight: pricePerNight, totalPrice: 0, name: name };
            }
            acc[id].count += 1;
            acc[id].totalPrice += pricePerNight;
            totalPrice += pricePerNight;
            return acc;
        }, {});

        const servicesData = orderDetails.additionalServiceForBookings.reduce((acc, item) => {
            const { id, name, pricePerUnit } = item.additionalService;
            if (!acc[id]) {
                acc[id] = { count: 0, pricePerUnit: pricePerUnit, totalPrice: 0, name: name };
            }
            acc[id].count += 1;
            acc[id].totalPrice += pricePerUnit;
            totalPrice += pricePerUnit;
            return acc;
        }, {});

        return { servicesData, roomsData, totalPrice };
    }

    function fetchOrderInfo() { 
        fetch(import.meta.env.VITE_BACKEND_URL + "/Booking/GetOrderSummary", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({order: order}),
        }).then((res) => {
            if(res.status === 400) {
                // Error occurred, redirect to Error page
                setFetchError(true);
                return;
            }
            if(res.status !== 200) {
                setError(true);
                setErrorMsg("Server error!");
            }
            res.json().then((json) => {
                console.log(json)
                setOrderDetails(json);
                setAggregateDetails(aggregateOrderItemsData(json));
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
        fetchOrderInfo();
    }, []);

    return (
        <div className="flex justify-center h-screen overflow-auto bg-gray-100 px-6">
            <div className="bg-white mt-8 p-8 rounded h-fit shadow-lg w-full max-w-3xl">
            <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl font-bold">Summary of order</h1>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Print</button>
                </div>
                <div className="border-b-2 border-gray-200 mb-6"></div>
                {orderDetails !== undefined ?
                    <div>
                        <div className="mb-6">
                            <h2 className="font-bold mb-2">Booking Details</h2>
                            <p>Booking ID: {order}</p>
                            <p>Booking Date: {format(new Date(), 'dd. MMM yyyy')}</p>
                            <p>Number of people: {orderDetails.numberOfPeople}</p>
                            <p>Date of arrival: {format(new Date(orderDetails.arrivalDate), 'd. MMM EEEE')}</p>
                            <p>Date of departure: {format(new Date(orderDetails.departureDate), 'd. MMM EEEE')}</p>
                        </div>

                        <div className="mb-6">
                            <h2 className="font-bold mb-2">Customer Information</h2>
                            <p>Name: {orderDetails.customer.firstName} {orderDetails.customer.lastName}</p>
                            <p>Email: {orderDetails.customer.email}</p>
                            <p>Telephone: {orderDetails.customer.phone}</p>
                            {/* <p>Country: {orderDetails.customer.country}</p> */}
                            <p>City: {orderDetails.customer.city}</p>
                            <p>Postal Code: {orderDetails.customer.postalCode}</p>
                            <p>Address: {orderDetails.customer.address}</p>
                        </div>

                        <div className="mb-6">
                            <h2 className="font-bold mb-2">Order Items</h2>
                            {aggregateDetails.roomsData !== undefined && Object.keys(aggregateDetails.roomsData).map(key => {
                                    const room = aggregateDetails.roomsData[key];
                                    return (
                                        <div key={room.name} className="flex justify-between">
                                            <p>{room.count}x "{room.name}"</p>
                                            <p>{room.totalPrice},-</p>
                                        </div>
                                    )
                                })
                            }
                            <hr></hr>
                            {aggregateDetails.servicesData !== undefined && Object.keys(aggregateDetails.servicesData).map(key => {
                                    const service = aggregateDetails.servicesData[key];
                                    return (
                                        <div key={service.name} className="flex justify-between">
                                            <p>{service.count}x "{service.name}"</p>
                                            <p>{service.totalPrice},-</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <hr></hr>
                        <div className="flex justify-between font-bold">
                            <p>Total</p>
                            <p>{aggregateDetails.totalPrice},-</p>
                        </div>
                    </div> 
                    : fetchError ? 
                        <div className='w-full m-auto flex items-center justify-center'>
                            <span className='inline-flex items-center rounded-md bg-red-50 px-2 py-1 font-medium text-red-700 ring-1 ring-inset ring-red-600/10 text-lg'>
                                Error: Failed to fetch infomation for order.
                            </span>
                        </div> 
                        : 
                        <Spinner className='w-full m-auto' size="xl"/> 
                }
            </div>
        </div>
    );
};

export default OrderConfirmation
