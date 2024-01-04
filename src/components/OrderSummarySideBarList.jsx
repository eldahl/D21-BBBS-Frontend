import { useContext, useState } from "react";
import { BookingContext } from "./Booking/BookingFlow";

function OrderSummarySideBarList() {
    const { selectedRoomsList, addServicesData, addServiceCheckboxes: checkboxValues } = useContext(BookingContext);

    function getSumOfSelectedRooms() {
        let sum = 0
        selectedRoomsList.forEach((room, key) => sum += room.pricePerNight)
        return sum
    }

    function getTotalPriceAdditionalServices() {
        let totalPrice = 0
        Object.keys(checkboxValues).map((key, i) => {
            let numberOfDays = 0;
            checkboxValues[key].map((checkboxValue, index) => {
                numberOfDays += checkboxValue === true ? 1 : 0;
            })
    
            let price = 0;
            addServicesData.map((asObj, index) => {
                if(asObj.id == key) {
                    price = asObj.pricePerUnit * numberOfDays
                }   
            })
            totalPrice += price;
        })
        return totalPrice
    }

    function additionalServices() {

        function OneService(key) {            
            let numberOfDays = 0;
            checkboxValues[key].map((checkboxValue, index) => {
                numberOfDays += checkboxValue === true ? 1 : 0;
            })

            let price = 0;
            let returnObj = {};
            addServicesData.map((asObj, index) => {
                if(asObj.id == key) {
                    price = asObj.pricePerUnit * numberOfDays
                    returnObj = { ...asObj }
                }   
            })
            return { numberOfDays: numberOfDays, price: price, asObj: returnObj }
        }
        
        return (
            <div>
                {Object.keys(checkboxValues).map((key, i) => {
                    const {numberOfDays, price, asObj} = OneService(key)
                    return numberOfDays !== 0 ? <div key={i} className='flex justify-between'><p>{numberOfDays}x {asObj.name}</p><p>{price},-</p></div> : ""
                })}
            </div>
        )
    }

    return (
        <>
            <div className='border-t-2 border-black h-full mt-8'>
                <div className='flex flex-col mx-4 overflow-auto'>
                {[... selectedRoomsList].map(([key, room], index) => {
                        return (
                            <div key={index} className='flex justify-between'>
                                <p>{room.name}</p><p>{room.pricePerNight},-</p>
                            </div>
                        )
                    })}
                    {selectedRoomsList.size !== 0 && <div className="border-t-2 border-dotted border-black"></div>}
                    {additionalServices()}
                </div>
            </div>
            <div className='flex justify-between mx-4 border-t-2 border-black'>
                <p>Total: </p>
                <p>{getSumOfSelectedRooms() + getTotalPriceAdditionalServices( )},-</p>
            </div>
        </>
    )
}

export default OrderSummarySideBarList;