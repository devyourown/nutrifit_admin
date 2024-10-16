export const filters = ["전체", "주문완료", "출고완료", "배송완료"]

export type OrderItemExcelDto = {
    orderId: string;
    productName: string;
    quantity: number;
    trackingNumber: string;
}

export type OrderItemDto = {
    orderId: string;
    orderDate: string;
    imageUrl: string;
    productName: string;
    quantity: number;
    price: number;
    totalAmount: number;
}

export type OptionDto = {
    quantity: number;
    price: number;
    description: string;
}

export type ProductDetailDto = {
    detailImageUrls: string[];
    shippingDetails: string[];
    exchangeAndReturns: string[];
}

export type ProductDto = {
    id: number;
    name: string;
    description: string;
    category: string;
    lowStockThreshold: number;
    imageUrls: string[];
    badgeTexts: string[];
    options: OptionDto[];
    productDetailDto: ProductDetailDto;
    originalPrice: number;
    discountedPrice: number;
    reviewRating?: number;
    reviewCount?: number;
    stockQuantity: number;
    released: boolean;
}

export type UserDto = {
    id: number;
    username: string;
    email: string;
    profileImage: string;
    createdAt: string;
}

export type PaymentDto = {
    orderId: string;  // 주문 ID
    total: number;    // 총 금액
    subtotal: number; // 소계
    discount: number; // 할인 금액
    shippingFee: number; // 배송비
    paymentMethod: string; // 결제 방식
    orderItems: CartItemDto[]; // 주문 항목 목록
    ordererDto: OrdererDto; // 주문자 정보
    paymentDate: string; // 결제 날짜
    couponCode?: string; // 쿠폰 코드 (선택적)
    usedPoints: number; // 사용된 포인트
    earnPoints: number; // 적립된 포인트
    phoneNumber: string; // 연락처 번호
};

type CartItemDto = {
    id: number;
    name: string;
    quantity: number;
    price: number;
    imageUrl: string;
};

type OrdererDto = {
    recipientName: string;
    recipientPhone: string;
    ordererName: string;
    ordererPhone: string;
    address: string;
    addressDetail: string;
    cautions?: string;
};

export type QnADto = {
    id: number;
    productId: number;
    productName: string;
    question: string;
    questionDate: string;
    answer?: string;
    answerDate?: string;
}

export type PointTransactionDto = {
    type: PointTransactionType;
    description: string;
    whenToBurn?: Date;
    point: number;
  };
  
  export enum PointTransactionType {
    REWARD = 'REWARD',
    USE = 'USE',
    BURN = 'BURN'
  }

  export type CouponDto = {
    code: string;
    description?: string;
    discountValue: number;
    discountType: string; // 이 부분은 enum으로 변경 가능
    validFrom: string;
    validUntil: string;
    minimumOrderAmount?: number;
    maxDiscountAmount?: number;
    remainingQuantity?: number;
  };

  export type ReviewDto = {
    id: number;
    productId: number;
    username: string;
    rating: number;
    comment?: string;
    createdAt: Date;
    imageUrls?: string[];
  };
  
  
  