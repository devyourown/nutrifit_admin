import React, { useState } from 'react';
import { OptionDto, ProductDto } from '@/app/lib/types';
import Collapsible from './collapsible';
import Thumbnail from './create/thumbnail';
import GeneralInformation from './create/general';
import Organize from './create/organize';
import Variants from './create/variants';

interface AddProductModalProps {
  onClose: () => void;
  onSubmit: (product: ProductDto) => void;
}

export default function AddProductModal({ onClose, onSubmit }: AddProductModalProps) {
  const [product, setProduct] = useState<ProductDto>({
    name: '',
    description: '',
    category: '',
    stockQuantity: 0,
    lowStockThreshold: 0,
    originalPrice: 0,
    discountedPrice: 0,
    released: false,
    imageUrls: [],
    badgeTexts: [],
    options: [],
    productDetailDto: {
      detailImageUrls: [],
      shippingDetails: [],
      exchangeAndReturns: [],
    },
  });

  const handleInputChange = (field: keyof ProductDto, value: string) => {
    setProduct((prev) => ({ ...prev, [field]: value }));
  };

  const handleOptionAdd = (option: OptionDto) => {
    setProduct(prev => ({
      ...prev,
      options: [...prev.options, option]
    }));
  };

  const handleImageAdd = (url: string) => {
    setProduct(prev => ({
      ...prev,
      imageUrls: [...prev.imageUrls, url]
    }));
  };
  
  const handleImageRemove = (url: string) => {
    setProduct(prev => ({
      ...prev,
      imageUrls: prev.imageUrls.filter(image => image !== url)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('dd');
    onSubmit(product);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full space-y-6 overflow-y-auto">
        <h2 className="text-2xl font-semibold">새상품 추가하기</h2>
        <form onSubmit={handleSubmit}>
          <Collapsible label="전반적인 상품 정보">
          <GeneralInformation product={product} handleChange={handleInputChange} />
          </Collapsible>
          <Collapsible label="상품 분류">
          <Organize product={product} handleChange={handleInputChange}/>
          </Collapsible>
          <Collapsible label="옵션 추가하기">
            <Variants onAddOption={handleOptionAdd}/>
          </Collapsible>
          <Collapsible label="썸네일 및 상품 사진">
            <Thumbnail handleImageAdd={handleImageAdd} handleImageRemove={handleImageRemove}/>
          </Collapsible>
          <div className="flex justify-end mt-4">
            <button type="button" onClick={onClose} className="bg-gray-300 text-black px-4 py-2 rounded mr-2">취소하기</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">상품 추가하기</button>
          </div>
        </form>
      </div>
    </div>
  );
}
