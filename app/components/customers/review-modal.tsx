import React, { useEffect, useState } from "react";
import ReviewList from "./reviews";
import Pagination from "../pagination";
import { deleteReview, fetchReviewsByUser } from "@/app/lib/api";

interface ReviewModalProps {
  customerId: number;
  onClose: () => void;
}

export default function ReviewModal({ customerId, onClose }: ReviewModalProps) {
    const [reviews, setReviews] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const handleDeleteReview = async (reviewId: number) => {
        const data = await deleteReview(reviewId);
        alert(data);
    } 

    async function fetchReviews(page: number) {
        const data = await fetchReviewsByUser(customerId, page);
        setReviews(data.content);
        setTotalPages(data.page.totalPages);
    }

    useEffect(() => {
        fetchReviews(currentPage);
    }, [currentPage])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <ReviewList reviews={reviews} onDeleteReview={handleDeleteReview}/>
        <Pagination
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={(page) => setCurrentPage(page)} 
      />
        <button onClick={onClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          닫기
        </button>
      </div>
    </div>
  );
}
