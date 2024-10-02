import { ProductDto } from '@/app/lib/types';
import React from 'react';

interface GeneralInformationProps {
  product: ProductDto
  handleChange: (field: keyof ProductDto, value: string) => void;
}

const GeneralInformation: React.FC<GeneralInformationProps> = ({ product, handleChange }) => {
  return (
    <div className="p-6 bg-white rounded shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">상품 개요</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            상품의 이름
          </label>
          <input
            id="name"
            type="text"
            placeholder="매콤 닭가슴살"
            value={product.name !== '' ? product.name : ''}
            onChange={(e) => handleChange('name', e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="stockQuantity" className="block text-gray-700 text-sm font-bold mb-2">
            재고 개수
          </label>
          <input
            id="stockQuantity"
            type="number"
            placeholder="재고 개수를 숫자로 입력해 주세요."
            value={product.stockQuantity !== 0 ? product.stockQuantity : 0 }
            onChange={(e) => handleChange('stockQuantity', e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="originalPrice" className="block text-gray-700 text-sm font-bold mb-2">
            상품 원가격
          </label>
          <input
            id="originalPrice"
            type="number"
            placeholder="원래 가격"
            value={product.originalPrice !== 0 ? product.originalPrice : 0}
            onChange={(e) => handleChange('originalPrice', e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="discountedPrice" className="block text-gray-700 text-sm font-bold mb-2">
            상품 할인가격
          </label>
          <input
            id="discountedPrice"
            type="number"
            placeholder="할인 가격"
            value={product.discountedPrice !== 0 ? product.discountedPrice : 0}
            onChange={(e) => handleChange('discountedPrice', e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
      <div>
        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
          상품 설명
        </label>
        <textarea
          id="description"
          placeholder="상품에 대한 설명을 적어주세요."
          value={product.description}
          onChange={(e) => handleChange('description', e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
    </div>
  );
};

export default GeneralInformation;
