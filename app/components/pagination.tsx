"use client";

import { useMemo } from "react";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pageRange = 10; // 한 번에 보여줄 페이지 수

  const handlePrevious = () => {
    const previousPage = Math.floor((currentPage - 10) / pageRange) * pageRange;
    onPageChange(Math.max(0, previousPage));
  };

  const handleNext = () => {
    const nextPage = Math.floor((currentPage + pageRange) / pageRange) * pageRange;
    onPageChange(Math.min(totalPages - 1, nextPage));
  };

  const handlePageRange = () => {
    const start = Math.floor(currentPage / pageRange) * pageRange;
    const end = Math.min(start + pageRange, totalPages);

    return { start, end };
  };

  const pageNumbers = useMemo(() => {
    const { start, end } = handlePageRange();
    const pages = [];
    for (let i = start; i < end; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-2 py-1 text-sm font-semibold rounded-md 
                      ${i === currentPage ? "bg-blue-500 text-white" : "bg-white hover:bg-blue-200"}
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
        onClick={() => onPageChange(0)}
        disabled={currentPage === 0}
        className={`px-4 py-2 text-white font-semibold rounded-md 
                    ${currentPage === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"} 
                    focus:outline-none transition`}
      >
        {"<<"} 처음으로
      </button>
      {/* 이전 페이지로 */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 0}
        className={`px-4 py-2 text-white font-semibold rounded-md 
                    ${currentPage === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"} 
                    focus:outline-none transition`}
      >
        <IoArrowBack />
      </button>

      {/* 페이지 번호 */}
      {pageNumbers}

      {/* 다음 페이지로 */}
      <button
        onClick={handleNext}
        disabled={currentPage + 1 >= totalPages}
        className={`px-4 py-2 text-white font-semibold rounded-md 
                    ${currentPage + 1 >= totalPages ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"} 
                    focus:outline-none transition`}
      >
        <IoArrowForward />
      </button>
      <button
        onClick={() => onPageChange(totalPages - 1)}
        disabled={currentPage + 1 >= totalPages}
        className={`px-4 py-2 text-white font-semibold rounded-md 
                    ${currentPage + 1 >= totalPages ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"} 
                    focus:outline-none transition`}
      >
        끝으로 {">>"}
      </button>
    </div>
  );
}

