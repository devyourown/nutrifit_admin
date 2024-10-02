"use client";

import { useMemo } from "react";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {

    const handlePrevious = () => {
        if (currentPage > 0) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage + 1 < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const pageNumbers = useMemo(() => {
        const pages = [];
        for (let i = 0; i < totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    className={`px-2 py-1 text-sm font-semibold rounded-md 
                                ${i === currentPage ? 'bg-blue-500 text-white' : 'bg-white hover:bg-blue-200'}
                                focus:outline-none transition`}
                >
                    {i + 1}
                </button>
            );
        }
        return pages;
    }, [currentPage, totalPages, onPageChange]);

    return (
        <div className="flex justify-center items-center mt-6 space-x-4">
            <button
                onClick={handlePrevious}
                disabled={currentPage === 0}
                className={`px-4 py-2 text-white font-semibold rounded-md 
                            ${currentPage === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} 
                            focus:outline-none transition`}
            >
                <IoArrowBack/>
            </button>

            {pageNumbers}

            <button
                onClick={handleNext}
                disabled={currentPage + 1 >= totalPages}
                className={`px-4 py-2 text-white font-semibold rounded-md 
                            ${currentPage + 1 >= totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} 
                            focus:outline-none transition`}
            >
                <IoArrowForward/>
            </button>
        </div>
    );
};

