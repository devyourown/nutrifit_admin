import { ProductDto } from '@/app/lib/types';
import React from 'react';

interface OrganizeProps {
  product: ProductDto;
  handleChange: (field: keyof ProductDto, value: any) => void;
}

const Organize: React.FC<OrganizeProps> = ({ product, handleChange }) => {
  return (
    <div className="p-6 bg-white rounded shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">분류하기</h2>
      <p className="text-sm text-gray-600 mb-4">상품을 분류하여 더욱 돋보이게 만드세요.</p>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">카테고리</label>
          <select
            id="category"
            value={product.category}
            onChange={(e) => handleChange('category', e.target.value)}
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">카테고리를 선택하세요.</option>
            <option value="매운맛">매운맛</option>
            {/* Add collections as needed */}
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="badgeTexts" className="block text-gray-700 text-sm font-bold mb-2">상품 뱃지 (콤마로 구분해 주세요.)</label>
        <input
          id="badgeTexts"
          type="text"
          value={product.badgeTexts}
          onChange={(e) => handleChange('badgeTexts', e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="뱃지를 추가하세요."
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">상품 출시</label>
        <p className="text-sm text-gray-600">상품을 곧바로 출시하시겠습니까? 체크 후 제출하면 바로 사용자에게 보여집니다.</p>
        <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
          <input
            type="checkbox"
            name="released"
            id="released"
            checked={product.released}
            onChange={(e) => handleChange('released', e.target.checked)}
            className="toggle-checkbox block w-6 h-6 bg-white border-4 rounded-full cursor-pointer focus:ring-blue-500"
    />
        </div>
      </div>
    </div>
  );
};

export default Organize;

