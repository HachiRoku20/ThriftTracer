import React from 'react';
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";





const MonthlyFilterButtons = ({ monthQuery, yearQuery, onPreviousMonth, onNextMonth }) => {


    const getMonthName = (monthNum) => {
        return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][monthNum - 1];
    }

    return (

        <div className="flex flex-row justify-end px-2 py-2 rounded-full text-sm md:text-base md:px-4">
            <button className='shadow-black bg-gray-800 shadow-sm px-2 py-1 rounded-l-full mx-2 active:bg-gray-900' onClick={onPreviousMonth}><FaLongArrowAltLeft /></button>
            <h2 className='md:w-32 w-28'>{getMonthName(monthQuery) + " " + yearQuery}</h2>
            <button className='shadow-black  bg-gray-800 shadow-sm px-2 py-1 rounded-r-full mx-2 active:bg-gray-900' onClick={onNextMonth}><FaLongArrowAltRight /> </button>
        </div >
    )
}

export default MonthlyFilterButtons;