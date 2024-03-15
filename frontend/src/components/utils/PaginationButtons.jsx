import React from 'react';
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";





const PaginationButtons = ({ page, onPrevPage, onNextPage }) => {




    return (

        <div className="flex flex-row justify-end pr-4 md:px-4 py-2 rounded-full">
            <button className='shadow-black bg-gray-800 shadow-sm px-2 py-1 rounded-l-full mx-1 active:bg-gray-900' onClick={onPrevPage}><FaLongArrowAltLeft /></button>
            <button className='shadow-black  bg-gray-800 shadow-sm px-2 py-1 rounded-r-full mx-1  active:bg-gray-900' onClick={onNextPage}><FaLongArrowAltRight /> </button>

        </div >
    )
}

export default PaginationButtons;
