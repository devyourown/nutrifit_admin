import { PointTransactionDto, PointTransactionType } from '@/app/lib/types';
import Pagination from '../pagination';
import { useEffect, useState } from 'react';
import { fetchPointTransactionsByUser } from '@/app/lib/api';

interface PointTransactionListProps {
  customerId: number;
}

export default function PointTransactionList({
  customerId
}: PointTransactionListProps) {
    const [transactions, setTransactions] = useState<PointTransactionDto[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    async function fetchTransactions(page: number) {
        const data = await fetchPointTransactionsByUser(customerId, page);
        setTransactions(data.content);
        setTotalPages(data.page.totalPages);
    }

    useEffect(() => {
        fetchTransactions(currentPage);
    }, [currentPage])
    
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-semibold mb-4">포인트 거래 내역</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">유형</th>
            <th className="px-4 py-2 border-b">설명</th>
            <th className="px-4 py-2 border-b">사용될 날짜</th>
            <th className="px-4 py-2 border-b">포인트</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border-b text-center">{PointTransactionType[transaction.type]}</td>
              <td className="px-4 py-2 border-b text-center">{transaction.description}</td>
              <td className="px-4 py-2 border-b text-center">{transaction.whenToBurn?.toLocaleString()}</td>
              <td className="px-4 py-2 border-b text-center">{transaction.point}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={(page) => setCurrentPage(page)} 
      />
    </div>
  );
};
