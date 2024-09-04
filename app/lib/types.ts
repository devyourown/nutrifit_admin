export const filters = ["주문완료", "출고완료", "배송완료"]

export type OrderItemExcelDto = {
    orderId: string;
    productName: string;
    quantity: number;
    trackingNumber: string;
}