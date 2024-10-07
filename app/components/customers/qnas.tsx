import { QnADto } from '@/app/lib/types';
import React from 'react';

interface QnaListProps {
  qnas: QnADto[];
}

export default function QnaList({ qnas }: QnaListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              상품 이름
            </th>
            <th className="px-4 py-2 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              질문
            </th>
            <th className="px-4 py-2 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              질문 날짜
            </th>
            <th className="px-4 py-2 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              답변
            </th>
            <th className="px-4 py-2 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                답변 날짜
            </th>
          </tr>
        </thead>
        <tbody>
          {qnas.map((qna) => (
            <tr key={qna.id}>
              <td className="px-4 py-2 border-b border-gray-200">{qna.productName}</td>
              <td className="px-4 py-2 border-b border-gray-200">{qna.question}</td>
              <td className="px-4 py-2 border-b border-gray-200">{qna.questionDate}</td>
              <td className="px-4 py-2 border-b border-gray-200">{qna.answer || 'No answer yet'}</td>
              <td className="px-4 py-2 border-b border-gray-200">{qna.answerDate || '---'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
