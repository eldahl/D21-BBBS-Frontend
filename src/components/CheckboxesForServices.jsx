import { useContext, useState } from 'react';
import { BookingContext } from './Booking/BookingFlow';

function CheckboxesForService ({addServiceKey}) {
    const { bookingData, addServiceCheckboxes: checkboxValues, setAddServiceCheckboxes: setCheckboxValues } = useContext(BookingContext);
    
    // Guard clause
    if(bookingData.arrival === undefined && bookingData.depart === undefined)
        return;
    
    const numberOfDays = Math.round(Math.abs((bookingData.arrival - bookingData.depart) / (24 * 60 * 60 * 1000)));
    const [internalCheckboxValues, setInternalCheckboxValues] = useState(
        Array(numberOfDays).fill(false)
    );

    const handleCheckboxChange = (position) => {
        const updatedCheckedState = internalCheckboxValues.map((item, index) =>
            index === position ? !item : item
        );
        setInternalCheckboxValues(updatedCheckedState);
        setCheckboxValues({ ...checkboxValues, [addServiceKey]: updatedCheckedState})
    };
    
    const checkboxes = internalCheckboxValues.map((item, index) => (    
        <div key={index} className='flex flex-col items-center'>
            <input className='mr-1 mt-1' id={`checkbox-${index}`} type='checkbox' name={`checkbox-${index}`} value={item} checked={item} onChange={(e) => { 
                handleCheckboxChange(index);
            }}/>
            <p>{new Date(bookingData.arrival.getUTCFullYear(), bookingData.arrival.getUTCMonth(), bookingData.arrival.getUTCDate() + index + 1).toUTCString().split(' ').slice(0, 3).join(' ')}</p>
        </div>

    ));
    
    return (
        <div className='flex items-center gap-4 mt-1 pb-2 px-2'>
            {checkboxes}
        </div>
    )
}
export default CheckboxesForService;