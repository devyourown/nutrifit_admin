import * as XLSX from 'xlsx';

export function convertJsonToExcel(dto: any) {
    const worksheet = XLSX.utils.json_to_sheet(dto);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');

      XLSX.utils.sheet_add_aoa(worksheet, [
        ["주문번호", "주문상품", "주문수", "수령자명", "수령자전화번호", "구매자명", "구매자전화번호", "배송지주소", "배송시 주의사항", "운송장번호"]
      ], { origin: 'A1' });

      // Excel 파일 생성
      return XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'array'
      });
}

export function convertDateToLocalDate(date: Date) {
  return date.toISOString();
}