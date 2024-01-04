import 'react';
import { useState } from 'react';
import { IoPersonSharp } from 'react-icons/io5';
import './SearchRoomsRoomItem.css'

function SearchRoomsRoomItem({img, room, index, toggleRoomSelection}) {

    const [checked, setChecked] = useState(false);

    return (
        <div id="searchRoomsRoomItem" className='flex bg-gray-200 mx-4 my-3 border-2 border-orange-200 rounded-lg overflow-hidden shadow-md hover:border-orange-300 hover:border-2' onClick={(event) => {
            event.target.checked = !checked;
            toggleRoomSelection(event, index);
            setChecked(!checked);
        }}>
            <img id="searchRoomListItemImg" className='h-24 md:h-32 lg:h-32 xl:h-44' src={img}></img>
            <div className='ml-2 md:ml-4'>
                <div className='flex'>
                    <div className='flex items-center -mt-2 md:mt-0 w-full'>
                        <h1 className='whitespace-nowrap mt-2 w-fit lg:text-xl'><b>{room.name}</b></h1>
                        <p className='flex w-min -mb-3 ml-2 text-sm'></p>
                    </div>
                    <div className='flex text-sm md:text-base mt-[3px] sm:mt-1 md:mt-3'>
                        <div className='flex'>
                            <IoPersonSharp className='mt-[3px] md:mt-1 h-[0.9rem] w-[0.9rem] md:h-4 md:w-4'/>
                            <b>x{room.capacity}</b>
                        </div>
                        <span className='ml-2 mr-5 h-4 w-4 whitespace-nowrap'>
                            <b>DKK: {room.pricePerNight},-</b>
                        </span>
                    </div>
                </div>
                <p className='italic text-xs md:text-sm lg:text-sm xl:text-base pr-2 h-6'>{room.description}</p>
            </div>
            <input type="checkbox" checked={checked} onChange={(event) => {
                    toggleRoomSelection(event, index);
                    setChecked(!checked);
                }} className='h-6 w-6 mr-3 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:w-12 lg:h-12 lg:mr-6 ml-auto  my-auto focus:outline-none focus-visible:ring checked:bg-slate-500 shadow-md rounded bg-slate-300'></input>
        </div>
    )
}

export default SearchRoomsRoomItem;