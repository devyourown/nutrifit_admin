import { ReviewDto } from "@/app/lib/types";
import { useState } from "react";

interface ReviewListProps {
  reviews: ReviewDto[];
  onDeleteReview: (reviewId: number, reason: string) => void; // 리뷰 삭제 핸들러
}

export default function ReviewList({ reviews, onDeleteReview }: ReviewListProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState<number | null>(null);
  const [deleteReason, setDeleteReason] = useState("");

  const handleOpenModal = (reviewId: number) => {
    setSelectedReviewId(reviewId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReviewId(null);
    setDeleteReason("");
  };

  const handleConfirmDelete = () => {
    if (selectedReviewId !== null) {
      onDeleteReview(selectedReviewId, deleteReason);
      handleCloseModal();
    }
  }
  return (
    <div className="mt-4">
      <h3 className="text-xl font-semibold">리뷰 목록:</h3>
      <div className="mt-2">
        {reviews.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">ID</th>
                <th className="px-4 py-2 border-b">사용자</th>
                <th className="px-4 py-2 border-b">평점</th>
                <th className="px-4 py-2 border-b">코멘트</th>
                <th className="px-4 py-2 border-b">작성일</th>
                <th className="px-4 py-2 border-b">작업</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review.id}>
                  <td className="px-4 py-2 border-b text-center">{review.id}</td>
                  <td className="px-4 py-2 border-b text-center">{review.username}</td>
                  <td className="px-4 py-2 border-b text-center">{review.rating}</td>
                  <td className="px-4 py-2 border-b text-center">{review.comment || "No comment"}</td>
                  <td className="px-4 py-2 border-b text-center">{review.createdAt.toLocaleString()}</td>
                  <td className="px-4 py-2 border-b text-center">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                      onClick={() =>  handleOpenModal(review.id)}
                    >
                      삭제하기
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">리뷰가 없습니다.</p>
        )}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">리뷰 삭제</h2>
            <p className="mb-4">삭제 사유를 입력해 주세요:</p>
            <textarea
              className="w-full p-2 border rounded mb-4"
              placeholder="삭제 사유"
              value={deleteReason}
              onChange={(e) => setDeleteReason(e.target.value)}
            ></textarea>
            <div className="flex justify-end">
              <button
                onClick={handleCloseModal}
                className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
              >
                취소
              </button>
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                삭제 확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
