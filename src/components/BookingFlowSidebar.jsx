import 'react';
import { useState } from 'react';

function BookingFlowSidebar({children, show, setShow, bgColor, butColor}) {
    
    return (
        <div className={`flex pointer-events-none fixed lg:relative `}>
            <aside className={`flex relative flex-col pointer-events-auto ${bgColor} border-r-4 border-orange-200 border-solid top-0 left-0 w-72 sm:w-96 h-screen transition-transform ${!show ? "-translate-x-full lg:translate-x-0" : ""}`}>
                
                <img src='logo.png'></img>
                <h2 className='m-auto text-lg mb-3'><b>Bed & Breakfast</b></h2>
                <hr className='border-black border-1 w-[80%] m-auto mb-2'></hr>
                {children}
                
                <button className={`lg:hidden absolute pointer-events-auto top-0 -right-8 h-8 w-8 ${butColor}`} onClick={() => {
                    setShow(!show);
                }}>
                    <b className='text-lg ml-1'>{show === false ? ">" : "<"}</b>
                </button>
            </aside>
        </div>
    )
}

export default BookingFlowSidebar;