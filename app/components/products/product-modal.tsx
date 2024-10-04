import React, { useEffect, useState } from 'react';
import { OptionDto, ProductDto } from '@/app/lib/types';
import Collapsible from './collapsible';
import Thumbnail from './create/thumbnail';
import GeneralInformation from './create/general';
import Organize from './create/organize';
import Variants from './create/variants';
import Shipping from './create/shipping';
import Policy from './create/policy';

interface AddProductModalProps {
  onClose: () => void;
  onSubmit: (product: ProductDto, images: File[], detailImages: File[]) => void;
  onEdit: (product: ProductDto, images: File[], detailImages: File[], deleteImages: string[]) => void;
  productToEdit?: ProductDto;
}

export default function ProductModal({ onClose, onSubmit, productToEdit, onEdit }: AddProductModalProps) {
  const [product, setProduct] = useState<ProductDto>(productToEdit || {
    id: 0,
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

  const [images, setImages] = useState<File[]>([]);
  const [detailImages, setDetailImages] = useState<File[]>([]);
  const [deleteImages, setDeleteImages] = useState<string[]>([]);

  const handleInputChange = (field: keyof ProductDto, value: string) => {
    setProduct((prev) => ({ ...prev, [field]: value }));
  };

  const handleOptionAdd = (option: OptionDto) => {
    setProduct(prev => ({
      ...prev,
      options: [...prev.options, option]
    }));
  };

  const handleOptionRemove = (index: number) => {
    setProduct((prev) => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
    }));
  }

  const handleOriginalImageRemove = (url: string) => {
    const deleted = product.imageUrls.find((image) => image === url);
    const detailDeleted = product.productDetailDto.detailImageUrls.find((image) => image === url);
    product.imageUrls = product.imageUrls.filter((image) => image !== url);
    product.productDetailDto.detailImageUrls = product.productDetailDto.detailImageUrls.filter((image) => image !== url);
    setDeleteImages([...deleteImages, deleted || detailDeleted!]);
  }

  const handleImageAdd = (imageFiles: File[]) => {
    setImages([...images, ...imageFiles]);
  };

  const handleImageRemove = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleDetailImageAdd = (imageFiles: File[]) => {
    setDetailImages([...detailImages, ...imageFiles]);
  };

  const handleDetailImageRemove = (index: number) => {
    setDetailImages(detailImages.filter((_, i) => i !== index));
  };

  const handleBadgeAdd = (badge: string) => {
    setProduct((prev) => ({
      ...prev,
      badgeTexts: [...prev.badgeTexts, badge],
    }));
  };

  const handleBadgeRemove = (index: number) => {
    setProduct((prev) => ({
      ...prev,
      badgeTexts: prev.badgeTexts.filter((_, i) => i !== index),
    }));
  };

  const handleShippingDetailAdd = (detail: string) => {
    setProduct((prev) => ({
      ...prev,
      productDetailDto: {
        ...prev.productDetailDto,
        shippingDetails: [...prev.productDetailDto.shippingDetails, detail],
      },
    }));
  };

  const handleShippingDetailRemove = (index: number) => {
    setProduct((prev) => ({
      ...prev,
      productDetailDto: {
        ...prev.productDetailDto,
        shippingDetails: prev.productDetailDto.shippingDetails.filter((_, i) => i !== index),
      },
    }));
  };

  // Handling exchange and returns addition/removal
  const handleExchangeAdd = (policy: string) => {
    setProduct((prev) => ({
      ...prev,
      productDetailDto: {
        ...prev.productDetailDto,
        exchangeAndReturns: [...prev.productDetailDto.exchangeAndReturns, policy],
      },
    }));
  };

  const handleExchangeRemove = (index: number) => {
    setProduct((prev) => ({
      ...prev,
      productDetailDto: {
        ...prev.productDetailDto,
        exchangeAndReturns: prev.productDetailDto.exchangeAndReturns.filter((_, i) => i !== index),
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (images.length === 0 && deleteImages.length === 0) {
      alert('이미지없이는 상품을 추가할 수 없습니다.');
      return;
    }
    if (productToEdit) {
      onEdit(product, images, detailImages, deleteImages);
      onClose();
      return;
    }
    onSubmit(product, images, detailImages);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full space-y-6 overflow-y-auto max-h-screen">
        <h2 className="text-2xl font-semibold">
          {productToEdit ? '상품 수정하기' : '새상품 추가하기'}</h2>
        <form onSubmit={handleSubmit}>
          <Collapsible label="전반적인 상품 정보">
          <GeneralInformation product={product} handleChange={handleInputChange} />
          </Collapsible>
          <Collapsible label="상품 분류">
          <Organize product={product} 
          handleChange={handleInputChange}
          handleBadgeAdd={handleBadgeAdd}
          handleBadgeRemove={handleBadgeRemove}/>
          </Collapsible>
          <Collapsible label="옵션 추가하기">
            <Variants product={product} onAddOption={handleOptionAdd} onRemoveOption={handleOptionRemove}/>
          </Collapsible>
          <Collapsible label="썸네일 및 상품 사진">
          <div className="p-6 bg-white rounded shadow-lg max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">썸네일 및 상품 사진</h2>
            <Thumbnail originalImages={product.imageUrls} 
            images={images} 
            onImageAdd={handleImageAdd} 
            onImageRemove={handleImageRemove} 
            onOriginalRemove={handleOriginalImageRemove}/>
          </div>
          </Collapsible>
          <Collapsible label="상세페이지 이미지">
          <div className="p-6 bg-white rounded shadow-lg max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">상세페이지 이미지</h2>
            <Thumbnail originalImages={product.productDetailDto.detailImageUrls} 
            images={detailImages} 
            onImageAdd={handleDetailImageAdd} 
            onImageRemove={handleDetailImageRemove}
            onOriginalRemove={handleOriginalImageRemove}/>
          </div>
          </Collapsible>
          <Collapsible label="배송 정보">
            <Shipping shippingDetails={product.productDetailDto.shippingDetails} 
            onAddDetail={handleShippingDetailAdd} 
            onRemoveDetail={handleShippingDetailRemove} />
          </Collapsible>
          <Collapsible label="교환 및 환불 규정">
            <Policy exchangeAndReturns={product.productDetailDto.exchangeAndReturns} 
            onAddReturnPolicy={handleExchangeAdd} 
            onRemoveReturnPolicy={handleExchangeRemove} 
            />
          </Collapsible>
          <div className="flex justify-end mt-4">
            <button type="button" onClick={onClose} className="bg-gray-300 text-black px-4 py-2 rounded mr-2">취소하기</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            {productToEdit ? '상품 수정하기' : '상품 추가하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
