import { fetchPaymentsByUser } from "@/app/lib/api";
import { useEffect, useState } from "react";
import Pagination from "../pagination";
import PaymentList from "./payments";

interface PaymentListModalProps {
  customerId: number;
  onClose: () => void;
}

export default function PaymentListModal({ customerId, onClose }: PaymentListModalProps) {
    const [payments, setPayments] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    async function fetchPayments(currentPage: number) {
        const data = await fetchPaymentsByUser(customerId, currentPage);
        setPayments(data.content);
        setTotalPages(data.page.totalPages);
    }
    
    useEffect(() => {
        fetchPayments(currentPage);
      }, [currentPage]);
    
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full h-auto max-h-full overflow-y-auto">
        <h2 className="text-2xl font-bold">결제 목록 (ID: {customerId})</h2>
        <div>
        <PaymentList payments={payments} />
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
