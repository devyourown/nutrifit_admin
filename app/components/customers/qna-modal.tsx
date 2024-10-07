import React, { useEffect, useState } from "react";
import Pagination from "../pagination";
import { fetchQnasByUser } from "@/app/lib/api";
import QnaList from "./qnas";

interface QnAModalProps {
  customerId: number;
  onClose: () => void;
}

export default function QnAModal({ customerId, onClose }: QnAModalProps) {
    const [qnas, setQnas] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    async function fetchQnA(currentPage: number) {
        const data = await fetchQnasByUser(customerId, currentPage);
        setQnas(data.content);
        setTotalPages(data.page.totalPages);
    }
    
    useEffect(() => {
        fetchQnA(currentPage);
      }, [currentPage]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full h-auto max-h-full overflow-y-auto">
        <h2 className="text-2xl font-bold">Q&A for (ID : {customerId})</h2>
        <div>
        <QnaList qnas={qnas} />
        <Pagination
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={(page) => setCurrentPage(page)} 
      />
        </div>
        <button onClick={onClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          닫기
        </button>
      </div>
    </div>
  );
}
