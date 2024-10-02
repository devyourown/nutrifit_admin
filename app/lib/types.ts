export const filters = ["주문완료", "출고완료", "배송완료"]

export type OrderItemExcelDto = {
    orderId: string;
    productName: string;
    quantity: number;
    trackingNumber: string;
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